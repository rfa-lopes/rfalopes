# Rodrigo Faria Lopes — *[rfa-lopes.github.io](https://rfa-lopes.github.io/)*

Personal portfolio / CV site built with [Jekyll](https://jekyllrb.com) and published on GitHub Pages.
Plain CSS and vanilla JS — there is no build step besides Jekyll itself.

## What's on the site

- **Tabs:** Home · Experience · Education · Hard Skills · Hobbies · Languages · Contacts
- **Experience:** one timeline with a switch — *Professional* (jobs) ↔ *Own projects & businesses*; the items of the other side fold down to their title. Ongoing items first, then by end date.
- **Education:** timeline with the degree, certificates and school; university projects and the thesis are cards inside the degree page.
- **Hobbies:** cards with tags (federated, hobby, past …), dates and filters.
- **Every item has its own page** with description, highlights, tech chips, links, photos and videos.
- **Bilingual** (EN / PT button) and **dark / light** theme, responsive, no cookies of its own.

## Editing the content

Everything editable lives in [`admin/`](admin/README.md) (texts, contacts, skills, timelines, hobbies) and
[`images/`](images/README.md) (pictures). The step-by-step guide — including how to test locally and publish —
is in **[`admin/README.md`](admin/README.md)** (in Portuguese).

## Run it locally

You need Ruby 3.x. On Windows: `winget install RubyInstallerTeam.RubyWithDevKit.3.3` and open a new terminal.
(With Git Bash, if `ruby` is not found: `export PATH="/c/Ruby33-x64/bin:$PATH"`.)

```bash
bundle install                 # once — installs into vendor/bundle
bundle exec jekyll serve       # → http://127.0.0.1:4000/
```

Save a file and reload the page (≈2 s). Restart the server after editing `_config.yml`.

### Check it like GitHub Pages does

GitHub Pages builds in *production* and *safe* mode. Reproduce that and look for broken links/images:

```bash
JEKYLL_ENV=production bundle exec jekyll build --safe --strict_front_matter --destination _site-test
python tools/check_site.py _site-test
```

`check_site.py` prints the number of pages and references checked and lists anything broken (exit code 1 if so).

## Deploy

GitHub Pages is set to *Deploy from a branch* → `master` / `/`. A push to `master` publishes the site in 1–3 minutes
(progress: repository → **Actions** → *pages-build-deployment*). Safe flow:

```bash
git switch -c my-change
git add -A && git commit -m "Describe the change"
git push -u origin my-change
# open a Pull Request on GitHub and merge it into master → the site is rebuilt
```

To undo a bad deploy: `git revert <merge-commit>` and push.

## Structure

```
_config.yml        site settings, collections (admin/_experience, _education, _hobbies), data_dir = admin/_data
_layouts/          default.html (page shell) · detail.html (item page)
_includes/         header, footer, timeline, tags, icons, i18n helpers, sorting ...
assets/            css/main.css · js/main.js · favicon
admin/             ← content you edit (see admin/README.md)
images/            ← pictures, videos, logos (see images/README.md)
tools/             check_site.py (link checker)
*.html (root)      the tab pages (index, experience, education, skills, hobbies, languages, contacts, 404)
```
