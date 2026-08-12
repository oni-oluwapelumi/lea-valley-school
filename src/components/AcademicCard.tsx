import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Level } from '@/data/content';

export default function AcademicCard({ level }: { level: Level }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-60 overflow-hidden">
        <img
          src={level.image}
          alt={level.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
        <span className="absolute left-5 top-5 rounded-sm bg-gold-400 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-950">
          {level.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-serif text-lg italic text-navy-500">{level.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-navy-700">{level.description}</p>
        <Link
          to="/academics"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
