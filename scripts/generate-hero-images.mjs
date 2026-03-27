#!/usr/bin/env node
/**
 * Hero Image Generator — Kie.ai nano-banana-2
 *
 * Submits image generation tasks to Kie.ai using the production Vercel
 * callback endpoint. After submitting, use check-hero-images.mjs to
 * monitor Vercel logs and download the completed images.
 *
 * Usage: node scripts/generate-hero-images.mjs
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── API key ────────────────────────────────────────────────────────────────
function loadApiKey() {
  const skillEnvPath = join(homedir(), ".claude", "skills", "image-generation", ".env");
  if (existsSync(skillEnvPath)) {
    const content = readFileSync(skillEnvPath, "utf-8");
    const match = content.match(/KI_EAI_API_KEY=(.+)/);
    if (match) return match[1].trim();
  }
  if (process.env.KI_EAI_API_KEY) return process.env.KI_EAI_API_KEY;
  if (process.env.KIE_AI_API_KEY) return process.env.KIE_AI_API_KEY;
  throw new Error("KI_EAI_API_KEY not found");
}

// ── Prompts ────────────────────────────────────────────────────────────────
const HERO_PROMPTS = {
  about:
    "Professional business meeting in a modern Central Florida office, warm purple ambient lighting, collaborative team atmosphere, photorealistic, cinematic lighting",
  services:
    "Futuristic AI service hub with glowing purple holographic interfaces and neural network visualizations, tech-forward atmosphere, photorealistic, cinematic",
  blog:
    "Cozy modern workspace with coffee and laptop showing digital content, soft purple accent lighting, content creation theme, photorealistic",
  contact:
    "Friendly business consultation with handshake in a warm modern office, purple tech accents, approachable professional atmosphere, photorealistic",
  portfolio:
    "Impressive digital portfolio gallery with glowing project displays on sleek screens, purple ambient exhibition lighting, photorealistic, cinematic",
  "website-design":
    "Creative web design studio with large curved monitors showing colorful UI mockups, purple accent lighting, modern workspace, photorealistic",
  "voice-ai":
    "Futuristic voice AI visualization with glowing sound waves and audio frequency patterns in purple and blue, digital assistant hologram, photorealistic",
  "ai-automation":
    "Automated workflow visualization with robotic arms and glowing data streams in purple, factory-meets-tech atmosphere, photorealistic, cinematic",
  "ai-training":
    "Modern workshop classroom with professionals learning AI on laptops, educator presenting holographic AI diagrams, purple tech environment, photorealistic",
  "ecommerce-consulting":
    "Sleek e-commerce dashboard with product displays and shopping analytics on large screens, purple tech accents, professional retail tech, photorealistic",
  "brand-strategy":
    "Creative branding studio with logo mockups, color palettes pinned to boards, typography samples, purple ambient workspace, photorealistic",
  "digital-products":
    "Digital product creation workspace with ebooks and lead magnet mockups on screens, purple creative studio lighting, photorealistic",
  "custom-apps":
    "Software development workspace with multiple monitors showing app code and UI wireframes, purple tech lighting, focused developer environment, photorealistic",
  "business-tools":
    "Modern CRM dashboard on a large monitor with customer data visualizations and reputation metrics, purple business tech atmosphere, photorealistic",
};

const KIE_API = "https://api.kie.ai/api/v1";
// Production callback URL — slug passed as query param so the endpoint
// knows which page each task belongs to
const CALLBACK_BASE = "https://josa-ai-rebrand.vercel.app/api/kie-callback";

async function createTask(apiKey, slug, prompt) {
  const callbackUrl = `${CALLBACK_BASE}?slug=${slug}`;
  const res = await fetch(`${KIE_API}/jobs/createTask`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "nano-banana-2",
      callBackUrl: callbackUrl,
      input: {
        prompt,
        image_input: [],
        aspect_ratio: "16:9",
        resolution: "1K",
        output_format: "jpg",
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (!json.data?.taskId) throw new Error(`No taskId: ${JSON.stringify(json)}`);
  return json.data.taskId;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const apiKey = loadApiKey();
  console.log(`\nKie.ai Hero Image Generator`);
  console.log(`API key: ${apiKey.slice(0, 8)}…`);
  console.log(`Callback: ${CALLBACK_BASE}?slug=<slug>\n`);

  const slugs = Object.keys(HERO_PROMPTS);
  console.log(`Submitting ${slugs.length} tasks…\n`);

  const results = [];
  for (const slug of slugs) {
    try {
      const taskId = await createTask(apiKey, slug, HERO_PROMPTS[slug]);
      results.push({ slug, taskId });
      console.log(`  ✓ ${slug.padEnd(24)} taskId: ${taskId}`);
      await sleep(500);
    } catch (err) {
      console.error(`  ✗ ${slug}: ${err.message}`);
    }
  }

  console.log(`\n${results.length}/${slugs.length} tasks submitted.`);
  console.log(`\nKie.ai will POST to:\n  ${CALLBACK_BASE}?slug=<slug>\n`);
  console.log(
    `Images typically complete in 1–10 minutes. After waiting, run:\n  node scripts/download-hero-images.mjs\nto fetch completed images from Vercel logs.`
  );

  // Save task IDs for reference
  const taskMap = Object.fromEntries(results.map(({ slug, taskId }) => [slug, taskId]));
  console.log("\nTask IDs:");
  console.log(JSON.stringify(taskMap, null, 2));
}

main().catch((err) => {
  console.error("\nFatal:", err.message);
  process.exit(1);
});
