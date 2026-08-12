import { useState } from 'react';
import { Check, Info, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import useReveal from '@/hooks/useReveal';
import { levels } from '@/data/content';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

const placeholderFields = [
  { label: 'Entry Ages', note: 'To be confirmed by the school' },
  { label: 'Application Deadlines', note: 'To be confirmed by the school' },
  { label: 'Required Documents', note: 'To be confirmed by the school' },
  { label: 'Term Dates', note: 'To be confirmed by the school' },
  { label: 'School Fees', note: 'To be confirmed by the school' },
  { label: 'Assessment Details', note: 'To be confirmed by the school' },
];

export default function Admissions() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    if (isSupabaseConfigured) {
      const values = new FormData(e.currentTarget);
      const { error } = await supabase.from('admissions_enquiries').insert({ parent_name: values.get('parentName'), child_name: values.get('childName'), email: values.get('email'), phone: values.get('phone'), stage: values.get('stage'), start_term: values.get('startTerm'), message: values.get('message') });
      if (error) {
        setSubmitError(`We could not submit your enquiry: ${error.message}`);
        setSubmitting(false);
        return;
      }
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="A Warm Welcome Awaits"
        subtitle="Admission is open to children of all races, nationalities, religions, creeds and socioeconomic backgrounds. We would be delighted to hear from you."
        image="https://images.pexels.com/photos/28593050/pexels-photo-28593050.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Inclusive philosophy */}
      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="reveal">
              <p className="eyebrow">Our Admissions Philosophy</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
                An Inclusive School Community
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-700">
                <p>
                  Lea Valley School is an inclusive and welcoming community. We believe every child deserves a
                  fantastic start in life, and we welcome families from all backgrounds.
                </p>
                <p>
                  Admission is open to children of all races, nationalities, religions, creeds and socioeconomic
                  backgrounds. We value the diversity of our families and the richness it brings to our school
                  community.
                </p>
                <p>
                  We invite prospective families to visit us, meet our caring staff and experience the peaceful,
                  conducive environment of Kay Farms Estate for themselves.
                </p>
              </div>
            </div>
            <div className="reveal grid gap-4 sm:grid-cols-2">
              {levels.map((l) => (
                <div key={l.slug} className="rounded-sm border border-navy-100 bg-white p-6 shadow-sm">
                  <span className="rounded-sm bg-gold-400 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-950">
                    {l.name}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-navy-600">{l.description}</p>
                </div>
              ))}
              <div className="rounded-sm border border-navy-100 bg-navy-900 p-6 text-white sm:col-span-2">
                <p className="font-serif text-lg">Open to all backgrounds</p>
                <p className="mt-1 text-sm text-navy-200">All races · nationalities · religions · creeds · circumstances</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder info */}
      <section className="bg-cream-100 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Admissions Information</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
              Key Details
            </h2>
            <p className="mt-5 text-sm text-navy-500">
              The details below are placeholders. Final entry ages, deadlines, documents, fees and term dates will be
              confirmed by the school and added here.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderFields.map((f) => (
              <div key={f.label} className="reveal rounded-sm border border-dashed border-navy-200 bg-white p-6">
                <div className="flex items-center gap-2 text-navy-400">
                  <Info className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{f.label}</span>
                </div>
                <p className="mt-3 text-sm text-navy-500">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <div className="reveal text-center">
            <p className="eyebrow justify-center">Admissions Enquiry</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
              Begin Your Admission
            </h2>
            <p className="mt-5 text-lg text-navy-600">
              Complete the form below and our team will be in touch to guide you through the next steps.
            </p>
          </div>

          {submitted ? (
            <div className="reveal mt-12 rounded-sm border border-gold-300 bg-gold-50 p-10 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-navy-950">
                <Check className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-serif text-2xl font-semibold text-navy-900">Thank You for Your Enquiry</h3>
              <p className="mt-3 text-navy-600">
                We have received your enquiry and will be in touch with you soon. We look forward to welcoming your
                family to Lea Valley School.
              </p>
              <Button to="/contact" variant="outline" size="md" className="mt-6">
                Contact the School
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reveal mt-12 grid gap-6 rounded-sm border border-navy-100 bg-white p-6 shadow-sm md:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Parent / Guardian Name" name="parentName" required />
                <Field label="Child's Name" name="childName" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Email Address" name="email" type="email" required />
                <Field label="Phone Number" name="phone" type="tel" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <SelectField
                  label="Stage of Interest"
                  name="stage"
                  options={['Creche', 'Nursery', 'Primary', 'Not sure yet']}
                />
                <Field label="Preferred Start Term" name="startTerm" placeholder="e.g. September 2025" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-navy-800">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full rounded-sm border border-navy-200 bg-cream-50 px-4 py-3 text-navy-900 outline-none transition focus:border-navy-800 focus:bg-white"
                  placeholder="Tell us a little about your child and any questions you may have."
                />
              </div>
              <div>
                {submitError && <p className="mb-5 rounded-sm border border-red-300 bg-red-50 p-4 text-sm text-red-700">{submitError}</p>}
                <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold-400 px-8 py-4 text-base font-semibold text-navy-950 shadow-sm transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                  {submitting ? 'Submitting…' : 'Submit Enquiry'}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-navy-800">
        {label}
        {required && <span className="text-gold-600"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-sm border border-navy-200 bg-cream-50 px-4 py-3 text-navy-900 outline-none transition focus:border-navy-800 focus:bg-white"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-navy-800">{label}</label>
      <select
        name={name}
        className="w-full rounded-sm border border-navy-200 bg-cream-50 px-4 py-3 text-navy-900 outline-none transition focus:border-navy-800 focus:bg-white"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
