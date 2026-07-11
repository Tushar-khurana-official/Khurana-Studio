import { Link } from 'wouter';
import { Instagram, Facebook, Youtube, MessageCircle, ArrowUp } from 'lucide-react';
import { useState } from 'react';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-studio-dark text-white pt-24 pb-12 border-t border-white/[0.06] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-20">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="group flex flex-col items-start mb-7 cursor-pointer">
              <span className="font-serif text-5xl font-bold tracking-widest text-studio-silver group-hover:text-white transition-colors duration-300">
                KS
              </span>
              <span className="font-sans text-[0.55rem] tracking-[0.38em] font-medium uppercase text-white/45 mt-1">
                Khurana Studio
              </span>
            </Link>
            <p className="text-white/50 font-sans text-sm leading-relaxed mb-8 max-w-[240px]">
              Capturing stories, creating timeless memories. Luxury photography across weddings, fashion, and editorial portraits.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/khuranas.studio/', label: 'Instagram' },
                { icon: Facebook,  href: '#', label: 'Facebook' },
                { icon: Youtube,   href: '#', label: 'YouTube' },
                { icon: MessageCircle, href: '#', label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-studio-silver hover:bg-white/5 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-studio-silver tracking-wide">Quick Links</h4>
            <ul className="flex flex-col gap-3.5 font-sans text-sm text-white/50">
              {[
                { label: 'Home', href: '/' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Services', href: '/services' },
                { label: 'Journal', href: '/blog' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors duration-200 group inline-flex items-center gap-1.5">
                    <span className="w-0 h-px bg-studio-silver group-hover:w-4 transition-all duration-300 inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-studio-silver tracking-wide">Services</h4>
            <ul className="flex flex-col gap-3.5 font-sans text-sm text-white/50">
              {[
                'Wedding Photography',
                'Editorial Portraits',
                'Fashion Campaigns',
                'Commercial & Product',
                'Book a Session',
              ].map((label) => (
                <li key={label}>
                  <Link href={label === 'Book a Session' ? '/book' : '/services'} className="hover:text-white transition-colors duration-200 group inline-flex items-center gap-1.5">
                    <span className="w-0 h-px bg-studio-silver group-hover:w-4 transition-all duration-300 inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-studio-silver tracking-wide">Stay Updated</h4>
            <p className="text-white/50 font-sans text-sm mb-6 leading-relaxed">
              Subscribe for exclusive offers and our latest editorial work.
            </p>
            {subscribed ? (
              <p className="font-sans text-sm text-studio-silver font-light">
                Thank you for subscribing.
              </p>
            ) : (
              <form className="flex" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-white/30 px-4 py-3 text-sm focus:outline-none focus:border-studio-silver/60 w-full transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="bg-studio-silver text-black px-5 py-3 text-xs font-medium tracking-widest uppercase hover:bg-white transition-colors duration-200 shrink-0"
                >
                  Join
                </button>
              </form>
            )}

            {/* Contact snippet */}
            <div className="mt-8 text-white/35 font-sans text-xs leading-relaxed space-y-1">
              <p>hello@khuranas.studio</p>
              <p>+91 98765 43210</p>
              <p className="mt-2">New Delhi · India</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-white/30 font-sans text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Khurana Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 font-sans text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-white/60 font-sans text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute bottom-12 right-6 md:right-12 w-11 h-11 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-studio-silver hover:bg-white/5 transition-all duration-300 group"
      >
        <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button>
    </footer>
  );
};
