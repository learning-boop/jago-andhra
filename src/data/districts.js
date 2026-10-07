/**
 * District records used by the interactive map and forms.
 * Names are bilingual {en, te}. Contact fields are PLACEHOLDERS — fill from admin.
 * Map coordinates/shapes live in apMap.js (same ids).
 */
export const regions = {
  north: { en: 'North Andhra', te: 'ఉత్తరాంధ్ర' },
  godavari: { en: 'Godavari Region', te: 'గోదావరి ప్రాంతం' },
  central: { en: 'Central Andhra', te: 'మధ్య ఆంధ్ర' },
  south: { en: 'South Coastal', te: 'దక్షిణ కోస్తా' },
  rayalaseema: { en: 'Rayalaseema', te: 'రాయలసీమ' },
};

const placeholderContact = { name: '[Coordinator name]', phone: '[Phone]', email: '[Email]' };

export const districts = [
  { id: 'srikakulam', name: { en: 'Srikakulam', te: 'శ్రీకాకుళం' }, region: 'north', contact: placeholderContact },
  { id: 'manyam', name: { en: 'Parvathipuram Manyam', te: 'పార్వతీపురం మన్యం' }, region: 'north', contact: placeholderContact },
  { id: 'vizianagaram', name: { en: 'Vizianagaram', te: 'విజయనగరం' }, region: 'north', contact: placeholderContact },
  { id: 'visakhapatnam', name: { en: 'Visakhapatnam', te: 'విశాఖపట్నం' }, region: 'north', contact: placeholderContact },
  { id: 'anakapalli', name: { en: 'Anakapalli', te: 'అనకాపల్లి' }, region: 'north', contact: placeholderContact },
  { id: 'asr', name: { en: 'Alluri Sitharama Raju', te: 'అల్లూరి సీతారామరాజు' }, region: 'north', contact: placeholderContact },
  { id: 'kakinada', name: { en: 'Kakinada', te: 'కాకినాడ' }, region: 'godavari', contact: placeholderContact },
  { id: 'east-godavari', name: { en: 'East Godavari', te: 'తూర్పు గోదావరి' }, region: 'godavari', contact: placeholderContact },
  { id: 'konaseema', name: { en: 'Dr. B.R. Ambedkar Konaseema', te: 'డా. బి.ఆర్. అంబేద్కర్ కోనసీమ' }, region: 'godavari', contact: placeholderContact },
  { id: 'west-godavari', name: { en: 'West Godavari', te: 'పశ్చిమ గోదావరి' }, region: 'godavari', contact: placeholderContact },
  { id: 'eluru', name: { en: 'Eluru', te: 'ఏలూరు' }, region: 'godavari', contact: placeholderContact },
  { id: 'krishna', name: { en: 'Krishna', te: 'కృష్ణా' }, region: 'central', contact: placeholderContact },
  { id: 'ntr', name: { en: 'NTR', te: 'ఎన్టీఆర్' }, region: 'central', contact: placeholderContact },
  { id: 'guntur', name: { en: 'Guntur', te: 'గుంటూరు' }, region: 'central', contact: placeholderContact },
  { id: 'palnadu', name: { en: 'Palnadu', te: 'పల్నాడు' }, region: 'central', contact: placeholderContact },
  { id: 'bapatla', name: { en: 'Bapatla', te: 'బాపట్ల' }, region: 'central', contact: placeholderContact },
  { id: 'prakasam', name: { en: 'Prakasam', te: 'ప్రకాశం' }, region: 'south', contact: placeholderContact },
  { id: 'nellore', name: { en: 'Nellore', te: 'నెల్లూరు' }, region: 'south', contact: placeholderContact },
  { id: 'kurnool', name: { en: 'Kurnool', te: 'కర్నూలు' }, region: 'rayalaseema', contact: placeholderContact },
  { id: 'nandyal', name: { en: 'Nandyal', te: 'నంద్యాల' }, region: 'rayalaseema', contact: placeholderContact },
  { id: 'kadapa', name: { en: 'YSR Kadapa', te: 'వైఎస్ఆర్ కడప' }, region: 'rayalaseema', contact: placeholderContact },
  { id: 'anantapur', name: { en: 'Anantapur', te: 'అనంతపురం' }, region: 'rayalaseema', contact: placeholderContact },
  { id: 'sri-sathya-sai', name: { en: 'Sri Sathya Sai', te: 'శ్రీ సత్యసాయి' }, region: 'rayalaseema', contact: placeholderContact },
  { id: 'annamayya', name: { en: 'Annamayya', te: 'అన్నమయ్య' }, region: 'rayalaseema', contact: placeholderContact },
  { id: 'tirupati', name: { en: 'Tirupati', te: 'తిరుపతి' }, region: 'rayalaseema', contact: placeholderContact },
  { id: 'chittoor', name: { en: 'Chittoor', te: 'చిత్తూరు' }, region: 'rayalaseema', contact: placeholderContact },
];
