import { FadeIn } from "@/components/fade-in";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export const ContactCtaSection = () => {
  return (
    <section className="py-32 bg-foreground text-background text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <h2 className="font-serif text-5xl md:text-7xl mb-12 font-light leading-tight">
            Ready to Create <br />
            <span className="italic text-studio-silver">Something Beautiful?</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/book" 
              className="px-10 py-5 bg-background text-foreground text-sm uppercase tracking-widest font-medium hover:bg-studio-silver hover:text-black transition-colors"
            >
              Book a Session
            </Link>
            <a 
              href="mailto:hello@khuranas.studio" 
              className="group flex items-center gap-2 px-10 py-5 border border-background/30 text-background text-sm uppercase tracking-widest hover:border-background transition-colors"
            >
              Email Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
