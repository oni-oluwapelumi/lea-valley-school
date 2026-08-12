import { useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export type ManagedHeader = { eyebrow: string; title: string; subtitle: string; image: string };
export function useManagedPageHeader(section: string, fallback: ManagedHeader) {
  const [header, setHeader] = useState(fallback);
  useEffect(() => { if (!isSupabaseConfigured) return; supabase.from('site_content').select('content').eq('section', section).maybeSingle().then(({ data }) => { if (data?.content) setHeader((current) => { const savedHeader = data.content as Partial<ManagedHeader>; return { ...current, ...savedHeader, subtitle: savedHeader.subtitle?.replace(/\bsince\s+2012,?\s*/gi, '') || current.subtitle }; }); }); }, [section]);
  return header;
}
