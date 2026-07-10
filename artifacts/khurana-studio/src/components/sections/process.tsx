import { FadeIn } from "@/components/fade-in";

const steps = [
  { num: "01", title: "Consultation", desc: "We meet to discuss your vision, style preferences, and the unique story you want to tell." },
  { num: "02", title: "Booking", desc: "Securing your date and formalizing the agreement for our services." },
  { num: "03", title: "Planning", desc: "Detailed timeline creation, location scouting, and aesthetic moodboard development." },
  { num: "04", title: "Shoot Day", desc: "A relaxed, guided experience where we capture genuine moments and crafted portraits." },
  { num: "05", title: "Editing", desc: "Meticulous color grading and retouching to achieve our signature cinematic look." },
  { num: "06", title: "Delivery", desc: "Presentation of your curated gallery and luxury printed heirlooms." },
];

export const ProcessSection = () => {
  return (
    <section className="py-24 md:py-32 bg-studio-dark text-white border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <FadeIn>
            <span className="font-sans text-xs uppercase tracking-widest text-studio-silver mb-4 block">
              The Journey
            </span>
            <h2 className="font-serif text-4xl md:text-5xl">How We Work</h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-white/10 z-0" />
          
          {steps.map((step, index) => (
            <FadeIn key={step.num} delay={index * 0.15} className="relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-studio-dark border border-studio-silver/30 flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-2 rounded-full border border-white/5" />
                  <span className="font-serif text-3xl text-studio-silver">{step.num}</span>
                </div>
                <h3 className="font-serif text-2xl mb-4">{step.title}</h3>
                <p className="font-sans text-sm text-white/60 font-light leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
