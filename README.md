# Retro Bowl

A standalone static website for the original Retro Bowl game by New Star Games.
Opening the homepage starts GameMaker immediately. The game's own welcome screen,
career setup, controls, saving, and gameplay remain intact.

## Local play

With Node.js installed, run this from the repository:

```sh
node serve.cjs
```

Open http://127.0.0.1:8087/. No dependency installation or build is required.
Audio starts after the first interaction, as required by browser autoplay rules.

## Cloudflare Pages

Import this GitHub repository in Cloudflare Pages using these settings:

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Production branch | `main` |
| Build command | `exit 0` |
| Build output directory | `.` |
| Root directory | Leave empty |

The project needs no framework, server functions, secrets, or compilation.
See [hosting and source details](HOSTING.md).

## Source

The initial source is [3kho/retro-bowl](https://github.com/3kho/retro-bowl).
Its original scripts, images, production launcher, and license are retained.
Because that snapshot omits required assets, the active game uses the approved
complete original-author archive, preserved in a fork before later team edits.
Its runtime scripts, textures, sounds, and data are unchanged.

Retro Bowl was created by New Star Games. Original repository credit: 3kh0/Echo.
