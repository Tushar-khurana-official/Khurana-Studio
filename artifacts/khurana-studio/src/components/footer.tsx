import { Link } from 'wouter';
import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-studio-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex flex-col items-start mb-6">
              <span className="font-serif text-4xl font-bold tracking-widest text-studio-silver">KS</span>
              <span className="font-sans text-[0.65rem] tracking-[0.3em] font-medium uppercase text-white/70 mt-1">
                Khurana Studio
              </span>
            </Link>
            <p className="text-white/60 font-sans text-sm leading-relaxed mb-6">
              Capturing stories, creating timeless memories. Luxury photography services spanning weddings, fashion, and editorial portraits.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-studio-silver transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-studio-silver transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-studio-silver transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-studio-silver transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-studio-silver">Quick Links</h4>
            <ul className="flex flex-col gap-3 font-sans text-sm text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-studio-silver">Services</h4>
            <ul className="flex flex-col gap-3 font-sans text-sm text-white/60">
              <li><Link href="/services" className="hover:text-white transition-colors">Wedding Photography</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Editorial Portraits</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Fashion Campaigns</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Commercial & Product</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Book a Session</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-studio-silver">Stay Updated</h4>
            <p className="text-white/60 font-sans text-sm mb-4">
              Subscribe to our newsletter for exclusive offers and our latest work.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-studio-silver w-full"
              />
              <button className="bg-studio-silver text-black px-4 py-3 text-sm font-medium tracking-wide uppercase hover:bg-white transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-sans text-white/40">
          <p>&copy; {new Date().getFullYear()} Khurana Studio. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white/70">Privacy Policy</a>
            <a href="#" className="hover:text-white/70">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
