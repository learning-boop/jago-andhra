import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { UpdateCard } from '../components/Updates';
import { Reveal, Spinner, FilterPills } from '../components/ui';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { updateCategories } from '../data/updates';
import { useLang } from '../i18n/LanguageContext';

export default function UpdatesPage() {
  const { t } = useLang();
  const { data, loading } = useFetch(api.getUpdates);
  const [cat, setCat] = useState('all');
  const items = (data || []).filter((u) => cat === 'all' || u.categoryId === cat);
  return (
    <>
      <PageHeader eyebrow={t('updates.eyebrow')} title={t('updates.title')} subtitle={t('updates.pageSubtitle')} />
      <section className="section bg-white">
        <div className="container-x">
          <Reveal><FilterPills items={updateCategories} value={cat} onChange={setCat} /></Reveal>
          {loading ? <Spinner /> : <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{items.map((u, i) => <div key={u.id} id={u.slug}><UpdateCard u={u} index={i} /></div>)}</div>}
        </div>
      </section>
    </>
  );
}
