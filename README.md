# CADAD · Landing

Marketing site for CADAD and VetNet. Next.js (App Router) + Tailwind CSS v4, fully static, ready for Vercel.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

- `src/content/*.ts`: all copy (Spanish), separate from markup
- `src/components/sections/*`: page sections
- `src/components/ui/*`: primitives (Button, Chip, ProductFrame, Logo…)
- `src/components/layout/*`: banner, header, footer, shell
- `src/app/terminos`, `src/app/privacidad`: legal pages (provisional texts)

## Recapture VetNet screenshots

Screens in `public/screens/` are real captures of https://vetnetmvp.vercel.app/ (demo roles "Administrador" and "Veterinaria").

```bash
npx playwright install chromium   # first time only
node scripts/capture-screens.mjs
```
