# Nx Cheatsheet

## If you need to bootstrap a new package

```bash
nx generate @nx/js:library packages/file-formats/your-package --buildable=false --importPath="@rbrown/your-package"
```

We use `--buildable=false` because we never figured out how to get built libraries to play nicely with Vite.

## Upgrading Nx

```bash
npx nx migrate latest
```
