import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';

const API_KEY = '47bb1da66bb6d583b0eb576738f92565';
const BASE_URL = 'https://api.kie.ai';
const PORT = 9877;

const allPrompts = {
  // Service hero images
  'services/website-design': 'Sleek modern minimalist dashboard design with vibrant blue accents displayed on a large curved monitor, clean workspace with soft volumetric lighting, futuristic web design studio, photorealistic, 8k quality',
  'services/voice-ai': 'Futuristic AI voice assistant visualization with glowing blue sound waves emanating from a sleek microphone, holographic waveform patterns in blue and cyan, dark tech environment, photorealistic, cinematic lighting',
  'services/ai-automation': 'Advanced robotic automation workflow visualization with glowing blue data streams connecting mechanical gears and digital interfaces, futuristic factory-meets-tech atmosphere, photorealistic, 8k',
  'services/ai-training': 'Modern high-tech workshop classroom with professionals collaborating around holographic AI diagrams and neural network visualizations, blue ambient lighting, photorealistic, cinematic',
  'services/ecommerce-consulting': 'Futuristic e-commerce command center with multiple floating holographic screens showing product analytics, shopping data flows in blue and orange, dark premium environment, photorealistic',
  'services/brand-strategy': 'Creative brand strategy war room with holographic brand identity elements floating in space, color palettes and typography specimens in blue light, minimalist premium environment, photorealistic',
  'services/digital-products': 'Elegant floating digital products - PDF guides, course interfaces, and email templates displayed as holographic cards in a premium blue-lit space, futuristic product showcase, photorealistic',
  'services/custom-apps': 'Clean modern code editor on an ultrawide monitor showing beautiful React code with blue syntax highlighting, sleek developer workspace with ambient blue lighting, photorealistic, 8k',
  'services/business-tools': 'Unified business dashboard displaying CRM analytics, communication tools, and reputation metrics on a single sleek interface, blue data visualization, premium tech environment, photorealistic',
  // Problem images
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

const pending = new Map(); // taskId -> slug
const completed = new Set();
let totalExpected = Object.keys(allPrompts).length;

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const ws = fs.createWriteStream(filepath);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(); });
      ws.on('error', reject);
    }).on('error', reject);
  });
}

async function getDownloadUrl(imageUrl) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/common/download-url`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: imageUrl }),
    });
    const json = await res.json();
    return (json.code === 200 && json.data) ? json.data : imageUrl;
  } catch { return imageUrl; }
}

// Start local callback server
const server = http.createServer(async (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const url = new URL(req.url, `http://localhost:${PORT}`);
        const slug = url.searchParams.get('slug') || 'unknown';
        const payload = JSON.parse(body);

        console.log(`  Callback received: ${slug} code=${payload.code}`);

        if (payload.code === 200 && payload.data) {
          let imageUrl = null;

          // Try resultJson format (nano-banana-2)
          if (payload.data.resultJson) {
            try {
              const parsed = JSON.parse(payload.data.resultJson);
              imageUrl = parsed.resultUrls?.[0];
            } catch {}
          }

          // Fallback: info format
          if (!imageUrl) {
            imageUrl = payload.data.info?.resultImageUrl || payload.data.info?.result_urls?.[0];
          }

          if (imageUrl) {
            const downloadUrl = await getDownloadUrl(imageUrl);
            const dir = path.join('public/images', path.dirname(slug));
            fs.mkdirSync(dir, { recursive: true });
            const filepath = path.join('public/images', `${slug}.jpg`);
            await downloadFile(downloadUrl, filepath);
            console.log(`  SAVED: ${slug} -> ${filepath}`);
            completed.add(slug);
          } else {
            console.log(`  No image URL in callback for ${slug}`);
          }
        }
      } catch (e) {
        console.error('  Callback error:', e.message);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ received: true }));

      if (completed.size >= totalExpected) {
        console.log(`\n=== All ${completed.size} images saved! ===`);
        setTimeout(() => process.exit(0), 1000);
      }
    });
  } else {
    res.writeHead(200);
    res.end('OK');
  }
});

server.listen(PORT, async () => {
  console.log(`Callback server listening on port ${PORT}`);
  console.log(`Submitting ${totalExpected} image generation tasks...\n`);

  for (const [slug, prompt] of Object.entries(allPrompts)) {
    const callbackUrl = `http://localhost:${PORT}/callback?slug=${encodeURIComponent(slug)}`;

    try {
      const response = await fetch(`${BASE_URL}/api/v1/jobs/createTask`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'nano-banana-2',
          callBackUrl: callbackUrl,
          input: {
            prompt,
            image_input: [],
            aspect_ratio: '3:2',
            resolution: '1K',
            output_format: 'jpg'
          }
        })
      });
      const result = await response.json();
      const taskId = result.data?.taskId;
      if (taskId) {
        pending.set(taskId, slug);
        console.log(`  Submitted: ${slug} (${taskId})`);
      } else {
        console.error(`  Failed: ${slug}`, JSON.stringify(result));
      }
    } catch (e) {
      console.error(`  Error: ${slug}`, e.message);
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nAll tasks submitted. Waiting for callbacks (timeout: 5 min)...\n`);

  // Timeout after 5 minutes
  setTimeout(() => {
    console.log(`\nTimeout. ${completed.size}/${totalExpected} images saved.`);
    console.log('Missing:', [...Object.keys(allPrompts)].filter(s => !completed.has(s)));
    process.exit(completed.size > 0 ? 0 : 1);
  }, 300000);
});
