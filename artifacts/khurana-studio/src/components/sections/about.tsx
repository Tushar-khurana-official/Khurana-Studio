import { FadeIn } from "@/components/fade-in";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { useGetStudioStats } from "@workspace/api-client-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export const AboutSection = () => {
  const { data: stats } = useGetStudioStats();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  const displayStats = [
    { label: "Years Experience",    value: stats?.yearsExperience ?? 10,   suffix: "+",  decimals: 0 },
    { label: "Projects Completed",  value: stats?.happyClients    ?? 500,  suffix: "+",  decimals: 0 },
    { label: "Happy Clients",       value: stats?.happyClients    ?? 1000, suffix: "+",  decimals: 0 },
    { label: "Awards Received",     value: 24,                             suffix: "",   decimals: 0 },
  ];

  return (
    <section className="py-28 md:py-36 bg-background relative" id="about">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-28 items-center">

          {/* Image column */}
          <div className="md:col-span-5 relative">
            <FadeIn direction="right">
              <div className="relative aspect-[4/5] overflow-hidden">
                <ImageWithFallback
                  src="/images/about-photographer.jpg"
                  fallbackSrc="https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&q=80"
                  alt="Khurana Studio Photographer"
                  objectFit="cover"
                  loading="lazy"
                  className="w-full h-full transform scale-100 hover:scale-[1.03] transition-transform duration-[1200ms] ease-out"
                />
                {/* Inner frame accent */}
                <div className="absolute inset-0 border border-black/10 m-5 pointer-events-none z-10" />
              </div>
            </FadeIn>
            {/* Decorative block */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-studio-bg-alt -z-10 hidden md:block" />
          </div>

          {/* Content column */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <FadeIn>
              <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-5 block">
                Our Story
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.05] text-foreground">
                The Art of <br />
                <em className="italic text-muted-foreground not-italic" style={{ fontStyle: 'italic' }}>Storytelling</em>
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="font-sans text-muted-foreground space-y-5 text-base md:text-[1.05rem] font-light leading-[1.82] mb-12 max-w-[600px]">
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

            {/* Stats */}
            <div
              ref={ref}
              className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 pt-10 border-t border-border"
            >
              {displayStats.map((stat, idx) => (
                <FadeIn key={idx} delay={0.25 + idx * 0.1}>
                  <div className="flex flex-col">
                    <div className="font-serif text-4xl lg:text-5xl text-foreground mb-1.5 flex items-baseline">
                      {inView ? (
                        <CountUp
                          end={stat.value}
                          decimals={stat.decimals}
                          duration={2.8}
                          useEasing
                        />
                      ) : (
                        <span>0</span>
                      )}
                      {stat.suffix && (
                        <span className="text-xl ml-0.5 text-studio-silver font-sans">{stat.suffix}</span>
                      )}
                    </div>
                    <span className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
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
