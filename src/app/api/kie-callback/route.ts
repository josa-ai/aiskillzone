import { put } from "@vercel/blob";
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
    const raw = JSON.parse(rawText) as Record<string, unknown>;

    // Kie.ai wraps the payload: { code: 200, data: { taskId, status, output } }
    // Fall back to flat structure just in case
    const data = (raw.data as Record<string, unknown> | undefined) ?? raw;

    const status: string =
      (data.status as string) ??
      (data.taskStatus as string) ??
      "unknown";
    const output = data.output as KieCallbackPayload["output"] | undefined;
    const imageUrl = extractImageUrl(output);
    const taskId = (data.taskId as string) ?? (data.recordId as string) ?? "none";

    console.log(`KIE|${slug}|${status}|${imageUrl ?? "NO_URL"}|taskId=${taskId}`);

    if (status === "completed" || status === "success" || status === "succeed") {
      if (!imageUrl) {
        return NextResponse.json({ error: "completed but no image URL" }, { status: 422 });
      }

      // Fetch the image from Kie.ai and upload to Vercel Blob
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) {
        console.error(`KIE|${slug}|FETCH_FAIL|${imgRes.status}|${imageUrl}`);
        return NextResponse.json({ error: `image fetch failed: ${imgRes.status}` }, { status: 502 });
      }
      const blob = await imgRes.blob();
      const { url: blobUrl } = await put(`heroes/${slug}.jpg`, blob, {
        access: "public",
        contentType: "image/jpeg",
        addRandomSuffix: false,
      });

      console.log(`KIE|${slug}|SAVED|${blobUrl}`);
      return NextResponse.json({ success: true, slug, url: blobUrl });
    }

    if (status === "failed" || status === "error") {
      return NextResponse.json({ error: output?.error ?? "failed" }, { status: 200 });
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
