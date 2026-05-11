import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";

const inputPath = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/486359374_3924058317909459_2937421913585608866_n.jpg";
const outputPath = "/Users/jaycie/Desktop/FOR PORTFOLIO/JC PORTFOLIO/public/assets/jaycie.png";

console.log("Removing background (this may take a minute)...");
const blob = await removeBackground(inputPath);
const buffer = Buffer.from(await blob.arrayBuffer());
fs.writeFileSync(outputPath, buffer);
console.log("Done! Saved to", outputPath);
