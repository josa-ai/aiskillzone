import { NextRequest, NextResponse } from "next/server";

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

const pageMap: { [key: string]: string } = {
  "cace9e897d9ce7e466e880819891985b": "about",
  "00a13af91e42ec68568644e6d7b6e6df": "services",
  "9e0367466eab661131bf81213f57f6bb": "website-design",
  "1e7601a46decea3b4abd8fc1a6d47f67": "voice-ai",
  "96762d2275e0dac13b49f6e9ca21f042": "ai-automation",
  "cb70333dee6bdfa6819e89f1cc798e32": "chatbot-development",
  "184e0ee86207109bd93dc4964535b289": "ecommerce-solutions",
  "574ecadb18804719dfddc68888b0af82": "seo-optimization",
  "624c3a45def149cccefefac92ee4eaf0": "brand-identity",
  "302ed54e5df21b84cb8707b0ea81fbd8": "mobile-app-development",
  "662e472fc1ee5090a10537bb6ab626e6": "blog",
  "d027aff5769518a4644f9c9e7c69b83c": "contact",
  "6f47bb70437c183e6aea416599652a78": "portfolio",
};

export async function POST(request: NextRequest) {
  try {
    const payload: KieCallbackPayload = await request.json();

    console.log("[kie-callback] RAW_PAYLOAD:", JSON.stringify(payload));

    if (!payload.taskId) {
      return NextResponse.json({ error: "No taskId provided" }, { status: 400 });
    }

    const page = pageMap[payload.taskId] || payload.taskId;

    if (payload.status === "completed" && payload.output?.images?.[0]) {
      const imageUrl = payload.output.images[0];
      console.log(`[kie-callback] HERO_IMAGE_URL|${page}|${imageUrl}`);

      return NextResponse.json({
        success: true,
        page,
        url: imageUrl,
      });
    }

    if (payload.status === "failed") {
      console.log(`[kie-callback] FAILED|${page}|${payload.output?.error || "Unknown"}`);
      return NextResponse.json({
        error: "Task failed",
        details: payload.output?.error || "Unknown error",
      }, { status: 500 });
    }

    console.log(`[kie-callback] STATUS|${page}|${payload.status}`);
    return NextResponse.json({
      received: true,
      status: payload.status,
    });
  } catch (error) {
    console.error("[kie-callback] Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Kie.ai callback endpoint",
    pages: Object.values(pageMap),
  });
}
