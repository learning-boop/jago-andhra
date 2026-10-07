/**
 * Gallery records. Mirrors intended `gallery` table. Captions bilingual {en, te}.
 * Images are royalty-free PLACEHOLDERS (Unsplash) — replace with campaign photos via admin.
 */
export const galleryCategories = [
  { id: 'meetings', en: 'Meetings', te: 'సమావేశాలు' },
  { id: 'campaign', en: 'Campaign', te: 'ఉద్యమం' },
  { id: 'public', en: 'Public Events', te: 'ప్రజా కార్యక్రమాలు' },
  { id: 'media', en: 'Media', te: 'మీడియా' },
];

const ph = (en, te) => ({ en: `${en} [placeholder]`, te: `${te} [తాత్కాలికం]` });

export const gallery = [
  { id: 1, categoryId: 'meetings', src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=70', alt: 'People seated at a meeting table', caption: ph('Coordination meeting', 'సమన్వయ సమావేశం'), h: 'tall' },
  { id: 2, categoryId: 'campaign', src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=70', alt: 'Volunteers discussing around a laptop', caption: ph('Volunteer planning', 'వాలంటీర్ ప్రణాళిక'), h: 'short' },
  { id: 3, categoryId: 'public', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=70', alt: 'Audience at a public hall', caption: ph('Public programme', 'ప్రజా కార్యక్రమం'), h: 'medium' },
  { id: 4, categoryId: 'media', src: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=70', alt: 'Newspapers stacked on a table', caption: ph('Media coverage', 'మీడియా కవరేజ్'), h: 'short' },
  { id: 5, categoryId: 'meetings', src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=70', alt: 'Team in a discussion', caption: ph('District committee', 'జిల్లా కమిటీ'), h: 'medium' },
  { id: 6, categoryId: 'campaign', src: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=900&q=70', alt: 'Documents and notes on a desk', caption: ph('Awareness material', 'అవగాహన సామగ్రి'), h: 'tall' },
  { id: 7, categoryId: 'public', src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=70', alt: 'Speaker addressing an audience', caption: ph('Awareness session', 'అవగాహన సదస్సు'), h: 'short' },
  { id: 8, categoryId: 'media', src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=70', alt: 'Microphones at a press briefing', caption: ph('Press briefing', 'పత్రికా సమావేశం'), h: 'medium' },
  { id: 9, categoryId: 'campaign', src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=70', alt: 'Volunteers working together', caption: ph('Volunteer drive', 'వాలంటీర్ డ్రైవ్'), h: 'short' },
];
