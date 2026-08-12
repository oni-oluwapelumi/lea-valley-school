import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import NewsCard from '@/components/NewsCard';
import CTASection from '@/components/CTASection';
import useReveal from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';
import { newsItems as demoNews, type NewsItem } from '@/data/content';

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

export default function News() {
  useReveal();
  const { id } = useParams();
  const [dbItems, setDbItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setDbItems((data as DbNews[]).map(dbToNewsItem));
        }
        setLoading(false);
      });
  }, []);

  const active = id ? dbItems.find((n) => n.id === id) ?? demoNews.find((n) => n.id === id) : null;
  const hasDbItems = dbItems.length > 0;

  if (id) {
    if (loading) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center bg-cream-50">
          <Loader2 className="h-8 w-8 animate-spin text-navy-400" />
        </div>
      );
    }
    if (!active) {
      return (
        <>
          <PageHeader
            eyebrow="News & Events"
            title="Article Not Found"
            subtitle="The article you are looking for may have been moved or is no longer available."
            image="https://images.pexels.com/photos/8617938/pexels-photo-8617938.jpeg?auto=compress&cs=tinysrgb&w=1920"
          />
          <section className="bg-cream-50 section-py">
            <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
              <Link to="/news" className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-gold-600">
                <ArrowLeft className="h-4 w-4" /> Back to News & Events
              </Link>
            </div>
          </section>
        </>
      );
    }
    const date = new Date(active.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    return (
      <>
        <PageHeader eyebrow={active.category} title={active.title} subtitle={active.excerpt} image={active.image} />
        <section className="bg-cream-50 section-py">
          <div className="mx-auto max-w-3xl px-6 lg:px-12">
            <div className="reveal flex items-center gap-4 text-sm text-navy-500">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {date}</span>
              <span className="flex items-center gap-1.5"><Tag className="h-4 w-4" /> {active.category}</span>
            </div>
            <div className="reveal mt-8 overflow-hidden rounded-sm">
              <img src={active.image} alt={active.title} className="aspect-[16/9] w-full object-cover" />
            </div>
            <div className="reveal mt-8 space-y-5 text-lg leading-relaxed text-navy-700">
              {active.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="reveal mt-10 border-t border-navy-100 pt-8">
              <Link to="/news" className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-gold-600">
                <ArrowLeft className="h-4 w-4" /> Back to News & Events
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="News & Events"
        title="What's Happening at Lea Valley"
        subtitle="Stay up to date with the latest news, events and stories from our school community."
        image="https://images.pexels.com/photos/14554003/pexels-photo-14554003.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-navy-400" />
            </div>
          ) : hasDbItems ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dbItems.map((item, i) => (
                <div key={item.id} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <NewsCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="reveal mb-8 rounded-sm border border-dashed border-navy-200 bg-cream-100 p-5 text-center text-sm text-navy-500">
                No live articles yet — showing demo content below. School administrators can add real articles from the
                admin panel.
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {demoNews.map((item, i) => (
                  <div key={item.id} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                    <NewsCard item={item} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTASection
        title="Never Miss an Update"
        copy="Follow along as we share stories, events and milestones from the Lea Valley community."
        primaryLabel="Contact the School"
        primaryTo="/contact"
        secondaryLabel="Visit Us"
        secondaryTo="/admissions"
      />
    </>
  );
}
