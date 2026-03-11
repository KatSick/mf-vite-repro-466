# Minimal Repro: module-federation/vite#466

**`syntheticNamedExports` not supported in Vite 8 (Rolldown) — build fails with MISSING_EXPORT**

## Issue

When using `@module-federation/vite` with `vite@8.0.0-beta.18`, `vite build` fails because
Rolldown does not support `syntheticNamedExports` (used internally by the plugin to resolve
named imports from shared modules).

See: https://github.com/module-federation/vite/issues/466

## Reproduce

```bash
pnpm install
cd packages/remote
pnpm build
```

Build fails with:

```
[MISSING_EXPORT] Error: "Badge" is not exported by
"node_modules/__mf__virtual/remote__loadShare___mf_0_repro_mf_1_design_mf_2_system__loadShare__.mjs"
```

## Structure

- `packages/shared-lib` — a local `@repro/design-system` package that exports `Badge` and `Card` components
- `packages/remote` — exposes a `Button` component, shares `react`, `react-dom`, and `@repro/design-system`
- `packages/host` — consumes the remote `Button`, shares the same dependencies

## Why react/react-dom alone don't trigger the bug

The plugin pre-resolves all named exports for well-known packages like `react` via static
analysis of the prebuild module, generating explicit destructuring in the loadShare shim.
For other shared packages (like a design system), the plugin relies on `syntheticNamedExports`
to forward named exports — which Rolldown ignores.

## Root Cause

`@module-federation/vite` returns `{ code, syntheticNamedExports: '__moduleExports' }` from
its `load` hook. Rolldown (used by Vite 8) does not implement `syntheticNamedExports`
([rolldown#819](https://github.com/rolldown/rolldown/issues/819),
[rolldown#8628](https://github.com/rolldown/rolldown/issues/8628)), so named exports from
shared modules are unresolvable at build time.

## Versions

- `vite`: 8.0.0-beta.18 (rolldown 1.0.0-rc.8)
- `@module-federation/vite`: 1.12.3
