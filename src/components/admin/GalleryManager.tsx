import { useEffect, useState } from 'react';
import { ImagePlus, Pencil, Trash2, X } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type GalleryItem = { id: string; title: string; alt_text: string; category: string; image_url: string; display_order: number; is_published: boolean };
const blank = { title: '', alt_text: '', category: 'Community', image_url: '', display_order: 0, is_published: true };

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [draft, setDraft] = useState(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  const load = async () => {
    const { data, error: fetchError } = await supabase.from('gallery_items').select('*').order('display_order').order('created_at', { ascending: false });
    if (fetchError) setError(fetchError.message); else setItems((data ?? []) as GalleryItem[]);
  };
  useEffect(() => { if (isSupabaseConfigured) load(); }, []);
  const close = () => { setOpen(false); setEditing(null); setDraft(blank); setError(null); };
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); setError(null);
    const payload = { ...draft, display_order: Number(draft.display_order) };
    const result = editing ? await supabase.from('gallery_items').update(payload).eq('id', editing) : await supabase.from('gallery_items').insert(payload);
    if (result.error) { setError(result.error.message); return; }
    close(); load();
  };
  const upload = async (file: File) => {
    const path = `gallery/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    const { error: uploadError } = await supabase.storage.from('site_media').upload(path, file, { upsert: false });
    if (uploadError) { setError(uploadError.message); return; }
    const { data } = supabase.storage.from('site_media').getPublicUrl(path);
    setDraft((value) => ({ ...value, image_url: data.publicUrl }));
  };
  if (!isSupabaseConfigured) return <p className="rounded-sm border border-gold-300 bg-gold-50 p-4 text-sm text-navy-700">Connect Supabase to manage a shared gallery.</p>;
  return <section>
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><div><p className="eyebrow">Gallery & Media</p><h1 className="mt-2 font-serif text-3xl font-semibold text-navy-900">School photographs</h1></div><button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-sm bg-gold-400 px-5 py-3 font-semibold text-navy-950"><ImagePlus className="h-5 w-5" /> Add Photograph</button></div>
    {error && <p className="mt-5 rounded-sm border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <div className="mt-7 flex flex-wrap gap-2">{['All', 'Classroom', 'Creative', 'Play', 'Events', 'Community'].map((category) => <button key={category} type="button" onClick={() => setFilter(category)} className={`rounded-sm border px-4 py-2 text-sm font-medium transition ${filter === category ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-200 bg-white text-navy-700 hover:border-gold-400'}`}>{category} <span className="ml-1 opacity-70">{category === 'All' ? items.length : items.filter((item) => item.category === category).length}</span></button>)}</div>
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">{items.filter((item) => filter === 'All' || item.category === filter).map((item) => <article key={item.id} className="overflow-hidden rounded-sm border border-navy-100 bg-white shadow-sm"><img src={item.image_url} alt={item.alt_text} className="aspect-[4/3] w-full object-cover" /><div className="p-4"><p className="font-semibold text-navy-900">{item.title}</p><p className="mt-1 text-xs text-navy-500">{item.category} · {item.is_published ? 'Published' : 'Hidden'}</p><div className="mt-4 flex gap-2"><button onClick={() => { setEditing(item.id); setDraft(item); setOpen(true); }} className="inline-flex items-center gap-1 text-sm text-navy-700"><Pencil className="h-4 w-4" /> Edit</button><button onClick={async () => { if (confirm('Delete this photo?')) { await supabase.from('gallery_items').delete().eq('id', item.id); load(); } }} className="inline-flex items-center gap-1 text-sm text-red-600"><Trash2 className="h-4 w-4" /> Delete</button></div></div></article>)}</div>
    {items.length === 0 && <div className="mt-8 rounded-sm border border-dashed border-navy-200 bg-white p-12 text-center text-navy-500">No photographs yet. Add the first school image.</div>}
    {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4"><form onSubmit={save} className="w-full max-w-xl space-y-5 rounded-sm bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="font-serif text-2xl font-semibold text-navy-900">{editing ? 'Edit Photograph' : 'Add Photograph'}</h2><button type="button" onClick={close}><X className="h-6 w-6" /></button></div><input required value={draft.title} onChange={(e) => setDraft((v) => ({ ...v, title: e.target.value }))} placeholder="Photo title" className="w-full rounded-sm border border-navy-200 px-4 py-3" /><input required value={draft.alt_text} onChange={(e) => setDraft((v) => ({ ...v, alt_text: e.target.value }))} placeholder="Description for accessibility" className="w-full rounded-sm border border-navy-200 px-4 py-3" /><div><p className="mb-2 text-sm font-medium text-navy-800">Public gallery section</p><div className="flex flex-wrap gap-2">{['Classroom','Creative','Play','Events','Community'].map((category) => <button key={category} type="button" onClick={() => setDraft((value) => ({ ...value, category }))} className={`rounded-sm border px-3 py-2 text-sm ${draft.category === category ? 'border-gold-500 bg-gold-100 text-navy-950' : 'border-navy-200 text-navy-700'}`}>{category}</button>)}</div></div><input type="number" value={draft.display_order} onChange={(e) => setDraft((v) => ({ ...v, display_order: Number(e.target.value) }))} placeholder="Display order" className="w-full rounded-sm border border-navy-200 px-4 py-3" /><input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) upload(file); }} className="block w-full text-sm" />{draft.image_url && <img src={draft.image_url} alt="Preview" className="aspect-video w-full rounded-sm object-cover" />}<label className="flex items-center gap-2 text-sm text-navy-700"><input type="checkbox" checked={draft.is_published} onChange={(e) => setDraft((v) => ({ ...v, is_published: e.target.checked }))} /> Show on public gallery</label><div className="flex justify-end gap-3"><button type="button" onClick={close} className="px-4 py-2 text-navy-700">Cancel</button><button className="rounded-sm bg-navy-900 px-5 py-3 font-semibold text-white">Save Photograph</button></div></form></div>}
  </section>;
}
