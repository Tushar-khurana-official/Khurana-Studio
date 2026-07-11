import { FadeIn } from "@/components/fade-in";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { useGetStudioStats } from "@workspace/api-client-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export const AboutSection = () => {
  const { data: stats } = useGetStudioStats();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  const displayStats = [
    { label: "Years Experience", value: stats?.yearsExperience || 10, suffix: "+" },
    { label: "Happy Clients", value: stats?.happyClients || 1000, suffix: "+" },
    { label: "Photos Delivered", value: stats?.photosDelivered || 5000, suffix: "+" },
    { label: "Client Rating", value: stats?.clientRating || 4.9, suffix: "★", decimals: 1 },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative" id="about">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">

          <div className="md:col-span-5 lg:col-span-5 relative">
            <FadeIn direction="right">
              <div className="relative aspect-[4/5] overflow-hidden">
                <ImageWithFallback
                  src="/images/about-photographer.jpg"
                  fallbackSrc="https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&q=80"
                  alt="Khurana Studio Photographer"
                  objectFit="cover"
                  loading="lazy"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 border border-black/10 m-4 pointer-events-none z-10" />
              </div>
            </FadeIn>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-studio-bg-alt -z-10 hidden md:block" />
          </div>

          <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center">
            <FadeIn>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-foreground">
                The Art of <br />
                <span className="italic text-muted-foreground">Storytelling</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="font-sans text-muted-foreground space-y-6 text-base md:text-lg font-light leading-relaxed mb-12">
                <p>
                  At Khurana Studio, we believe that a photograph is more than just an image—it's
                  a time capsule. For over a decade, we have dedicated ourselves to the craft of
                  visual storytelling, capturing the ephemeral moments that define our lives.
                </p>
                <p>
                  Our aesthetic is rooted in editorial elegance and cinematic precision. We
                  approach every session not just as photographers, but as artists commissioned
                  to create your personal legacy. Whether it's a grand wedding or an intimate
                  portrait, our lens finds the poetry in the present.
                </p>
              </div>
            </FadeIn>

            <div
              ref={ref}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border"
            >
              {displayStats.map((stat, idx) => (
                <FadeIn key={idx} delay={0.3 + idx * 0.1}>
                  <div className="flex flex-col">
                    <div className="font-serif text-4xl lg:text-5xl text-foreground mb-2 flex items-baseline">
                      {inView ? (
                        <CountUp
                          end={stat.value}
                          decimals={stat.decimals || 0}
                          duration={2.5}
                          useEasing
                        />
                      ) : (
                        "0"
                      )}
                      <span className="text-2xl ml-1 text-studio-silver">{stat.suffix}</span>
                    </div>
                    <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
