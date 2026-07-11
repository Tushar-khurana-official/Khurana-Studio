import { useState, useEffect, useCallback } from "react";
import { FadeIn } from "@/components/fade-in";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { useListPortfolio, getListPortfolioQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { getPortfolioImage } from "@/lib/image-fallbacks";

export const PortfolioPreview = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: portfolioItems, isLoading } = useListPortfolio(
    { featured: true },
    { query: { queryKey: getListPortfolioQueryKey({ featured: true }) } }
  );

  const categories = ["all", "wedding", "portrait", "fashion", "commercial"];

  const filteredItems = portfolioItems?.filter((item) =>
    activeCategory === "all" ? true : item.category.toLowerCase() === activeCategory
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!filteredItems) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
  }, [filteredItems]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!filteredItems) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
    );
  }, [filteredItems]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft")  prevImage();
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, nextImage, prevImage, closeLightbox]);

  return (
    <section className="py-28 md:py-36 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-14 gap-8">
          <FadeIn className="text-center md:text-left w-full md:w-auto">
            <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
              Our Work
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Selected Work</h2>
          </FadeIn>

          <FadeIn direction="left" className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex gap-7 md:gap-9 font-sans text-[0.7rem] uppercase tracking-widest whitespace-nowrap justify-center md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative pb-2 transition-colors duration-300 ${
                    activeCategory === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 w-full h-px bg-foreground"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`w-full rounded-none ${i % 3 === 0 ? "aspect-square" : "aspect-[3/4]"}`}
              />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredItems?.slice(0, 6).map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  key={item.id}
                  className="group relative overflow-hidden cursor-pointer aspect-[4/5]"
                  onClick={() => openLightbox(index)}
                  data-cursor-hover
                >
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-end justify-end p-6 pointer-events-none">
                    <span className="font-serif text-xl text-white mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      {item.title}
                    </span>
                    <span className="font-sans text-[0.6rem] uppercase tracking-widest text-white/65 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-[30ms]">
                      {item.category}
                    </span>
                  </div>
                  <ImageWithFallback
                    src={getPortfolioImage(item.imageUrl, index)}
                    fallbackSrc={getPortfolioImage(undefined, index)}
                    alt={item.title}
                    objectFit="cover"
                    loading="lazy"
                    className="w-full h-full transform scale-100 group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="text-center">
          <FadeIn direction="up">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 px-10 py-4 border border-border text-foreground text-xs uppercase tracking-widest hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
            >
              View Full Portfolio
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </FadeIn>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/96 flex items-center justify-center p-4 md:p-16"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/40 hover:text-white z-50 p-2 transition-colors duration-200"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            {/* Keyboard hint */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 font-sans text-[0.6rem] uppercase tracking-widest text-white/25 hidden md:block">
              ← → to navigate · Esc to close
            </div>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 text-white/30 hover:text-white z-50 p-4 transition-colors duration-200 group"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={40} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform duration-200" />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              src={getPortfolioImage(filteredItems[lightboxIndex].imageUrl, lightboxIndex)}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[82vh] max-w-[82vw] object-contain shadow-2xl shadow-black/60"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 text-white/30 hover:text-white z-50 p-4 transition-colors duration-200 group"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={40} strokeWidth={1} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Caption */}
            <div className="absolute bottom-8 text-center text-white w-full pointer-events-none px-4">
              <h3 className="font-serif text-xl mb-1">{filteredItems[lightboxIndex].title}</h3>
              <p className="font-sans text-[0.65rem] uppercase tracking-widest text-white/40">
                {lightboxIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
