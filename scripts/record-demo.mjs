// Records short "in use" videos of the VetNet MVP for the landing page.
// Usage (from web/): node scripts/record-demo.mjs [clip ...]
//   clips: main, consultorio, turnos, venta, auditoria (default: all)
// Requires: playwright (chromium installed) and ffmpeg-static (devDependencies).
//
// Flow per clip: log in once per demo role (not recorded), then open a fresh
// recorded context with the saved session, land on the clip's start screen and
// run its scripted interactions. The blank first frames are trimmed with ffmpeg.
//
// Color: Playwright's raw recording stores BT.601 YUV without color tags, while
// browsers decode untagged HD video as BT.709 (shifted, darker colors). The
// encode converts explicitly BT.601 -> RGB -> BT.709 and tags the output, so the
// video matches the real UI and the poster screenshots.
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";
import { chromium } from "playwright";

const BASE_URL = "https://vetnetmvp.vercel.app/";
const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/videos");
const WIDE = { width: 1440, height: 900 };
const TAB = { width: 1280, height: 800 };

/** Fake cursor: headless video does not paint the OS pointer. */
const CURSOR_SCRIPT = `
  window.addEventListener("DOMContentLoaded", () => {
    const c = document.createElement("div");
    c.id = "__demo-cursor";
    c.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2l16 10-7 1.5L9.5 21z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    Object.assign(c.style, { position: "fixed", left: "0", top: "0", zIndex: "2147483647", pointerEvents: "none", transform: "translate(-100px,-100px)", transition: "transform 16ms linear" });
    document.body.appendChild(c);
    window.addEventListener("mousemove", (e) => { c.style.transform = "translate(" + (e.clientX - 3) + "px," + (e.clientY - 2) + "px)"; }, true);
  });
`;

/** Current mouse position, so moves glide from where the cursor really is. */
const mouse = { x: 0, y: 0 };

async function glideTo(page, locator, { pause = 250 } = {}) {
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  if (!box) throw new Error("Element not visible for glide");
  const x = box.x + Math.min(box.width / 2, 60);
  const y = box.y + box.height / 2;
  const distance = Math.hypot(x - mouse.x, y - mouse.y);
  await page.mouse.move(x, y, { steps: Math.max(18, Math.round(distance / 18)) });
  mouse.x = x;
  mouse.y = y;
  await page.waitForTimeout(pause);
}

async function glideClick(page, locator, opts) {
  await glideTo(page, locator, opts);
  await page.mouse.down();
  await page.mouse.up();
}

async function typeInto(page, locator, text, { pause = 150, delay = 60 } = {}) {
  await glideClick(page, locator, { pause });
  await locator.pressSequentially(text, { delay });
}

/** Smooth wheel scroll in small steps (a single wheel jump looks abrupt on video). */
async function smoothScroll(page, deltaY, { steps = 24, stepDelay = 16 } = {}) {
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, deltaY / steps);
    await page.waitForTimeout(stepDelay);
  }
}

async function navTo(page, name) {
  await glideClick(page, page.getByRole("button", { name, exact: true }));
  await page.waitForLoadState("networkidle");
}

const CLIPS = {
  /** Main section video: dashboard -> turnos -> punto de venta. */
  main: {
    out: "vetnet-demo",
    role: "Administrador",
    viewport: WIDE,
    start: "Inicio Veterinaria",
    async run(page) {
      await page.waitForTimeout(1100);
      await navTo(page, "Turnos");
      await page.waitForTimeout(1700);
      await navTo(page, "Venta / Caja");
      await page.waitForTimeout(800);
      await addProducts(page, [
        { query: "Seresto", pick: "Collar antipulgas Seresto" },
        { query: "Shampoo", pick: "Shampoo hipoalergénico" },
        { query: "Royal", pick: "Alimento Royal Canin" },
      ]);
      await glideTo(page, page.getByRole("button", { name: "Confirmar venta" }), { pause: 700 });
    },
  },

  /** Tab 01: open Rocco's consultation and fill a few fields (never saved). */
  consultorio: {
    out: "tab-consultorio",
    role: "Veterinaria",
    viewport: TAB,
    start: "Pacientes",
    async run(page) {
      await page.waitForTimeout(500);
      const row = page.locator("tr", { hasText: "Rocco" }).first();
      await glideClick(page, row.getByRole("button", { name: "Consulta", exact: true }).first(), { pause: 300 });
      await page.waitForTimeout(900);
      await typeInto(page, page.getByPlaceholder("Motivo por el que se presenta el paciente"), "Control por otitis recurrente");
      await page.waitForTimeout(250);
      await typeInto(page, page.getByPlaceholder("38,5", { exact: true }), "38,9", { delay: 90 });
      await typeInto(page, page.getByPlaceholder("ppm", { exact: true }), "96", { delay: 90 });
      await page.waitForTimeout(250);
      await smoothScroll(page, 260);
      await typeInto(page, page.getByPlaceholder("Diagnóstico presuntivo o definitivo"), "Otitis externa leve, oído derecho");
      await page.waitForTimeout(900);
    },
  },

  /** Tab 02: filter turnos by state and draft a new turno (cancelled, nothing is created). */
  turnos: {
    out: "tab-turnos",
    role: "Administrador",
    viewport: TAB,
    start: "Turnos",
    async run(page) {
      await page.waitForTimeout(500);
      const states = page.locator("main select").nth(1);
      await glideTo(page, states, { pause: 300 });
      await states.selectOption({ label: "Pendiente" });
      await page.waitForTimeout(1100);
      await states.selectOption({ label: "Todos los estados" });
      await page.waitForTimeout(500);
      await glideClick(page, page.getByRole("button", { name: "+ Nuevo turno" }), { pause: 200 });
      await page.waitForTimeout(600);
      const patient = page.getByRole("combobox").filter({ hasText: "Luna · Ana Pereyra" });
      await glideTo(page, patient, { pause: 200 });
      await patient.selectOption({ label: "Luna · Ana Pereyra" });
      await page.waitForTimeout(300);
      await typeInto(page, page.getByPlaceholder("Vacunación anual, control post operatorio…"), "Refuerzo antirrábica");
      await glideTo(page, page.getByRole("button", { name: "Crear turno" }), { pause: 700 });
      await glideClick(page, page.getByRole("button", { name: "Cancelar", exact: true }), { pause: 200 });
      await page.waitForTimeout(700);
    },
  },

  /** Tab 03: add products by search and pick a payment method (sale is not confirmed). */
  venta: {
    out: "tab-venta",
    role: "Administrador",
    viewport: TAB,
    start: "Venta / Caja",
    async run(page) {
      await page.waitForTimeout(400);
      await addProducts(page, [
        { query: "Seresto", pick: "Collar antipulgas Seresto" },
        { query: "Royal", pick: "Alimento Royal Canin" },
      ]);
      await glideClick(page, page.getByRole("button", { name: "Débito", exact: true }), { pause: 250 });
      await page.waitForTimeout(500);
      await glideTo(page, page.getByRole("button", { name: "Confirmar venta" }), { pause: 900 });
    },
  },

  /** Tab 04: users & roles in Configuración, then the audit log filtered and scrolled. */
  auditoria: {
    out: "tab-auditoria",
    role: "Administrador",
    viewport: TAB,
    start: "Configuración",
    async run(page) {
      await page.waitForTimeout(400);
      for (const name of ["Dra. Paula Ríos", "Lucía Ferreyra", "Mariano Duarte"]) {
        await glideTo(page, page.locator("main").getByText(name, { exact: true }).first(), { pause: 350 });
      }
      await navTo(page, "Auditoría");
      await page.waitForTimeout(700);
      const users = page.locator("main select").first();
      await glideTo(page, users, { pause: 300 });
      await users.selectOption({ label: "Dra. Paula Ríos" });
      await page.waitForTimeout(1000);
      await users.selectOption({ index: 0 });
      await page.waitForTimeout(400);
      await page.mouse.move(760, 480, { steps: 20 });
      mouse.x = 760;
      mouse.y = 480;
      await smoothScroll(page, 600, { steps: 60, stepDelay: 20 });
      await page.waitForTimeout(700);
    },
  },
};

async function addProducts(page, products) {
  const search = page.getByPlaceholder("Nombre o código de barras");
  for (const { query, pick } of products) {
    await glideClick(page, search, { pause: 150 });
    await search.fill("");
    await search.pressSequentially(query, { delay: 75 });
    await page.waitForTimeout(350);
    await glideClick(page, page.getByText(pick).first(), { pause: 250 });
    await page.waitForTimeout(500);
  }
  await search.fill("");
}

async function login(browser, role, statePath) {
  const context = await browser.newContext({ viewport: WIDE, locale: "es-AR" });
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: role, exact: true }).click();
  await page.getByRole("button", { name: /iniciar sesión/i }).click();
  await page.getByRole("button", { name: /cerrar sesión/i }).waitFor({ timeout: 15000 });
  await context.storageState({ path: statePath });
  await context.close();
}

async function record(browser, clip, statePath, rawDir) {
  const context = await browser.newContext({
    viewport: clip.viewport,
    locale: "es-AR",
    storageState: statePath,
    recordVideo: { dir: rawDir, size: clip.viewport },
  });
  await context.addInitScript(CURSOR_SCRIPT);
  const startedAt = Date.now();
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: clip.start, exact: true }).click();
  await page.waitForLoadState("networkidle");
  mouse.x = clip.viewport.width / 2;
  mouse.y = clip.viewport.height / 2;
  await page.mouse.move(mouse.x, mouse.y);
  await page.waitForTimeout(600);
  // Everything before this point (blank page, initial load) gets trimmed.
  const trimStart = (Date.now() - startedAt) / 1000;

  await clip.run(page);

  const duration = (Date.now() - startedAt) / 1000 - trimStart;
  const video = page.video();
  await context.close();
  return { rawPath: await video.path(), trimStart, duration };
}

function ffmpeg(args) {
  execFileSync(ffmpegPath, ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });
}

/** BT.601 (raw) -> RGB -> BT.709 limited range, plus matching container/bitstream tags. */
const VIDEO_FILTER = [
  "scale=1280:-2:flags=lanczos:in_color_matrix=bt601:in_range=tv",
  "format=gbrp",
  "scale=out_color_matrix=bt709:out_range=tv",
  "format=yuv420p",
  "fps=30",
].join(",");
const COLOR_TAGS = ["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv"];

async function encode(rawPath, trimStart, duration, name) {
  const range = ["-ss", trimStart.toFixed(2), "-t", duration.toFixed(2), "-i", rawPath, "-an"];
  const filter = ["-vf", VIDEO_FILTER, ...COLOR_TAGS];
  const mp4 = path.join(OUT_DIR, `${name}.mp4`);
  const webm = path.join(OUT_DIR, `${name}.webm`);
  ffmpeg([...range, ...filter, "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-profile:v", "high", "-movflags", "+faststart", mp4]);
  ffmpeg([...range, ...filter, "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", webm]);
  for (const file of [mp4, webm]) {
    const { size } = await stat(file);
    console.log(`saved ${path.relative(process.cwd(), file)} (${(size / 1024).toFixed(0)} KB, ~${duration.toFixed(1)} s)`);
  }
}

async function main() {
  const requested = process.argv.slice(2);
  const names = requested.length ? requested : Object.keys(CLIPS);
  const unknown = names.filter((name) => !(name in CLIPS));
  if (unknown.length) throw new Error(`Unknown clip(s): ${unknown.join(", ")}`);

  await mkdir(OUT_DIR, { recursive: true });
  const tmp = await mkdtemp(path.join(os.tmpdir(), "vetnet-demo-"));
  const browser = await chromium.launch();
  const sessions = new Map();
  try {
    for (const name of names) {
      const clip = CLIPS[name];
      if (!sessions.has(clip.role)) {
        const statePath = path.join(tmp, `state-${clip.role}.json`);
        await login(browser, clip.role, statePath);
        sessions.set(clip.role, statePath);
      }
      const { rawPath, trimStart, duration } = await record(browser, clip, sessions.get(clip.role), tmp);
      await encode(rawPath, trimStart, duration, clip.out);
    }
  } finally {
    await browser.close();
    await rm(tmp, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error("Demo recording failed:", error);
  process.exit(1);
});
