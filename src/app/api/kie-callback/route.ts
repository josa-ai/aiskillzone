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
  const slug = request.nextUrl.searchParams.get("slug") ?? "unknown";
  let rawText = "";
  try {
    rawText = await request.text();
    const payload = JSON.parse(rawText) as KieCallbackPayload & Record<string, unknown>;

    // Single log line with everything — easier to find in Vercel logs
    const status: string = payload.status ?? (payload.taskStatus as string) ?? "unknown";
    const imageUrl = extractImageUrl(payload.output ?? (payload.data as KieCallbackPayload["output"]));
    console.log(`KIE|${slug}|${status}|${imageUrl ?? "NO_URL"}|taskId=${payload.taskId ?? "none"}`);

    if (status === "completed" || status === "success" || status === "succeed") {
      if (!imageUrl) {
        return NextResponse.json({ error: "completed but no image URL" }, { status: 422 });
      }
      return NextResponse.json({ success: true, slug, url: imageUrl });
    }

    if (status === "failed" || status === "error") {
      return NextResponse.json({ error: payload.output?.error ?? "failed" }, { status: 200 });
    }

    return NextResponse.json({ received: true, slug, status });
  } catch (error) {
    console.error(`KIE|${slug}|PARSE_ERROR|${String(error)}|raw=${rawText.slice(0, 200)}`);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Kie.ai callback endpoint — add ?slug=<page-slug>" });
}
