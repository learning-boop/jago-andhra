/**
 * Document library records. Mirrors intended `documents` table. Text fields are bilingual {en, te}.
 * `url` values are PLACEHOLDERS — point them to real PDFs (or the API's file URLs).
 */
export const documentCategories = [
  { id: 'order-2025', en: 'Presidential Order 2025', te: 'రాష్ట్రపతి ఉత్తర్వు 2025' },
  { id: 'gos', en: 'Government Orders', te: 'ప్రభుత్వ ఉత్తర్వులు' },
  { id: 'apgea', en: 'APGEA Statements', te: 'APGEA ప్రకటనలు' },
  { id: 'representations', en: 'Representations', te: 'వినతులు' },
  { id: 'press', en: 'Press Releases', te: 'పత్రికా ప్రకటనలు' },
  { id: 'notices', en: 'Public Notices', te: 'ప్రజా నోటీసులు' },
];

export const documents = [
  { id: 1, categoryId: 'order-2025', title: { en: 'Presidential Order 2025 — Official Text', te: 'రాష్ట్రపతి ఉత్తర్వు 2025 — అధికారిక పాఠం' }, date: '2025-01-01', description: { en: '[Placeholder] Link to the official Gazette notification. Replace with the verified government source URL.', te: '[తాత్కాలికం] అధికారిక గెజిట్ నోటిఫికేషన్‌కు లింక్. ధృవీకరించిన ప్రభుత్వ మూల URLతో భర్తీ చేయండి.' }, url: '#', size: '— MB', official: true },
  { id: 2, categoryId: 'gos', title: { en: 'Related Government Orders (G.O.s)', te: 'సంబంధిత ప్రభుత్వ ఉత్తర్వులు (G.O.లు)' }, date: '2025-01-01', description: { en: '[Placeholder] Government orders issued in connection with the organisational framework.', te: '[తాత్కాలికం] వ్యవస్థాగత చట్రానికి సంబంధించి జారీ చేసిన ప్రభుత్వ ఉత్తర్వులు.' }, url: '#', size: '— MB', official: true },
  { id: 3, categoryId: 'apgea', title: { en: 'APGEA Statement on the Presidential Order 2025', te: 'రాష్ట్రపతి ఉత్తర్వు 2025పై APGEA ప్రకటన' }, date: '2026-09-01', description: { en: '[Placeholder] Statement issued by the AP Government Employees Association. Represents the association’s position.', te: '[తాత్కాలికం] ఏపీ ప్రభుత్వ ఉద్యోగుల సంఘం జారీ చేసిన ప్రకటన. సంఘం వైఖరిని సూచిస్తుంది.' }, url: '#', size: '— MB', official: false },
  { id: 4, categoryId: 'representations', title: { en: 'Representation submitted to the Government', te: 'ప్రభుత్వానికి సమర్పించిన వినతి' }, date: '2026-09-15', description: { en: '[Placeholder] Copy of the representation submitted on behalf of employees and stakeholders.', te: '[తాత్కాలికం] ఉద్యోగులు మరియు భాగస్వాముల తరఫున సమర్పించిన వినతి ప్రతి.' }, url: '#', size: '— MB', official: false },
  { id: 5, categoryId: 'press', title: { en: 'Campaign Launch Press Release', te: 'ఉద్యమ ప్రారంభ పత్రికా ప్రకటన' }, date: '2026-10-01', description: { en: '[Placeholder] Press release announcing the Jago Andhra awareness campaign.', te: '[తాత్కాలికం] జాగో ఆంధ్ర అవగాహన ఉద్యమాన్ని ప్రకటించే పత్రికా ప్రకటన.' }, url: '#', size: '— MB', official: false },
  { id: 6, categoryId: 'notices', title: { en: 'Public Notice — October Programmes', te: 'ప్రజా నోటీసు — అక్టోబర్ కార్యక్రమాలు' }, date: '2026-10-06', description: { en: '[Placeholder] Notice listing the October awareness programme schedule.', te: '[తాత్కాలికం] అక్టోబర్ అవగాహన కార్యక్రమ షెడ్యూల్ నోటీసు.' }, url: '#', size: '— MB', official: false },
];
