# Static hosting and source details

## Cloudflare Pages

Import `BigBubbaLewis/Retro-Bowl` with framework preset **None**, production
branch `main`, build command `exit 0`, build output directory `.`, and an empty
root directory. Files are served directly; there is no build or dependency
installation. Cloudflare deployment is separate from pushing this repository.

Keep `index.html`, `img/`, and `html5game/` together. No `netlify.toml`, Wrangler
configuration, redirects, Workers, or Pages Functions are required.

The root `404.html` is intentional. It prevents Cloudflare's default SPA fallback
from returning the homepage as a successful response for missing optional save
files. The game must receive HTTP 404 for those probes so it creates fresh local
settings and saves normally.

Official documentation:
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/pages/configuration/serving-pages/

## Provenance

Initial source: https://github.com/3kho/retro-bowl
Commit: `4c1cdbd3422646b90bd0862c2800bb5a2461355b`

The supplied `js/`, `img/`, `production.html`, and `LICENSE` are retained unchanged.
The original production launcher is retained for provenance; the website entry
point is `index.html` with the restored build below.

Approved game archive:
https://github.com/mmtrucefacts/Retro/tree/5bc1564fe17374c6d53c81fcab159e297c68eae5/html5game

Commit `5bc1564fe17374c6d53c81fcab159e297c68eae5` was authored by Echo/3kh0.
Runtime files were restored from that commit, before the fork's later changes to
`Teams.txt`. Every restored script, texture, sound, and game data file matches its
archive Git blob. Duplicate unused script dumps and an unrelated game ZIP were
excluded from the archived directory.

`index.html` initializes the original GameMaker runtime on page load. The optional
hosting SDK globals use the original wrapper's no-SDK fallback. A declared `cpd`
global lets the archive's trailing expression execute without editing the game
script. Game rules and runtime code are unchanged.

## Local preview and storage

Run `node serve.cjs`, then open http://127.0.0.1:8087/.
The preview server uses only Node's built-in modules and is not a hosting backend.

Audio unlocks after the first interaction. Saves and settings stay in browser
storage for the site's origin. On a fresh browser the original engine may probe
`optiondata.dat` and `savedata.ini`; their HTTP 404 responses are expected. Do not
create shared save files or rewrite those paths to `index.html`.

## Verification

- JavaScript syntax checks passed for the active game, wrapper, and local server.
- All 33 restored runtime files match the archive's Git blobs; supplied legacy
  scripts, images, production launcher, and license are unchanged.
- A local Chrome test verified automatic startup, career creation, input,
  audio activation, and successful save reload. The original welcome, career,
  and saved-career news screens rendered correctly.
- The test loaded 32 unique local resources with HTTP 200 and recorded no
  uncaught JavaScript errors or external asset requests. Only the original
  engine's optional fresh-browser settings/save probes returned HTTP 404.
- No Cloudflare deployment was performed.
