import Button from './Button';
import { ArrowRight, Mail } from 'lucide-react';

type Props = {
  title: string;
  copy: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
};

export default function CTASection({
  title,
  copy,
  primaryLabel = 'Apply for Admission',
  primaryTo = '/admissions',
  secondaryLabel = 'Contact the School',
  secondaryTo = '/contact',
}: Props) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-gold-400 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-navy-500 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
        <p className="eyebrow-light justify-center">Join Our Community</p>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.1] text-white md:text-5xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">{copy}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button to={primaryTo} variant="gold" size="lg">
            <ArrowRight className="h-5 w-5" />
            {primaryLabel}
          </Button>
          <Button to={secondaryTo} variant="light" size="lg">
            <Mail className="h-5 w-5" />
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
