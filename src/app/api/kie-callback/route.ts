import { NextRequest, NextResponse } from "next/server";

interface KieCallbackPayload {
  taskId: string;
  recordId: string;
  status: "pending" | "processing" | "completed" | "failed" | "success";
  output?: {
    images?: string[];
    image_url?: string;
    url?: string;
    error?: string;
  };
}

function extractImageUrl(output: KieCallbackPayload["output"]): string | null {
  if (!output) return null;
  return output.images?.[0] ?? output.image_url ?? output.url ?? null;
}

export async function POST(request: NextRequest) {
  try {
    // Slug can be passed as a query param: /api/kie-callback?slug=about
    const slug =
      request.nextUrl.searchParams.get("slug") ?? "unknown";

    const payload: KieCallbackPayload = await request.json();
    console.log(`[kie-callback] RAW slug=${slug}`, JSON.stringify(payload));

    const status = payload.status;

    if (status === "completed" || status === "success") {
      const imageUrl = extractImageUrl(payload.output);
      if (!imageUrl) {
        console.log(`[kie-callback] COMPLETED_NO_URL slug=${slug} taskId=${payload.taskId}`);
        return NextResponse.json({ error: "completed but no image URL" }, { status: 422 });
      }
      // This log line is parsed by the local download script
      console.log(`[kie-callback] IMAGE_READY|${slug}|${imageUrl}`);
      return NextResponse.json({ success: true, slug, url: imageUrl });
    }

    if (status === "failed") {
      const err = payload.output?.error ?? "unknown";
      console.log(`[kie-callback] FAILED|${slug}|${err}`);
      return NextResponse.json({ error: err }, { status: 200 });
    }

    // pending / processing — just acknowledge
    console.log(`[kie-callback] STATUS|${slug}|${status}`);
    return NextResponse.json({ received: true, slug, status });
  } catch (error) {
    console.error("[kie-callback] parse error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Kie.ai callback endpoint — add ?slug=<page-slug>" });
}
