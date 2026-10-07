import PageHeader from '../components/PageHeader';
import { Reveal, PositionTag } from '../components/ui';
import { useLang } from '../i18n/LanguageContext';

const pages = {
  privacy: {
    title: { en: 'Privacy Policy', te: 'గోప్యతా విధానం' },
    body: [
      { en: 'Jago Andhra collects only the information needed to keep you informed: your name, mobile number, email and district when you join, and your name, email and message when you contact us.', te: 'మీకు సమాచారం అందించడానికి అవసరమైన వివరాలను మాత్రమే జాగో ఆంధ్ర సేకరిస్తుంది: మీరు చేరినప్పుడు పేరు, మొబైల్ నంబర్, ఇమెయిల్ మరియు జిల్లా; మమ్మల్ని సంప్రదించినప్పుడు పేరు, ఇమెయిల్ మరియు సందేశం.' },
      { en: 'We do not sell or share your personal data with third parties. Data is stored securely and used only to send programme updates and respond to your enquiries.', te: 'మీ వ్యక్తిగత డేటాను మేము మూడవ పక్షాలకు అమ్మము లేదా పంచుకోము. డేటా సురక్షితంగా నిల్వ చేయబడి, కార్యక్రమ అప్‌డేట్‌లు పంపడానికి మరియు మీ ప్రశ్నలకు స్పందించడానికి మాత్రమే ఉపయోగించబడుతుంది.' },
      { en: 'You may request access to, correction of, or deletion of your data at any time by writing to the email address on the Contact page.', te: 'సంప్రదింపు పేజీలోని ఇమెయిల్ చిరునామాకు రాయడం ద్వారా మీ డేటాను చూడటం, సరిదిద్దడం లేదా తొలగించడం ఎప్పుడైనా కోరవచ్చు.' },
    ],
  },
  terms: {
    title: { en: 'Terms of Use', te: 'వినియోగ నిబంధనలు' },
    body: [
      { en: 'This website is provided for public awareness. Content may be shared for non-commercial purposes with attribution.', te: 'ఈ వెబ్‌సైట్ ప్రజా అవగాహన కోసం అందించబడింది. కంటెంట్‌ను మూలాన్ని పేర్కొంటూ వాణిజ్యేతర ప్రయోజనాల కోసం పంచుకోవచ్చు.' },
      { en: 'Documents linked from this site remain the property of their respective publishers. Official government documents should be read from the official source.', te: 'ఈ సైట్ నుండి లింక్ చేసిన పత్రాలు వాటి ప్రచురణకర్తల ఆస్తిగానే ఉంటాయి. అధికారిక ప్రభుత్వ పత్రాలను అధికారిక మూలం నుండి చదవాలి.' },
      { en: 'By using the forms on this site you agree to the privacy policy.', te: 'ఈ సైట్‌లోని ఫారమ్‌లను ఉపయోగించడం ద్వారా మీరు గోప్యతా విధానానికి అంగీకరిస్తున్నారు.' },
    ],
  },
  disclaimer: {
    title: { en: 'Disclaimer', te: 'నిరాకరణ' },
    body: [
      { en: 'Jago Andhra is a public awareness campaign. Content marked “Campaign Position” represents the organisers’ viewpoint and is not an independently verified fact or a legal conclusion.', te: 'జాగో ఆంధ్ర ఒక ప్రజా అవగాహన ఉద్యమం. “ఉద్యమ వైఖరి”గా గుర్తించిన కంటెంట్ నిర్వాహకుల అభిప్రాయం, స్వతంత్రంగా ధృవీకరించిన వాస్తవం లేదా న్యాయపరమైన తీర్మానం కాదు.' },
      { en: 'Content marked “APGEA’s Position” represents the stated position of the AP Government Employees Association.', te: '“APGEA వైఖరి”గా గుర్తించిన కంటెంట్ ఏపీ ప్రభుత్వ ఉద్యోగుల సంఘం ప్రకటించిన వైఖరిని సూచిస్తుంది.' },
      { en: 'Information presented here should be read together with the official government order and related documents. Nothing on this site constitutes legal advice.', te: 'ఇక్కడి సమాచారాన్ని అధికారిక ప్రభుత్వ ఉత్తర్వు మరియు సంబంధిత పత్రాలతో కలిపి చదవాలి. ఈ సైట్‌లోనిది ఏదీ న్యాయ సలహా కాదు.' },
    ],
  },
};

export default function Legal({ page }) {
  const { t, tr } = useLang();
  const p = pages[page];
  return (
    <>
      <PageHeader eyebrow={t('legal.eyebrow')} title={tr(p.title)} />
      <section className="section bg-white">
        <div className="container-x max-w-3xl space-y-5 text-navy/75">
          <Reveal><PositionTag kind="placeholder" /><p className="mt-2 text-sm text-navy/50">{t('legal.draft')}</p></Reveal>
          {p.body.map((b, i) => <Reveal key={i} delay={i + 1}><p className="leading-relaxed">{tr(b)}</p></Reveal>)}
        </div>
      </section>
    </>
  );
}
