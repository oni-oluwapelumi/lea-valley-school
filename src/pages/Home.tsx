import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  BookOpen,
  Globe,
  GraduationCap,
  Palette,
  Heart,
  Sun,
  Scale,
  Users,
  Quote,
  Calendar,
  MapPin,
} from 'lucide-react';
import Button from '@/components/Button';
import AcademicCard from '@/components/AcademicCard';
import NewsCard from '@/components/NewsCard';
import CTASection from '@/components/CTASection';
import useReveal from '@/hooks/useReveal';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { levels, curriculum, pillars, testimonials, newsItems as demoNews, school } from '@/data/content';
import type { NewsItem } from '@/data/content';

type DbNews = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  image_url: string | null;
  category: string;
  published_at: string;
};

function dbToNewsItem(row: DbNews): NewsItem {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body.split('\n').filter((p) => p.trim()),
    date: row.published_at,
    category: row.category as 'News' | 'Event',
    image: row.image_url ?? 'https://images.pexels.com/photos/8617938/pexels-photo-8617938.jpeg?auto=compress&cs=tinysrgb&w=1200',
    demo: false as boolean,
  };
}

const pillarIcons = {
  graduation: GraduationCap,
  palette: Palette,
  heart: Heart,
  sun: Sun,
  scale: Scale,
  users: Users,
};

const curriculumIcons = {
  compass: Compass,
  book: BookOpen,
  globe: Globe,
};

export default function Home() {
  useReveal();
  const [liveNews, setLiveNews] = useState<NewsItem[]>([]);
  const [pageCopy, setPageCopy] = useState({
    hero_line_one: 'Inspiring Excellence.', hero_line_two: 'Building Tomorrow.',
    hero_intro: 'At Lea Valley School, we nurture confident, curious and capable learners through an education that challenges the mind, inspires creativity and develops character.', hero_image: '/school-hero.png',
    welcome_title: 'A Place to Learn, Grow & Thrive', welcome_intro: 'Lea Valley School educates children in the peaceful and verdant surroundings of Kay Farms Estate — a safe, welcoming and conducive environment for learning.', welcome_image: 'https://images.pexels.com/photos/8617938/pexels-photo-8617938.jpeg?auto=compress&cs=tinysrgb&w=1200',
    visit_title: 'Book a School Visit', visit_intro: 'Meet our team, explore our learning spaces and experience the warm community your child could become part of.',
  });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data, error }) => {
        if (!error && data) {
          setLiveNews((data as DbNews[]).map(dbToNewsItem));
        }
      });
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.from('site_content').select('content').eq('section', 'homepage').maybeSingle().then(({ data }) => {
      if (data?.content) {
        const savedContent = data.content as Partial<typeof pageCopy>;
        setPageCopy((current) => ({
          ...current,
          ...savedContent,
          welcome_intro: savedContent.welcome_intro?.replace(/\bsince\s+2012,?\s*/gi, '') || current.welcome_intro,
        }));
      }
    });
  }, []);

  const homeNews = liveNews.length > 0 ? liveNews : demoNews;

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[565px] items-center overflow-hidden bg-navy-950 lg:min-h-[560px]">
        <div className="absolute inset-0">
          <img src={pageCopy.hero_image} alt="Lea Valley pupils at school" className="h-full w-full object-cover object-[64%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/35 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto w-full max-w-[1500px] px-6 py-20 lg:px-12">
          <div className="max-w-[610px]">
              <h1 className="mt-4 text-5xl font-semibold leading-[.94] text-white sm:text-6xl xl:text-7xl">
                <span className="block">{pageCopy.hero_line_one}</span>
                <span className="mt-1 block text-gold-300">{pageCopy.hero_line_two}</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-navy-100 sm:text-lg">
                {pageCopy.hero_intro}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button to="/admissions" variant="gold" size="lg">
                  Begin Your Admission <ArrowRight className="h-5 w-5" />
                </Button>
                <Button to="/about" variant="light" size="lg">
                  Discover Lea Valley <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 hidden border-t border-white/15 bg-navy-950/75 backdrop-blur-sm md:block">
          <div className="mx-auto flex max-w-[1500px] items-center gap-10 px-12 py-4 text-sm text-white">
            <span className="mr-1 text-xs font-bold uppercase tracking-[.17em] text-gold-300">Our levels</span>
            <span className="flex items-center gap-3"><Heart className="h-7 w-7 text-gold-400" />Creche</span><span className="h-5 w-px bg-gold-500/70" />
            <span className="flex items-center gap-3"><Sun className="h-7 w-7 text-gold-400" />Nursery</span><span className="h-5 w-px bg-gold-500/70" />
            <span className="flex items-center gap-3"><BookOpen className="h-7 w-7 text-gold-400" />Primary</span>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="reveal">
              <p className="eyebrow">Welcome to Lea Valley</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-navy-900 md:text-5xl">
                {pageCopy.welcome_title}
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-700">
                <p>
                  {pageCopy.welcome_intro}
                </p>
                <p>
                  We are passionate about education and work to give children experiences that provide them with a
                  fantastic start in life, while encouraging high aspirations for their future.
                </p>
                <p>
                  We believe children, staff and families should work together to ensure pupils are challenged
                  academically, inspired creatively and supported in their emotional development — developing the
                  self-respect, confidence and self-esteem required to succeed in life.
                </p>
              </div>
              <Link
                to="/about"
                className="link-underline mt-8 text-sm font-semibold text-navy-900 hover:text-gold-600"
              >
                Discover Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="reveal relative">
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={pageCopy.welcome_image}
                  alt="Children raising their hands in class"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING JOURNEY */}
      <section className="bg-cream-100 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Our Learning Journey</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-navy-900 md:text-5xl">
              Three Stages of Growth
            </h2>
            <p className="mt-5 text-lg text-navy-600">
              From a gentle first step in Creche to confident Primary learners, every stage is designed to nurture,
              challenge and inspire.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {levels.map((level, i) => (
              <div key={level.slug} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <AcademicCard level={level} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAMILY EXPERIENCE */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white md:py-28">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(110deg,transparent,rgba(245,180,64,.12))] lg:block" />
        <div className="relative mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20">
            <div className="reveal">
              <p className="eyebrow-light">A school you can feel good about</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Why Families Choose<br />Lea Valley</h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy-100">
                A brilliant start is about more than lessons. It is about feeling known, supported and inspired every day.
              </p>
              <div className="mt-8 border-l-2 border-gold-400 pl-5">
                <p className="font-serif text-2xl italic leading-snug text-white">“Our promise is to help every child become a confident learner and a kind, capable person.”</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[.18em] text-gold-300">The Lea Valley Team</p>
              </div>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                ['Strong foundations', 'A balanced blend of academic challenge, creativity and character development.'],
                ['A caring community', 'Warm relationships between pupils, families and dedicated staff.'],
                ['Space to thrive', 'A calm, welcoming environment in the peaceful Kay Farms Estate.'],
                ['A confident future', 'Children are encouraged to be curious, resilient and ready for what comes next.'],
              ].map(([title, copy], index) => (
                <article key={title} className="reveal bg-navy-900/80 p-7 transition-colors hover:bg-navy-800" style={{ transitionDelay: `${index * 80}ms` }}>
                  <span className="font-serif text-4xl text-gold-400">0{index + 1}</span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-200">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISIT CTA */}
      <section className="bg-cream-100 py-16 md:py-20">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal grid gap-8 border-y border-gold-300 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Come and see Lea Valley</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight text-navy-900 md:text-5xl">{pageCopy.visit_title}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-700">{pageCopy.visit_intro}</p>
              <p className="mt-5 flex items-center gap-2 text-sm font-medium text-navy-700"><MapPin className="h-4 w-4 text-gold-600" /> Kay Farms Estate, Obawole, Iju, Lagos</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button to="/admissions" variant="gold" size="lg">Request a Visit <Calendar className="h-5 w-5" /></Button>
              <Button to="/contact" variant="outline" size="lg">Speak with Us <ArrowRight className="h-5 w-5" /></Button>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="relative overflow-hidden bg-navy-950 section-py text-white">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal max-w-2xl">
            <p className="eyebrow-light">Our Curriculum</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">The Best of Three Approaches</h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-100">
              Lea Valley combines Montessori techniques, the Nigerian curriculum and selected aspects of the British
              curriculum — creating a carefully balanced, all-round learning experience.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-white/10 md:grid-cols-3">
            {curriculum.map((c) => {
              const Icon = curriculumIcons[c.icon];
              return (
                <div
                  key={c.name}
                  className="reveal bg-navy-900/60 p-8 transition-colors hover:bg-navy-900"
                  style={{ transitionDelay: '0ms' }}
                >
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
        </div>
      </section>

      {/* WHY LEA VALLEY */}
      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Why Lea Valley?</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-navy-900 md:text-5xl">
              An Education That Shapes the Whole Child
            </h2>
          </div>
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[p.icon];
              return (
                <div key={p.title} className="reveal flex gap-5" style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm border border-navy-200 text-navy-800">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-navy-900">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SCHOOL ENVIRONMENT */}
      <section className="bg-cream-100 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="reveal order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/8200445/pexels-photo-8200445.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Peaceful tree-lined residential surroundings"
                className="aspect-[4/3] w-full rounded-sm object-cover"
              />
            </div>
            <div className="reveal order-1 lg:order-2">
              <p className="eyebrow">Our Environment</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-navy-900 md:text-5xl">
                A Peaceful Place to Learn &amp; Grow
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-700">
                Lea Valley School is situated within the peaceful and verdant surroundings of Kay Farms Estate,
                providing children with a safe, welcoming and conducive environment for learning.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Peaceful surroundings away from the noise of the city',
                  'A conducive learning environment that helps children focus',
                  'A welcoming school community for families of all backgrounds',
                  'Space for children to learn, play and grow with confidence',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" />
                    <span className="text-navy-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SCHOOL LIFE PREVIEW */}
      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">School Life</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-navy-900 md:text-5xl">
                Learning, Creativity &amp; Community
              </h2>
            </div>
            <Button to="/school-life" variant="outline" size="md">
              Explore School Life
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Asymmetric gallery */}
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <div className="reveal col-span-2 row-span-2 overflow-hidden rounded-sm">
              <img
                src="https://images.pexels.com/photos/12448839/pexels-photo-12448839.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Classroom learning"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="reveal overflow-hidden rounded-sm">
              <img
                src="https://images.pexels.com/photos/8612986/pexels-photo-8612986.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Creative activities"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="reveal overflow-hidden rounded-sm">
              <img
                src="https://images.pexels.com/photos/13891322/pexels-photo-13891322.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Play and exploration"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="reveal overflow-hidden rounded-sm">
              <img
                src="https://images.pexels.com/photos/18449719/pexels-photo-18449719.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="School community"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="reveal overflow-hidden rounded-sm">
              <img
                src="https://images.pexels.com/photos/14554003/pexels-photo-14554003.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="School events"
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-navy-900 section-py text-white">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="eyebrow-light justify-center">Parent Voices</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">What Our Families Say</h2>
            <p className="mt-4 text-sm text-navy-300">
              The testimonials below are placeholder content — they will be replaced with genuine statements from Lea
              Valley families.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="reveal flex flex-col rounded-sm border border-white/10 bg-navy-800/50 p-8"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Quote className="h-8 w-8 text-gold-400" />
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-navy-100">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-navy-300">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS & EVENTS */}
      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">News &amp; Events</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-navy-900 md:text-5xl">
                Latest from Lea Valley
              </h2>
              <p className="mt-4 text-sm text-navy-500">
                {liveNews.length > 0
                  ? 'The latest stories and events from our school community.'
                  : 'The stories below are demo content — they will be replaced with real school news and events.'}
              </p>
            </div>
            <Button to="/news" variant="outline" size="md">
              View All News &amp; Events
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {homeNews.map((item, i) => (
              <div key={item.id} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS CTA */}
      <CTASection
        title="Start Your Lea Valley Journey"
        copy="Give your child an inspiring start in a school community dedicated to learning, confidence and personal growth."
      />
    </>
  );
}
