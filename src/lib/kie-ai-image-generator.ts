interface CreateTaskResponse {
  taskId: string;
  recordId: string;
  code?: number;
  msg?: string;
}

interface GenerationOptions {
  prompt: string;
  aspectRatio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  resolution?: "1K" | "2K" | "4K";
  outputFormat?: "png" | "jpg" | "webp";
}

const API_ENDPOINT = "https://api.kie.ai/api/v1/jobs/createTask";

export async function createImageTask(
  apiKey: string,
  prompt: string,
  callbackUrl: string,
  options: Partial<GenerationOptions> = {}
): Promise<{ taskId: string; recordId: string }> {
  const { aspectRatio = "16:9", resolution = "1K", outputFormat = "png" } = options;

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "nano-banana-2",
      callBackUrl: callbackUrl,
      input: {
        prompt,
        image_input: [],
        aspect_ratio: aspectRatio,
        resolution,
        output_format: outputFormat,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  const responseData = await response.json();

  if (!responseData.data?.taskId) {
    throw new Error("No taskId returned from API: " + JSON.stringify(responseData));
  }

  return { taskId: responseData.data.taskId, recordId: responseData.data.recordId };
}

export async function generateHeroImages(
  apiKey: string,
  callbackUrl: string,
  onProgress?: (page: string, taskId: string) => void
): Promise<{ page: string; taskId: string }[]> {
  const heroPrompts: Record<string, string> = {
    "about": "Professional business meeting in a modern office, warm blue ambient lighting, collaborative team atmosphere, photorealistic, cinematic lighting",
    "services": "Futuristic AI service hub with glowing purple holographic interfaces and neural network visualizations, tech-forward atmosphere, photorealistic, cinematic",
    "website-design": "Creative web design studio with large curved monitors showing colorful UI mockups, purple accent lighting, modern workspace, photorealistic",
    "voice-ai": "Futuristic voice AI visualization with glowing sound waves and audio frequency patterns in purple and blue, digital assistant hologram, photorealistic",
    "ai-automation": "Automated workflow visualization with robotic arms and glowing data streams in purple, factory-meets-tech atmosphere, photorealistic, cinematic",
    "ai-training": "Modern workshop classroom with professionals learning AI on laptops, educator presenting holographic AI diagrams, purple tech environment, photorealistic",
    "ecommerce-consulting": "Sleek e-commerce dashboard with product displays and shopping analytics on large screens, purple tech accents, professional retail tech, photorealistic",
    "brand-strategy": "Creative branding studio with logo mockups, color palettes pinned to boards, typography samples, purple ambient workspace, photorealistic",
    "digital-products": "Digital product creation workspace with ebooks and lead magnet mockups on screens, purple creative studio lighting, photorealistic",
    "custom-apps": "Software development workspace with multiple monitors showing app code and UI wireframes, purple tech lighting, focused developer environment, photorealistic",
    "business-tools": "Modern CRM dashboard on a large monitor with customer data visualizations and reputation metrics, purple business tech atmosphere, photorealistic",
    "blog": "Cozy modern workspace with coffee and laptop showing digital content, soft purple accent lighting, content creation theme, photorealistic",
    "contact": "Friendly business consultation with handshake in a warm modern office, purple tech accents, approachable professional atmosphere, photorealistic",
    "portfolio": "Impressive digital portfolio gallery with glowing project displays on sleek screens, purple ambient exhibition lighting, photorealistic, cinematic",
  };

  const results: { page: string; taskId: string }[] = [];

  for (const [page, prompt] of Object.entries(heroPrompts)) {
    try {
      console.log(`Creating task for: ${page}`);
      const { taskId } = await createImageTask(apiKey, prompt, callbackUrl);
      results.push({ page, taskId });
      onProgress?.(page, taskId);
      console.log(`  Task created: ${taskId}`);
    } catch (error) {
      console.error(`  Failed for ${page}:`, error);
    }
  }

  return results;
}
