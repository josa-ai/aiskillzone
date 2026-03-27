import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const KIE_API_KEY = process.env.KI_EAI_API_KEY ?? "";

// Actual Kie.ai nano-banana-2 callback payload:
// { code, msg, data: { taskId, state, resultJson: '{"resultUrls":["https://tempfile..."]}', ... } }
interface KieCallbackPayload {
  code: number;
  msg?: string;
  data?: {
    taskId?: string;
    state?: string;
    resultJson?: string;
    // Fallback fields from other Kie.ai models
    info?: {
      resultImageUrl?: string;
      result_urls?: string[];
    } | null;
  };
}

function extractImageUrl(payload: KieCallbackPayload): string | null {
  const data = payload.data;
  if (!data) return null;

  // nano-banana-2 format: resultJson is a stringified JSON with resultUrls
  if (data.resultJson) {
    try {
      const parsed = JSON.parse(data.resultJson) as { resultUrls?: string[] };
      if (parsed.resultUrls?.[0]) return parsed.resultUrls[0];
    } catch {
      // fall through
    }
  }

  // Fallback: other Kie.ai models use data.info
  return data.info?.resultImageUrl || data.info?.result_urls?.[0] || null;
}

async function getDownloadUrl(imageUrl: string): Promise<string> {
  // Convert short-lived tempfile URL to a direct download link
  const res = await fetch("https://api.kie.ai/api/v1/common/download-url", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KIE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: imageUrl }),
  });
  if (!res.ok) return imageUrl;
  const json = await res.json() as { code?: number; data?: string };
  return (json.code === 200 && json.data) ? json.data : imageUrl;
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
      const downloadUrl = await getDownloadUrl(imageUrl);
      console.log(`KIE|${slug}|DOWNLOAD_URL|${downloadUrl}`);

      const imgRes = await fetch(downloadUrl);
      if (!imgRes.ok) {
        console.error(`KIE|${slug}|FETCH_FAIL|${imgRes.status}|${downloadUrl}`);
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

    return NextResponse.json({ received: true, slug, code: payload.code });
  } catch (error) {
    console.error(`KIE|${slug}|PARSE_ERROR|${String(error)}|raw=${rawText.slice(0, 200)}`);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Kie.ai callback endpoint — add ?slug=<page-slug>" });
}
