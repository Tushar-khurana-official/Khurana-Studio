import { Link } from "wouter";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-studio-dark text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="text-center relative z-10">
        <h1 className="font-serif text-8xl md:text-[150px] font-bold tracking-widest text-studio-silver opacity-20 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Frame Not Found</h2>
          <p className="font-sans text-sm text-white/60 mb-8 max-w-md font-light tracking-wide uppercase">
            The page you are looking for has been moved or no longer exists.
          </p>
          <Link href="/">
            <a className="group flex items-center gap-2 font-sans text-sm uppercase tracking-widest border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-colors">
              <MoveLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Studio
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
