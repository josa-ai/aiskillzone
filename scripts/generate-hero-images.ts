import { generateHeroImages } from "../src/lib/kie-ai-image-generator";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

async function main() {
  const apiKey = process.env.KIE_AI_API_KEY;
  
  if (!apiKey) {
    console.error("Error: KIE_AI_API_KEY not found in .env.local");
    process.exit(1);
  }

  const callbackUrl = process.argv[2];
  
  if (!callbackUrl) {
    console.error("Usage: npx tsx scripts/generate-hero-images.ts <callback-url>");
    console.error("");
    console.error("Example:");
    console.error("  Local:  npx tsx scripts/generate-hero-images.ts http://localhost:3000/api/kie-callback");
    console.error("  Vercel: npx tsx scripts/generate-hero-images.ts https://your-app.vercel.app/api/kie-callback");
    console.error("");
    console.error("Note: For local development, you need a tunneling tool like ngrok:");
    console.error("  npx ngrok http 3000");
    console.error("  Then use the ngrok URL as the callback-url");
    process.exit(1);
  }

  console.log("Starting hero image generation...\n");
  console.log(`API Key: ${apiKey.substring(0, 8)}...`);
  console.log(`Callback URL: ${callbackUrl}\n`);

  const results = await generateHeroImages(apiKey, callbackUrl, (page, taskId) => {
    console.log(`  Created: ${page} (taskId: ${taskId})`);
  });

  console.log(`\n${results.length} tasks created:`);
  for (const result of results) {
    console.log(`  - ${result.page}: ${result.taskId}`);
  }

  console.log("\nImages will be saved to /public/images/heroes/ when callbacks are received.");
  console.log("Note: Callbacks require a publicly accessible URL.");
}

main().catch(console.error);
