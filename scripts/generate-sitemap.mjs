import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { villes } from "../src/data/villes.js";
import { departements } from "../src/data/departements.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const baseUrl = "https://www.laveoo.com";

const staticPages = [
    { path: "/", priority: "1.0" },
    { path: "/tarifs", priority: "0.9" },
    { path: "/resultats", priority: "0.8" },
    { path: "/nos-methodes-de-nettoyage", priority: "0.9" },
    { path: "/faq", priority: "0.8" },
    { path: "/contact", priority: "0.9" },
    { path: "/reservation", priority: "0.9" },
    { path: "/nettoyage-auto-domicile", priority: "0.9" },
    { path: "/nettoyage-sieges-voiture", priority: "0.8" },
    { path: "/nos-zones-d-intervention", priority: "0.7" },
    { path: "/mentions-legales", priority: "0.3" },
    { path: "/politique-de-confidentialite", priority: "0.3" },
];

const departementPages = departements.map((d) => ({
    path: `/nettoyage-auto-${d.slug}`,
    priority: "0.7",
}));

const villePages = villes.map((v) => ({
    path: `/nettoyage-auto/${v.slug}`,
    priority: "0.7",
}));

const allPages = [...staticPages, ...departementPages, ...villePages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((p) => `  <url><loc>${baseUrl}${p.path}</loc><priority>${p.priority}</priority></url>`).join("\n")}
</urlset>
`;

await writeFile(path.join(root, "public", "sitemap.xml"), xml, "utf-8");
console.log(`sitemap.xml généré avec ${allPages.length} pages`);
