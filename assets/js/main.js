/* Rodrigo Lopes — portfolio. Vanilla JS, no dependencies.
   The theme/language are applied before first paint by a tiny inline script in _includes/head.html. */
(function () {
  'use strict';
  var root = document.documentElement;

  function store(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* private mode */ } }

  /* ---- Language (EN / PT) ---- */
  var langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-lang') === 'pt' ? 'en' : 'pt';
      root.setAttribute('data-lang', next);
      root.lang = next;
      store('lang', next);
    });
  }

  /* ---- Theme (dark / light) ---- */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      store('theme', next);
    });
  }

  /* ---- Mobile menu ---- */
  var navBtn = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (navBtn && nav) {
    function setNav(open) {
      nav.classList.toggle('is-open', open);
      navBtn.setAttribute('aria-expanded', String(open));
    }
    navBtn.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Experience: "Professional" / "Own projects & businesses" switch ----
     Items outside the active track fold down to a title (CSS does the animation; we just toggle .is-compact). */
  var trackBar = document.querySelector('.track-bar');
  var timeline = document.getElementById('timeline');
  if (trackBar && timeline) {
    var trackTabs = Array.prototype.slice.call(trackBar.querySelectorAll('.track-btn'));
    var trackItems = timeline.querySelectorAll('.tl-item');

    function setTrack(track, updateHash) {
      trackBar.setAttribute('data-active', track);
      timeline.setAttribute('data-active', track);
      trackTabs.forEach(function (b) {
        var on = b.getAttribute('data-track') === track;
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
      });
      trackItems.forEach(function (li) {
        li.classList.toggle('is-compact', li.getAttribute('data-track') !== track);
      });
      if (updateHash) {
        try { history.replaceState(null, '', track === 'own' ? '#own' : location.pathname + location.search); } catch (e) { /* ignore */ }
      }
    }

    setTrack(location.hash === '#own' ? 'own' : 'employee', false);
    /* enable transitions only after the first state is in place, so nothing animates on page load */
    requestAnimationFrame(function () { requestAnimationFrame(function () { timeline.classList.add('is-ready'); }); });

    trackTabs.forEach(function (btn, i) {
      btn.addEventListener('click', function () { setTrack(btn.getAttribute('data-track'), true); });
      btn.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var next = trackTabs[(i + (e.key === 'ArrowRight' ? 1 : trackTabs.length - 1)) % trackTabs.length];
        setTrack(next.getAttribute('data-track'), true);
        next.focus();
      });
    });
    window.addEventListener('hashchange', function () { setTrack(location.hash === '#own' ? 'own' : 'employee', false); });
  }

  /* ---- Hobby filter ---- */
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.hobby-card');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(' ');
        card.hidden = !(f === 'all' || tags.indexOf(f) !== -1);
        if (!card.hidden) card.classList.add('is-visible');
      });
    });
  });

  /* ---- Lightbox for gallery + images inside item descriptions ---- */
  var box = document.getElementById('lightbox');
  if (box) {
    var boxImg = box.querySelector('img');
    var boxCap = box.querySelector('figcaption');
    var lastFocus = null;

    function openBox(src, caption) {
      lastFocus = document.activeElement;
      boxImg.src = src;
      boxImg.alt = caption || '';
      boxCap.textContent = caption || '';
      boxCap.hidden = !caption;
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      box.querySelector('.lightbox-close').focus();
    }
    function closeBox() {
      box.hidden = true;
      boxImg.removeAttribute('src');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function currentCaption(link) {
      var pt = root.getAttribute('data-lang') === 'pt';
      return (pt ? link.getAttribute('data-caption-pt') : link.getAttribute('data-caption-en')) || '';
    }

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[data-lightbox]');
      if (link) { e.preventDefault(); openBox(link.href, currentCaption(link)); return; }
      var img = e.target.closest('.prose img');
      if (img) { openBox(img.currentSrc || img.src, img.alt); }
    });
    box.addEventListener('click', closeBox);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) closeBox(); });
  }
})();
