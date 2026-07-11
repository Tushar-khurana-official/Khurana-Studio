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
      />

      {/* Cinematic overlay — spec: rgba(0,0,0,.35) → rgba(0,0,0,.55) */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.55))' }}
      />

      {/* Bottom vignette for extra depth */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[2] bg-gradient-to-t from-black/30 to-transparent" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center text-white">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-white/60">
            Luxury Photography Studio · New Delhi
          </span>
        </motion.div>

        {/* Main heading — spec: clamp(64px,8vw,110px), line-height 0.92, letter-spacing -2px */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light text-white mb-10 drop-shadow-lg"
          style={{
            fontSize: 'clamp(56px, 8vw, 110px)',
            lineHeight: 0.92,
            letterSpacing: '-2px',
          }}
        >
          Capturing Stories,{' '}
          <br className="hidden sm:block" />
          <em className="not-italic" style={{ fontStyle: 'italic' }}>Creating Timeless</em>
          <br className="hidden sm:block" />
          Memories.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-xs md:text-sm tracking-[0.22em] uppercase text-white/70 mb-14 font-light"
        >
          Wedding &nbsp;&middot;&nbsp; Portrait &nbsp;&middot;&nbsp; Fashion &nbsp;&middot;&nbsp; Commercial
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href="/book"
            className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 bg-white text-black text-xs uppercase tracking-[0.18em] font-medium overflow-hidden w-full sm:w-auto hover:scale-[1.03] hover:-translate-y-px transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,.35)]"
          >
            <span className="relative z-10">Book Your Session</span>
            <ArrowRight size={15} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-studio-silver transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-9 py-4 border border-white/35 text-white text-xs uppercase tracking-[0.18em] hover:bg-white/10 hover:border-white/60 transition-all duration-300 w-full sm:w-auto"
          >
            Explore Portfolio
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 text-white/50 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.35em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
};
