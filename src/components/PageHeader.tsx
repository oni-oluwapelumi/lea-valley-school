import type { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image: string;
  align?: 'left' | 'center';
};

export default function PageHeader({ eyebrow, title, subtitle, image, align = 'left' }: Props) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/50" />
      </div>
      <div
        className={`relative mx-auto max-w-8xl px-6 py-24 md:py-32 lg:px-12 ${
          align === 'center' ? 'text-center' : ''
        }`}
      >
        <p className="eyebrow-light">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-navy-100 ${align === 'center' ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
