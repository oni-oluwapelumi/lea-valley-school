import { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Gallery from '@/components/Gallery';
import CTASection from '@/components/CTASection';
import useReveal from '@/hooks/useReveal';
import { galleryItems, type GalleryItem } from '@/data/content';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export default function GalleryPage() {
  useReveal();
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.from('gallery_items').select('*').eq('is_published', true).order('display_order').then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setItems(data.map((item, index) => ({
          id: index + 1,
          src: item.image_url,
          alt: item.alt_text,
          category: item.category as GalleryItem['category'],
          span: index % 5 === 0,
        })));
      }
    });
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Life at Lea Valley"
        subtitle="A collection of moments from our classrooms, creative activities, play and school community."
        image="https://images.pexels.com/photos/8612993/pexels-photo-8612993.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal">
            <Gallery items={items} />
          </div>
        </div>
      </section>

      <CTASection
        title="See It in Person"
        copy="Photographs only tell part of the story. We warmly invite you to visit Lea Valley and experience our school community firsthand."
        primaryLabel="Enquire About a Visit"
        secondaryLabel="Contact the School"
      />
    </>
  );
}
