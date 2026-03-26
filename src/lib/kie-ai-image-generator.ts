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

  const data: CreateTaskResponse = await response.json();

  if (!data.taskId) {
    throw new Error("No taskId returned from API");
  }

  return { taskId: data.taskId, recordId: data.recordId };
}

export async function generateHeroImages(
  apiKey: string,
  callbackUrl: string,
  onProgress?: (page: string, taskId: string) => void
): Promise<{ page: string; taskId: string }[]> {
  const heroPrompts: Record<string, string> = {
    "about": "Modern professional office space with holographic AI displays, soft purple and blue ambient lighting, clean minimalist design, photorealistic, 16:9 aspect ratio",
    "services": "Futuristic digital service marketplace with glowing purple interfaces, AI neural network visualizations, floating holographic icons, tech-forward atmosphere, photorealistic, 16:9 aspect ratio",
    "website-design": "Creative web design workspace with large curved monitors showing colorful UI mockups, purple accent lighting, modern furniture, photorealistic, 16:9 aspect ratio",
    "voice-ai": "Voice recognition technology visualization with sound waves and audio frequency patterns in purple and blue, futuristic AI assistant interface, photorealistic, 16:9 aspect ratio",
    "ai-automation": "Automated workflow visualization with robots and AI processing chains, purple tech atmosphere, data streams and automation indicators, photorealistic, 16:9 aspect ratio",
    "chatbot-development": "Conversational AI chatbot interface with friendly animated bot character, chat bubbles and natural language processing visuals, modern purple tech style, photorealistic, 16:9 aspect ratio",
    "ecommerce-solutions": "Modern e-commerce platform with sleek product displays, shopping interface with purple accents, secure payment visuals, photorealistic, 16:9 aspect ratio",
    "seo-optimization": "Search engine optimization visualization with growing charts, keywords floating in digital space, purple tech analytics dashboard, photorealistic, 16:9 aspect ratio",
    "brand-identity": "Brand identity design studio with logo mockups, color palettes, typography samples, purple creative workspace, photorealistic, 16:9 aspect ratio",
    "mobile-app-development": "Mobile app development workspace with smartphones displaying app interfaces, code on screens, purple accent lighting, photorealistic, 16:9 aspect ratio",
    "blog": "Modern blogging and content creation workspace with notepad and pen, digital content management visuals, warm purple lighting, photorealistic, 16:9 aspect ratio",
    "contact": "Professional contact center with communication visuals, phone and email icons, supportive team atmosphere, purple tech style, photorealistic, 16:9 aspect ratio",
    "portfolio": "Impressive portfolio gallery with award-winning project displays, modern exhibition space, purple ambient lighting, photorealistic, 16:9 aspect ratio",
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
