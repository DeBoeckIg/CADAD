// Captures real screenshots of the VetNet MVP for the landing page.
// Usage (from web/): node scripts/capture-screens.mjs
// Requires: npm i -D playwright sharp && npx playwright install chromium
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const BASE_URL = "https://vetnetmvp.vercel.app/";
const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/screens");
const VIEWPORT = { width: 1440, height: 900 };
const OUTPUT_WIDTH = 1920; // downscale the 2x capture to keep files light

/**
 * Each shot logs in with a demo role (quick-access button on the login page),
 * opens a sidebar item and optionally runs an extra step.
 * The consultation screen is only available to the "Veterinaria" role.
 */
const SHOTS = [
  { role: "Administrador", name: "dashboard", nav: "Inicio Veterinaria" },
  { role: "Administrador", name: "dashboard-petshop", nav: "Inicio Petshop" },
  { role: "Administrador", name: "pacientes", nav: "Pacientes" },
  { role: "Administrador", name: "paciente", nav: "Pacientes", after: (p) => openRowAction(p, "Rocco", "Historial") },
  { role: "Administrador", name: "turnos", nav: "Turnos" },
  { role: "Administrador", name: "vacunas", nav: "Vacunas" },
  { role: "Administrador", name: "inventario", nav: "Productos" },
  { role: "Administrador", name: "punto-de-venta", nav: "Venta / Caja", after: fillCart },
  { role: "Administrador", name: "reportes", nav: "Reportes" },
  { role: "Administrador", name: "auditoria", nav: "Auditoría" },
  { role: "Veterinaria", name: "consultorio", nav: "Pacientes", after: (p) => openRowAction(p, "Rocco", "Consulta") },
];

/** Clicks a per-row action button (e.g. "Historial") for the given patient. */
async function openRowAction(page, patient, label) {
  const row = page.locator("tr", { hasText: patient }).first();
  const scope = (await row.count()) ? row : page;
  await scope.getByRole("button", { name: label, exact: true }).first().click();
  await page.waitForTimeout(1500);
}

/** Adds a couple of products to the POS cart so the screen is not empty. */
async function fillCart(page) {
  for (const product of ["Collar antipulgas Seresto", "Shampoo hipoalergénico", "Vacuna quíntuple canina"]) {
    await page.getByText(product).first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(400);
  }
}

async function login(page, role) {
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: role, exact: true }).click();
  await page.getByRole("button", { name: /iniciar sesión/i }).click();
  await page.getByRole("button", { name: /cerrar sesión/i }).waitFor({ timeout: 15000 });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const pages = new Map();

  for (const shot of SHOTS) {
    if (!pages.has(shot.role)) {
      const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, locale: "es-AR" });
      const page = await context.newPage();
      await login(page, shot.role);
      pages.set(shot.role, page);
    }
    const page = pages.get(shot.role);
    await page.getByRole("button", { name: shot.nav, exact: true }).click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1200);
    if (shot.after) await shot.after(page);
    const png = await page.screenshot({ type: "png" });
    const file = path.join(OUT_DIR, `${shot.name}.webp`);
    await sharp(png).resize({ width: OUTPUT_WIDTH }).webp({ quality: 82 }).toFile(file);
    console.log(`saved ${path.relative(process.cwd(), file)}`);
  }

  await browser.close();
}

main().catch((error) => {
  console.error("Screen capture failed:", error);
  process.exit(1);
});
