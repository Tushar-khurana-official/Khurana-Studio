import { FadeIn } from "@/components/fade-in";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getServiceImage } from "@/lib/image-fallbacks";

export const ServicesSection = () => {
  const { data: services, isLoading } = useListServices({
    query: { queryKey: getListServicesQueryKey() },
  });

  const renderSkeletons = () =>
    Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-col gap-4">
        <Skeleton className="w-full aspect-[4/5] rounded-none" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ));

  return (
    <section className="py-28 md:py-36 bg-studio-bg-alt">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <FadeIn>
            <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
              What We Do
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Our Specialties</h2>
          </FadeIn>

          <FadeIn direction="left">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors group"
            >
              View All Services
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {isLoading
            ? renderSkeletons()
            : services?.slice(0, 3).map((service, index) => (
                <FadeIn key={service.id} delay={index * 0.15}>
                  <Link href={`/services#${service.id}`} className="group block cursor-pointer">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/5] mb-6">
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/0 transition-colors duration-600 z-10 pointer-events-none" />
                      <ImageWithFallback
                        src={getServiceImage(service.imageUrl, service.category)}
                        fallbackSrc={getServiceImage(undefined, service.category)}
                        alt={service.title}
                        objectFit="cover"
                        loading="lazy"
                        className="w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                      />
                      {/* Category tag */}
                      <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                        <span className="font-sans text-[0.6rem] uppercase tracking-widest bg-white/90 text-black px-3 py-1">
                          {service.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl text-foreground mb-2.5 group-hover:text-studio-silver transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="font-sans text-sm text-muted-foreground font-light mb-5 leading-relaxed line-clamp-2 max-w-[360px]">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-foreground">
                      <span className="relative">
                        View Details
                        <span className="absolute -bottom-px left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
                      </span>
                      <ArrowRight
                        size={13}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </div>
                  </Link>
                </FadeIn>
              ))}
        </div>
      </div>
    </section>
  );
};
