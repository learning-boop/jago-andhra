import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SupportPoll from './components/SupportPoll';
import { JoinProvider } from './components/JoinModal';
import Home from './pages/Home';
import About from './pages/About';
import Issue from './pages/Issue';
import EventsPage from './pages/EventsPage';
import UpdatesPage from './pages/UpdatesPage';
import UpdateDetail from './pages/UpdateDetail';
import DocumentsPage from './pages/DocumentsPage';
import ContactPage from './pages/ContactPage';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import { useLang } from './i18n/LanguageContext';

const titles = {
  en: { '/': 'Jago Andhra | A Movement for a Constitutional Andhra Pradesh', '/about': 'About | Jago Andhra', '/issue': 'The Issue | Jago Andhra', '/events': 'Events & Programmes | Jago Andhra', '/updates': 'Latest Updates | Jago Andhra', '/documents': 'Documents & Resources | Jago Andhra', '/contact': 'Contact | Jago Andhra' },
  te: { '/': 'జాగో ఆంధ్ర | రాజ్యాంగ సమానత్వం కోసం పోరాటం', '/about': 'మా గురించి | జాగో ఆంధ్ర', '/issue': 'సమస్య | జాగో ఆంధ్ర', '/events': 'కార్యక్రమాలు | జాగో ఆంధ్ర', '/updates': 'తాజా సమాచారం | జాగో ఆంధ్ర', '/documents': 'పత్రాలు | జాగో ఆంధ్ర', '/contact': 'సంప్రదించండి | జాగో ఆంధ్ర' },
};

/** Scroll to top on route change, or to the hash target if present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const { lang } = useLang();
  useEffect(() => {
    document.title = titles[lang][pathname] || titles[lang]['/'];
  }, [pathname, lang]);
  useEffect(() => {
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://jagoandhra.org${pathname === '/' ? '/' : pathname}`);
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // Wait a frame so the route has rendered
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

const pageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export default function App() {
  const location = useLocation();
  return (
    <JoinProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-orange focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main id="main" key={location.pathname} {...pageMotion}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/issue" element={<Issue />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/updates/:slug" element={<UpdateDetail />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<Legal page="privacy" />} />
            <Route path="/terms" element={<Legal page="terms" />} />
            <Route path="/disclaimer" element={<Legal page="disclaimer" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <SupportPoll />
    </JoinProvider>
  );
}
