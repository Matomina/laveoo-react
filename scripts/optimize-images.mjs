import sharp from "sharp";
import { readdir, unlink, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

async function toWebp(inputPath, outputPath, maxWidth, quality = 78) {
    await sharp(inputPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality })
        .toFile(outputPath);
}

async function main() {
    // Photos "avant/après" (résultats)
    const resultsDir = path.join(publicDir, "results");
    const resultFiles = (await readdir(resultsDir)).filter((f) => /\.jpe?g$/i.test(f));
    for (const file of resultFiles) {
        const input = path.join(resultsDir, file);
        const output = path.join(resultsDir, file.replace(/\.jpe?g$/i, ".webp"));
        await toWebp(input, output, 1000);
        await unlink(input);
        console.log(`results/${file} -> results/${path.basename(output)}`);
    }

    // Photos des formules de prix
    const pricingImages = [
        { file: "nettoyage-citadine-domicile-yerres.jpeg", width: 900 },
        { file: "nettoyage-suv-domicile-yerres.jpeg", width: 900 },
    ];
    for (const { file, width } of pricingImages) {
        const input = path.join(publicDir, file);
        const output = path.join(publicDir, file.replace(/\.jpe?g$/i, ".webp"));
        await toWebp(input, output, width);
        await unlink(input);
        console.log(`${file} -> ${path.basename(output)}`);
    }

    const monospaceInput = path.join(publicDir, "nettoyage-monospace-domicile-laveoo.png");
    const monospaceOutput = path.join(publicDir, "nettoyage-monospace-domicile-laveoo.webp");
    await toWebp(monospaceInput, monospaceOutput, 900);
    await unlink(monospaceInput);
    console.log("nettoyage-monospace-domicile-laveoo.png -> nettoyage-monospace-domicile-laveoo.webp");

    // Logo : reste en PNG (utilisé aussi dans la génération des factures PDF),
    // juste redimensionné et recompressé.
    const logoPath = path.join(publicDir, "logo-laveoo.png");
    const logoTmp = path.join(publicDir, "logo-laveoo.tmp.png");
    await sharp(logoPath)
        .resize({ width: 600, withoutEnlargement: true })
        .png({ compressionLevel: 9, quality: 90 })
        .toFile(logoTmp);
    await unlink(logoPath);
    await rename(logoTmp, logoPath);
    console.log("logo-laveoo.png redimensionné et recompressé");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
