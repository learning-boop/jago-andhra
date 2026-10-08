/**
 * District records used by the interactive map and forms.
 * Names are bilingual {en, te}. Contact fields are PLACEHOLDERS — fill from admin.
 * Map coordinates/shapes live in apMap.js (same ids).
 * `zone` follows the Schedule to the Presidential Order 2025: Zones I–III form Multi-Zone I, Zones IV–VI form Multi-Zone II.
 */
export const regions = {
  north: { en: 'North Andhra', te: 'ఉత్తరాంధ్ర' },
  godavari: { en: 'Godavari Region', te: 'గోదావరి ప్రాంతం' },
  central: { en: 'Central Andhra', te: 'మధ్య ఆంధ్ర' },
  south: { en: 'South Coastal', te: 'దక్షిణ కోస్తా' },
  rayalaseema: { en: 'Rayalaseema', te: 'రాయలసీమ' },
};

export const romanZone = (n) => ['I', 'II', 'III', 'IV', 'V', 'VI'][n - 1];
export const multiZoneOf = (zone) => (zone <= 3 ? 1 : 2);

const placeholderContact = { name: '[Coordinator name]', phone: '[Phone]', email: '[Email]' };

export const districts = [
  { id: 'srikakulam', name: { en: 'Srikakulam', te: 'శ్రీకాకుళం' }, region: 'north', zone: 1, contact: placeholderContact },
  { id: 'manyam', name: { en: 'Parvathipuram Manyam', te: 'పార్వతీపురం మన్యం' }, region: 'north', zone: 1, contact: placeholderContact },
  { id: 'vizianagaram', name: { en: 'Vizianagaram', te: 'విజయనగరం' }, region: 'north', zone: 1, contact: placeholderContact },
  { id: 'visakhapatnam', name: { en: 'Visakhapatnam', te: 'విశాఖపట్నం' }, region: 'north', zone: 1, contact: placeholderContact },
  { id: 'anakapalli', name: { en: 'Anakapalli', te: 'అనకాపల్లి' }, region: 'north', zone: 1, contact: placeholderContact },
  { id: 'asr', name: { en: 'Alluri Sitarama Raju', te: 'అల్లూరి సీతారామరాజు' }, region: 'north', zone: 2, contact: placeholderContact },
  { id: 'kakinada', name: { en: 'Kakinada', te: 'కాకినాడ' }, region: 'godavari', zone: 2, contact: placeholderContact },
  { id: 'east-godavari', name: { en: 'East Godavari', te: 'తూర్పు గోదావరి' }, region: 'godavari', zone: 2, contact: placeholderContact },
  { id: 'konaseema', name: { en: 'Dr. B.R. Ambedkar Konaseema', te: 'డా. బి.ఆర్. అంబేద్కర్ కోనసీమ' }, region: 'godavari', zone: 2, contact: placeholderContact },
  { id: 'west-godavari', name: { en: 'West Godavari', te: 'పశ్చిమ గోదావరి' }, region: 'godavari', zone: 3, contact: placeholderContact },
  { id: 'eluru', name: { en: 'Eluru', te: 'ఏలూరు' }, region: 'godavari', zone: 3, contact: placeholderContact },
  { id: 'krishna', name: { en: 'Krishna', te: 'కృష్ణా' }, region: 'central', zone: 3, contact: placeholderContact },
  { id: 'ntr', name: { en: 'NTR', te: 'ఎన్టీఆర్' }, region: 'central', zone: 3, contact: placeholderContact },
  { id: 'guntur', name: { en: 'Guntur', te: 'గుంటూరు' }, region: 'central', zone: 4, contact: placeholderContact },
  { id: 'palnadu', name: { en: 'Palnadu', te: 'పల్నాడు' }, region: 'central', zone: 4, contact: placeholderContact },
  { id: 'bapatla', name: { en: 'Bapatla', te: 'బాపట్ల' }, region: 'central', zone: 4, contact: placeholderContact },
  { id: 'prakasam', name: { en: 'Prakasam', te: 'ప్రకాశం' }, region: 'south', zone: 4, contact: placeholderContact },
  { id: 'nellore', name: { en: 'Sri Potti Sriramulu Nellore', te: 'శ్రీ పొట్టి శ్రీరాములు నెల్లూరు' }, region: 'south', zone: 4, contact: placeholderContact },
  { id: 'kurnool', name: { en: 'Kurnool', te: 'కర్నూలు' }, region: 'rayalaseema', zone: 6, contact: placeholderContact },
  { id: 'nandyal', name: { en: 'Nandyal', te: 'నంద్యాల' }, region: 'rayalaseema', zone: 6, contact: placeholderContact },
  { id: 'kadapa', name: { en: 'YSR Kadapa', te: 'వైఎస్ఆర్ కడప' }, region: 'rayalaseema', zone: 5, contact: placeholderContact },
  { id: 'anantapur', name: { en: 'Ananthapuramu', te: 'అనంతపురము' }, region: 'rayalaseema', zone: 6, contact: placeholderContact },
  { id: 'sri-sathya-sai', name: { en: 'Sri Sathya Sai', te: 'శ్రీ సత్యసాయి' }, region: 'rayalaseema', zone: 6, contact: placeholderContact },
  { id: 'annamayya', name: { en: 'Annamayya', te: 'అన్నమయ్య' }, region: 'rayalaseema', zone: 5, contact: placeholderContact },
  { id: 'tirupati', name: { en: 'Tirupati', te: 'తిరుపతి' }, region: 'rayalaseema', zone: 5, contact: placeholderContact },
  { id: 'chittoor', name: { en: 'Chittoor', te: 'చిత్తూరు' }, region: 'rayalaseema', zone: 5, contact: placeholderContact },
];
