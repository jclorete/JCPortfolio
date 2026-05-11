import { removeBackground } from "@imgly/background-removal-node";
import sharp from "sharp";
import fs from "fs";

const INPUT  = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/logo.jpg";
const OUTPUT = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/logo-icon.png";

console.log("Removing background...");
const blob   = await removeBackground(INPUT);
const buffer = Buffer.from(await blob.arrayBuffer());

// Get dimensions so we can crop the text off the bottom
const meta = await sharp(buffer).metadata();
const { width, height } = meta;

// The icon mark occupies roughly the top 68% — crop the "JAYCIE DESIGN" text away
const cropHeight = Math.round(height * 0.68);

await sharp(buffer)
  .extract({ left: 0, top: 0, width, height: cropHeight })
  .png()
  .toFile(OUTPUT);

console.log(`Done → ${OUTPUT}  (${width}×${cropHeight})`);
