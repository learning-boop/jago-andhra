/**
 * Event records. Shape mirrors the intended MySQL `events` table so the PHP API can
 * return identical JSON later. Text fields are bilingual {en, te}.
 * All venue details are PLACEHOLDERS — replace via admin.
 */
export const eventTypes = [
  { id: 'awareness', en: 'Awareness Meeting', te: 'అవగాహన సమావేశం' },
  { id: 'public-awareness', en: 'Public Awareness Programme', te: 'ప్రజా అవగాహన కార్యక్రమం' },
  { id: 'campaign', en: 'Campaign Meeting', te: 'ఉద్యమ సమావేశం' },
  { id: 'public', en: 'Public Meeting', te: 'బహిరంగ సభ' },
];

const venueTBA = { en: '[Venue to be announced]', te: '[వేదిక త్వరలో ప్రకటించబడుతుంది]' };
const addressTBA = { en: '[Address placeholder — update from admin]', te: '[చిరునామా తాత్కాలికం — అడ్మిన్ నుండి అప్‌డేట్ చేయండి]' };

export const events = [
  {
    id: 1, slug: 'awareness-meeting-north-andhra', date: '2026-10-12', time: '10:30 AM',
    districtId: 'visakhapatnam', typeId: 'awareness',
    title: { en: 'Public Awareness Meeting', te: 'ప్రజా అవగాహన సమావేశం' },
    venue: venueTBA, address: addressTBA, mapsQuery: 'Visakhapatnam, Andhra Pradesh',
    description: { en: 'An awareness session on the local-cadre framework and the Presidential Order 2025. Details of venue and speakers will be published here once confirmed.', te: 'స్థానిక కేడర్ చట్రం మరియు రాష్ట్రపతి ఉత్తర్వు 2025పై అవగాహన సమావేశం. వేదిక మరియు వక్తల వివరాలు నిర్ధారణ అయ్యాక ఇక్కడ ప్రచురించబడతాయి.' },
    status: 'upcoming',
  },
  {
    id: 2, slug: 'public-awareness-programme-district', date: '2026-10-13', time: '11:00 AM',
    districtId: 'east-godavari', typeId: 'public-awareness',
    title: { en: 'Public Awareness Programme', te: 'ప్రజా అవగాహన కార్యక్రమం' },
    venue: venueTBA, address: addressTBA, mapsQuery: 'Rajamahendravaram, Andhra Pradesh',
    description: { en: 'Programme covering constitutional rights and employment-related concerns. Venue and timing will be confirmed by the organising committee.', te: 'రాజ్యాంగ హక్కులు మరియు ఉద్యోగ సంబంధిత ఆందోళనలపై కార్యక్రమం. వేదిక మరియు సమయాన్ని నిర్వాహక కమిటీ నిర్ధారిస్తుంది.' },
    status: 'upcoming',
  },
  {
    id: 3, slug: 'campaign-meeting-district', date: '2026-10-14', time: '04:00 PM',
    districtId: 'ntr', typeId: 'campaign',
    title: { en: 'Campaign Coordination Meeting', te: 'ఉద్యమ సమన్వయ సమావేశం' },
    venue: venueTBA, address: addressTBA, mapsQuery: 'Vijayawada, Andhra Pradesh',
    description: { en: 'Coordination meeting for district volunteers and committee members. Agenda and venue will be shared through official channels.', te: 'జిల్లా వాలంటీర్లు మరియు కమిటీ సభ్యుల సమన్వయ సమావేశం. అజెండా మరియు వేదిక అధికారిక మార్గాల ద్వారా తెలియజేయబడతాయి.' },
    status: 'upcoming',
  },
  {
    id: 4, slug: 'public-meeting-district', date: '2026-10-15', time: '05:30 PM',
    districtId: 'kurnool', typeId: 'public',
    title: { en: 'Public Meeting', te: 'బహిరంగ సభ' },
    venue: venueTBA, address: addressTBA, mapsQuery: 'Kurnool, Andhra Pradesh',
    description: { en: 'Open public meeting. Participation details and venue confirmation will be posted here.', te: 'బహిరంగ ప్రజా సభ. పాల్గొనే వివరాలు మరియు వేదిక నిర్ధారణ ఇక్కడ పోస్ట్ చేయబడతాయి.' },
    status: 'upcoming',
  },
];
