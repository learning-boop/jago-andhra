import PageHeader from '../components/PageHeader';
import Documents from '../components/Documents';
import { Reveal } from '../components/ui';
import { AlertCircle } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

export default function DocumentsPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t('documents.eyebrow')} title={t('documents.title')} subtitle={t('documents.pageSubtitle')} />
      <Documents compact />
      <section className="bg-white pb-20">
        <div className="container-x">
          <Reveal className="flex items-start gap-3 rounded-xl border border-brand-orange/30 bg-brand-orange/5 p-5 text-sm text-navy/75">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden="true" />
            <p>{t('documents.note1')} <strong>{t('tags.official')}</strong> {t('documents.note2')}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
