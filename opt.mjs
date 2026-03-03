import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');

async function optimizeFolder(dir) {
    const files = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            await optimizeFolder(fullPath);
        } else if (file.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(file.name)) {
            console.log(`Optimizing ${file.name}`);
            const tmpPath = `${fullPath}.tmp`;
            try {
                const image = sharp(fullPath);
                const metadata = await image.metadata();

                if (metadata.width > 1920) {
                    image.resize(1920, null, { withoutEnlargement: true });
                }

                if (/\.webp$/i.test(file.name)) {
                    await image.webp({ quality: 80, effort: 6 }).toFile(tmpPath);
                } else if (/\.(jpg|jpeg)$/i.test(file.name)) {
                    // Note: if user wants WebP format explicitly but keeping path, we can output WebP.
                    // Let's stick to true mime type to avoid server mis-handling.
                    await image.jpeg({ quality: 80, mozjpeg: true }).toFile(tmpPath);
                } else if (/\.png$/i.test(file.name)) {
                    await image.png({ quality: 80, compressionLevel: 9, palette: true }).toFile(tmpPath);
                }

                const origStats = await fs.promises.stat(fullPath);
                const tmpStats = await fs.promises.stat(tmpPath);

                // Only keep if smaller
                if (tmpStats.size < origStats.size) {
                    await fs.promises.unlink(fullPath);
                    await fs.promises.rename(tmpPath, fullPath);
                    console.log(`✅ Saved ${origStats.size - tmpStats.size} bytes on ${file.name}`);
                } else {
                    await fs.promises.unlink(tmpPath);
                    console.log(`➖ Kept original (optimization yielded larger file) ${file.name}`);
                }

            } catch (err) {
                console.error(`❌ Error optimizing ${file.name}: ${err.message}`);
                if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
            }
        }
    }
}

optimizeFolder(publicDir).then(() => console.log('Done optimizing public folder.'));
