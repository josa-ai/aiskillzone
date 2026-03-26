export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // JSON-LD structured data for SEO - data is always developer-controlled schema objects
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
