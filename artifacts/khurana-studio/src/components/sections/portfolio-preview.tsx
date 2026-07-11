import { useState } from "react";
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

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!filteredItems) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!filteredItems) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
    );
  };

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <FadeIn className="text-center md:text-left w-full md:w-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Selected Work</h2>
          </FadeIn>

          <FadeIn direction="left" className="w-full md:w-auto overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
            <div className="flex gap-6 md:gap-8 font-sans text-xs uppercase tracking-widest whitespace-nowrap justify-center md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-colors relative pb-2 ${
                    activeCategory === cat
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 w-full h-px bg-foreground"
                    />
                  )}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  key={item.id}
                  className="group relative overflow-hidden cursor-pointer aspect-[4/5]"
                  onClick={() => openLightbox(index)}
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center text-white pointer-events-none">
                    <span className="font-serif text-2xl md:text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {item.title}
                    </span>
                    <span className="font-sans text-xs uppercase tracking-widest text-white/70 -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {item.category}
                    </span>
                  </div>
                  <ImageWithFallback
                    src={getPortfolioImage(item.imageUrl, index)}
                    alt={item.title}
                    objectFit="cover"
                    loading="lazy"
                    className="w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
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
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
            >
              View Full Portfolio <ArrowRight size={16} />
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
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white z-50 p-2 transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-4 md:left-12 text-white/30 hover:text-white z-50 p-4 transition-colors"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={48} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={getPortfolioImage(
                filteredItems[lightboxIndex].imageUrl,
                lightboxIndex
              )}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[85vh] max-w-[85vw] object-contain shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 md:right-12 text-white/30 hover:text-white z-50 p-4 transition-colors"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={48} />
            </button>

            <div className="absolute bottom-8 text-center text-white w-full pointer-events-none">
              <h3 className="font-serif text-2xl">{filteredItems[lightboxIndex].title}</h3>
              <p className="font-sans text-xs uppercase tracking-widest text-white/50 mt-2">
                {lightboxIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
