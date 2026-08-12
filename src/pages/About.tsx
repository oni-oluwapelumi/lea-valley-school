import { Link } from 'react-router-dom';
import { ArrowRight, Target, Sparkles, HeartHandshake, Users } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import useReveal from '@/hooks/useReveal';
import { useManagedPageHeader } from '@/hooks/useManagedPageHeader';

const philosophy = [
  {
    icon: Target,
    title: 'High Aspirations',
    text: 'We encourage every child to aim high — academically, creatively and personally — and to believe in what they can achieve.',
  },
  {
    icon: Sparkles,
    title: 'Inspired Creatively',
    text: 'Through art, play and imaginative learning, we help children discover and express their unique talents.',
  },
  {
    icon: HeartHandshake,
    title: 'Supported Emotionally',
    text: 'Emotional development matters as much as academics. We nurture confidence, self-respect and self-esteem.',
  },
  {
    icon: Users,
    title: 'Together with Families',
    text: 'Children, staff and families work together to ensure every pupil is challenged, inspired and supported.',
  },
];

export default function About() {
  useReveal();
  const header = useManagedPageHeader('about_header', { eyebrow: 'About Us', title: 'A Place to Learn, Grow & Thrive', subtitle: 'Lea Valley School nurtures confident, curious and capable learners in the peaceful surroundings of Kay Farms Estate, Lagos.', image: 'https://images.pexels.com/photos/8617938/pexels-photo-8617938.jpeg?auto=compress&cs=tinysrgb&w=1920' });

  return (
    <>
      <PageHeader
        {...header}
      />

      {/* Our Story */}
      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="reveal">
              <p className="eyebrow">Our Story</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
                Educating with Care
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-700">
                <p>
                  Lea Valley School was founded with a simple belief: that every child deserves
                  a fantastic start in life. Set within the peaceful and verdant surroundings of Kay Farms Estate, our
                  school offers a safe, welcoming and conducive environment where children can flourish.
                </p>
                <p>
                  We are passionate about education and work to give children experiences that build strong foundations
                  while encouraging high aspirations for their future. We remain dedicated to nurturing the whole child
                  academically, creatively and emotionally.
                </p>
                <p>
                  We value children, staff and families, and believe that working together is the best way to help
                  pupils develop the self-respect, confidence and self-esteem required to succeed in life.
                </p>
              </div>
            </div>
            <div className="reveal relative">
              <img
                src="https://images.pexels.com/photos/25457343/pexels-photo-25457343.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="African schoolchildren learning outdoors"
                className="aspect-[4/5] w-full rounded-sm object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-navy-950 section-py text-white">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal max-w-2xl">
            <p className="eyebrow-light">Our Approach</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">A Balanced, Blended Education</h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-100">
              We combine Montessori techniques, the Nigerian curriculum and selected aspects of the British curriculum
              to create a comprehensive, all-round learning experience — drawing on the strengths of each system.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-white/10 md:grid-cols-3">
            {[
              { n: '01', t: 'Montessori Techniques', d: 'Child-centred, hands-on learning that nurtures independence and discovery in the early years.' },
              { n: '02', t: 'Nigerian Curriculum', d: 'The strong national foundation that shapes our academic programme and cultural understanding.' },
              { n: '03', t: 'British Curriculum Elements', d: 'Selected international perspectives that broaden and enrich our pupils’ learning.' },
            ].map((item) => (
              <div key={item.n} className="reveal bg-navy-900/60 p-8">
                <p className="font-serif text-3xl font-semibold text-gold-400">{item.n}</p>
                <h3 className="mt-4 font-serif text-xl font-semibold text-white">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-200">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Learning Philosophy */}
      <section className="bg-cream-100 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Our Learning Philosophy</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
              Challenged, Inspired &amp; Supported
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-700">
              We believe children, staff and families should work together to ensure every pupil is challenged
              academically, inspired creatively and supported in their emotional development.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {philosophy.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="reveal flex gap-5 rounded-sm border border-navy-100 bg-white p-7">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm bg-navy-900 text-gold-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-navy-900">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">{p.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Community */}
      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="reveal order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/18449719/pexels-photo-18449719.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Children in school uniforms smiling together"
                className="aspect-[4/3] w-full rounded-sm object-cover"
              />
            </div>
            <div className="reveal order-1 lg:order-2">
              <p className="eyebrow">Our Community</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
                Welcoming &amp; Inclusive
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-700">
                Lea Valley School is an inclusive and welcoming community. Admission is open to children of all races,
                nationalities, religions, creeds and socioeconomic backgrounds.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-navy-700">
                We value the diversity of our families and believe that a caring, respectful community helps children
                develop empathy, confidence and a sense of belonging.
              </p>
              <Link to="/admissions" className="link-underline mt-8 text-sm font-semibold text-navy-900 hover:text-gold-600">
                Learn About Admissions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Become Part of Our Story"
        copy="Join a school community dedicated to learning, confidence and personal growth."
      />
    </>
  );
}
