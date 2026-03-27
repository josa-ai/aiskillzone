/**
 * Generates 54 photos (9 services × 6 cards) using Kie.ai Seedream 5 Lite.
 * Run: node scripts/generate-include-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public", "images", "services", "includes");
const API_KEY = "47bb1da66bb6d583b0eb576738f92565";
const BASE = "https://api.kie.ai/api/v1";

// ── Prompts for every service × include ──────────────────────────────────────

const SERVICES = {
  "website-design": [
    "Professional web designer building a custom website on dual monitors in a bright modern studio, clean desk, natural light, photography",
    "SEO analytics dashboard on a laptop showing search rankings and organic traffic growth charts, modern office, professional photography",
    "Person using a laptop with an accessibility-friendly website interface, clean and inclusive design on screen, warm office lighting, photography",
    "Smartphone and tablet displaying a responsive website side by side on a clean white desk, modern flat-lay photography",
    "Business professional reviewing a CRM lead capture form on a laptop, customer pipeline dashboard on screen, bright modern office",
    "Google Analytics style performance dashboard with traffic and conversion charts on a monitor, professional business photography",
  ],
  "voice-ai": [
    "Modern smartphone with glowing AI voice assistant interface on screen, dark tech background, professional product photography",
    "Sound waveform visualization on a computer screen with brand identity materials on a creative desk, studio lighting photography",
    "Chat and FAQ interface on a tablet showing automated AI responses, clean modern office setting, professional photography",
    "Sales lead scoring dashboard on a laptop screen with funnel metrics and qualification charts, business analytics photography",
    "Digital calendar app showing booked appointments on a laptop screen, organized planning, bright professional office photography",
    "Business team member at a desk taking a customer call handoff, professional customer service office setting, photography",
  ],
  "ai-automation": [
    "Visual workflow diagram on a whiteboard with a business professional presenting, modern conference room, professional photography",
    "Email automation campaign dashboard showing message sequences and analytics on a computer screen, marketing office photography",
    "Marketing automation platform flowchart on a monitor with campaign stages, digital marketing workspace, professional photography",
    "E-commerce order management dashboard showing fulfillment status and tracking on screen, modern warehouse office photography",
    "CRM software on dual monitors showing automated data sync and database records, professional office photography",
    "Clean industrial robot arm performing automated tasks in a modern bright facility, process automation photography",
  ],
  "ai-training": [
    "Small business team in a workshop around a conference table with laptops open, engaged collaborative learning, modern office photography",
    "Person typing a prompt into an AI chat interface on a laptop, focused learning, clean modern workspace photography",
    "Business professional reviewing AI workflow diagram on a tablet, charts and use cases, bright professional office photography",
    "Team members collaborating on business exercises with laptops and sticky notes on a whiteboard, active workshop photography",
    "Organized digital document library and prompt templates on a laptop screen, clean minimal workspace photography",
    "Video call on a laptop with multiple participants in a Q&A session, virtual meeting interface, home office photography",
  ],
  "ecommerce-consulting": [
    "E-commerce platform comparison on a laptop with strategy notes beside it, business consulting session, bright office photography",
    "Online marketplace product listings on multiple screens with a Shopify-style dashboard, modern e-commerce retail photography",
    "Product photography setup with a professional camera and clean product on table, e-commerce studio photography",
    "Competitive pricing analysis spreadsheet and bar charts on a laptop screen, market research professional photography",
    "Digital advertising ROI dashboard with campaign metrics on a laptop, marketing professional at desk photography",
    "E-commerce analytics dashboard showing sales performance and conversion graphs, professional business photography",
  ],
  "brand-strategy": [
    "Brand strategy mood board with color swatches, logo sketches and typography samples on a creative desk, studio photography",
    "Marketing professional writing brand messaging on a whiteboard, creative agency brainstorm session photography",
    "Customer persona cards and audience research charts spread on a conference table, strategy meeting photography",
    "Marketing campaign planning board with post-it notes and a content calendar on a wall, creative agency office photography",
    "Competitive positioning matrix and brand analysis on a laptop screen, business strategy meeting photography",
    "Open professional brand guidelines booklet showing logo and color palette on a clean minimal desk, photography",
  ],
  "digital-products": [
    "Content strategist reviewing topic research data and trend charts on a laptop, bright creative workspace photography",
    "Writer typing on a laptop with content outline notes beside it, warm coffee shop setting, professional photography",
    "Graphic designer working on document layout in design software on dual monitors, creative studio photography",
    "Clean modern landing page design on a laptop with lead capture form visible, marketing conversion photography",
    "Email automation sequence visualization on a screen showing delivery flow and follow-up steps, digital marketing photography",
    "Conversion funnel analytics dashboard on a monitor with goal tracking metrics, professional business photography",
  ],
  "custom-apps": [
    "Business analyst and developer reviewing requirements on a whiteboard together, collaborative meeting room photography",
    "UX designer sketching wireframes on a tablet with UI mockups on a screen behind, design studio photography",
    "Software developer writing clean code on a laptop in a modern bright office, professional programming photography",
    "Secure login interface on a laptop screen with user access control dashboard, cybersecurity concept photography",
    "API integration diagram showing multiple connected software tools on a developer screen, tech workspace photography",
    "QA testing session on multiple devices with checklist and test results on screen, modern tech office photography",
  ],
  "business-tools": [
    "CRM software dashboard with contact management pipeline visible on a monitor, professional business office photography",
    "Online learning platform on a laptop showing course modules and community forum interface, e-learning photography",
    "Five-star customer review analytics dashboard on a tablet, reputation management metrics, professional photography",
    "Email and SMS marketing campaign dashboard on a laptop screen, multi-channel analytics, professional photography",
    "Sales pipeline Kanban board on a screen with automated workflow stages, business CRM dashboard photography",
    "Data migration progress visualization on a computer screen, database transfer interface, IT professional photography",
  ],
};

// ── API helpers ───────────────────────────────────────────────────────────────

async function createTask(prompt) {
  const res = await fetch(`${BASE}/jobs/createTask`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "seedream/5-lite-text-to-image",
      input: {
        prompt,
        aspect_ratio: "4:3",
        quality: "basic",
      },
    }),
  });
  const json = await res.json();
  if (json.code !== 200) throw new Error(`Create failed: ${JSON.stringify(json)}`);
  return json.data.taskId;
}

async function pollTask(taskId) {
  const INTERVAL = 4000;
  const MAX_ATTEMPTS = 60; // 4 minutes max
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    await new Promise((r) => setTimeout(r, INTERVAL));
    const res = await fetch(`${BASE}/jobs/recordInfo?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const json = await res.json();
    const { state, resultJson, failMsg } = json.data;
    if (state === "success") {
      const result = JSON.parse(resultJson);
      return result.resultUrls[0];
    }
    if (state === "fail") throw new Error(`Task failed: ${failMsg}`);
    process.stdout.write(`\r  [${taskId}] ${state}... (${(i + 1) * 4}s)`);
  }
  throw new Error("Timed out waiting for task");
}

async function downloadImage(url, filepath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, buffer);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const slugs = Object.keys(SERVICES);
  let total = 0;
  let skipped = 0;

  for (const slug of slugs) {
    const prompts = SERVICES[slug];
    console.log(`\n── ${slug} (${prompts.length} images) ──`);

    for (let i = 0; i < prompts.length; i++) {
      const filepath = path.join(PUBLIC_DIR, slug, `${i}.jpg`);

      if (fs.existsSync(filepath)) {
        console.log(`  [${i}] Already exists, skipping.`);
        skipped++;
        continue;
      }

      console.log(`  [${i}] Generating: "${prompts[i].slice(0, 60)}..."`);
      try {
        const taskId = await createTask(prompts[i]);
        const imageUrl = await pollTask(taskId);
        process.stdout.write("\n");
        await downloadImage(imageUrl, filepath);
        console.log(`  [${i}] ✓ Saved to ${path.relative(process.cwd(), filepath)}`);
        total++;
        // Small pause between requests to be kind to the API
        await new Promise((r) => setTimeout(r, 1000));
      } catch (err) {
        process.stdout.write("\n");
        console.error(`  [${i}] ✗ Error: ${err.message}`);
      }
    }
  }

  console.log(`\n✓ Done. Generated ${total} images, skipped ${skipped}.`);
}

main().catch(console.error);
