import { preview } from "vite";
import puppeteer from "puppeteer";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { villes } from "../src/data/villes.js";
import { guidesTaches } from "../src/data/guidesTaches.js";

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
    "/comment-nettoyer",
];

const villeRoutes = villes.map((v) => `/nettoyage-auto/${v.slug}`);
const guideRoutes = guidesTaches.map((g) => `/comment-nettoyer/${g.slug}`);

// "/" is prerendered last so it becomes the final index.html, which vite
// preview also uses as the SPA fallback shell for every other route
// while this script runs.
const routes = [...staticRoutes, ...villeRoutes, ...guideRoutes, "/"];

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
            // useRevealOnScroll ajoute data-revealed/--reveal-delay directement
            // en DOM (hors React) une fois les cartes visibles à l'écran. Si le
            // HTML statique capture cet état, le tout premier rendu React côté
            // client (avant que cet effet n'ait tourné) ne correspond plus à ce
            // HTML : ça déclenche une erreur d'hydratation sur quasiment chaque
            // section. On désactive donc cet effet pendant le pré-rendu, pour
            // que la page capturée corresponde exactement au premier rendu React.
            await page.evaluateOnNewDocument(() => {
                window.__PRERENDER__ = true;
            });
            const url = new URL(route === "/" ? "/" : route, address).toString();
            await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
            await page.waitForFunction(
                () => document.querySelector("#main-content")?.childElementCount > 0,
                { timeout: 10000 }
            );

            // page.content() sérialise aussi les <link modulepreload> que Vite
            // insère dynamiquement au runtime avec une URL absolue basée sur
            // l'origine courante (ici le serveur de preview local). Sans ce
            // nettoyage, la page en production tente de charger ses chunks JS
            // depuis localhost:4173, ce qui casse le lazy-loading des routes.
            const html = (await page.content()).split(address.replace(/\/$/, "")).join("");

            const outPath =
                route === "/"
                    ? path.join(distDir, "index.html")
                    : path.join(distDir, route.replace(/^\//, ""), "index.html");

            await mkdir(path.dirname(outPath), { recursive: true });
            await writeFile(outPath, html, "utf-8");
            await page.close();

            console.log(`Prerendu : ${route}`);
        }

        // Page 404 réelle : Vercel la sert automatiquement avec un vrai
        // statut HTTP 404 pour toute URL qui ne correspond à aucun fichier
        // statique, au lieu de renvoyer la coquille SPA avec un statut 200
        // (ce qu'on appelle un "soft 404", pénalisé par Google).
        const notFoundPage = await browser.newPage();
        await notFoundPage.evaluateOnNewDocument(() => {
            window.__PRERENDER__ = true;
        });
        await notFoundPage.goto(new URL("/page-inexistante-pour-404", address).toString(), {
            waitUntil: "networkidle0",
            timeout: 30000,
        });
        await notFoundPage.waitForFunction(
            () => document.querySelector("#main-content")?.childElementCount > 0,
            { timeout: 10000 }
        );
        const notFoundHtml = (await notFoundPage.content()).split(address.replace(/\/$/, "")).join("");
        await writeFile(path.join(distDir, "404.html"), notFoundHtml, "utf-8");
        await notFoundPage.close();
        console.log("Prerendu : 404.html");
    } finally {
        await browser.close();
        await server.close();
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
