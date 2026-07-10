import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/85 dark:bg-black/85 backdrop-blur-md border-b border-studio-border/20 py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex flex-col items-start z-50 relative cursor-pointer">
            <span className={`font-serif text-3xl font-bold tracking-widest transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-white drop-shadow-md'}`}>
              KS
            </span>
            <span className={`font-sans text-[0.55rem] tracking-[0.3em] font-medium uppercase transition-colors duration-300 ${isScrolled ? 'text-muted-foreground' : 'text-white/80 drop-shadow-sm'}`}>
              Khurana Studio
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-sans text-sm tracking-wide transition-colors hover:text-studio-silver ${
                  location === link.path 
                    ? (isScrolled ? 'text-foreground font-medium' : 'text-white font-medium')
                    : (isScrolled ? 'text-muted-foreground' : 'text-white/80')
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/book"
              className={`font-sans text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all duration-300 border ${
                isScrolled
                  ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                  : 'bg-white text-black border-white hover:bg-transparent hover:text-white'
              }`}
            >
              Book Session
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden z-50 p-2 ${isScrolled || isOpen ? 'text-foreground' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className={isOpen ? 'text-foreground' : ''} /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8 w-full">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-serif text-3xl transition-colors ${
                    location === link.path ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-12 h-px bg-border my-4" />
              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                className="font-sans text-sm uppercase tracking-widest px-8 py-4 bg-primary text-primary-foreground w-full max-w-[240px] text-center rounded-sm"
              >
                Book Session
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
