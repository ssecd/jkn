# JKN — Agent Guide

## Quick start

```bash
pnpm install
pnpm build       # vp pack (tsdown): bundles dist/index.js + dist/index.d.ts
pnpm lint        # vp check: fmt --check + lint + typecheck
pnpm format      # vp fmt . (write)
pnpm test        # vp test, needs .env with real BPJS credentials
```

## Codebase

- **Single-package ESM library** (`"type": "module"`), published as `@ssecd/jkn`
- **Package manager**: pnpm 10 (enforced via `packageManager` field and `engine-strict=true`); workspace settings (catalog, overrides) live in `pnpm-workspace.yaml`
- **Toolchain**: [Vite+](https://viteplus.dev) (`vp` CLI, single `vite-plus` devDependency) — single `vite.config.ts` drives pack/test/lint/fmt
- **Entrypoint**: `src/index.ts` → default export `class JKN extends Fetcher`
- **Build output**: `dist/` (gitignored), single-file bundle `dist/index.js` + `dist/index.d.ts`. `package.json#files` includes only `dist/`
- **Type declarations**: bundled by tsdown (`pack.dts: true`), replacing the old `tsc && dts-buddy` pipeline. `fixedExtension: false` keeps `.js`/`.d.ts` names for the exports map

## Architecture

- `JKN` class lazily initialises API modules via `CachedApi` (simple `Map<string, BaseApi>`)
- `vclaim` and `apotek` use a singleton pattern (`getInstance`); others use generic `CachedApi.get()`
- API modules extend `BaseApi` and call `this.send(type, option)` which routes through `Fetcher.send()`
- Response shape varies by API type (see `SendResponse` in `src/fetcher.ts`):
  - `vclaim` / `apotek` / `pcare` / `icare`: `{ response, metaData }` (camelCase)
  - `aplicares` / `antrean` / `rekamMedis`: `{ response, metadata }` (lowercase)
- `Fetcher` handles HMAC signing, AES-256-CBC decryption, LZ-string decompression, and a `Content-Type: Application/x-www-form-urlencoded` hack required by BPJS

## Testing

- All tests are **integration tests** hitting real BPJS APIs — no mocking
- **Requires `.env`** with valid BPJS credentials (see `.env.example` for all vars)
- Run: `pnpm test` (`vp test`)
- Config in `vite.config.ts#test`: include `test/**/*.{test,spec}.{js,ts}`, `watch: false`, `setupFiles: ['./test/env.ts']`
- `test/env.ts` loads `.env` via `process.loadEnvFile()` — Vitest does not load env files itself (replaces the old `node --env-file=.env` wrapper); it runs before `test/jkn.ts` builds its shared `new JKN()`
- Tests use `test/jkn.ts` (a pre-initialised `new JKN()`) as shared instance
- Many tests have `{ timeout: 25_000 }` — BPJS APIs can be slow
- Tests fail without valid credentials — compare failures against a known baseline before blaming a change

## Conventions

- **Formatter**: Oxfmt (`vp fmt`, `vp fmt --check`) — tabs, single quotes, no trailing commas, 100 char width; configured in `vite.config.ts#fmt`
- **Linter**: Oxlint + tsgolint (`vp lint`, type-aware with `typeCheck: true`); configured in `vite.config.ts#lint`. Notable: `typescript/no-this-alias` allows `root`/`self`, `typescript/no-empty-object-type: off`
- **One-shot check**: `pnpm lint` (`vp check`) runs fmt check + lint + typecheck together; CI runs `pnpm lint` before build
- **pnpm settings**: `engineStrict: true` lives in `pnpm-workspace.yaml` (together with catalog/overrides/peerDependencyRules — it's pnpm's per-project settings file, not a monorepo requirement). There is no `.npmrc`; `resolution-mode` was removed because `highest` is already the default
- **Config**: loaded from `JKN_*` env vars. Can also be passed as object or async function to `new JKN(config)`. `invalidateConfig()` re-reads.

## Modules / API types

| Module       | Key                 | Endpoint type |
| ------------ | ------------------- | ------------- |
| VClaim       | `jkn.vclaim.*`      | `vclaim`      |
| Antrean      | `jkn.antrean.*`     | `antrean`     |
| Antrean FKTP | `jkn.antreanFktp.*` | `antrean`     |
| Aplicares    | `jkn.aplicares.*`   | `aplicares`   |
| Apotek       | `jkn.apotek.*`      | `apotek`      |
| PCare        | `jkn.pcare.*`       | `pcare`       |
| i-Care       | `jkn.icare.*`       | `icare`       |
| Rekam Medis  | `jkn.rekamMedis.*`  | `rekamMedis`  |

## Release

- Uses [Changesets](https://github.com/changesets/changesets)
- CI runs `pnpm lint` (fmt + lint + typecheck) before build, then publishes via `changeset publish` only on PR merge to `main` on upstream (`ssecd/jkn`)
- Pre-release: `pnpm build` then `pnpm release`

## Dependencies

- Runtime: `lz-string` (response decompression)
- Peer: `@types/fhir` (optional, only needed for Rekam Medis types)
- Dev: `vite-plus` (bundles vitest, oxlint, oxfmt, tsdown, rolldown, vite), typescript, @types/node, changesets

## Gotchas

- Don't commit `dist/` — it's gitignored and built during CI/release
- Don't commit `.env` — it's gitignored; use `.env.example` as reference
- `.env` loading for tests lives in `test/env.ts` (`process.loadEnvFile`), not in the test script — don't remove the `setupFiles` entry in `vite.config.ts`
- Vite+ requires Node `^22.18.0 || ^24.11.0 || >=26.0.0` (enforced via `engine-strict`)
- CI skips tests (commented out in `release.yml`). Tests must be run manually before PR
- When running `vp migrate` in the future, fetch the target CLI fresh (`npx --package=vite-plus@<version> vp migrate`) instead of reusing the local `vp` — pnpm's `dlx` has no `--package` flag
