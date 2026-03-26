import RSS from "rss";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const feed = new RSS({
    title: "JOSA.AI Blog",
    description: "AI tips, tutorials, and insights for small businesses.",
    site_url: "https://josa.ai",
    feed_url: "https://josa.ai/blog/feed.xml",
    language: "en",
  });

  getAllPosts().forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://josa.ai/blog/${post.slug}`,
      date: post.date,
      categories: [post.category],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { "Content-Type": "application/xml" },
  });
}
