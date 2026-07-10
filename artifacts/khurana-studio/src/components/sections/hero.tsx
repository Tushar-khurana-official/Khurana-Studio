import { Link } from "wouter";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 mix-blend-multiply" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center text-white mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-light leading-[1.1] mb-6 drop-shadow-lg">
            Capturing Stories, <br className="hidden md:block" />
            <span className="italic text-white/90">Creating Timeless</span> <br className="hidden md:block" />
            Memories.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <p className="font-sans text-sm md:text-base tracking-[0.2em] uppercase text-white/80 mb-12 max-w-2xl mx-auto font-light">
            Luxury Wedding &middot; Portrait &middot; Fashion &middot; Commercial
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link 
            href="/book" 
            className="group relative px-8 py-4 bg-white text-black text-sm uppercase tracking-widest font-medium overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Book Your Session <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-studio-silver transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
          </Link>
          
          <Link 
            href="/portfolio" 
            className="group px-8 py-4 border border-white/50 text-white text-sm uppercase tracking-widest hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            Explore Portfolio
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/60 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
};
