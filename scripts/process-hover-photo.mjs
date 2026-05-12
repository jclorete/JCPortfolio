import sharp from "sharp";

const INPUT  = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/485765535_3919883158326975_6551452049815364855_n.jpg";
const OUTPUT = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/hero-hover.png";

const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const idx = (x, y) => (y * width + x) * channels;

// Pass 1: remove white/near-white pixels globally
for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  if (r > 210 && g > 210 && b > 210) {
    data[i + 3] = 0;
  } else if (r > 175 && g > 175 && b > 175) {
    const brightness = Math.min(r, g, b);
    data[i + 3] = Math.round(((255 - brightness) / 80) * 255);
  }
}

// Pass 2: mark edge ring (opaque pixels adjacent to transparent)
const isEdge = new Uint8Array(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = idx(x, y);
    if (data[i + 3] === 0) continue;
    outer: for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height || data[idx(nx, ny) + 3] < 128) {
          isEdge[y * width + x] = 1;
          break outer;
        }
      }
    }
  }
}

// Soften edge ring
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (!isEdge[y * width + x]) continue;
    const i = idx(x, y);
    if (data[i + 3] === 0) continue;
    const brightness = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    if (brightness > 180) {
      data[i + 3] = 0;
    } else if (brightness > 130) {
      data[i + 3] = Math.round(data[i + 3] * 0.45);
    } else {
      data[i + 3] = Math.round(data[i + 3] * 0.85);
    }
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(OUTPUT);

console.log("Done → hero-hover.png");
