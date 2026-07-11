import { FadeIn } from "@/components/fade-in";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { useListTestimonials, getListTestimonialsQueryKey } from "@workspace/api-client-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvatarImage } from "@/lib/image-fallbacks";

export const TestimonialsSection = () => {
  const { data: testimonials, isLoading } = useListTestimonials(
    { featured: true },
    { query: { queryKey: getListTestimonialsQueryKey({ featured: true }) } }
  );

  return (
    <section className="py-24 md:py-32 bg-studio-bg-alt relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
              Words of Love
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Client Experiences
            </h2>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4 p-8 border border-border bg-background">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24 mt-2" />
                <Skeleton className="h-24 w-full mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <FadeIn delay={0.2}>
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop={(testimonials?.length ?? 0) > 3}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 24 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 32 },
              }}
              className="testimonials-swiper !pb-14"
            >
              {testimonials?.map((t, idx) => (
                <SwiperSlide key={t.id} className="h-auto">
                  <div className="flex flex-col h-full p-8 border border-border bg-background">
                    {/* Avatar + name row */}
                    <div className="flex items-center gap-4 mb-6 flex-shrink-0">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-border flex-shrink-0">
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
                        <div className="font-sans text-xs text-muted-foreground uppercase tracking-widest truncate">
                          {t.serviceType}
                          {t.clientLocation ? ` · ${t.clientLocation}` : ""}
                        </div>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-5 flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="text-foreground"
                          fill={i < t.rating ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>

                    {/* Review text — grows to fill available space */}
                    <blockquote className="flex-grow font-sans text-sm leading-relaxed text-muted-foreground font-light">
                      "{t.review}"
                    </blockquote>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeIn>
        )}
      </div>

      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background-color: var(--color-muted-foreground);
          opacity: 0.3;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background-color: var(--color-foreground);
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
};
