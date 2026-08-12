import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Facebook, Instagram, Music2 } from 'lucide-react';
import Logo from './Logo';
import { navLinks, school } from '@/data/content';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export default function Footer() {
  const [settings, setSettings] = useState({ address: school.location.full, phone: '', email: '', facebook: '', instagram: '', tiktok: '' });
  useEffect(() => { if (!isSupabaseConfigured) return; supabase.from('site_content').select('content').eq('section', 'site_settings').maybeSingle().then(({ data }) => { if (data?.content) setSettings((current) => ({ ...current, ...(data.content as Partial<typeof current>) })); }); }, []);
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto max-w-8xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-200">
              A private school in Lagos nurturing confident, curious and capable learners.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-navy-200">
              <MapPin className="h-4 w-4 text-gold-400" />
              {settings.address}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Explore</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-navy-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Admissions</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/admissions" className="text-sm text-navy-200 transition-colors hover:text-white">
                  Apply for Admission
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-sm text-navy-200 transition-colors hover:text-white">
                  Admissions Enquiry
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-navy-200 transition-colors hover:text-white">
                  Contact the School
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-sm text-navy-200 transition-colors hover:text-white">
                  Our Learning Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Our Community</h3>
            <p className="mt-5 text-sm leading-relaxed text-navy-200">
              Admission is open to children of all races, nationalities, religions, creeds and socioeconomic backgrounds.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                ['Facebook', settings.facebook, Facebook], ['Instagram', settings.instagram, Instagram], ['TikTok', settings.tiktok, Music2],
              ].map(([label, href, Icon]) => {
                const SocialIcon = Icon as typeof Facebook;
                return href ? <a key={label as string} href={href as string} target="_blank" rel="noreferrer" aria-label={label as string} className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-navy-200 transition hover:border-gold-300 hover:text-gold-300"><SocialIcon className="h-5 w-5" /></a> : null;
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-navy-300 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {school.name}. {school.motto}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="flex items-center gap-1">
              {school.location.full}
              <ArrowUpRight className="h-3 w-3" />
            </p>
            <Link to="/admin/login" className="font-medium text-gold-300 transition hover:text-white">
              School Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
