import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { useLenis } from "@/hooks/use-lenis";
import { FadeIn } from "@/components/fade-in";
import { useListPortfolio, getListPortfolioQueryKey } from "@workspace/api-client-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const PortfolioPage = () => {
  useLenis();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: portfolioItems, isLoading } = useListPortfolio(
    {}, 
    { query: { queryKey: getListPortfolioQueryKey() } }
  );

  const categories = ["all", "wedding", "portrait", "fashion", "commercial", "products"];

  const filteredItems = portfolioItems?.filter(item => 
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
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
  };

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <FadeIn>
              <h1 className="font-serif text-5xl md:text-7xl mb-6 text-foreground">The Gallery</h1>
              <p className="font-sans text-muted-foreground max-w-2xl mx-auto font-light">
                A curated selection of our favorite moments, captured across the globe.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-8 font-sans text-xs uppercase tracking-widest whitespace-nowrap justify-center min-w-max md:min-w-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-colors relative pb-2 ${
                    activeCategory === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div 
                      layoutId="activeCategoryPort" 
                      className="absolute bottom-0 left-0 w-full h-px bg-foreground" 
                    />
                  )}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {isLoading ? (
              Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className={`w-full rounded-none mb-6 ${i % 2 === 0 ? 'h-96' : 'h-64'}`} />
              ))
            ) : (
              <AnimatePresence>
                {filteredItems?.map((item, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    key={item.id}
                    className="group relative overflow-hidden cursor-pointer mb-6 break-inside-avoid"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center text-white">
                      <span className="font-serif text-2xl md:text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center px-4">{item.title}</span>
                    </div>
                    <img 
                      src={item.imageUrl || `/images/portfolio-${(index % 6) + 1}.jpg`} 
                      alt={item.title}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredItems && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 md:p-12"
              onClick={closeLightbox}
            >
              <button 
                className="absolute top-6 right-6 text-white/50 hover:text-white z-50 p-2 transition-colors"
                onClick={closeLightbox}
              >
                <X size={32} />
              </button>
              
              <button 
                className="absolute left-4 md:left-12 text-white/30 hover:text-white z-50 p-4 transition-colors"
                onClick={prevImage}
              >
                <ChevronLeft size={48} />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={filteredItems[lightboxIndex].imageUrl || `/images/portfolio-${(lightboxIndex % 6) + 1}.jpg`}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[85vh] max-w-[85vw] object-contain shadow-2xl shadow-black/50"
                onClick={(e) => e.stopPropagation()}
              />

              <button 
                className="absolute right-4 md:right-12 text-white/30 hover:text-white z-50 p-4 transition-colors"
                onClick={nextImage}
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
      </main>
      <Footer />
    </>
  );
};

export default PortfolioPage;
