# Imagens

Todas as imagens, logótipos e vídeos do site ficam aqui. Convenção: uma pasta por item, com o **mesmo nome do ficheiro `.md`** em `admin/`.

```
images/
├── profile/rodrigo.jpg                 foto da home e do canto do topo (admin/_data/profile.yml → photo)
├── experience/<item>/logo.png          capa + fotos/vídeos desse item   (ex.: experience/hamus/)
├── education/<item>/logo.png           (ex.: education/nova-fct/, education/csd/ ...)
├── hobbies/<item>/cover.jpg            (ex.: hobbies/roller-hockey/)
├── icons/                              logótipos usados nas Hard Skills (admin/_data/skills.yml → img:)
└── projects/                           reservado (projetos pessoais, se criares a secção)
```

Para usar uma imagem num texto (em qualquer ficheiro de `admin/`):

```markdown
![Descrição da foto](/images/experience/hockeyfy/foto-1.jpg)
```

## Dicas

- **Maiúsculas/minúsculas contam no GitHub Pages** (corre em Linux): `Foto.JPG` ≠ `foto.jpg`. Usa nomes em minúsculas, sem espaços nem acentos (`foto-1.jpg`).
- `.jpg` para fotos; `.png`/`.svg`/`.webp` para logótipos e capturas de ecrã.
- Tamanho: ~1600 px de largura chega. Ficheiros de fotos abaixo de ~500 KB.
- **Vídeos:** comprime antes de pôr no site (o GitHub recusa ficheiros acima de 100 MB). Comando em [`admin/README.md`](../admin/README.md#vídeos).
- Nunca publiques imagens com dados confidenciais (clientes, empresas, documentos) nem fotos de pessoas que não queiram aparecer — o repositório é **público**.

## Logótipos como capa

Um logótipo que é uma imagem quadrada com fundo próprio fica melhor inteiro e sem molduras. No `.md` do item:

```yaml
cover: /images/experience/siemens/logo.png
cover_fit: contain
cover_bg: "#029899"      # cor do fundo do ficheiro
```

Para ler a cor do canto da imagem (ImageMagick):

```bash
magick logo.png -format '#%[hex:p{3,3}]' info:
```

Logótipos com fundo transparente ou branco não precisam de `cover_bg` — basta `cover_fit: contain`.
Se o fundo tiver textura ou degradé, o fundo liso deixa uma moldura visível: nesse caso pede ajuda para esbater a orla da imagem.
