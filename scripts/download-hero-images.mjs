#!/usr/bin/env node
/**
 * Hero Image Downloader — syncs from Vercel Blob to public/images/heroes/
 *
 * After Kie.ai callbacks have fired, images are stored in Vercel Blob
 * under the heroes/ prefix. This script lists them and downloads each
 * to public/images/heroes/{slug}.jpg.
 *
 * Usage: node scripts/download-hero-images.mjs
 * Requires: BLOB_READ_WRITE_TOKEN in .env.local
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Load BLOB_READ_WRITE_TOKEN ──────────────────────────────────────────────
function loadBlobToken() {
  const envPath = join(ROOT, ".env.local");
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, "utf-8");
    const match = content.match(/BLOB_READ_WRITE_TOKEN="?([^"\n]+)"?/);
    if (match) return match[1].trim();
  }
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  throw new Error(
    "BLOB_READ_WRITE_TOKEN not found in .env.local or environment.\n" +
    "Run: vercel env pull .env.local --yes"
  );
}

const EXPECTED_SLUGS = [
  "about", "services", "blog", "contact", "portfolio",
  "website-design", "voice-ai", "ai-automation", "ai-training",
  "ecommerce-consulting", "brand-strategy", "digital-products",
  "custom-apps", "business-tools",
];

async function listBlobFiles(token) {
  const res = await fetch("https://blob.vercel-storage.com?prefix=heroes/&limit=100", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Blob list failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.blobs ?? [];
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const token = loadBlobToken();
  const outDir = join(ROOT, "public", "images", "heroes");
  mkdirSync(outDir, { recursive: true });

  console.log("\nHero Image Downloader");
  console.log(`Output: ${outDir}\n`);

  const blobs = await listBlobFiles(token);
  console.log(`Found ${blobs.length} blob(s) in heroes/ prefix:\n`);

  if (blobs.length === 0) {
    console.log("No images yet. Wait for Kie.ai callbacks to fire, then run this script again.");
    console.log("\nExpected slugs:");
    EXPECTED_SLUGS.forEach((s) => console.log(`  - ${s}`));
    return;
  }

  const downloaded = [];
  const failed = [];

  for (const blob of blobs) {
    // blob.pathname = "heroes/about.jpg"
    const filename = blob.pathname.replace("heroes/", "");
    const slug = filename.replace(".jpg", "");
    const dest = join(outDir, filename);

    try {
      const res = await fetch(blob.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      writeFileSync(dest, buffer);
      downloaded.push(slug);
      console.log(`  ✓ ${slug.padEnd(28)} → ${filename}`);
    } catch (err) {
      failed.push(slug);
      console.error(`  ✗ ${slug}: ${err.message}`);
    }
    await sleep(100);
  }

  console.log(`\n${downloaded.length}/${blobs.length} downloaded to public/images/heroes/`);

  const missing = EXPECTED_SLUGS.filter((s) => !downloaded.includes(s));
  if (missing.length > 0) {
    console.log(`\nStill missing (${missing.length}):`);
    missing.forEach((s) => console.log(`  - ${s}`));
    console.log("\nEither the callback hasn't fired yet or generation failed.");
    console.log("Re-run scripts/generate-hero-images.mjs to retry missing slugs.");
  } else {
    console.log("\nAll 14 images downloaded! Run `npm run build` to verify.");
  }
}

main().catch((err) => {
  console.error("\nFatal:", err.message);
  process.exit(1);
});
