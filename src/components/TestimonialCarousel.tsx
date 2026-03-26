"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

function TestimonialCardInner({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      className="group relative"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-xl shadow-brand-royal-purple/10 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-mauve-purple/20">
        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #8D4BBB, #3B82F6, #A882EE, #8D4BBB)",
              backgroundSize: "300% 300%",
              animation: "gradientShift 3s ease infinite",
              padding: "2px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        </div>

        {/* Top accent bar with gradient */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-royal-purple via-brand-mauve-purple to-brand-tech-blue"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Decorative quote icon */}
        <motion.div
          className="absolute right-4 top-4 text-6xl font-serif text-brand-soft-lavender/30 select-none"
          animate={{ y: [0, -5, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          &ldquo;
        </motion.div>

        {/* Stars with pop-in animation */}
        {testimonial.rating != null && testimonial.rating >= 1 && testimonial.rating <= 5 && (
          <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
              >
                <Star
                  className={cn(
                    "size-5",
                    i < testimonial.rating!
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Quote text */}
        <blockquote className="mb-6 text-base leading-relaxed text-brand-deep-navy/90 italic relative z-10">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author info */}
        <div className="relative z-10">
          {/* Avatar placeholder with gradient */}
          <div className="mb-3 h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-brand-royal-purple to-brand-tech-blue">
            <div className="flex h-full w-full items-center justify-center text-white font-bold text-lg">
              {testimonial.name.charAt(0)}
            </div>
          </div>
          <p className="font-bold text-brand-deep-navy">{testimonial.name}</p>
          <p className="text-sm text-brand-tech-blue">
            {testimonial.title}
            {testimonial.company && <span className="text-brand-deep-navy/60">, {testimonial.company}</span>}
          </p>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-brand-royal-purple to-brand-tech-blue"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <>
      {/* Desktop: show all cards in a grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <TestimonialCardInner testimonial={testimonial} index={index} />
          </motion.div>
        ))}
      </div>

      {/* Mobile: carousel with one card at a time */}
      <div
        className="relative md:hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="overflow-hidden min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <TestimonialCardInner testimonial={testimonials[current]} index={current} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrow buttons with hover effects */}
        <motion.button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:shadow-xl"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="size-6 text-brand-royal-purple" />
        </motion.button>
        <motion.button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:shadow-xl"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="size-6 text-brand-royal-purple" />
        </motion.button>

        {/* Dot indicators with animation */}
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={cn(
                "rounded-full transition-all",
                index === current ? "w-8 h-3 bg-brand-royal-purple" : "w-3 h-3 bg-brand-soft-lavender"
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={
                index === current
                  ? { scale: [1, 1.1, 1] }
                  : { scale: 1 }
              }
              transition={
                index === current
                  ? { duration: 1.5, repeat: Infinity }
                  : { duration: 0.2 }
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
