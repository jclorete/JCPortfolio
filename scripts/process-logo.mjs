import sharp from "sharp";

const INPUT  = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/Untitled-3.png";
const OUTPUT = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/Untitled-3.png";

const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  // Fully transparent: pure white / near-white
  if (r > 230 && g > 230 && b > 230) {
    data[i + 3] = 0;
  }
  // Semi-transparent: soft anti-alias fringe (light but not pure white)
  else if (r > 190 && g > 190 && b > 190 && r > b + 10 && r > g - 20) {
    // reduce opacity proportionally so edges fade rather than hard-cut
    const whiteness = Math.min(r, g, b);
    data[i + 3] = Math.round(((255 - whiteness) / 65) * 255);
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(OUTPUT);

console.log("Done — background removed with edge feathering");
