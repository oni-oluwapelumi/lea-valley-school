import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/data/content';

export default function NewsCard({ item }: { item: NewsItem }) {
  const date = new Date(item.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-sm bg-navy-950/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300">
          {item.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs uppercase tracking-wider text-navy-400">{date}</p>
        <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-navy-900">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-navy-600">{item.excerpt}</p>
        <Link
          to={`/news/${item.id}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
