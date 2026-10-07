import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DistrictMap from '../components/DistrictMap';
import { EventCard, EventModal } from '../components/Events';
import { Reveal, Spinner, FilterPills } from '../components/ui';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { eventTypes } from '../data/events';
import { useLang } from '../i18n/LanguageContext';

export default function EventsPage() {
  const { t } = useLang();
  const { data, loading } = useFetch(api.getEvents);
  const [type, setType] = useState('all');
  const [selected, setSelected] = useState(null);
  const items = (data || []).filter((e) => type === 'all' || e.typeId === type);
  return (
    <>
      <PageHeader eyebrow={t('events.eyebrow')} title={t('events.pageTitle')} subtitle={t('events.pageSubtitle')} />
      <section className="section bg-white">
        <div className="container-x">
          <Reveal><FilterPills items={eventTypes} value={type} onChange={setType} /></Reveal>
          {loading ? <Spinner /> : (
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {items.map((ev, i) => <EventCard key={ev.id} ev={ev} index={i} onView={setSelected} />)}
              {!items.length && <p className="col-span-full py-10 text-center text-navy/50">{t('common.noEvents')}</p>}
            </div>
          )}
        </div>
        <EventModal ev={selected} onClose={() => setSelected(null)} />
      </section>
      <DistrictMap />
    </>
  );
}
