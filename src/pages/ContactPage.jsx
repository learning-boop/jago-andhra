import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';
import SocialMedia from '../components/SocialMedia';
import { useLang } from '../i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow={t('contact.eyebrow')} title={t('contact.title')} subtitle={t('contact.pageSubtitle')} />
      <Contact />
      <SocialMedia />
    </>
  );
}
