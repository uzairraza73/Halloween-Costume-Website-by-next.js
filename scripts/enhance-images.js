const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'project pic');
const outDir = path.join(__dirname, '..', 'public', 'images', 'decor-enhanced');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function enhanceImages() {
  const files = fs.readdirSync(srcDir);
  console.log(`Found ${files.length} images to enhance...`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const inputPath = path.join(srcDir, file);
    // output as clean webp with same base name
    const baseName = path.basename(file, ext);
    const outputPath = path.join(outDir, `${baseName}.webp`);

    try {
      // Enhance image:
      // 1. subtle contrast boost via linear/gamma
      // 2. enhance saturation slightly for spooky richness (vibrant orange/red/blood/eerie glow)
      // 3. sharpen to bring out rich fabric textures, stitches, lights and gory details
      // 4. export high-quality webp
      await sharp(inputPath)
        .modulate({
          brightness: 1.03, // bright and clear
          saturation: 1.15, // richer colors
        })
        .sharpen({
          sigma: 1.0,
          m1: 0.5,
          m2: 2.0,
        })
        .webp({ quality: 92, effort: 4 })
        .toFile(outputPath);

      console.log(`Enhanced: ${file} -> ${baseName}.webp`);
    } catch (err) {
      console.error(`Error enhancing ${file}:`, err);
    }
  }
  console.log('All images enhanced successfully!');
}

enhanceImages();
