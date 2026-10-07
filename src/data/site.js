/**
 * Static site content: contact, social links, timeline, demands, feature cards, FAQs.
 * Text fields are bilingual objects {en, te}; components render them via tr() from useLang().
 * Editorial copy is intentionally cautious — see the "Campaign Position" labels.
 */
export const siteConfig = {
  name: 'Jago Andhra',
  url: 'https://jagoandhra.org',
  contact: {
    address: { en: '[Office address placeholder]\nVijayawada, Andhra Pradesh, India', te: '[కార్యాలయ చిరునామా తాత్కాలికం]\nవిజయవాడ, ఆంధ్రప్రదేశ్, భారతదేశం' },
    phone: '+91 XXXXX XXXXX',
    email: 'info@jagoandhra.org',
    hours: { en: 'Mon – Sat, 10:00 AM – 6:00 PM IST', te: 'సోమ – శని, ఉ. 10:00 – సా. 6:00 IST' },
    mapsEmbedQuery: 'Vijayawada, Andhra Pradesh',
  },
  social: [
    { id: 'instagram', label: 'Instagram', handle: '@jagoandhra', url: 'https://instagram.com/' },
    { id: 'facebook', label: 'Facebook', handle: '/jagoandhra', url: 'https://facebook.com/' },
    { id: 'youtube', label: 'YouTube', handle: '@jagoandhra', url: 'https://youtube.com/' },
    { id: 'x', label: 'X', handle: '@jagoandhra', url: 'https://x.com/' },
  ],
};

/** key → translation key in i18n nav.* */
export const navLinks = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'issue', to: '/issue' },
  { key: 'demands', to: '/#demands' },
  { key: 'events', to: '/events' },
  { key: 'updates', to: '/updates' },
  { key: 'gallery', to: '/#gallery' },
  { key: 'documents', to: '/documents' },
  { key: 'contact', to: '/contact' },
];

export const timeline = [
  {
    id: '1975',
    year: '1975',
    label: { en: 'Presidential Order', te: 'రాష్ట్రపతి ఉత్తర్వు' },
    icon: 'book',
    summary: { en: 'The Andhra Pradesh Public Employment (Organisation of Local Cadres and Regulation of Direct Recruitment) Order, 1975.', te: 'ఆంధ్రప్రదేశ్ ప్రభుత్వ ఉద్యోగ (స్థానిక కేడర్ల ఏర్పాటు మరియు ప్రత్యక్ష నియామకాల నియంత్రణ) ఉత్తర్వు, 1975.' },
    detail: {
      en: 'Issued under Article 371D of the Constitution, the 1975 order established the concept of organising local cadres and regulating direct recruitment within the then state of Andhra Pradesh. It is the historical starting point for the local-cadre framework discussed on this site.',
      te: 'రాజ్యాంగంలోని అధికరణ 371D కింద జారీ చేయబడిన 1975 ఉత్తర్వు, అప్పటి ఆంధ్రప్రదేశ్ రాష్ట్రంలో స్థానిక కేడర్ల ఏర్పాటు మరియు ప్రత్యక్ష నియామకాల నియంత్రణ భావనను స్థాపించింది. ఈ సైట్‌లో చర్చించిన స్థానిక కేడర్ చట్రానికి ఇది చారిత్రక ప్రారంభ బిందువు.',
    },
    kind: 'fact',
    link: { label: { en: 'Read the 1975 Order (official source)', te: '1975 ఉత్తర్వు చదవండి (అధికారిక మూలం)' }, url: '#' },
  },
  {
    id: 'old-framework',
    year: '1975 – 2024',
    label: { en: 'Old local / zonal framework', te: 'పాత స్థానిక / జోనల్ చట్రం' },
    icon: 'layers',
    summary: { en: 'Districts grouped into zones, with local cadres organised for recruitment and certain posts.', te: 'జిల్లాలను జోన్లుగా వర్గీకరించి, నియామకాలు మరియు కొన్ని పోస్టుల కోసం స్థానిక కేడర్లు ఏర్పాటు చేయబడ్డాయి.' },
    detail: {
      en: 'Under the earlier framework, districts were grouped into zones for the purpose of organising local cadres. Public employment in defined categories was organised with reference to these local areas. The precise categories and percentages are set out in the orders themselves — please refer to the official text linked in the Documents section.',
      te: 'మునుపటి చట్రంలో, స్థానిక కేడర్ల ఏర్పాటు కోసం జిల్లాలను జోన్లుగా వర్గీకరించారు. నిర్వచించిన వర్గాల్లో ప్రభుత్వ ఉద్యోగాలు ఈ స్థానిక ప్రాంతాల ఆధారంగా ఏర్పాటు చేయబడ్డాయి. ఖచ్చితమైన వర్గాలు మరియు శాతాలు ఉత్తర్వుల్లోనే ఉన్నాయి — పత్రాల విభాగంలో లింక్ చేసిన అధికారిక పాఠాన్ని చూడండి.',
    },
    kind: 'fact',
  },
  {
    id: '2025',
    year: '2025',
    label: { en: 'Presidential Order 2025', te: 'రాష్ట్రపతి ఉత్తర్వు 2025' },
    icon: 'scroll',
    summary: { en: 'A new Presidential Order relating to the organisation of local cadres in the reorganised state.', te: 'పునర్వ్యవస్థీకరించబడిన రాష్ట్రంలో స్థానిక కేడర్ల ఏర్పాటుకు సంబంధించిన కొత్త రాష్ట్రపతి ఉత్తర్వు.' },
    detail: {
      en: 'The Presidential Order 2025 sets out a revised structure for the organisation of local cadres following state reorganisation. The full text, including definitions of districts, zones and multi-zones, is published by the Government. This site summarises public discussion around it and does not substitute for the official document.',
      te: 'రాష్ట్ర పునర్వ్యవస్థీకరణ తర్వాత స్థానిక కేడర్ల ఏర్పాటుకు సవరించిన నిర్మాణాన్ని రాష్ట్రపతి ఉత్తర్వు 2025 నిర్దేశిస్తుంది. జిల్లాలు, జోన్లు, మల్టీ-జోన్ల నిర్వచనాలతో సహా పూర్తి పాఠాన్ని ప్రభుత్వం ప్రచురిస్తుంది. ఈ సైట్ దాని చుట్టూ జరుగుతున్న ప్రజా చర్చను సంగ్రహిస్తుంది, అధికారిక పత్రానికి ప్రత్యామ్నాయం కాదు.',
    },
    kind: 'fact',
    link: { label: { en: 'Read the Presidential Order 2025 (official source)', te: 'రాష్ట్రపతి ఉత్తర్వు 2025 చదవండి (అధికారిక మూలం)' }, url: '#' },
  },
  {
    id: 'new-framework',
    year: '2025',
    label: { en: 'New organisational framework', te: 'కొత్త వ్యవస్థాగత చట్రం' },
    icon: 'map',
    summary: { en: 'Districts, zones and multi-zones as defined in the 2025 order.', te: '2025 ఉత్తర్వులో నిర్వచించిన జిల్లాలు, జోన్లు మరియు మల్టీ-జోన్లు.' },
    detail: {
      en: 'The 2025 framework introduces a re-defined arrangement of districts, zones and multi-zones and specifies how cadres are organised across them. How this compares with the earlier framework is the subject of the public debate described in the next step.',
      te: '2025 చట్రం జిల్లాలు, జోన్లు, మల్టీ-జోన్ల పునర్నిర్వచిత ఏర్పాటును ప్రవేశపెట్టి, వాటి అంతటా కేడర్లు ఎలా ఏర్పాటు చేయబడతాయో నిర్దేశిస్తుంది. ఇది మునుపటి చట్రంతో ఎలా పోలుస్తుందనేది తదుపరి దశలో వివరించిన ప్రజా చర్చనీయాంశం.',
    },
    kind: 'fact',
  },
  {
    id: 'today',
    year: { en: 'Today', te: 'నేడు' },
    label: { en: 'Public discussion & campaign', te: 'ప్రజా చర్చ & ఉద్యమం' },
    icon: 'megaphone',
    summary: { en: 'Employee associations and citizens are discussing the implications of the change.', te: 'ఉద్యోగ సంఘాలు మరియు పౌరులు మార్పు పర్యవసానాలను చర్చిస్తున్నారు.' },
    detail: {
      en: 'Campaign Position: Jago Andhra organisers believe the changes deserve wider public understanding and a review of their effect on local employment, promotions and opportunities for youth. This represents the organisers’ viewpoint, not a finding of any court or government body.',
      te: 'ఉద్యమ వైఖరి: ఈ మార్పులకు విస్తృత ప్రజా అవగాహన అవసరమని, స్థానిక ఉద్యోగాలు, పదోన్నతులు మరియు యువత అవకాశాలపై వాటి ప్రభావాన్ని సమీక్షించాలని జాగో ఆంధ్ర నిర్వాహకులు భావిస్తున్నారు. ఇది నిర్వాహకుల అభిప్రాయం, ఏ న్యాయస్థానం లేదా ప్రభుత్వ సంస్థ తీర్పు కాదు.',
    },
    kind: 'position',
  },
];

export const orderCards = [
  { id: 'districts', title: { en: 'Districts', te: 'జిల్లాలు' }, icon: 'map-pin', text: { en: 'The basic unit for organising certain local cadres. The 2025 order defines districts with reference to the reorganised district map of the state.', te: 'కొన్ని స్థానిక కేడర్ల ఏర్పాటుకు ప్రాథమిక యూనిట్. 2025 ఉత్తర్వు రాష్ట్ర పునర్వ్యవస్థీకృత జిల్లా మ్యాప్ ఆధారంగా జిల్లాలను నిర్వచిస్తుంది.' } },
  { id: 'zones', title: { en: 'Zones', te: 'జోన్లు' }, icon: 'layers', text: { en: 'Groupings of districts that form a local area for specified categories of posts. The number and composition of zones is set out in the order.', te: 'నిర్దిష్ట వర్గాల పోస్టులకు స్థానిక ప్రాంతంగా ఏర్పడే జిల్లాల సమూహాలు. జోన్ల సంఖ్య మరియు కూర్పు ఉత్తర్వులో ఉంది.' } },
  { id: 'multi-zones', title: { en: 'Multi-Zones', te: 'మల్టీ-జోన్లు' }, icon: 'grid', text: { en: 'Larger groupings of zones used for higher categories of posts. The 2025 order describes how multi-zones are constituted.', te: 'ఉన్నత వర్గాల పోస్టులకు ఉపయోగించే జోన్ల పెద్ద సమూహాలు. మల్టీ-జోన్లు ఎలా ఏర్పడతాయో 2025 ఉత్తర్వు వివరిస్తుంది.' } },
  { id: 'cadre', title: { en: 'Cadre Structure', te: 'కేడర్ నిర్మాణం' }, icon: 'users', text: { en: 'How posts are organised into local cadres at district, zonal and multi-zonal levels, and how recruitment and promotions relate to those cadres.', te: 'జిల్లా, జోనల్ మరియు మల్టీ-జోనల్ స్థాయిల్లో పోస్టులు స్థానిక కేడర్లుగా ఎలా ఏర్పాటు చేయబడతాయి, నియామకాలు మరియు పదోన్నతులు ఆ కేడర్లతో ఎలా సంబంధం కలిగి ఉంటాయి.' } },
];

export const demands = [
  { id: 1, title: { en: 'Protect Local Opportunities', te: 'స్థానిక అవకాశాలను కాపాడాలి' }, icon: 'map-pin', text: { en: 'Ensure that employment opportunities arising within a region continue to be accessible to the people of that region.', te: 'ఒక ప్రాంతంలో ఏర్పడే ఉద్యోగ అవకాశాలు ఆ ప్రాంత ప్రజలకు అందుబాటులో ఉండేలా చూడాలి.' } },
  { id: 2, title: { en: 'Protect Employee Interests', te: 'ఉద్యోగుల ప్రయోజనాలను కాపాడాలి' }, icon: 'shield', text: { en: 'Safeguard the service conditions and legitimate expectations of existing government employees during any transition.', te: 'ఏ మార్పు సమయంలోనైనా ప్రస్తుత ప్రభుత్వ ఉద్యోగుల సేవా పరిస్థితులు మరియు న్యాయమైన అంచనాలను రక్షించాలి.' } },
  { id: 3, title: { en: 'Review the New Zonal Structure', te: 'కొత్త జోనల్ నిర్మాణాన్ని సమీక్షించాలి' }, icon: 'layers', text: { en: 'Call for a transparent review of the new district, zone and multi-zone arrangement with stakeholder consultation.', te: 'భాగస్వాముల సంప్రదింపులతో కొత్త జిల్లా, జోన్ మరియు మల్టీ-జోన్ ఏర్పాటుపై పారదర్శక సమీక్ష కోరడం.' } },
  { id: 4, title: { en: 'Protect Promotion Opportunities', te: 'పదోన్నతి అవకాశాలను కాపాడాలి' }, icon: 'trending-up', text: { en: 'Ensure promotion pathways for serving employees are not adversely affected by cadre restructuring.', te: 'కేడర్ పునర్నిర్మాణం వల్ల ఉద్యోగుల పదోన్నతి మార్గాలు ప్రతికూలంగా ప్రభావితం కాకుండా చూడాలి.' } },
  { id: 5, title: { en: 'Ensure Fair Opportunities for Youth', te: 'యువతకు న్యాయమైన అవకాశాలు' }, icon: 'users', text: { en: 'Seek clear, fair and predictable recruitment rules so that young aspirants can plan their careers with confidence.', te: 'యువ అభ్యర్థులు ఆత్మవిశ్వాసంతో తమ కెరీర్‌ను ప్రణాళిక చేసుకునేలా స్పష్టమైన, న్యాయమైన నియామక నియమాలు కోరడం.' } },
  { id: 6, title: { en: 'Uphold Constitutional Principles', te: 'రాజ్యాంగ సూత్రాలను నిలబెట్టాలి' }, icon: 'scale', text: { en: 'Encourage every decision to be guided by the letter and spirit of the Constitution, including Article 371D.', te: 'అధికరణ 371D సహా రాజ్యాంగ అక్షరం మరియు స్ఫూర్తి ప్రతి నిర్ణయానికి మార్గదర్శకంగా ఉండేలా ప్రోత్సహించడం.' } },
];

export const whyFeatures = [
  { id: '01', title: { en: 'Constitutional Rights', te: 'రాజ్యాంగ హక్కులు' }, icon: 'scale', text: { en: 'Help citizens understand the constitutional provisions — including Article 371D — that shape public employment in Andhra Pradesh.', te: 'ఆంధ్రప్రదేశ్‌లో ప్రభుత్వ ఉద్యోగాలను రూపొందించే రాజ్యాంగ నిబంధనలను — అధికరణ 371D సహా — పౌరులు అర్థం చేసుకోవడంలో సహాయపడటం.' } },
  { id: '02', title: { en: 'Employment & Local Opportunities', te: 'ఉద్యోగాలు & స్థానిక అవకాశాలు' }, icon: 'briefcase', text: { en: 'Bring attention to how local-cadre rules affect recruitment, postings and promotions for employees and aspirants.', te: 'స్థానిక కేడర్ నియమాలు ఉద్యోగులు మరియు అభ్యర్థుల నియామకాలు, పోస్టింగ్‌లు, పదోన్నతులను ఎలా ప్రభావితం చేస్తాయో దృష్టికి తేవడం.' } },
  { id: '03', title: { en: 'Public Awareness', te: 'ప్రజా అవగాహన' }, icon: 'megaphone', text: { en: 'Share accurate information, official documents and programme details so that public discussion is informed.', te: 'ప్రజా చర్చ సమాచారయుతంగా ఉండేలా ఖచ్చితమైన సమాచారం, అధికారిక పత్రాలు మరియు కార్యక్రమ వివరాలను పంచుకోవడం.' } },
];

export const faqs = [
  { q: { en: 'What is Article 371D?', te: 'అధికరణ 371D అంటే ఏమిటి?' }, a: { en: 'Article 371D of the Constitution of India contains special provisions for the State of Andhra Pradesh (and, after reorganisation, Telangana) relating to public employment and education. It enables the President to issue orders providing for the organisation of local cadres and equitable opportunities in public employment. Read the text of the Article from an official source before relying on any summary.', te: 'భారత రాజ్యాంగంలోని అధికరణ 371D ఆంధ్రప్రదేశ్ రాష్ట్రానికి (పునర్వ్యవస్థీకరణ తర్వాత తెలంగాణకు కూడా) ప్రభుత్వ ఉద్యోగాలు మరియు విద్యకు సంబంధించిన ప్రత్యేక నిబంధనలను కలిగి ఉంది. స్థానిక కేడర్ల ఏర్పాటు మరియు ప్రభుత్వ ఉద్యోగాల్లో సమాన అవకాశాల కోసం ఉత్తర్వులు జారీ చేయడానికి ఇది రాష్ట్రపతికి అధికారం ఇస్తుంది. ఏ సంగ్రహంపైనైనా ఆధారపడే ముందు అధికారిక మూలం నుండి అధికరణ పాఠాన్ని చదవండి.' }, kind: 'fact' },
  { q: { en: 'What is a “local cadre”?', te: '“స్థానిక కేడర్” అంటే ఏమిటి?' }, a: { en: 'In the context of these orders, a local cadre is a group of posts organised with reference to a defined local area — a district, a zone or a multi-zone. The orders specify which categories of posts are organised at which level.', te: 'ఈ ఉత్తర్వుల సందర్భంలో, స్థానిక కేడర్ అంటే నిర్వచించిన స్థానిక ప్రాంతం — జిల్లా, జోన్ లేదా మల్టీ-జోన్ — ఆధారంగా ఏర్పాటు చేసిన పోస్టుల సమూహం. ఏ వర్గాల పోస్టులు ఏ స్థాయిలో ఏర్పాటు చేయబడతాయో ఉత్తర్వులు నిర్దేశిస్తాయి.' }, kind: 'fact' },
  { q: { en: 'Why does the campaign want a review?', te: 'ఉద్యమం సమీక్ష ఎందుకు కోరుతోంది?' }, a: { en: 'Campaign Position: the organisers believe the 2025 framework should be reviewed with wider consultation so that its effect on local opportunities, promotions and youth aspirants is fully understood. This is the organisers’ view and not a legal finding.', te: 'ఉద్యమ వైఖరి: స్థానిక అవకాశాలు, పదోన్నతులు మరియు యువ అభ్యర్థులపై దాని ప్రభావం పూర్తిగా అర్థమయ్యేలా 2025 చట్రాన్ని విస్తృత సంప్రదింపులతో సమీక్షించాలని నిర్వాహకులు భావిస్తున్నారు. ఇది నిర్వాహకుల అభిప్రాయం, న్యాయపరమైన తీర్పు కాదు.' }, kind: 'position' },
];
