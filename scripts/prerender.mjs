import { preview } from "vite";
import puppeteer from "puppeteer";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { villes } from "../src/data/villes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const dirArgIndex = process.argv.indexOf("--dir");
const outDir = dirArgIndex !== -1 ? process.argv[dirArgIndex + 1] : "dist";
const distDir = path.resolve(root, outDir);

const staticRoutes = [
    "/tarifs",
    "/resultats",
    "/nos-methodes-de-nettoyage",
    "/faq",
    "/contact",
    "/reservation",
    "/mentions-legales",
    "/politique-de-confidentialite",
    "/nos-zones-d-intervention",
    "/nettoyage-auto-essonne",
    "/nettoyage-auto-val-de-marne",
    "/nettoyage-auto-seine-et-marne",
    "/nettoyage-auto-domicile",
    "/nettoyage-sieges-voiture",
];

const villeRoutes = villes.map((v) => `/nettoyage-auto/${v.slug}`);

// "/" is prerendered last so it becomes the final index.html, which vite
// preview also uses as the SPA fallback shell for every other route
// while this script runs.
const routes = [...staticRoutes, ...villeRoutes, "/"];

async function main() {
    const server = await preview({
        root,
        build: { outDir },
        preview: { port: 4173, strictPort: false },
    });
    const address = server.resolvedUrls.local[0];

    const browser = await puppeteer.launch({ headless: true });

    try {
        for (const route of routes) {
            const page = await browser.newPage();
            const url = new URL(route === "/" ? "/" : route, address).toString();
            await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
            await page.waitForFunction(
                () => document.querySelector("#main-content")?.childElementCount > 0,
                { timeout: 10000 }
            );

            const html = await page.content();

            const outPath =
                route === "/"
                    ? path.join(distDir, "index.html")
                    : path.join(distDir, route.replace(/^\//, ""), "index.html");

            await mkdir(path.dirname(outPath), { recursive: true });
            await writeFile(outPath, html, "utf-8");
            await page.close();

            console.log(`Prerendu : ${route}`);
        }
    } finally {
        await browser.close();
        await server.close();
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
