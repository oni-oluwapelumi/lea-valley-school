import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, LogOut, X, Menu, ArrowRight, ExternalLink, Image as ImageIcon, LayoutDashboard, Newspaper, Images, FileText, Inbox, Settings, MessageSquare } from 'lucide-react';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import GalleryManager from '@/components/admin/GalleryManager';
import PagesManager from '@/components/admin/PagesManager';
import EnquiriesManager from '@/components/admin/EnquiriesManager';
import SettingsManager from '@/components/admin/SettingsManager';
import ContactMessagesManager from '@/components/admin/ContactMessagesManager';

const localNewsKey = 'lea-valley-admin-news-drafts';

type NewsRow = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  image_url: string | null;
  category: string;
  published_at: string;
  created_at: string;
};

type Draft = {
  title: string;
  excerpt: string;
  body: string;
  image_url: string;
  category: string;
  published_at: string;
};

const emptyDraft: Draft = {
  title: '',
  excerpt: '',
  body: '',
  image_url: '',
  category: 'News',
  published_at: new Date().toISOString().slice(0, 10),
};

export default function Admin() {
  const { session, loading, signOut } = useAuth();
  const [items, setItems] = useState<NewsRow[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'news' | 'gallery' | 'pages' | 'enquiries' | 'messages' | 'settings'>('dashboard');

  const loadNews = async () => {
    setFetching(true);
    if (!isSupabaseConfigured) {
      setItems(JSON.parse(localStorage.getItem(localNewsKey) ?? '[]') as NewsRow[]);
      setFetching(false);
      return;
    }
    const { data, error: err } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false });
    if (err) {
      setError(err.message);
    } else {
      setItems(data ?? []);
    }
    setFetching(false);
  };

  useEffect(() => {
    if (session || !isSupabaseConfigured) loadNews();
  }, [session]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <p className="text-navy-200">Loading…</p>
      </div>
    );
  }

  if (!session && isSupabaseConfigured) {
    return <Navigate to="/admin/login" replace />;
  }

  const openNew = () => {
    setEditingId(null);
    setDraft(emptyDraft);
    setError(null);
    setShowEditor(true);
  };

  const openEdit = (row: NewsRow) => {
    setEditingId(row.id);
    setDraft({
      title: row.title,
      excerpt: row.excerpt,
      body: row.body,
      image_url: row.image_url ?? '',
      category: row.category,
      published_at: row.published_at,
    });
    setError(null);
    setShowEditor(true);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingId(null);
    setDraft(emptyDraft);
    setError(null);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    if (!isSupabaseConfigured) {
      const reader = new FileReader();
      reader.onload = () => { setDraft((d) => ({ ...d, image_url: String(reader.result) })); setUploading(false); };
      reader.onerror = () => { setError('The image could not be read. Please try another file.'); setUploading(false); };
      reader.readAsDataURL(file);
      return;
    }
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from('news_images').upload(path, file, { cacheControl: '3600' });
    if (upErr) {
      setError(upErr.message);
      setUploading(false);
      return;
    }
    const { data: pub } = supabase.storage.from('news_images').getPublicUrl(path);
    setDraft((d) => ({ ...d, image_url: pub.publicUrl }));
    setUploading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: draft.title,
      excerpt: draft.excerpt,
      body: draft.body,
      image_url: draft.image_url || null,
      category: draft.category,
      published_at: draft.published_at,
      updated_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured) {
      const next = editingId
        ? items.map((item) => item.id === editingId ? { ...item, ...payload } : item)
        : [{ id: crypto.randomUUID(), created_at: new Date().toISOString(), ...payload }, ...items];
      localStorage.setItem(localNewsKey, JSON.stringify(next));
      setItems(next);
      setSaving(false);
      closeEditor();
      return;
    }

    if (editingId) {
      const { error: err } = await supabase.from('news').update(payload).eq('id', editingId);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await supabase.from('news').insert(payload);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    closeEditor();
    loadNews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article? This cannot be undone.')) return;
    if (!isSupabaseConfigured) {
      const next = items.filter((item) => item.id !== id);
      localStorage.setItem(localNewsKey, JSON.stringify(next));
      setItems(next);
      return;
    }
    const { error: err } = await supabase.from('news').delete().eq('id', id);
    if (err) {
      setError(err.message);
      return;
    }
    loadNews();
  };

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Admin header */}
      <header className="sticky top-0 z-40 border-b border-navy-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden rounded-sm bg-navy-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300 md:inline">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-navy-200 text-navy-700 lg:hidden"
              aria-label="Open admin menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900 sm:flex"
            >
              <ExternalLink className="h-4 w-4" /> View Site
            </Link>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-sm border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-8xl gap-8 px-6 py-10 lg:grid-cols-[230px_1fr] lg:px-12">
        {mobileMenuOpen && <button type="button" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-40 bg-navy-950/45 lg:hidden" aria-label="Close admin menu" />}
        <aside className={`fixed inset-y-0 left-0 z-50 w-[285px] overflow-y-auto border-r border-navy-100 bg-white p-4 pt-24 shadow-xl transition-transform duration-300 lg:static lg:h-fit lg:w-auto lg:translate-x-0 lg:rounded-sm lg:border lg:p-3 lg:shadow-sm ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="mb-5 flex items-center justify-between lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-navy-400">Content Manager</p>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-sm p-2 text-navy-600" aria-label="Close admin menu"><X className="h-5 w-5" /></button>
          </div>
          <p className="hidden px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-[.18em] text-navy-400 lg:block">Content Manager</p>
          {[
            ['dashboard', 'Overview', LayoutDashboard], ['news', 'News & Events', Newspaper], ['gallery', 'Gallery & Media', Images],
            ['pages', 'Pages & Text', FileText], ['enquiries', 'Admissions Enquiries', Inbox], ['messages', 'Contact Messages', MessageSquare], ['settings', 'Site Settings', Settings],
          ].map(([id, label, Icon]) => {
            const MenuIcon = Icon as typeof LayoutDashboard;
            return <button key={id as string} type="button" onClick={() => { setActiveSection(id as typeof activeSection); setMobileMenuOpen(false); }} className={`mb-1 flex w-full items-center gap-3 rounded-sm px-3 py-3 text-left text-sm font-medium transition ${activeSection === id ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-navy-50'}`}><MenuIcon className="h-4 w-4" />{String(label)}</button>;
          })}
        </aside>

        <div>
        {activeSection === 'dashboard' && (
          <section>
            <p className="eyebrow">Admin dashboard</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-navy-900">Welcome to your website manager</h1>
            <p className="mt-3 max-w-2xl text-navy-600">Use this space to keep the school website current—share news, add photographs and update the information families need.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                ['News & Events', `${items.length} article${items.length === 1 ? '' : 's'} in the manager`, Newspaper, 'news'],
                ['Gallery & Media', 'Upload and organise school photographs', Images, 'gallery'],
                ['Pages & Text', 'Update public website copy and details', FileText, 'pages'],
              ].map(([title, copy, Icon, id]) => { const CardIcon = Icon as typeof Newspaper; return <button key={title as string} type="button" onClick={() => setActiveSection(id as typeof activeSection)} className="rounded-sm border border-navy-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-md"><CardIcon className="h-7 w-7 text-gold-500" /><h2 className="mt-5 font-serif text-2xl font-semibold text-navy-900">{String(title)}</h2><p className="mt-2 text-sm leading-relaxed text-navy-600">{String(copy)}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold-700">Open <ArrowRight className="h-4 w-4" /></span></button>; })}
            </div>
          </section>
        )}

        {activeSection === 'news' && <>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-navy-900">News &amp; Events</h1>
            <p className="mt-1 text-navy-500">Create, edit and delete articles shown on the public website.</p>
          </div>
          <Button onClick={openNew} variant="gold" size="md">
            <Plus className="h-4 w-4" /> New Article
          </Button>
        </div>

        {!isSupabaseConfigured && (
          <div className="mt-6 rounded-sm border border-gold-300 bg-gold-50 p-4 text-sm leading-relaxed text-navy-700">
            <strong>Presentation mode:</strong> articles and uploaded images are saved only in this browser. When the school is ready, add Supabase credentials to use secure accounts and publish content for everyone.
          </div>
        )}

        {error && (
          <p className="mt-6 rounded-sm border border-red-300 bg-red-50 p-4 text-sm text-red-700">{error}</p>
        )}

        {/* Articles list */}
        {fetching ? (
          <p className="mt-10 text-navy-500">Loading articles…</p>
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-sm border border-dashed border-navy-200 bg-white p-12 text-center">
            <p className="text-navy-500">No articles yet. Click “New Article” to create your first one.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {items.map((row) => (
              <div
                key={row.id}
                className="flex flex-col gap-4 rounded-sm border border-navy-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="h-20 w-full flex-shrink-0 overflow-hidden rounded-sm sm:h-16 sm:w-24">
                  {row.image_url ? (
                    <img src={row.image_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-navy-50 text-navy-300">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-sm bg-gold-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-gold-700">
                      {row.category}
                    </span>
                    <span className="text-xs text-navy-400">
                      {new Date(row.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-navy-900">{row.title}</h3>
                  <p className="mt-0.5 line-clamp-1 text-sm text-navy-500">{row.excerpt}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(row)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-navy-200 px-3 py-2 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
                  >
                    <Pencil className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </>}

        {activeSection === 'gallery' && <GalleryManager />}
        {activeSection === 'pages' && <PagesManager />}
        {activeSection === 'enquiries' && <EnquiriesManager />}
        {activeSection === 'messages' && <ContactMessagesManager />}
        {activeSection === 'settings' && <SettingsManager />}
        {([] as readonly string[]).includes(activeSection) && (
          <section className="rounded-sm border border-navy-100 bg-white p-8 shadow-sm md:p-10">
            <p className="eyebrow">Coming next</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-navy-900">{activeSection === 'gallery' ? 'Gallery & Media' : activeSection === 'pages' ? 'Pages & Text' : activeSection === 'enquiries' ? 'Admissions Enquiries' : 'Site Settings'}</h1>
            <p className="mt-4 max-w-xl leading-relaxed text-navy-600">This section is now part of the dashboard structure. Its secure editor will be connected to the Supabase content tables next, so staff can manage it without editing code.</p>
          </section>
        )}
        </div>
      </main>

      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-950/60 p-4 md:p-8">
          <div className="my-auto w-full max-w-2xl rounded-sm bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4">
              <h2 className="font-serif text-xl font-semibold text-navy-900">
                {editingId ? 'Edit Article' : 'New Article'}
              </h2>
              <button onClick={closeEditor} className="text-navy-400 hover:text-navy-900" aria-label="Close">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-navy-800">Title</label>
                <input
                  required
                  value={draft.title}
                  onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                  className="w-full rounded-sm border border-navy-200 bg-cream-50 px-4 py-3 text-navy-900 outline-none transition focus:border-navy-800 focus:bg-white"
                  placeholder="Article headline"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-800">Category</label>
                  <select
                    value={draft.category}
                    onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                    className="w-full rounded-sm border border-navy-200 bg-cream-50 px-4 py-3 text-navy-900 outline-none transition focus:border-navy-800 focus:bg-white"
                  >
                    <option>News</option>
                    <option>Event</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-800">Publish Date</label>
                  <input
                    type="date"
                    required
                    value={draft.published_at}
                    onChange={(e) => setDraft((d) => ({ ...d, published_at: e.target.value }))}
                    className="w-full rounded-sm border border-navy-200 bg-cream-50 px-4 py-3 text-navy-900 outline-none transition focus:border-navy-800 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy-800">Excerpt (short summary)</label>
                <textarea
                  required
                  rows={2}
                  value={draft.excerpt}
                  onChange={(e) => setDraft((d) => ({ ...d, excerpt: e.target.value }))}
                  className="w-full rounded-sm border border-navy-200 bg-cream-50 px-4 py-3 text-navy-900 outline-none transition focus:border-navy-800 focus:bg-white"
                  placeholder="A brief summary shown on the news card."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy-800">Body (full article)</label>
                <textarea
                  required
                  rows={6}
                  value={draft.body}
                  onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
                  className="w-full rounded-sm border border-navy-200 bg-cream-50 px-4 py-3 text-navy-900 outline-none transition focus:border-navy-800 focus:bg-white"
                  placeholder="Write each paragraph on a new line."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy-800">Hero Image</label>
                {draft.image_url && (
                  <div className="mb-3 overflow-hidden rounded-sm border border-navy-100">
                    <img src={draft.image_url} alt="Preview" className="aspect-[16/9] w-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUpload(f);
                    }}
                    className="text-sm text-navy-600 file:mr-3 file:rounded-sm file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-white"
                  />
                  {uploading && <span className="text-sm text-navy-500">Uploading…</span>}
                </div>
                <p className="mt-2 text-xs text-navy-400">Upload an image or paste a URL below.</p>
                <input
                  type="url"
                  value={draft.image_url}
                  onChange={(e) => setDraft((d) => ({ ...d, image_url: e.target.value }))}
                  className="mt-2 w-full rounded-sm border border-navy-200 bg-cream-50 px-4 py-3 text-navy-900 outline-none transition focus:border-navy-800 focus:bg-white"
                  placeholder="https://… (optional)"
                />
              </div>

              {error && (
                <p className="rounded-sm border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>
              )}

              <div className="flex justify-end gap-3 border-t border-navy-100 pt-5">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="rounded-sm border border-navy-200 px-5 py-2.5 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-sm bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save Article'}
                  {!saving && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
