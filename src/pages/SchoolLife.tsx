import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import CTASection from '@/components/CTASection';
import useReveal from '@/hooks/useReveal';
import { useManagedPageHeader } from '@/hooks/useManagedPageHeader';

const experiences = [
  {
    title: 'Classroom Learning',
    text: 'Engaging, structured lessons that build strong foundations in literacy, numeracy and critical thinking.',
    image: 'https://images.pexels.com/photos/12448839/pexels-photo-12448839.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Creative Activities',
    text: 'Art, music, drama and imaginative play that help children express themselves and discover their talents.',
    image: 'https://images.pexels.com/photos/8612986/pexels-photo-8612986.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Play & Exploration',
    text: 'Purposeful play and outdoor exploration that develop curiosity, coordination and a love of learning.',
    image: 'https://images.pexels.com/photos/13891322/pexels-photo-13891322.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'School Events',
    text: 'Special days, celebrations and showcases that bring our school community together and create lasting memories.',
    image: 'https://images.pexels.com/photos/14554003/pexels-photo-14554003.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Friendship & Community',
    text: 'A warm, inclusive environment where children form friendships and learn the value of kindness and respect.',
    image: 'https://images.pexels.com/photos/18449719/pexels-photo-18449719.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

const gallery = [
  { src: 'https://images.pexels.com/photos/31773583/pexels-photo-31773583.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Classroom activity', span: true },
  { src: 'https://images.pexels.com/photos/8612988/pexels-photo-8612988.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Painting activity' },
  { src: 'https://images.pexels.com/photos/11128819/pexels-photo-11128819.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Outdoor play' },
  { src: 'https://images.pexels.com/photos/8466772/pexels-photo-8466772.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Reading together' },
  { src: 'https://images.pexels.com/photos/36467878/pexels-photo-36467878.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Schoolyard fun' },
  { src: 'https://images.pexels.com/photos/4393383/pexels-photo-4393383.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Art session', span: true },
];

export default function SchoolLife() {
  useReveal();
  const header = useManagedPageHeader('school_life_header', { eyebrow: 'School Life', title: 'Learning, Creativity & Community', subtitle: 'Every day at Lea Valley is filled with discovery, friendship and growth.', image: 'https://images.pexels.com/photos/14554003/pexels-photo-14554003.jpeg?auto=compress&cs=tinysrgb&w=1920' });

  return (
    <>
      <PageHeader
        {...header}
      />

      {/* Experiences */}
      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Daily Life at Lea Valley</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
              Experiences That Shape Children
            </h2>
            <p className="mt-5 text-lg text-navy-600">
              From the classroom to the playground, our children learn through a rich blend of structured learning,
              creative expression, play and community.
            </p>
          </div>

          <div className="mt-14 space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={exp.title}
                className={`reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div>
                  <span className="font-serif text-5xl font-semibold text-navy-100">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-navy-900">{exp.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-navy-700">{exp.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-cream-100 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Moments at Lea Valley</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
                A Glimpse of School Life
              </h2>
            </div>
            <Button to="/gallery" variant="outline" size="md">
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {gallery.map((g, i) => (
              <div key={i} className={`reveal overflow-hidden rounded-sm ${g.span ? 'col-span-2' : ''}`}>
                <img src={g.src} alt={g.alt} className="aspect-[4/3] w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Come and See for Yourself"
        copy="We invite prospective families to visit Lea Valley, meet our staff and experience our warm school community."
        primaryLabel="Enquire About Admission"
        secondaryLabel="Contact the School"
      />
    </>
  );
}
