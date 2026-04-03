import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const API_KEY = process.env.KI_EAI_API_KEY;
const BASE = 'https://api.kie.ai';

const allPrompts = {
  'services/website-design': 'Sleek modern minimalist dashboard design with vibrant blue accents displayed on a large curved monitor, clean workspace with soft volumetric lighting, futuristic web design studio, photorealistic, 8k quality',
  'services/voice-ai': 'Futuristic AI voice assistant visualization with glowing blue sound waves emanating from a sleek microphone, holographic waveform patterns in blue and cyan, dark tech environment, photorealistic, cinematic lighting',
  'services/ai-automation': 'Advanced robotic automation workflow visualization with glowing blue data streams connecting mechanical gears and digital interfaces, futuristic factory-meets-tech atmosphere, photorealistic, 8k',
  'services/ai-training': 'Modern high-tech workshop classroom with professionals collaborating around holographic AI diagrams and neural network visualizations, blue ambient lighting, photorealistic, cinematic',
  'services/ecommerce-consulting': 'Futuristic e-commerce command center with multiple floating holographic screens showing product analytics, shopping data flows in blue and orange, dark premium environment, photorealistic',
  'services/brand-strategy': 'Creative brand strategy war room with holographic brand identity elements floating in space, color palettes and typography specimens in blue light, minimalist premium environment, photorealistic',
  'services/digital-products': 'Elegant floating digital products - PDF guides, course interfaces, and email templates displayed as holographic cards in a premium blue-lit space, futuristic product showcase, photorealistic',
  'services/custom-apps': 'Clean modern code editor on an ultrawide monitor showing beautiful React code with blue syntax highlighting, sleek developer workspace with ambient blue lighting, photorealistic, 8k',
  'services/business-tools': 'Unified business dashboard displaying CRM analytics, communication tools, and reputation metrics on a single sleek interface, blue data visualization, premium tech environment, photorealistic',
  'problems/website-design': 'Cracked old computer monitor displaying a broken outdated website with error messages, dusty desk, dim orange warning lighting, photorealistic, dramatic',
  'problems/voice-ai': 'Empty office reception desk with an unanswered ringing telephone, missed call notifications on screen, lonely atmosphere with warm orange light, photorealistic, cinematic',
  'problems/ai-automation': 'Overwhelmed office worker buried under stacks of papers and repetitive forms, multiple screens showing manual data entry, stressed atmosphere, photorealistic',
  'problems/ai-training': 'Confused business team staring at AI interface they cannot understand, question marks on screens, frustration visible, office setting with cold lighting, photorealistic',
  'problems/ecommerce-consulting': 'Abandoned online shopping cart on a tablet screen with declining sales charts in background, empty warehouse, amber warning light, photorealistic',
  'problems/brand-strategy': 'Cluttered wall of contradictory brand materials - mismatched logos, inconsistent colors scattered chaotically, creative studio in disarray, photorealistic',
  'problems/digital-products': 'Empty email inbox and website with zero subscribers, barren digital landscape, lonely atmosphere, photorealistic, cinematic',
  'problems/custom-apps': 'Frustrated worker with multiple disconnected software windows open, sticky notes everywhere, tangled cables, chaotic desk, photorealistic',
  'problems/business-tools': 'Overwhelming array of different software login screens on multiple devices, subscription bills piling up, cluttered tech desk, photorealistic',
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const ws = fs.createWriteStream(filepath);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(); });
    }).on('error', reject);
  });
}

async function createTask(prompt) {
  const res = await fetch(`${BASE}/api/v1/jobs/createTask`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'nano-banana-2',
      callBackUrl: '',
      input: { prompt, image_input: [], aspect_ratio: '3:2', resolution: '1K', output_format: 'jpg' }
    })
  });
  const json = await res.json();
  return json.data?.taskId;
}

async function pollTask(taskId) {
  for (let i = 0; i < 40; i++) {
    await sleep(5000);
    const res = await fetch(`${BASE}/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    const json = await res.json();
    const state = json.data?.state;
    if (state === 'success' && json.data?.resultJson) {
      const parsed = JSON.parse(json.data.resultJson);
      return parsed.resultUrls?.[0] || null;
    }
    if (state === 'failed') return null;
  }
  return null;
}

async function processOne(slug, prompt) {
  const taskId = await createTask(prompt);
  if (!taskId) { console.error(`  FAIL create: ${slug}`); return false; }
  console.log(`  Created: ${slug} (${taskId})`);

  const imageUrl = await pollTask(taskId);
  if (!imageUrl) { console.error(`  FAIL poll: ${slug}`); return false; }

  // Get download URL
  let dlUrl = imageUrl;
  try {
    const r = await fetch(`${BASE}/api/v1/common/download-url`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: imageUrl })
    });
    const j = await r.json();
    if (j.code === 200 && j.data) dlUrl = j.data;
  } catch {}

  const dir = path.join('public/images', path.dirname(slug));
  fs.mkdirSync(dir, { recursive: true });
  const filepath = path.join('public/images', `${slug}.jpg`);
  await download(dlUrl, filepath);
  console.log(`  SAVED: ${slug}`);
  return true;
}

async function main() {
  const entries = Object.entries(allPrompts);
  console.log(`Generating ${entries.length} images (3 at a time)...\n`);

  let ok = 0, fail = 0;
  // Process 3 at a time to avoid rate limits
  for (let i = 0; i < entries.length; i += 3) {
    const batch = entries.slice(i, i + 3);
    const results = await Promise.all(batch.map(([slug, prompt]) => processOne(slug, prompt)));
    results.forEach(r => r ? ok++ : fail++);
    console.log(`  Progress: ${ok + fail}/${entries.length} (${ok} ok, ${fail} fail)\n`);
  }

  console.log(`\n=== Done: ${ok} saved, ${fail} failed ===`);
}

main().catch(console.error);
