import { FadeIn } from "@/components/fade-in";
import { useListTestimonials, getListTestimonialsQueryKey } from "@workspace/api-client-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const TestimonialsSection = () => {
  const { data: testimonials, isLoading } = useListTestimonials(
    { featured: true },
    { query: { queryKey: getListTestimonialsQueryKey({ featured: true }) } }
  );

  return (
    <section className="py-24 md:py-32 bg-studio-bg-alt relative">
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

        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center text-center gap-6">
              <Skeleton className="w-20 h-20 rounded-full" />
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-48 h-6" />
            </div>
          ) : (
            <FadeIn delay={0.2}>
              <Swiper
                modules={[Pagination, EffectFade, Autoplay]}
                effect="fade"
                pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                className="testimonials-swiper"
              >
                {testimonials?.map((t, idx) => (
                  <SwiperSlide key={t.id}>
                    <div className="flex flex-col items-center text-center px-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border border-border">
                        <img 
                          src={t.clientPhotoUrl || `/images/avatar-${(idx % 3) + 1}.jpg`} 
                          alt={t.clientName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex gap-1 mb-6 text-foreground">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill={i < t.rating ? "currentColor" : "none"} strokeWidth={1} />
                        ))}
                      </div>
                      
                      <blockquote className="font-serif text-xl md:text-3xl font-light leading-relaxed text-foreground mb-8">
                        "{t.review}"
                      </blockquote>
                      
                      <div className="font-sans">
                        <div className="text-sm font-medium tracking-wide uppercase text-foreground mb-1">
                          {t.clientName}
                        </div>
                        <div className="text-xs text-muted-foreground tracking-widest uppercase">
                          {t.serviceType} {t.clientLocation ? `· ${t.clientLocation}` : ''}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-pagination-custom flex justify-center gap-3 mt-12" />
            </FadeIn>
          )}
        </div>
      </div>
      <style>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: var(--color-muted-foreground);
          opacity: 0.3;
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          opacity: 1;
          background-color: var(--color-foreground);
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};
