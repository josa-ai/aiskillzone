import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  company?: string;
  rating?: number;
}

export function TestimonialCard({
  quote,
  name,
  title,
  company,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="rounded-xl bg-brand-soft-lavender p-6 ring-1 ring-brand-soft-lavender">
      {rating != null && rating >= 1 && rating <= 5 && (
        <div className="mb-3 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                "size-5",
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              )}
            />
          ))}
        </div>
      )}
      <blockquote className="mb-4 text-brand-deep-navy/90 italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div>
        <p className="font-bold text-brand-deep-navy">{name}</p>
        <p className="text-sm text-brand-tech-blue">
          {title}
          {company && <span>, {company}</span>}
        </p>
      </div>
    </div>
  );
}
