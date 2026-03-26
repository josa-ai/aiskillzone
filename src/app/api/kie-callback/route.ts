import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

interface KieCallbackPayload {
  taskId: string;
  recordId: string;
  status: "pending" | "processing" | "completed" | "failed";
  output?: {
    images?: string[];
    image_url?: string;
    error?: string;
  };
}

const HEROES_DIR = path.join(process.cwd(), "public", "images", "heroes");

export async function POST(request: NextRequest) {
  try {
    const payload: KieCallbackPayload = await request.json();
    
    console.log("[kie-callback] Received callback:", JSON.stringify(payload, null, 2));

    if (!payload.taskId) {
      return NextResponse.json({ error: "No taskId provided" }, { status: 400 });
    }

    if (payload.status === "completed" && payload.output?.images?.[0]) {
      const imageUrl = payload.output.images[0];
      const filename = `${payload.taskId}.png`;
      const filepath = path.join(HEROES_DIR, filename);

      try {
        if (!existsSync(HEROES_DIR)) {
          await mkdir(HEROES_DIR, { recursive: true });
        }

        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch image: ${imageResponse.status}`);
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        await writeFile(filepath, Buffer.from(imageBuffer));

        console.log(`[kie-callback] Image saved to: ${filepath}`);

        return NextResponse.json({ 
          success: true, 
          message: "Image saved",
          path: `/images/heroes/${filename}`
        });
      } catch (fileError) {
        console.error("[kie-callback] Error saving image:", fileError);
        return NextResponse.json({ 
          error: "Failed to save image",
          details: String(fileError)
        }, { status: 500 });
      }
    }

    if (payload.status === "failed") {
      return NextResponse.json({ 
        error: "Task failed",
        details: payload.output?.error || "Unknown error"
      }, { status: 500 });
    }

    return NextResponse.json({ 
      received: true,
      status: payload.status
    });
  } catch (error) {
    console.error("[kie-callback] Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Kie.ai callback endpoint",
    usage: "POST with Kie.ai callback payload"
  });
}
