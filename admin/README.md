# Pasta `admin` — onde editas o site

Tudo o que é conteúdo está aqui. Não precisas de mexer em HTML/CSS.

```
admin/
├── _data/                  ← conteúdo "estático" (ficheiros .yml)
│   ├── profile.yml         nome, foto, resumo, destaques da home, interesses
│   ├── contacts.yml        contactos e redes sociais
│   ├── skills.yml          hard skills (a stack principal tem core: true)
│   ├── languages.yml       línguas
│   ├── tags.yml            as etiquetas coloridas (federado, hobby, projeto...)
│   ├── nav.yml             as abas do topo (ordem, nomes, esconder)
│   └── ui.yml              títulos e textos pequenos do site
├── _experience/            ← 1 ficheiro .md = 1 item da timeline de experiência (e a sua página)
├── _education/             ← 1 ficheiro .md = 1 item da timeline de educação (e a sua página)
├── _hobbies/               ← 1 ficheiro .md = 1 card de hobby (e a sua página)
└── _templates/             ← modelos para copiares (não são publicados)
```

Fora desta pasta: `images/` (imagens, vídeos e logótipos), `tools/check_site.py` (verificador de links) e `README.md` (visão geral do projeto).

As **imagens** ficam na pasta `images/` (na raiz) — ver [`images/README.md`](../images/README.md).

---

## Como adicionar uma experiência / curso / projeto / hobby

1. Copia o modelo de `admin/_templates/` para a pasta certa (`_experience`, `_education` ou `_hobbies`).
2. Dá-lhe um nome sem espaços, por exemplo `startup-x.md` — o nome vira o endereço: `/experience/startup-x/`.
3. Preenche o topo (entre os `---`) e escreve o texto por baixo.
4. Mete as fotos em `images/experience/startup-x/` (ou `education/…`, `hobbies/…`).
5. Vê o resultado no teu PC ([Testar localmente](#testar-localmente)) e depois publica ([Publicar](#publicar-deploy)).

Para **apagar** um item, apaga o ficheiro `.md`.

### O topo do ficheiro (front matter)

| Campo | Para quê |
|---|---|
| `title` / `title_pt` | Título (e a versão em português, se for diferente) |
| `subtitle` / `subtitle_pt` | Cargo, grau, "Estágio"... |
| `track` | **Só experiência**: `employee` (emprego em IT por conta de outrem) ou `own` (projetos e negócios próprios). Decide em que lado do interruptor o item aparece em grande — no outro lado fica reduzido ao título |
| `tags: [job]` | Etiquetas coloridas — chaves definidas em `_data/tags.yml` |
| `start`, `end` | **Sempre entre aspas**: `"2021"`, `"2021-03"` ou `"2021-03-15"` (o dia só serve para ordenar itens do mesmo mês; não aparece). `end` vazio (`""`) = ainda a decorrer ("Atualidade") |
| `period` / `period_pt` | Texto livre que **substitui** as datas no card e na página (ex. `From age 3 until 2025` / `Dos 3 anos até 2025`). Útil quando não há um ano de início certo |
| `location` | Cidade/país (opcional) |
| `cover` | Imagem do card e do topo da página, ex. `/images/experience/startup-x/cover.jpg` |
| `cover_bg` | Cor de fundo (ex. `"#029899"`) para logótipos que são imagens quadradas com fundo próprio: a imagem aparece inteira e sem molduras. A cor lê-se no canto da imagem |
| `cover_fit: contain` | Para logótipos (sem cortar). Sem isto, a imagem preenche o card |
| `initials` | Texto/emoji mostrado quando **não** há `cover` |
| `summary` / `summary_pt` | Descrição curta (aparece no card) |
| `highlights` | Lista de pontos principais (com `en` e `pt`) |
| `tech` | Lista de chips (tecnologias, ou áreas de trabalho em itens não-tech) |
| `tech_label` / `tech_label_pt` | Título do painel dos chips (por defeito "Tecnologias"; ex. `Areas` / `Áreas`) |
| `links` | Botões para site, GitHub, etc. |
| `videos` | Vídeos `.mp4` (com `src`, `poster`, `caption`) — ver abaixo |
| `gallery` | Fotos em grelha no fim da página (clicam-se para ampliar) |
| `order` | **Só hobbies**: posição na página (1, 2, 3…) |
| `parent: nova-fct` | **Só educação**: o item deixa de aparecer na timeline e passa a aparecer como card dentro da página do item `nova-fct` (o nome do ficheiro, sem `.md`) |

**Ordem da timeline:** primeiro vêm os itens ainda a decorrer (`end: ""`), do que começou há menos tempo para o mais antigo; depois os já terminados, pela data em que **acabaram** (`end`), do mais recente para o mais antigo — por isso, por exemplo, o curso na NOVA (acabou em 2021) fica acima de um certificado de 2019 feito durante o curso. Os hobbies ordenam-se pelo `order`.

**Interruptor da experiência:** a página tem uma só timeline e dois botões em cima — *Profissional* e *Projetos e negócios próprios*. O campo `track` de cada item decide a que lado pertence. O link `…/experience/#own` abre direto no segundo lado.

### O texto da página

Escreve em Markdown por baixo do topo. Para teres **duas línguas**, escreve primeiro o inglês, depois uma linha com `<!--pt-->`, e depois o português:

```markdown
Texto em inglês...

<!--pt-->

Texto em português...
```

Se não puseres `<!--pt-->`, o mesmo texto aparece nas duas línguas. O mesmo vale para qualquer campo: se faltar o `_pt`, usa-se o inglês.

### Fotos dentro do texto

```markdown
![Descrição da foto](/images/experience/hockeyfy/foto-1.jpg)
```

- O caminho começa sempre por `/images/`.
- Várias imagens seguidas (sem linha em branco entre elas) formam uma grelha.
- As fotos ampliam ao clicar. O texto entre `[ ]` é a legenda.
- Links para outras páginas do site: `[Siemens](/experience/siemens/)`.

### Vídeos

```yaml
videos:
  - src: /images/experience/hamus/machine.mp4
    poster: /images/experience/hamus/machine-poster.jpg   # imagem mostrada antes do play (opcional)
    caption: A hook-making machine in action.
    caption_pt: Uma máquina de fabrico de anzóis em funcionamento.
```

Comprime os vídeos antes (o GitHub recusa ficheiros > 100 MB e o site fica lento). Para 720p, ~1 min → ~15 MB:

```bash
ffmpeg -i original.mp4 -vf scale=-2:720 -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 64k machine.mp4
ffmpeg -ss 2 -i original.mp4 -frames:v 1 -vf scale=1280:-1 machine-poster.jpg
```

### Galeria (alternativa)

```yaml
gallery:
  - src: /images/experience/hockeyfy/foto-1.jpg
    caption: The 3D configurator
    caption_pt: O configurador 3D
```

### Notas escondidas

O que estiver entre `{% comment %} … {% endcomment %}` **não aparece** no site. Os ficheiros já trazem lá notas `TODO` para ti.

---

## Etiquetas (hobbies, etc.)

Em `_data/tags.yml` já existem: `hobby`, `federated`, `experience`, `semi-pro`, `competitive`, `past` (hobbies); `job`, `internship`, `business`, `personal`, `freelance`, `seasonal` (experiência); `degree`, `thesis`, `project`, `course`, `certification`, `secondary` (educação).

Para criar uma nova, acrescenta uma linha com `en`, `pt` e `color` (`blue green amber rose violet teal slate`) e usa a chave nos `tags:` de qualquer item. Um hobby pode ter várias etiquetas: `tags: [hobby, federated, past]`. Quando houver mais de uma etiqueta nos hobbies, aparecem automaticamente os filtros no topo da página.

---

## Hard Skills (`_data/skills.yml`)

Cada grupo (AI, Linguagens, Front-end, …) tem uma lista de itens. A **ordem dos grupos** é a do ficheiro — muda-os de sítio para mudar a ordem na página.

```yaml
- group: { en: AI, pt: IA }
  items:
    - { name: Claude Code, img: /images/icons/claude-code.svg }   # logótipo teu (ficheiro em images/icons/)
    - { name: React, icon: react, core: true }                    # logótipo do Devicon + destacado
    - { name: Zustand }                                           # sem logótipo (aparece um ponto)
```

| Campo | Para quê |
|---|---|
| `core: true` | **Stack principal**: fica destacado nesta página e aparece na secção "Stack principal" da home |
| `icon: react` | Logótipo do [Devicon](https://devicon.dev) (usa o nome que lá aparece; `variant: plain` se não houver `original`) |
| `img: /images/icons/x.svg` | Logótipo teu, em vez do Devicon |

---

## Testar localmente

Precisas de **Ruby 3.x** (só uma vez). No Windows:

```bash
winget install RubyInstallerTeam.RubyWithDevKit.3.3
```

Abre um terminal **novo** depois de instalar. Neste PC o Ruby está em `C:\Ruby33-x64`; no Git Bash, se o comando `ruby` não for encontrado:

```bash
export PATH="/c/Ruby33-x64/bin:$PATH"
```

### Ver o site enquanto editas

```bash
cd "C:/Users/Administrator/Desktop/personal website/rfalopes"
bundle install                 # só da primeira vez (ou quando o Gemfile mudar)
bundle exec jekyll serve       # deixa este terminal aberto
```

Abre **http://127.0.0.1:4000/**. Guarda um ficheiro, espera ~2 segundos e atualiza a página (Ctrl+F5 se não mudar). Para parar: `Ctrl+C`.

- Alterações a `_config.yml` só se veem depois de parar e voltar a arrancar o servidor.
- Porta ocupada? `bundle exec jekyll serve --port 4001`.
- Ver no telemóvel (mesma rede Wi-Fi): `bundle exec jekyll serve --host 0.0.0.0` e abre `http://<IP-do-PC>:4000/`.
- Para ver o outro idioma ou tema, usa os botões **EN/PT** e **claro/escuro** do próprio site (a escolha fica guardada no browser).

### Testar como o GitHub Pages vai construir

O GitHub Pages constrói em modo *produção* e *seguro* e é mais exigente com o front matter. Antes de publicar, corre isto — é o teste que interessa:

```bash
JEKYLL_ENV=production bundle exec jekyll build --safe --strict_front_matter --destination _site-test
python tools/check_site.py _site-test
```

O primeiro comando falha se algum ficheiro `.md`/`.yml` tiver um erro (aspas em falta, `:` por fechar…). O segundo imprime algo como `31 pages, 581 internal references checked, 0 problem(s)` e lista tudo o que estiver partido (imagens que não existem, links errados, erros de Liquid). **Só publica com `0 problem(s)`.**

---

## Publicar (deploy)

O site é publicado pelo **GitHub Pages** a partir do branch **`master`** (pasta `/`). Não há mais nada a configurar: um push para a `master` reconstrói e publica o site em 1–3 minutos em https://rfa-lopes.github.io/.

Fluxo recomendado (a `master` é o site público, por isso passa sempre por um branch):

```bash
git switch -c minha-alteracao                  # um branch novo
git add -A
git commit -m "Descreve a alteração"
git push -u origin minha-alteracao
```

Depois, no GitHub: **Pull request → Merge** para a `master`. Para publicar já, sem pull request: `git switch master`, `git merge minha-alteracao`, `git push`.

- **Ver o progresso:** repositório no GitHub → separador **Actions** → *pages-build-deployment*. Fica verde quando o site está no ar.
- **Ver o resultado:** abre https://rfa-lopes.github.io/ e faz Ctrl+F5 (o browser guarda cópias).
- **Desfazer um deploy mau:** `git revert <commit-do-merge>` e `git push` — o site volta ao estado anterior.
- Um push para um branch que **não** seja a `master` não publica nada.

---

## Problemas frequentes

| Sintoma | Causa e solução |
|---|---|
| `cannot load such file -- webrick` | Falta instalar as dependências: `bundle install` |
| `ruby` / `bundle` não é reconhecido | Abre um terminal novo, ou `export PATH="/c/Ruby33-x64/bin:$PATH"` no Git Bash |
| Página em branco / 404 em `localhost:4000` | Reinicia o `bundle exec jekyll serve` (alterações ao `_config.yml` só têm efeito depois de reiniciar) |
| Uma imagem não aparece | O caminho começa por `/images/…`; **maiúsculas contam** no GitHub (`Foto.JPG` ≠ `foto.jpg`); corre `python tools/check_site.py _site-test` |
| `YAML Exception` / `mapping values are not allowed` | Texto com `:` ou `#` no topo do ficheiro tem de ir entre aspas: `summary: "Algo: assim"` |
| A timeline dá erro de ordenação ou mostra itens fora de ordem | `start` e `end` têm de estar **entre aspas** (`"2023"`), todos como texto |
| A alteração não aparece no site publicado | Espera 1–3 min, vê o *Actions* e faz Ctrl+F5. Se o build falhou, corre o teste "como o GitHub Pages" acima |
| `push` recusado por ficheiro grande | O GitHub recusa ficheiros > 100 MB — comprime o vídeo (ver [Vídeos](#vídeos)) |

---

## O que ainda precisas de preencher

- [ ] **Logótipo da Escola Secundária de Sampaio** (`_education/secondary-school.md`): põe o ficheiro em `images/education/secondary-school/logo.png` e descomenta `cover:` (+ `cover_fit: contain`); confirma os anos (2013–2016 são uma dedução) e, se quiseres, a nota final
- [ ] **Textos `TODO`**: cada experiência, curso, projeto e hobby tem uma nota escondida a dizer o que falta contar (história, desafios, fotos)
- [ ] **Hobbies**: o ano de início do Surf e dos Investimentos, e mais fotos
- [ ] **Datas dos projetos académicos** — vieram das datas dos repositórios GitHub; corrige se não bateram certo (`_education/*.md`)
- [ ] **Nome do curso** em `_education/nova-fct.md` (o CV só diz "Integrated Master's")
- [ ] **Bar de praia**: fotos da construção e da época (a ligação à família está só como "de família")
- [ ] **Corkified**: acrescentar mais do que já construíste e o impacto; o Slack, Teams, Android Studio e Xcode só estão no item da Corkified, não nas Hard Skills
- [ ] `_education/srsc.md`: o repositório do SRSC (jffp113/SRSC-2) passou a privado — sem link por agora
- [ ] **Rever as traduções PT** (foram escritas a partir do CV em inglês)
- [ ] **Privacidade** (o repositório é público): o telemóvel **não** está no site — só o acrescentes em `contacts.yml` se quiseres; os certificados (Udemy e PDF da Multicert) estão ligados e mostram o teu nome; há fotos de outras pessoas (equipa de hóquei, caça submarina, monitores) e de crianças (Férias Jovem 2017) — confirma que estás confortável com isso
