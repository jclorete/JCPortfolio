import sharp from "sharp";

const INPUT  = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/logo.png";
const OUTPUT = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/logo-icon.png";

const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

// Replace near-white pixels with transparent
for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  if (r > 230 && g > 230 && b > 230) {
    data[i + 3] = 0; // transparent
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(OUTPUT);

console.log(`Done → ${OUTPUT}`);
