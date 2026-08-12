import { useState } from 'react';
import { X } from 'lucide-react';
import { galleryItems, galleryCategories, type GalleryItem } from '@/data/content';

export default function Gallery({ items = galleryItems }: { items?: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>('All');
  const [active, setActive] = useState<number | null>(null);

  const filtered = filter === 'All' ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-navy-900 text-white'
                : 'border border-navy-200 text-navy-700 hover:border-navy-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`group relative overflow-hidden rounded-sm ${
              item.span ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <img
              src={item.src}
              alt={item.alt}
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                item.span ? 'aspect-square md:aspect-auto md:h-full' : 'aspect-[4/3]'
              }`}
            />
            <div className="absolute inset-0 bg-navy-950/0 transition-colors duration-300 group-hover:bg-navy-950/30" />
            <span className="absolute bottom-3 left-3 rounded-sm bg-navy-950/70 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.category}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/90 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-sm text-white hover:text-gold-300"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
          <img
            src={items.find((i) => i.id === active)?.src.replace('w=1200', 'w=1600').replace('w=900', 'w=1600')}
            alt={items.find((i) => i.id === active)?.alt ?? ''}
            className="max-h-[85vh] max-w-full rounded-sm object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
