import sharp from "sharp";

const PATH = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/Untitled-3.png";

const { data, info } = await sharp(PATH)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

const idx = (x, y) => (y * width + x) * channels;

// ── Pass 1: remove any remaining light background pixels globally ──────────
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = idx(x, y);
    if (data[i + 3] === 0) continue; // already transparent
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Expand white removal threshold
    if (r > 210 && g > 210 && b > 210) {
      data[i + 3] = 0;
    } else if (r > 175 && g > 175 && b > 175) {
      const brightness = Math.min(r, g, b);
      data[i + 3] = Math.round(((255 - brightness) / 80) * 255);
    }
  }
}

// ── Pass 2: edge-ring cleanup — find opaque pixels adjacent to transparent ──
// Mark the edge ring
const isEdge = new Uint8Array(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = idx(x, y);
    if (data[i + 3] === 0) continue;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height || data[idx(nx, ny) + 3] < 128) {
          isEdge[y * width + x] = 1;
          break;
        }
      }
      if (isEdge[y * width + x]) break;
    }
  }
}

// Soften the edge ring: bright = remove, mid = fade, dark = slight fade
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (!isEdge[y * width + x]) continue;
    const i = idx(x, y);
    if (data[i + 3] === 0) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
    if (brightness > 180) {
      // Very bright edge pixel = leftover background
      data[i + 3] = 0;
    } else if (brightness > 130) {
      // Mid-bright = fringe — reduce opacity
      data[i + 3] = Math.round(data[i + 3] * ((brightness - 130) < 25 ? 0.3 : 0.55));
    } else {
      // Dark edge = actual subject edge — soften slightly for smooth antialiasing
      data[i + 3] = Math.round(data[i + 3] * 0.85);
    }
  }
}

// ── Pass 3: second erosion pass on neighbors of edge ring ───────────────────
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (isEdge[y * width + x]) continue;
    const i = idx(x, y);
    if (data[i + 3] === 0) continue;
    let nearEdge = false;
    for (let dy = -1; dy <= 1 && !nearEdge; dy++) {
      for (let dx = -1; dx <= 1 && !nearEdge; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        if (data[idx(nx, ny) + 3] < 200) nearEdge = true;
      }
    }
    if (!nearEdge) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
    if (brightness > 200) {
      data[i + 3] = Math.round(data[i + 3] * 0.2);
    } else if (brightness > 160) {
      data[i + 3] = Math.round(data[i + 3] * 0.65);
    }
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(PATH);

console.log("Done — artifact edges cleaned");
