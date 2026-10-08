/**
 * Video / media records. Mirrors intended `media` table. Titles bilingual {en, te}.
 * Items with an empty `youtubeId` are PLACEHOLDERS — add the official channel's video IDs.
 * `embed: false` = the owner has disabled playback on other websites, so the card opens YouTube instead.
 */
export const mediaCategories = [
  { id: 'campaign', en: 'Campaign Videos', te: 'ఉద్యమ వీడియోలు' },
  { id: 'meetings', en: 'Public Meetings', te: 'బహిరంగ సభలు' },
  { id: 'speeches', en: 'Speeches', te: 'ప్రసంగాలు' },
  { id: 'interviews', en: 'Interviews', te: 'ఇంటర్వ్యూలు' },
];

export const media = [
  { id: 1, categoryId: 'campaign', title: { en: 'Why Jago Andhra? — Campaign introduction', te: 'జాగో ఆంధ్ర ఎందుకు? — ఉద్యమ పరిచయం' }, duration: '', youtubeId: 'xP2Wgzn1-NM', embed: false, thumbnail: '', description: { en: 'Introduction to the Jago Andhra awareness campaign.', te: 'జాగో ఆంధ్ర అవగాహన ఉద్యమ పరిచయం.' } },
  { id: 2, categoryId: 'meetings', title: { en: 'Public awareness meeting — highlights', te: 'ప్రజా అవగాహన సమావేశం — ముఖ్యాంశాలు' }, duration: '—:—', youtubeId: '', thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=70', description: { en: '[Placeholder] Highlights from a district programme.', te: '[తాత్కాలికం] జిల్లా కార్యక్రమ ముఖ్యాంశాలు.' } },
  { id: 3, categoryId: 'speeches', title: { en: 'Understanding the local-cadre framework', te: 'స్థానిక కేడర్ చట్రాన్ని అర్థం చేసుకోవడం' }, duration: '—:—', youtubeId: '', thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=70', description: { en: '[Placeholder] Explanatory talk on the historical framework.', te: '[తాత్కాలికం] చారిత్రక చట్రంపై వివరణాత్మక ప్రసంగం.' } },
  { id: 4, categoryId: 'interviews', title: { en: 'In conversation: employee perspectives', te: 'సంభాషణ: ఉద్యోగుల దృక్కోణాలు' }, duration: '—:—', youtubeId: '', thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=900&q=70', description: { en: '[Placeholder] Interview segment.', te: '[తాత్కాలికం] ఇంటర్వ్యూ భాగం.' } },
];
