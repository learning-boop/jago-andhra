import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LanguageContext';

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrow="404" title={t('notFound.title')} subtitle={t('notFound.subtitle')} />
      <section className="section bg-white"><div className="container-x"><Link to="/" className="btn-primary">{t('common.backHome')}</Link></div></section>
    </>
  );
}
