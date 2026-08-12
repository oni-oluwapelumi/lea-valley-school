import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CalendarClock, MapPin } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import { navLinks, school } from '@/data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-8xl items-center justify-end gap-4 px-5 py-2 text-[11px] sm:px-8 sm:text-xs lg:px-12">
          <span className="hidden items-center gap-2 tracking-wide sm:flex">
            <MapPin className="h-3.5 w-3.5 text-gold-400" />
            {school.location.full}
          </span>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b border-navy-100 bg-cream-50/95 transition-shadow duration-300 backdrop-blur ${scrolled ? 'shadow-md' : ''}`}>
        <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-6 py-3 lg:py-4">
            <Logo />

            <div className="hidden xl:block">
              <Button to="/admissions" variant="primary" size="lg" className="border border-gold-400 text-gold-300 hover:bg-navy-800">
                <CalendarClock className="h-5 w-5" />
                Apply for Admission
                <span aria-hidden>→</span>
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center text-navy-900 xl:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>

          <div className="hidden items-center justify-between border-t border-navy-100/70 xl:flex">
            <ul className="flex flex-1 items-center justify-center gap-10 py-3">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`relative block py-1 font-serif text-[17px] font-semibold transition-colors after:absolute after:-bottom-3 after:left-0 after:h-0.5 after:transition-all ${
                        active
                          ? 'text-gold-600 after:w-full after:bg-gold-400'
                          : 'text-navy-950 after:w-0 after:bg-gold-400 hover:text-gold-600 hover:after:w-full'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 bg-navy-950 transition-opacity duration-300 xl:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className="flex h-full flex-col px-6 pb-10 pt-24">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <li key={link.to}>
                  <Link to={link.to} className={`block border-b border-white/10 py-4 font-serif text-2xl ${active ? 'text-gold-300' : 'text-white'}`}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8">
            <Button to="/admissions" variant="gold" size="lg" className="w-full">Apply for Admission</Button>
          </div>
          <p className="mt-auto text-xs uppercase tracking-[0.2em] text-navy-300">Learning for Success</p>
        </div>
      </div>
    </>
  );
}
