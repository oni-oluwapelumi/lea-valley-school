import { Link } from 'react-router-dom';
import { school } from '@/data/content';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-4" aria-label={`${school.name} home`}>
      <img
        src="/lea-valley-school.jpg"
        alt={`${school.name} logo`}
        className={`h-[86px] w-[86px] shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:h-[96px] sm:w-[96px] lg:h-[118px] lg:w-[118px] ${
          light ? 'drop-shadow-[0_4px_14px_rgba(0,0,0,.25)]' : 'drop-shadow-[0_4px_12px_rgba(21,35,58,.15)]'
        }`}
      />

      <div className="hidden min-w-0 md:block">
        <div className={`font-serif text-[2rem] font-semibold leading-none tracking-[-0.035em] lg:text-[3rem] ${light ? 'text-white' : 'text-navy-950'}`}>
          LEA VALLEY SCHOOL
        </div>
        <div className="mt-3 flex items-center gap-4">
          <span className={`h-px w-16 ${light ? 'bg-gold-300/60' : 'bg-gold-400'}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-[0.42em] lg:text-xs ${light ? 'text-gold-300' : 'text-gold-500'}`}>
            {school.motto}
          </span>
          <span className={`h-px w-16 ${light ? 'bg-gold-300/60' : 'bg-gold-400'}`} />
        </div>
      </div>
    </Link>
  );
}
