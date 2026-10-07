import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { logoParts } from '../data/logoParts';
import { useLang } from '../i18n/LanguageContext';

const place = (b) => ({ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` });

/**
 * Hero logo with living hands: the crowd's raised fists pump in a staggered chant
 * and the cupped hands holding the Constitution glow with a passing shine.
 * The plain logo renders first; the animated layers fade in once every part has loaded.
 */
export default function HeroLogo({ className = '' }) {
  const { t, logo, lang } = useLang();
  const parts = logoParts[lang] || logoParts.en;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    setReady(false);
    const srcs = [parts.hands.src, ...parts.fists.flatMap((f) => [f.patch.src, f.fist.src])];
    Promise.all(srcs.map((src) => new Promise((done) => {
      const img = new Image();
      img.onload = img.onerror = done;
      img.src = src;
      if (img.complete) done();
    })))
      .then(() => alive && setReady(true));
    return () => { alive = false; };
  }, [parts]);

  // Wave the chant across the crowd from left to right
  const order = parts.fists.map((f, i) => [f.fist.x, i]).sort((a, b) => a[0] - b[0]).map(([, i]) => i);

  return (
    <motion.div key={lang} initial={{ opacity: 0, rotate: -6 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.6 }}
      className={`hero-logo relative overflow-hidden rounded-full bg-white ${className}`}>
      <img src={logo} alt={t('hero.logoAlt')} width="360" height="360" fetchpriority="high" className="absolute inset-0 h-full w-full" />

      <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        {parts.fists.map((f, i) => (
          <img key={`p${i}`} src={f.patch.src} alt="" className="absolute max-w-none" style={place(f.patch)} />
        ))}

        <span className="hero-logo__glow absolute" style={place({ x: parts.hands.x - 4, y: parts.hands.y - 8, w: parts.hands.w + 8, h: parts.hands.h + 12 })} />

        {parts.fists.map((f, i) => (
          <img key={`f${i}`} src={f.fist.src} alt="" className="hero-logo__fist absolute max-w-none"
            style={{ ...place(f.fist), '--rise': `${f.rise}%`, animationDelay: `${order.indexOf(i) * 0.14}s` }} />
        ))}

        <span className="hero-logo__shine absolute" style={{ ...place(parts.hands), WebkitMaskImage: `url(${parts.hands.src})`, maskImage: `url(${parts.hands.src})` }} />
      </div>
    </motion.div>
  );
}
