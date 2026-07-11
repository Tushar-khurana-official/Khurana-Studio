import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const isScrolled = scrollY > 60;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        style={{
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          backgroundColor: isScrolled ? 'rgba(12,12,12,.72)' : 'rgba(18,18,18,.20)',
          borderBottom: `1px solid ${isScrolled ? 'rgba(255,255,255,.10)' : 'rgba(255,255,255,.08)'}`,
          boxShadow: isScrolled ? '0 4px 32px rgba(0,0,0,.18)' : 'none',
          transition: 'background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, padding 0.4s ease',
        }}
        className={`fixed top-0 w-full z-50 ${isScrolled ? 'py-3' : 'py-5'}`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col items-start z-50 relative cursor-pointer">
            <span className="font-serif text-3xl font-bold tracking-widest text-white drop-shadow-sm transition-opacity duration-300 group-hover:opacity-75">
              KS
            </span>
            <span className="font-sans text-[0.5rem] tracking-[0.32em] font-medium uppercase text-white/65 mt-px">
              Khurana Studio
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative font-sans text-[0.8rem] tracking-[0.08em] transition-colors duration-300 pb-1 ${
                    isActive ? 'text-white' : 'text-white/65 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 w-full h-px bg-white/80"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}

            <Link
              href="/book"
              className="font-sans text-[0.7rem] uppercase tracking-widest px-5 py-2.5 border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 ml-2"
            >
              Book Session
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ backgroundColor: 'rgba(10,10,10,.97)', backdropFilter: 'blur(20px)' }}
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center justify-center gap-10 flex-1"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.07 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-serif text-4xl tracking-wide ${
                      location === link.path ? 'text-white' : 'text-white/50 hover:text-white'
                    } transition-colors duration-200`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <Link
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-xs uppercase tracking-widest px-10 py-4 bg-white text-black hover:bg-studio-silver transition-colors duration-200 block"
                >
                  Book Session
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
