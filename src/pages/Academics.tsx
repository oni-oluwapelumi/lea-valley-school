import { Compass, BookOpen, Globe, Check } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import useReveal from '@/hooks/useReveal';
import { levels, curriculum } from '@/data/content';
import { useManagedPageHeader } from '@/hooks/useManagedPageHeader';

const curriculumIcons = {
  compass: Compass,
  book: BookOpen,
  globe: Globe,
};

export default function Academics() {
  useReveal();
  const header = useManagedPageHeader('academics_header', { eyebrow: 'Academics', title: 'Our Learning Journey', subtitle: 'From Creche to Primary, every stage at Lea Valley is designed to nurture, challenge and inspire.', image: 'https://images.pexels.com/photos/31773583/pexels-photo-31773583.jpeg?auto=compress&cs=tinysrgb&w=1920' });

  return (
    <>
      <PageHeader
        {...header}
      />

      {/* Levels */}
      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Three Stages</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
              Creche, Nursery &amp; Primary
            </h2>
            <p className="mt-5 text-lg text-navy-600">
              Lea Valley School currently offers three stages of education, each carefully designed to meet children
              where they are and help them grow with confidence.
            </p>
          </div>

          <div className="mt-14 space-y-8">
            {levels.map((level, i) => (
              <div
                key={level.slug}
                className={`reveal grid items-center gap-8 rounded-sm border border-navy-100 bg-white p-6 shadow-sm md:p-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="overflow-hidden rounded-sm">
                  <img src={level.image} alt={level.name} className="aspect-[4/3] w-full object-cover" />
                </div>
                <div>
                  <span className="rounded-sm bg-gold-400 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-950">
                    {level.name}
                  </span>
                  <h3 className="mt-4 font-serif text-3xl font-semibold text-navy-900">{level.tagline}</h3>
                  <p className="mt-4 text-base leading-relaxed text-navy-700">{level.longDescription}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {level.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-navy-700">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-600" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blended approach */}
      <section className="bg-navy-950 section-py text-white">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal max-w-2xl">
            <p className="eyebrow-light">Our Blended Approach</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              The Best of Three Approaches
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-100">
              Our curriculum is a carefully balanced combination of three educational systems, designed to provide
              children with a comprehensive, all-round learning experience.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {curriculum.map((c) => {
              const Icon = curriculumIcons[c.icon];
              return (
                <div key={c.name} className="reveal rounded-sm border border-white/10 bg-navy-900/60 p-8">
                  <span className="flex h-14 w-14 items-center justify-center rounded-sm bg-gold-400 text-navy-950">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-semibold text-white">{c.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-100">{c.summary}</p>
                  <p className="mt-4 text-sm leading-relaxed text-navy-300">{c.detail}</p>
                </div>
              );
            })}
          </div>
          <p className="reveal mt-10 rounded-sm border border-gold-400/20 bg-gold-400/5 p-5 text-sm leading-relaxed text-navy-100">
            Note: Lea Valley incorporates <em>selected aspects</em> of the British curriculum to enrich learning. We do
            not follow the complete British curriculum in isolation; it complements our core Nigerian programme.
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to Begin?"
        copy="Discover how Lea Valley can give your child an inspiring start. Enquire about admission or contact us to learn more."
      />
    </>
  );
}
