/**
 * News / updates records. Mirrors intended `updates` table. Text fields are bilingual {en, te}.
 * Content is PLACEHOLDER copy — replace with real press releases via admin.
 */
export const updateCategories = [
  { id: 'press', en: 'Press Release', te: 'పత్రికా ప్రకటన' },
  { id: 'news', en: 'News', te: 'వార్తలు' },
  { id: 'campaign', en: 'Campaign Update', te: 'ఉద్యమ అప్‌డేట్' },
  { id: 'event', en: 'Event Update', te: 'కార్యక్రమ అప్‌డేట్' },
];

export const updates = [
  {
    id: 1, slug: 'campaign-launch-statement', categoryId: 'press', date: '2026-10-01',
    title: { en: 'Jago Andhra public awareness campaign announced', te: 'జాగో ఆంధ్ర ప్రజా అవగాహన ఉద్యమం ప్రకటన' },
    excerpt: { en: '[Placeholder] Organisers announce a state-wide public awareness campaign on constitutional principles and local-cadre concerns. Replace with the official press release text.', te: '[తాత్కాలికం] రాజ్యాంగ సూత్రాలు మరియు స్థానిక కేడర్ ఆందోళనలపై రాష్ట్రవ్యాప్త ప్రజా అవగాహన ఉద్యమాన్ని నిర్వాహకులు ప్రకటించారు. అధికారిక పత్రికా ప్రకటనతో భర్తీ చేయండి.' },
    image: 'https://images.unsplash.com/photo-1450101499163-c8f905deb7bd?auto=format&fit=crop&w=900&q=70', imageAlt: 'Documents and a pen on a desk',
    body: { en: '[Full press release body — to be supplied by the organising committee.]', te: '[పూర్తి పత్రికా ప్రకటన — నిర్వాహక కమిటీ అందించాలి.]' },
  },
  {
    id: 2, slug: 'understanding-presidential-order-2025', categoryId: 'news', date: '2026-10-03',
    title: { en: 'Explainer: what the Presidential Order 2025 covers', te: 'వివరణ: రాష్ట్రపతి ఉత్తర్వు 2025 ఏమి కవర్ చేస్తుంది' },
    excerpt: { en: '[Placeholder] A plain-language overview of the structure of the order and how it relates to the earlier framework. Links to the official document will be added here.', te: '[తాత్కాలికం] ఉత్తర్వు నిర్మాణం మరియు మునుపటి చట్రంతో దాని సంబంధంపై సరళ భాషా అవలోకనం. అధికారిక పత్రానికి లింకులు ఇక్కడ జోడించబడతాయి.' },
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=70', imageAlt: 'Scales of justice on a wooden desk',
    body: { en: '[Explainer body — to be supplied.]', te: '[వివరణ పాఠం — అందించాలి.]' },
  },
  {
    id: 3, slug: 'district-coordination-committees', categoryId: 'campaign', date: '2026-10-05',
    title: { en: 'District coordination committees being formed', te: 'జిల్లా సమన్వయ కమిటీల ఏర్పాటు' },
    excerpt: { en: '[Placeholder] Volunteers across districts are coordinating awareness programmes. Contact details for each district will be published once finalised.', te: '[తాత్కాలికం] జిల్లాల్లోని వాలంటీర్లు అవగాహన కార్యక్రమాలను సమన్వయం చేస్తున్నారు. ప్రతి జిల్లా సంప్రదింపు వివరాలు ఖరారు అయ్యాక ప్రచురించబడతాయి.' },
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=70', imageAlt: 'A group of people in discussion',
    body: { en: '[Campaign update body — to be supplied.]', te: '[ఉద్యమ అప్‌డేట్ పాఠం — అందించాలి.]' },
  },
  {
    id: 4, slug: 'october-programme-schedule', categoryId: 'event', date: '2026-10-06',
    title: { en: 'October programme schedule published', te: 'అక్టోబర్ కార్యక్రమ షెడ్యూల్ ప్రచురణ' },
    excerpt: { en: '[Placeholder] The first round of awareness programmes is scheduled for mid-October across four regions. Venues will be confirmed closer to each date.', te: '[తాత్కాలికం] మొదటి విడత అవగాహన కార్యక్రమాలు అక్టోబర్ మధ్యలో నాలుగు ప్రాంతాల్లో షెడ్యూల్ చేయబడ్డాయి. ప్రతి తేదీకి దగ్గరగా వేదికలు నిర్ధారించబడతాయి.' },
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=70', imageAlt: 'A calendar on a desk',
    body: { en: '[Event update body — to be supplied.]', te: '[కార్యక్రమ అప్‌డేట్ పాఠం — అందించాలి.]' },
  },
];
