import { FadeIn } from "@/components/fade-in";
import { Link } from "wouter";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Essential",
    price: "₹1.5L",
    desc: "Perfect for intimate gatherings and pre-wedding sessions.",
    features: ["1 Photographer", "4 Hours Coverage", "100 Retouched Images", "Online Gallery"],
    highlight: false
  },
  {
    name: "Premium",
    price: "₹3.5L",
    desc: "Comprehensive coverage for single-day weddings.",
    features: ["2 Photographers + 1 Cinematographer", "10 Hours Coverage", "400 Retouched Images", "Cinematic Highlight Film", "Premium Photo Album"],
    highlight: true
  },
  {
    name: "Luxury",
    price: "₹6.0L",
    desc: "Complete visual storytelling for multi-day celebrations.",
    features: ["Full Team (Photo & Video)", "2 Days Coverage", "800+ Retouched Images", "Cinematic Film + Teaser", "2 Luxury Albums", "Drone Coverage"],
    highlight: false
  },
  {
    name: "Editorial",
    price: "Custom",
    desc: "Bespoke production for high-end fashion and destination weddings.",
    features: ["Creative Director on site", "Unlimited Coverage", "Same-day Edits", "Archival Quality Prints", "Custom Requirements"],
    highlight: false
  }
];

export const PricingSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Investment</h2>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              We offer curated packages tailored to different needs, ensuring every story is told with the attention it deserves.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {packages.map((pkg, idx) => (
            <FadeIn key={pkg.name} delay={idx * 0.1} className="h-full">
              <div className={`h-full flex flex-col p-8 md:p-10 border transition-all duration-500 ${
                pkg.highlight 
                  ? 'border-studio-silver bg-studio-dark text-white shadow-xl shadow-black/5 scale-100 xl:scale-105 z-10 relative' 
                  : 'border-border bg-card text-card-foreground hover:border-foreground/20'
              }`}>
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-studio-silver text-black text-[10px] uppercase tracking-widest font-medium">
                    Most Popular
                  </span>
                )}
                
                <h3 className={`font-serif text-2xl mb-2 ${pkg.highlight ? 'text-white' : 'text-foreground'}`}>
                  {pkg.name}
                </h3>
                <div className={`font-sans text-3xl font-light mb-4 ${pkg.highlight ? 'text-studio-silver' : 'text-foreground'}`}>
                  {pkg.price}
                </div>
                <p className={`font-sans text-sm font-light mb-8 h-10 ${pkg.highlight ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {pkg.desc}
                </p>
                
                <ul className="flex flex-col gap-4 mb-10 flex-grow">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check size={16} className={`mt-0.5 shrink-0 ${pkg.highlight ? 'text-studio-silver' : 'text-foreground/40'}`} />
                      <span className={`font-sans text-sm ${pkg.highlight ? 'text-white/90' : 'text-foreground/80'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/book?package=${pkg.name.toLowerCase()}`}
                  className={`w-full py-4 text-center text-sm uppercase tracking-widest transition-colors ${
                    pkg.highlight
                      ? 'bg-studio-silver text-black hover:bg-white'
                      : 'border border-border text-foreground hover:bg-foreground hover:text-background'
                  }`}
                >
                  Inquire Now
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
