import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

// Kie.ai callback payload: { code, msg, data: { taskId, info: { resultImageUrl, originImageUrl } } }
interface KieCallbackPayload {
  code: number;
  msg?: string;
  data?: {
    taskId?: string;
    info?: {
      resultImageUrl?: string;
      originImageUrl?: string;
      result_urls?: string[];
    } | null;
  };
}

function extractImageUrl(payload: KieCallbackPayload): string | null {
  const info = payload.data?.info;
  if (!info) return null;
  return info.resultImageUrl || info.result_urls?.[0] || null;
}

export async function POST(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? "unknown";
  let rawText = "";
  try {
    rawText = await request.text();
    const payload = JSON.parse(rawText) as KieCallbackPayload;

    const taskId = payload.data?.taskId ?? "none";
    const imageUrl = extractImageUrl(payload);

    console.log(`KIE|${slug}|code=${payload.code}|${imageUrl ?? "NO_URL"}|taskId=${taskId}`);

    if (payload.code === 200 && imageUrl) {
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

    if (payload.code !== 200) {
      console.error(`KIE|${slug}|FAILED|code=${payload.code}|${payload.msg}`);
      return NextResponse.json({ error: payload.msg ?? "failed" }, { status: 200 });
    }

    // code 200 but no image URL yet (shouldn't happen but handle gracefully)
    return NextResponse.json({ received: true, slug, code: payload.code });
  } catch (error) {
    console.error(`KIE|${slug}|PARSE_ERROR|${String(error)}|raw=${rawText.slice(0, 200)}`);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Kie.ai callback endpoint — add ?slug=<page-slug>" });
}
