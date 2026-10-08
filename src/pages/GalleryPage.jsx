import PageHeader from '../components/PageHeader';
import Gallery from '../components/Gallery';
import { useLang } from '../i18n/LanguageContext';

export default function GalleryPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} subtitle={t('gallery.pageSubtitle')} />
      <Gallery header={false} />
    </>
  );
}
