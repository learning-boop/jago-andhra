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
    year: '1975 – 2025',
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
    summary: { en: 'S.O. 5777(E), issued by the Ministry of Home Affairs on 15 December 2025 under Article 371D. In force at once, superseding the 1975 Order.', te: 'S.O. 5777(E), అధికరణ 371D కింద 15 డిసెంబర్ 2025న కేంద్ర హోం మంత్రిత్వ శాఖ జారీ చేసింది. వెంటనే అమల్లోకి వచ్చి, 1975 ఉత్తర్వును రద్దు చేసింది.' },
    detail: {
      en: 'The Andhra Pradesh Public Employment (Organisation of Local Cadres and Regulation of Direct Recruitment) Order, 2025 was published in the Gazette of India: Extraordinary (Part II, Sec. 3(ii)). It sets out how local cadres are organised, who counts as a local candidate, the share of direct recruitment reserved for local candidates, and the offices it does not apply to. This site summarises it; the official text is the authority.',
      te: 'ఆంధ్రప్రదేశ్ ప్రభుత్వ ఉద్యోగ (స్థానిక కేడర్ల ఏర్పాటు మరియు ప్రత్యక్ష నియామకాల నియంత్రణ) ఉత్తర్వు, 2025 భారత గెజిట్: అసాధారణ (భాగం II, సెక్షన్ 3(ii))లో ప్రచురించబడింది. స్థానిక కేడర్లు ఎలా ఏర్పాటు చేయాలి, స్థానిక అభ్యర్థి ఎవరు, ప్రత్యక్ష నియామకాల్లో స్థానికులకు రిజర్వ్ చేసే వాటా, ఉత్తర్వు వర్తించని కార్యాలయాలు — వీటిని నిర్దేశిస్తుంది. ఈ సైట్ దాన్ని సంగ్రహిస్తుంది; అధికారిక పాఠమే ప్రామాణికం.',
    },
    kind: 'fact',
    link: { label: { en: 'Read the Presidential Order 2025 (Gazette of India)', te: 'రాష్ట్రపతి ఉత్తర్వు 2025 చదవండి (భారత గెజిట్)' }, url: '/documents/presidential-order-2025-gazette-of-india.pdf' },
  },
  {
    id: 'new-framework',
    year: '2025',
    label: { en: 'New organisational framework', te: 'కొత్త వ్యవస్థాగత చట్రం' },
    icon: 'map',
    summary: { en: '26 districts grouped into 6 zones and 2 multi-zones, as set out in the Schedule to the 2025 Order.', te: '2025 ఉత్తర్వు షెడ్యూల్ ప్రకారం 26 జిల్లాలు, 6 జోన్లు మరియు 2 మల్టీ-జోన్లుగా వర్గీకరించబడ్డాయి.' },
    detail: {
      en: 'Posts up to Junior Assistant level, and school teacher posts, form district cadres. Posts above Junior Assistant up to Superintendent, plus the first-level Gazetted post, form zonal cadres. Posts above that, up to and including Deputy Collector, form multi-zonal cadres. Each cadre is a separate unit for recruitment, seniority, promotion and transfer, and 95% of direct recruitment in it is reserved for local candidates of that area.',
      te: 'జూనియర్ అసిస్టెంట్ స్థాయి వరకు పోస్టులు, పాఠశాల ఉపాధ్యాయ పోస్టులు జిల్లా కేడర్లుగా ఏర్పడతాయి. జూనియర్ అసిస్టెంట్ పైనుండి సూపరింటెండెంట్ వరకు పోస్టులు, మొదటి స్థాయి గెజిటెడ్ పోస్టు జోనల్ కేడర్లుగా ఏర్పడతాయి. వాటి పైనుండి డిప్యూటీ కలెక్టర్ వరకు పోస్టులు మల్టీ-జోనల్ కేడర్లుగా ఏర్పడతాయి. ప్రతి కేడర్ నియామకం, సీనియారిటీ, పదోన్నతి, బదిలీలకు ప్రత్యేక యూనిట్; అందులో ప్రత్యక్ష నియామకాల్లో 95% ఆ ప్రాంత స్థానిక అభ్యర్థులకు రిజర్వ్ చేయబడతాయి.',
    },
    kind: 'fact',
  },
  {
    id: 'implementation',
    year: '2026',
    label: { en: 'State republication & instructions', te: 'రాష్ట్ర పునఃప్రచురణ & సూచనలు' },
    icon: 'file',
    summary: { en: 'Republished in the AP Gazette on 20 April 2026 (G.O.Ms.No.45). Departments told to submit cadre proposals by 25 May 2026 (G.O.Ms.No.54).', te: '20 ఏప్రిల్ 2026న ఏపీ గెజిట్‌లో పునఃప్రచురణ (G.O.Ms.No.45). 25 మే 2026 లోగా కేడర్ ప్రతిపాదనలు సమర్పించాలని శాఖలకు ఆదేశం (G.O.Ms.No.54).' },
    detail: {
      en: 'G.O.Ms.No.54 (14 May 2026) directs every Secretariat Department to organise its posts into district, zonal and multi-zonal cadres in line with the Order and to send certified proposals to the Chief Secretary. The Order gives the State twenty-seven months from 15 December 2025 to organise local cadres. Appointments and promotions made before a cadre is organised are provisional and must be reviewed within twelve months after it is organised.',
      te: 'G.O.Ms.No.54 (14 మే 2026) ప్రతి సచివాలయ శాఖ తమ పోస్టులను ఉత్తర్వుకు అనుగుణంగా జిల్లా, జోనల్, మల్టీ-జోనల్ కేడర్లుగా ఏర్పాటు చేసి, ధృవీకరించిన ప్రతిపాదనలను ప్రధాన కార్యదర్శికి పంపాలని ఆదేశిస్తుంది. 15 డిసెంబర్ 2025 నుండి ఇరవై ఏడు నెలల్లో స్థానిక కేడర్లు ఏర్పాటు చేయాలని ఉత్తర్వు నిర్దేశిస్తుంది. కేడర్ ఏర్పాటుకు ముందు జరిగిన నియామకాలు, పదోన్నతులు తాత్కాలికమైనవి; ఏర్పాటు తర్వాత పన్నెండు నెలల్లో వాటిని సమీక్షించాలి.',
    },
    kind: 'fact',
    link: { label: { en: 'Read G.O.Ms.No.54 (official source)', te: 'G.O.Ms.No.54 చదవండి (అధికారిక మూలం)' }, url: '/documents/go-ms-54-local-cadre-instructions.pdf' },
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
  { id: 'districts', title: { en: '26 Districts', te: '26 జిల్లాలు' }, icon: 'map-pin', text: { en: 'District cadre: Junior Assistant and every equivalent or lower post, plus all school teacher posts. Each revenue district is the local area for these posts.', te: 'జిల్లా కేడర్: జూనియర్ అసిస్టెంట్ మరియు దానికి సమానమైన లేదా దిగువ పోస్టులు, అన్ని పాఠశాల ఉపాధ్యాయ పోస్టులు. ఈ పోస్టులకు ప్రతి రెవెన్యూ జిల్లా స్థానిక ప్రాంతం.' } },
  { id: 'zones', title: { en: '6 Zones', te: '6 జోన్లు' }, icon: 'layers', text: { en: 'Zonal cadre: posts above Junior Assistant up to and including Superintendent, and the first-level Gazetted post, in each department.', te: 'జోనల్ కేడర్: ప్రతి శాఖలో జూనియర్ అసిస్టెంట్ పైనుండి సూపరింటెండెంట్ వరకు పోస్టులు, మొదటి స్థాయి గెజిటెడ్ పోస్టు.' } },
  { id: 'multi-zones', title: { en: '2 Multi-Zones', te: '2 మల్టీ-జోన్లు' }, icon: 'grid', text: { en: 'Multi-zonal cadre: posts above Superintendent and the first-level Gazetted post, up to and including Deputy Collector.', te: 'మల్టీ-జోనల్ కేడర్: సూపరింటెండెంట్, మొదటి స్థాయి గెజిటెడ్ పోస్టు పైనుండి డిప్యూటీ కలెక్టర్ వరకు పోస్టులు.' } },
  { id: 'cadre', title: { en: '95% Local Reservation', te: '95% స్థానిక రిజర్వేషన్' }, icon: 'users', text: { en: '95% of posts filled by direct recruitment in each local cadre are reserved for local candidates of that area; at least one post stays unreserved. Unfilled reserved posts carry forward for up to three years.', te: 'ప్రతి స్థానిక కేడర్‌లో ప్రత్యక్ష నియామకాల పోస్టుల్లో 95% ఆ ప్రాంత స్థానిక అభ్యర్థులకు రిజర్వ్; కనీసం ఒక పోస్టు అన్‌రిజర్వ్‌డ్. భర్తీ కాని రిజర్వ్ పోస్టులు మూడేళ్ల వరకు క్యారీ ఫార్వర్డ్ అవుతాయి.' } },
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
  { q: { en: 'When did the Presidential Order 2025 come into force?', te: 'రాష్ట్రపతి ఉత్తర్వు 2025 ఎప్పుడు అమల్లోకి వచ్చింది?' }, a: { en: 'It was issued as S.O. 5777(E) in the Gazette of India on 15 December 2025 and came into force at once, superseding the 1975 Order (except for things already done under it). The State Government republished it in the Andhra Pradesh Gazette on 20 April 2026 through G.O.Ms.No.45.', te: 'ఇది 15 డిసెంబర్ 2025న భారత గెజిట్‌లో S.O. 5777(E)గా జారీ అయి వెంటనే అమల్లోకి వచ్చింది, 1975 ఉత్తర్వును రద్దు చేసింది (దాని కింద ఇప్పటికే జరిగినవి మినహా). రాష్ట్ర ప్రభుత్వం G.O.Ms.No.45 ద్వారా 20 ఏప్రిల్ 2026న ఆంధ్రప్రదేశ్ గెజిట్‌లో పునఃప్రచురించింది.' }, kind: 'fact' },
  { q: { en: 'Who counts as a “local candidate”?', te: '“స్థానిక అభ్యర్థి” ఎవరు?' }, a: { en: 'Under Paragraph 7, a candidate is local to an area if they studied there for at least four consecutive academic years ending with the year they first sat the relevant qualifying examination — or, if they did not study during that period, lived there for four years before that examination. Where no educational qualification is prescribed, four years of residence before the post is notified counts. The relevant examination is the post’s minimum qualification or Class VII, whichever is lower. Candidates who do not qualify anywhere may still be treated as local based on seven years of study or residence in the State.', te: 'పేరా 7 ప్రకారం, సంబంధిత అర్హత పరీక్ష మొదటిసారి రాసిన సంవత్సరంతో ముగిసే కనీసం నాలుగు వరుస విద్యా సంవత్సరాలు ఒక ప్రాంతంలో చదివిన అభ్యర్థి ఆ ప్రాంతానికి స్థానికుడు — ఆ కాలంలో చదవకపోతే, ఆ పరీక్షకు ముందు నాలుగేళ్లు అక్కడ నివసించి ఉండాలి. విద్యార్హత నిర్దేశించని పోస్టులకు, పోస్టు నోటిఫై అయ్యే ముందు నాలుగేళ్ల నివాసం పరిగణిస్తారు. సంబంధిత పరీక్ష అంటే పోస్టుకు కనీస అర్హత పరీక్ష లేదా 7వ తరగతి — ఏది తక్కువైతే అది. ఎక్కడా అర్హత పొందనివారిని రాష్ట్రంలో ఏడేళ్ల చదువు లేదా నివాసం ఆధారంగా స్థానికులుగా పరిగణించవచ్చు.' }, kind: 'fact' },
  { q: { en: 'Which posts are outside the Order?', te: 'ఏ పోస్టులకు ఉత్తర్వు వర్తించదు?' }, a: { en: 'Paragraph 14 says the Order does not apply to posts in the Andhra Pradesh Secretariat, offices of Heads of Departments, notified Special Offices or Establishments, notified State-level offices or institutions, and police posts in the Commissionerate in the Capital area.', te: 'పేరా 14 ప్రకారం ఆంధ్రప్రదేశ్ సచివాలయం, శాఖాధిపతుల కార్యాలయాలు, నోటిఫై చేసిన ప్రత్యేక కార్యాలయాలు/సంస్థలు, నోటిఫై చేసిన రాష్ట్ర స్థాయి కార్యాలయాలు/సంస్థలు, మరియు రాజధాని ప్రాంత కమిషనరేట్‌లోని పోలీసు పోస్టులకు ఉత్తర్వు వర్తించదు.' }, kind: 'fact' },
  { q: { en: 'Why does the campaign want a review?', te: 'ఉద్యమం సమీక్ష ఎందుకు కోరుతోంది?' }, a: { en: 'Campaign Position: the organisers believe the 2025 framework should be reviewed with wider consultation so that its effect on local opportunities, promotions and youth aspirants is fully understood. This is the organisers’ view and not a legal finding.', te: 'ఉద్యమ వైఖరి: స్థానిక అవకాశాలు, పదోన్నతులు మరియు యువ అభ్యర్థులపై దాని ప్రభావం పూర్తిగా అర్థమయ్యేలా 2025 చట్రాన్ని విస్తృత సంప్రదింపులతో సమీక్షించాలని నిర్వాహకులు భావిస్తున్నారు. ఇది నిర్వాహకుల అభిప్రాయం, న్యాయపరమైన తీర్పు కాదు.' }, kind: 'position' },
];
