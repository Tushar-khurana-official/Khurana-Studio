import { FadeIn } from "@/components/fade-in";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { useListTestimonials, getListTestimonialsQueryKey } from "@workspace/api-client-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvatarImage } from "@/lib/image-fallbacks";

export const TestimonialsSection = () => {
  const { data: testimonials, isLoading } = useListTestimonials(
    { featured: true },
    { query: { queryKey: getListTestimonialsQueryKey({ featured: true }) } }
  );

  return (
    <section className="py-28 md:py-36 bg-studio-bg-alt relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
              Words of Love
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Client Experiences</h2>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4 p-8 border border-border bg-background/60">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-24 w-full mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <FadeIn delay={0.2}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={28}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop={(testimonials?.length ?? 0) > 3}
              breakpoints={{
                640:  { slidesPerView: 1, spaceBetween: 20 },
                768:  { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 28 },
              }}
              className="testimonials-swiper !pb-14"
            >
              {testimonials?.map((t, idx) => (
                <SwiperSlide key={t.id} className="h-auto">
                  <div
                    className="flex flex-col h-full p-8 border border-border/60 relative overflow-hidden group transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.08] hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.62)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                  >
                    {/* Large decorative quotation mark */}
                    <span
                      className="absolute top-4 right-6 font-serif text-[7rem] leading-none text-foreground/[0.07] select-none pointer-events-none transition-colors duration-500 group-hover:text-foreground/[0.10]"
                      aria-hidden="true"
                    >
                      "
                    </span>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6 flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className="text-foreground/80"
                          fill={i < t.rating ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <blockquote className="flex-grow font-sans text-sm leading-relaxed text-foreground/75 font-light mb-8 relative z-10">
                      "{t.review}"
                    </blockquote>

                    {/* Divider */}
                    <div className="w-8 h-px bg-foreground/20 mb-6 flex-shrink-0" />

                    {/* Avatar + name row */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-border flex-shrink-0">
                        <ImageWithFallback
                          src={getAvatarImage(t.clientPhotoUrl, idx)}
                          alt={t.clientName}
                          objectFit="cover"
                          loading="lazy"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-serif text-base text-foreground truncate">{t.clientName}</div>
                        <div className="font-sans text-[0.65rem] text-muted-foreground uppercase tracking-widest truncate">
                          {t.serviceType}{t.clientLocation ? ` · ${t.clientLocation}` : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeIn>
        )}
      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          width: 5px;
          height: 5px;
          background-color: var(--studio-dark);
          opacity: 0.18;
          border-radius: 50%;
          transition: all 0.35s ease;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 0.85;
          background-color: var(--studio-dark);
          width: 22px;
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
};
