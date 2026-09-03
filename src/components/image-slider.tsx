"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type SliderImage = {
  src: string;
  alt: string;
  caption: string;
};

type ImageSliderProps = {
  images: SliderImage[];
};

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

export function ImageSlider({ images }: ImageSliderProps) {
  const [[index, direction], setIndex] = useState([0, 0]);

  if (images.length === 0) return null;

  function go(next: number) {
    const dir = next > index ? 1 : -1;
    const wrapped = (next + images.length) % images.length;
    setIndex([wrapped, dir]);
  }

  const current = images[index];

  return (
    <div className="overflow-hidden rounded-2xl border border-accent/30 bg-surface shadow-[0_5px_20px_-10px_var(--accent)]">
      <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="ml-3 flex-1 truncate font-mono text-xs text-muted">
          {current.caption}
        </span>
      </div>

      <div className="relative aspect-16/10 overflow-hidden bg-surface-hover sm:aspect-video">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.src}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              quality={95}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="object-cover object-top"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(index - 1)}
              className="absolute top-1/2 left-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(index + 1)}
              className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight size={16} />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex items-center justify-center gap-2 border-t border-border bg-background py-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Show ${img.caption}`}
              onClick={() => go(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-accent" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
