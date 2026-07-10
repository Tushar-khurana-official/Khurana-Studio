import { FadeIn } from "@/components/fade-in";
import { Instagram } from "lucide-react";

const placeholders = [
  "/images/portfolio-1.jpg",
  "/images/portfolio-2.jpg",
  "/images/portfolio-3.jpg",
  "/images/service-wedding.jpg",
  "/images/service-fashion.jpg",
  "/images/portfolio-4.jpg",
];

export const InstagramSection = () => {
  return (
    <section className="py-0 bg-background border-t border-border overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2 md:col-span-3 lg:col-span-2 bg-studio-dark text-white p-12 flex flex-col justify-center items-center text-center">
          <FadeIn>
            <Instagram size={32} className="mb-6 mx-auto text-studio-silver" />
            <h2 className="font-serif text-3xl mb-3">Follow Our Journey</h2>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-sans text-sm tracking-widest text-white/60 hover:text-white transition-colors"
            >
              @khuranas.studio
            </a>
            {/* Note: In a real implementation, this would use Instagram Basic Display API */}
          </FadeIn>
        </div>
        
        {placeholders.slice(0, 4).map((src, idx) => (
          <div key={idx} className="aspect-square relative group overflow-hidden">
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
              <Instagram size={24} className="text-white transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-100" />
            </div>
            <img 
              src={src} 
              alt={`Instagram post ${idx}`} 
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
