import { useEffect, useState } from 'react';
import { MapPin, Check, ArrowRight, Clock, Mail, Phone } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import useReveal from '@/hooks/useReveal';
import { school } from '@/data/content';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export default function Contact() {
  useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [settings, setSettings] = useState({ address: school.location.full, phone: '', email: '' });
  useEffect(() => { if (!isSupabaseConfigured) return; supabase.from('site_content').select('content').eq('section', 'site_settings').maybeSingle().then(({ data }) => { if (data?.content) setSettings((current) => ({ ...current, ...(data.content as Partial<typeof current>) })); }); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true); setSubmitError(null);
    if (isSupabaseConfigured) {
      const values = new FormData(e.currentTarget);
      const { error } = await supabase.from('contact_messages').insert({ name: values.get('name'), email: values.get('email'), subject: values.get('subject'), message: values.get('message') });
      if (error) { setSubmitError(error.message); setSubmitting(false); return; }
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="We would be delighted to hear from you. Whether you have a question about admissions or would like to visit, our team is here to help."
        image="https://images.pexels.com/photos/25457343/pexels-photo-25457343.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="bg-cream-50 section-py">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Info */}
            <div className="reveal">
              <p className="eyebrow">Visit Lea Valley</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
                Find Us in Lagos
              </h2>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm bg-navy-900 text-gold-400">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-navy-900">{school.name}</p>
                    <p className="text-navy-600">{settings.address}</p>
                  </div>
                </div>
                {(settings.phone || settings.email) && <div className="space-y-3 text-navy-700">{settings.phone && <a href={`tel:${settings.phone}`} className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold-600" />{settings.phone}</a>}{settings.email && <a href={`mailto:${settings.email}`} className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold-600" />{settings.email}</a>}</div>}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm bg-navy-900 text-gold-400">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-navy-900">School Hours</p>
                    <p className="text-navy-500 text-sm">To be confirmed by the school</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-sm border border-navy-100 bg-navy-50">
                <iframe
                  title={`${school.name} location map`}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=3.331032%2C6.656363%2C3.341032%2C6.662363&layer=mapnik&marker=6.659363%2C3.336032"
                  className="aspect-[4/3] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a href="https://www.google.com/maps/search/?api=1&query=6.659363,3.336032" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border-t border-navy-100 bg-white px-4 py-3 text-sm font-semibold text-navy-800 transition hover:bg-gold-50">
                  <MapPin className="h-4 w-4 text-gold-600" /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="reveal">
              {submitted ? (
                <div className="rounded-sm border border-gold-300 bg-gold-50 p-10 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-navy-950">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-navy-900">Message Sent</h3>
                  <p className="mt-3 text-navy-600">
                    Thank you for reaching out. We will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-6 rounded-sm border border-navy-100 bg-white p-6 shadow-sm md:p-10">
                  <h3 className="font-serif text-2xl font-semibold text-navy-900">Send Us a Message</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Full Name" name="name" required />
                    <Field label="Email Address" name="email" type="email" required />
                  </div>
                  <Field label="Subject" name="subject" placeholder="e.g. Admissions enquiry" />
                  <div>
                    <label className="mb-2 block text-sm font-medium text-navy-800">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full rounded-sm border border-navy-200 bg-cream-50 px-4 py-3 text-navy-900 outline-none transition focus:border-navy-800 focus:bg-white"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div>
                    {submitError && <p className="mb-4 rounded-sm border border-red-300 bg-red-50 p-3 text-sm text-red-700">{submitError}</p>}
                    <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold-400 px-8 py-4 text-base font-semibold text-navy-950 shadow-sm transition hover:bg-gold-300 sm:w-auto">
                      {submitting ? 'Sending…' : 'Send Message'}
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
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
