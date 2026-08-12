// Centralised site content. Edit values here to update the site.
// Items marked DEMO are placeholder content to be replaced with real school content.

export const school = {
  name: 'Lea Valley School',
  motto: 'Learning for Success',
  location: {
    line1: 'Kay Farms Estate',
    line2: 'Obawole, Iju',
    line3: 'Lagos, Nigeria',
    full: 'Kay Farms Estate, Obawole, Iju, Lagos, Nigeria',
  },
};

export type NavLink = { label: string; to: string };

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'School Life', to: '/school-life' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'News & Events', to: '/news' },
  { label: 'Contact', to: '/contact' },
];

export type Level = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  highlights: string[];
};

export const levels: Level[] = [
  {
    slug: 'creche',
    name: 'Creche',
    tagline: 'A gentle first step into the world of learning',
    description:
      'A safe, caring and stimulating environment where young children begin exploring and developing.',
    longDescription:
      'Our Creche provides a warm, secure and nurturing setting where very young children take their first steps beyond the home. Through gentle routines, sensory play and attentive care, we help each child feel settled, confident and curious about the world around them.',
    image:
      'https://images.pexels.com/photos/3661452/pexels-photo-3661452.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlights: ['Safe & secure setting', 'Attentive, nurturing care', 'Sensory & exploratory play', 'Gentle daily routines'],
  },
  {
    slug: 'nursery',
    name: 'Nursery',
    tagline: 'Building strong foundations through curiosity',
    description:
      'Building strong foundations through exploration, creativity, guided learning and age-appropriate Montessori techniques.',
    longDescription:
      'In Nursery, children begin to develop early language, number sense and social skills through a balance of guided learning and purposeful play. Age-appropriate Montessori techniques encourage independence and discovery, while creative activities spark imagination and joy in learning.',
    image:
      'https://images.pexels.com/photos/8422260/pexels-photo-8422260.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlights: ['Early language & numbers', 'Montessori-inspired learning', 'Creative & sensory play', 'Growing independence'],
  },
  {
    slug: 'primary',
    name: 'Primary',
    tagline: 'Confident, capable learners ready to thrive',
    description:
      'Developing confident and capable learners through strong academics, creativity, character development and a balanced curriculum.',
    longDescription:
      'Our Primary years build confident, capable learners through a balanced blend of strong academics, creative expression and character development. Pupils are challenged to think critically, supported to grow emotionally, and encouraged to aim high — developing the self-respect and confidence required to succeed in life.',
    image:
      'https://images.pexels.com/photos/12448839/pexels-photo-12448839.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlights: ['Strong academics', 'Critical thinking', 'Creativity & expression', 'Character & confidence'],
  },
];

export type CurriculumApproach = {
  name: string;
  summary: string;
  detail: string;
  icon: 'compass' | 'book' | 'globe';
};

export const curriculum: CurriculumApproach[] = [
  {
    name: 'Montessori Techniques',
    summary: 'Hands-on, child-centred learning that nurtures independence and discovery.',
    detail:
      'Age-appropriate Montessori methods are woven through our early years, encouraging children to learn at their own pace through carefully designed materials and purposeful play.',
    icon: 'compass',
  },
  {
    name: 'Nigerian Curriculum',
    summary: 'A strong national foundation rooted in our culture and educational standards.',
    detail:
      'The Nigerian curriculum provides the backbone of our academic programme, ensuring pupils develop the knowledge, skills and cultural understanding expected of a strong Nigerian education.',
    icon: 'book',
  },
  {
    name: 'British Curriculum Elements',
    summary: 'Selected international perspectives that broaden and enrich learning.',
    detail:
      'We thoughtfully incorporate selected aspects of the British curriculum to broaden our pupils’ horizons and enrich their learning — complementing, rather than replacing, our core Nigerian programme.',
    icon: 'globe',
  },
];

export type Pillar = {
  title: string;
  description: string;
  icon: 'graduation' | 'palette' | 'heart' | 'sun' | 'scale' | 'users';
};

export const pillars: Pillar[] = [
  { title: 'Academic Excellence', description: 'High expectations and strong foundations that challenge every child to do their best.', icon: 'graduation' },
  { title: 'Creative Development', description: 'Art, music and imaginative play that inspire children to express themselves freely.', icon: 'palette' },
  { title: 'Character & Confidence', description: 'We nurture self-respect, resilience and the confidence to aim high in life.', icon: 'heart' },
  { title: 'Caring Environment', description: 'A safe, welcoming space within the peaceful surroundings of Kay Farms Estate.', icon: 'sun' },
  { title: 'Balanced Curriculum', description: 'A thoughtful blend of Montessori, Nigerian and selected British approaches.', icon: 'scale' },
  { title: 'Inclusive Community', description: 'Open to children of all races, nationalities, religions and backgrounds.', icon: 'users' },
];

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: 'Classroom' | 'Creative' | 'Play' | 'Events' | 'Community';
  span?: boolean;
};

export const galleryItems: GalleryItem[] = [
  { id: 1, src: 'https://images.pexels.com/photos/12448839/pexels-photo-12448839.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Children in a classroom', category: 'Classroom', span: true },
  { id: 2, src: 'https://images.pexels.com/photos/8612986/pexels-photo-8612986.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Children painting', category: 'Creative' },
  { id: 3, src: 'https://images.pexels.com/photos/13891322/pexels-photo-13891322.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Children playing on a slide', category: 'Play' },
  { id: 4, src: 'https://images.pexels.com/photos/18449719/pexels-photo-18449719.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Children in school uniforms smiling', category: 'Community' },
  { id: 5, src: 'https://images.pexels.com/photos/8612993/pexels-photo-8612993.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Teacher and children painting together', category: 'Creative', span: true },
  { id: 6, src: 'https://images.pexels.com/photos/31773583/pexels-photo-31773583.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Children in a colourful classroom activity', category: 'Classroom' },
  { id: 7, src: 'https://images.pexels.com/photos/11128819/pexels-photo-11128819.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Children playing outdoors', category: 'Play' },
  { id: 8, src: 'https://images.pexels.com/photos/28593050/pexels-photo-28593050.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Children smiling through a window', category: 'Community' },
  { id: 9, src: 'https://images.pexels.com/photos/8466772/pexels-photo-8466772.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Teacher helping a child read', category: 'Classroom', span: true },
  { id: 10, src: 'https://images.pexels.com/photos/4393383/pexels-photo-4393383.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Children painting with watercolours', category: 'Creative' },
  { id: 11, src: 'https://images.pexels.com/photos/37074249/pexels-photo-37074249.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Children playing football', category: 'Play' },
  { id: 12, src: 'https://images.pexels.com/photos/36467878/pexels-photo-36467878.jpeg?auto=compress&cs=tinysrgb&w=900', alt: 'Group of schoolchildren outdoors', category: 'Events' },
];

export const galleryCategories = ['All', 'Classroom', 'Creative', 'Play', 'Events', 'Community'] as const;

// DEMO CONTENT — replace with real parent testimonials when available
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  demo: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'Our daughter has grown so much in confidence and curiosity since joining Lea Valley. The teachers genuinely care, and the environment is so peaceful and welcoming.',
    name: 'Parent Name',
    role: 'Parent of a Primary pupil',
    demo: true,
  },
  {
    quote:
      'The blend of structure and creativity is exactly what we wanted. Our son comes home excited about what he learned every single day.',
    name: 'Parent Name',
    role: 'Parent of a Nursery pupil',
    demo: true,
  },
  {
    quote:
      'We chose Lea Valley for the calm, safe setting and the warm community. It has been a wonderful start to our child’s education.',
    name: 'Parent Name',
    role: 'Parent of a Creche pupil',
    demo: true,
  },
];

// DEMO CONTENT — replace with real school news and events when available
export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'News' | 'Event';
  image: string;
  body: string[];
  demo: boolean;
};

export const newsItems: NewsItem[] = [
  {
    id: 'new-term-welcome',
    title: 'Welcome to a New Term at Lea Valley',
    excerpt: 'We are delighted to welcome our pupils and families back for a fresh term of learning, creativity and growth.',
    date: '2025-09-05',
    category: 'News',
    image: 'https://images.pexels.com/photos/8617938/pexels-photo-8617938.jpeg?auto=compress&cs=tinysrgb&w=1200',
    body: [
      'A new term brings new energy, new friendships and new opportunities to learn. Our teachers have prepared an exciting programme that balances strong academics with creativity, play and character development.',
      'We look forward to partnering with our families throughout the term to ensure every child feels challenged, inspired and supported.',
    ],
    demo: true,
  },
  {
    id: 'creative-arts-week',
    title: 'Creative Arts Week: Celebrating Imagination',
    excerpt: 'A week dedicated to art, music, drama and the many ways our children express their creativity.',
    date: '2025-10-14',
    category: 'Event',
    image: 'https://images.pexels.com/photos/8612988/pexels-photo-8612988.jpeg?auto=compress&cs=tinysrgb&w=1200',
    body: [
      'Creative Arts Week invites our pupils to explore painting, music, drama and storytelling. Throughout the week, children work on collaborative projects that celebrate imagination and self-expression.',
      'Families are warmly invited to join us for a showcase at the end of the week, where our children’s creative work will be on display.',
    ],
    demo: true,
  },
  {
    id: 'open-day-invitation',
    title: 'Open Day for Prospective Families',
    excerpt: 'We invite prospective parents to visit Lea Valley, meet our staff and experience our school community.',
    date: '2025-11-22',
    category: 'Event',
    image: 'https://images.pexels.com/photos/14554003/pexels-photo-14554003.jpeg?auto=compress&cs=tinysrgb&w=1200',
    body: [
      'Our Open Day is a wonderful opportunity for prospective families to walk through our grounds, observe learning in action and speak with our caring, dedicated staff.',
      'Guided tours will be available throughout the day. We warmly welcome families of all backgrounds to discover what makes Lea Valley a special place to learn and grow.',
    ],
    demo: true,
  },
];
