import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { useLenis } from "@/hooks/use-lenis";
import { FadeIn } from "@/components/fade-in";
import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export const ServicesPage = () => {
  useLenis();
  const { data: services, isLoading } = useListServices({ query: { queryKey: getListServicesQueryKey() } });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-20">
            <h1 className="font-serif text-5xl md:text-7xl mb-6 text-foreground">Services</h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto font-light">
              We offer comprehensive visual storytelling services across multiple disciplines, maintaining our signature editorial approach in every frame.
            </p>
          </FadeIn>

          <div className="space-y-24 md:space-y-32">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                  <Skeleton className="w-full md:w-1/2 aspect-[4/3]" />
                  <div className="w-full md:w-1/2 space-y-4">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-3/4 h-10" />
                    <Skeleton className="w-full h-24" />
                  </div>
                </div>
              ))
            ) : (
              services?.map((service, index) => (
                <div 
                  key={service.id} 
                  id={service.id.toString()}
                  className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 lg:gap-20 items-center group`}
                >
                  <div className="w-full md:w-1/2 relative overflow-hidden">
                    <FadeIn direction={index % 2 === 1 ? "left" : "right"}>
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10 z-10 transition-colors group-hover:bg-transparent duration-700" />
                        <img 
                          src={service.imageUrl || `/images/service-${service.category.toLowerCase()}.jpg`}
                          alt={service.title}
                          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                      </div>
                    </FadeIn>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <FadeIn direction="up" delay={0.2}>
                      <span className="font-sans text-xs uppercase tracking-widest text-studio-silver mb-4 block">
                        {service.category}
                      </span>
                      <h2 className="font-serif text-4xl lg:text-5xl mb-6 text-foreground">
                        {service.title}
                      </h2>
                      <p className="font-sans text-muted-foreground font-light leading-relaxed mb-8 text-base lg:text-lg">
                        {service.description}
                      </p>
                      
                      {service.startingPrice && (
                        <div className="mb-8 font-sans text-sm tracking-wide text-foreground">
                          Investment begins at <span className="font-medium text-studio-silver ml-2">{service.startingPrice}</span>
                        </div>
                      )}
                      
                      <Link 
                        href={`/book?service=${service.category.toLowerCase()}`}
                        className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
                      >
                        Inquire Availability <ArrowRight size={16} />
                      </Link>
                    </FadeIn>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
