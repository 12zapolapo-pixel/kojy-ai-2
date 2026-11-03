/* Rana Yaser portfolio — shared work data (artworks, projects, roles, skills).
   Text is Rana's own; edit here and every design picks it up. */
const ARCHIVE_WORKS = [
  {
    id: 'art-01',
    title: 'Your First Step Toward the Professional Tech World',
    arabicTitle: 'خطوتك الأولى نحو العالم التقني المهني',
    org: 'KAU Programming Club (FCIT)',
    handle: '@ProggClub_KAU',
    categories: ['social', 'digital', 'community'],
    categoryLabel: 'Social Media & Tech Awareness',
    aspectClass: 'aspect-[847/1200]',
    colSpan: 'lg:col-span-4',
    format: 'Vertical Social Announcement (847 × 1200)',
    src: '@@ART:art-01@@',
    description: 'Bilingual event announcement poster designed for the KAU Programming Club at FCIT (“كيف تجهز نفسك لسوق العمل؟” — How to prepare yourself for the job market). Features a futuristic dark violet neon interface with structured speaker agenda cards, session date/time, Zoom badge, and attendance certificate highlight.'
  },
  {
    id: 'art-02',
    title: 'Ala Khutah — From Makkah to Madinah Campaign',
    arabicTitle: 'على خُطاه — من مكة إلى المدينة كما لم تُعاش من قبل',
    org: 'Ruyana Community (رؤانا)',
    handle: '@ruaanasa',
    categories: ['social', 'community'],
    categoryLabel: 'Community Campaign Design',
    aspectClass: 'aspect-[4/5]',
    colSpan: 'lg:col-span-4',
    format: '4:5 Portrait Social Post (960 × 1200)',
    src: '@@ART:art-02@@',
    description: 'Atmospheric visual storytelling post created for Ruyana exploring the historical Hijrah route from Makkah to Madinah. Combines dramatic aerial mountain/city composition with 6 clean yellow-accented iconography highlights covering 40+ historical stations, smart interactive maps, and cultural reflection.'
  },
  {
    id: 'art-03',
    title: 'Experiences Leading Your Journey (Salla × Ruyana)',
    arabicTitle: 'خبرات تقود رحلتك — مسارات رؤانا × سلة',
    org: 'Ruyana × Salla',
    handle: '@ruaanasa',
    categories: ['social', 'community'],
    categoryLabel: 'Event & Speaker Announcement',
    aspectClass: 'aspect-[4/5]',
    colSpan: 'lg:col-span-4',
    format: '4:5 Portrait Social Post (960 × 1200)',
    src: '@@ART:art-03@@',
    description: 'Clean editorial event announcement for Ruyana Tracks featuring product marketing specialists from Salla (Osama Al-Harbi & Mohammed Baabad) on e-commerce expertise. Uses playful tilted photo frames, soft mint-teal gradients, and crisp Arabic typographic hierarchy.'
  },
  {
    id: 'art-04',
    title: 'World Mental Health Day — 10 October Infographic',
    arabicTitle: 'اليوم العالمي للصحة النفسية — ١٠ أكتوبر',
    org: 'Awareness & Educational Design',
    handle: 'Visual Communication',
    categories: ['infographics', 'digital'],
    categoryLabel: 'Infographics & Visual Comm',
    aspectClass: 'aspect-[9/16]',
    colSpan: 'lg:col-span-4',
    format: '9:16 Vertical Editorial Poster (675 × 1200)',
    src: '@@ART:art-04@@',
    description: 'Expressive Arabic awareness infographic for World Mental Health Day (October 10). Features luminous concentric wave line-art around a contemplative silhouette, paired with 4 structured actionable pillars: Describe Your Feelings, Care for Yourself, Ask for Support, and Balance Your Day.'
  },
  {
    id: 'art-05',
    title: 'Pink October — Start With an Awareness Step',
    arabicTitle: 'أكتوبر الوردي — ابدئي بخطوة وعي',
    org: 'Health Awareness Campaign',
    handle: '@ITechRana',
    categories: ['infographics'],
    categoryLabel: 'Infographics & Awareness',
    aspectClass: 'aspect-[9/16]',
    colSpan: 'lg:col-span-4',
    format: '9:16 Vertical Infographic Poster (674 × 1200)',
    src: '@@ART:art-05@@',
    description: 'Feminine, floral-accented Pink October breast cancer awareness infographic signed @ITechRana. Weaves delicate roses around the pink ribbon and guides readers through a 3-step educational progression: 01 Awareness is the Beginning of Prevention, 02 Early Detection, and 03 Be Part of the Impact.'
  },
  {
    id: 'art-06',
    title: 'Taif Roses — The Journey of the Rose Infographic',
    arabicTitle: 'ورد الطائف — رحلة الوردة وأرقام نفخر بها',
    org: 'Cultural & Educational Infographic',
    handle: '@ITechRana',
    categories: ['infographics'],
    categoryLabel: 'Infographics & Visual Storytelling',
    aspectClass: 'aspect-[9/16]',
    colSpan: 'lg:col-span-4',
    format: '9:16 Vertical Infographic Poster (674 × 1200)',
    src: '@@ART:art-06@@',
    description: 'Editorial cultural infographic celebrating Saudi Arabia’s iconic Taif Roses (ورد الطائف). Cascades real rose petals down the left margin while charting the 4-stage production process (Harvesting → Sorting → Distillation → Extraction) and key statistics (+960M roses annually, +910 farms, +193 hectares, +400 Reef supported farms).'
  },
  {
    id: 'art-07',
    title: 'Midan (ميدان) — Visual Identity System & Guidelines',
    arabicTitle: 'هوية ميدان البصرية — اليوم الهندسي والعمراني',
    org: 'Engineering & Architecture Day',
    handle: 'Media Team • Brand Identity',
    categories: ['branding', 'community'],
    categoryLabel: 'Brand Identity & Branding',
    aspectClass: 'aspect-[711/1200]',
    colSpan: 'lg:col-span-6',
    format: 'Vertical Brand Presentation Sheet (711 × 1200)',
    src: '@@ART:art-07@@',
    description: 'Comprehensive visual identity presentation created for “Midan” (ميدان — لكل تحدٍ ميدان) as part of the Engineering & Architecture Day Media Team. Showcases the entrance arch mockup, 6-color brand palette (#FEE4BC, #FAAE8A, #D33571, #5442A8, #1A1044, #000000), geometric gradient patterns, bilingual typography (Noto Sans Arabic & IBM Plex Sans Arabic), and event merchandise applications.'
  },
  {
    id: 'art-08',
    title: 'Midan (ميدان) — Geometric Logo Construction & Philosophy',
    arabicTitle: 'من الرسم الهندسي إلى ميدان التنافس — بناء الشعار',
    org: 'Engineering & Architecture Day',
    handle: 'Media Team • Brand Philosophy',
    categories: ['branding'],
    categoryLabel: 'Brand Identity & Typography',
    aspectClass: 'aspect-[711/1200]',
    colSpan: 'lg:col-span-6',
    format: 'Vertical Brand Concept Sheet (711 × 1200)',
    src: '@@ART:art-08@@',
    description: 'Second plate of the Midan brand identity presentation detailing “From Engineering Drawing to the Arena of Competition.” Breaks down the logo’s architectural grid construction across three pillars: Arabic Letterforms, Geometric Construction, and Unified Form.'
  },
  {
    id: 'art-09',
    title: 'Nahj Solutions — Corporate Roll-Up Print Banner',
    arabicTitle: 'لكل طموح، نهج واضح — نحول الأفكار إلى أعمال قابلة للنمو',
    org: 'Nahj Solutions (نهج)',
    handle: '@NahjSolutions',
    categories: ['print'],
    categoryLabel: 'Print Design & Corporate Banner',
    aspectClass: 'aspect-[510/1200]',
    colSpan: 'lg:col-span-4',
    format: 'Tall Vertical Roll-Up Banner (510 × 1200)',
    src: '@@ART:art-09@@',
    description: 'Print-ready vertical roll-up banner created during Rana’s internship at Nahj Solutions (“لكل طموح، نهج واضح”). Features ascending emerald geometric steps symbolizing business growth, five service pillars (Empowerment, Consulting, Initiatives & Events, Training, Digital Innovation), and a scannable QR contact footer.'
  },
  {
    id: 'art-10',
    title: 'KAU Data Science Club — Illustrated Sticker Sheet',
    arabicTitle: 'ملصقات نادي علم البيانات — جامعة الملك عبدالعزيز',
    org: 'KAU Data Science Club (@DSC_KAU)',
    handle: '@DSC_KAU',
    categories: ['creative', 'community'],
    categoryLabel: 'Creative Work & Sticker Design',
    aspectClass: 'aspect-[850/1200]',
    colSpan: 'lg:col-span-4',
    format: 'Vertical Sticker Sheet (850 × 1200)',
    src: '@@ART:art-10@@',
    description: 'Playful die-cut sticker pack blending local Hijazi/Jeddah culture with data science humor for KAU Data Science Club. Includes “BACK UP YOUR DATA” laptop, Al-Balad District street sign, Arabic coffee cup, Vimto bottle, “I MANIFESTED THIS”, heart-shaped fries, crispy samboosas, “Your data has been lost.”, and `: )` keycaps.'
  },
  {
    id: 'art-11',
    title: 'Girl Code & Vibe Coder — Cultural Committee Sticker Sheet',
    arabicTitle: 'اللجنة الثقافية الفنية — Build The Vibe Sticker Pack',
    org: 'College Cultural & Artistic Committee',
    handle: 'Build The Vibe >>>',
    categories: ['creative', 'digital', 'community'],
    categoryLabel: 'Creative Work & Digital Experiments',
    aspectClass: 'aspect-[851/1200]',
    colSpan: 'lg:col-span-4',
    format: 'Vertical Sticker Sheet (851 × 1200)',
    src: '@@ART:art-11@@',
    description: 'Expressive sticker sheet designed for the College Cultural & Artistic Committee. Features pixel speech bubble “THIS GIRL KNOWS CODE.”, 8-bit pink heart “GIRL CODE”, Y2K doll sticker, gold star “لأنك حاولت” (Because you tried), pink clapperboard “MAIN CHARACTER”, cascading retro error windows “مش فاهم OK :’)”, pastel arcade ghosts, “VIBE CODER”, and a terminal window.'
  },
  {
    id: 'art-12',
    title: 'Don’t Miss Out! 2 Days Until Registration Closes',
    arabicTitle: 'نادي البرمجة — العد التنازلي للتسجيل',
    org: 'KAU Programming Club',
    handle: '@ProgrammingClb',
    categories: ['digital', 'social', 'community'],
    categoryLabel: 'Digital Design & Tech Club',
    aspectClass: 'aspect-square',
    colSpan: 'lg:col-span-4',
    format: '1:1 Square Social Post (1100 × 1095)',
    src: '@@ART:art-12@@',
    description: 'High-contrast countdown announcement for KAU Programming Club recruitment (“2 DAYS Until registration closes!”). Uses a glowing 3D pink-and-blue hourglass illustration alongside open departments (Media and Marketing, PR and Activities, Tech) and a direct QR code.'
  },
  {
    id: 'art-13',
    title: 'International Day of Persons with Disabilities — Dec 3',
    arabicTitle: '٣ ديسمبر | اليوم العالمي لذوي الهمم — فريق أسدام التطوعي',
    org: 'Asdam Volunteer Team (فريق أسدام التطوعي)',
    handle: '@ASDAMTEAM',
    categories: ['digital', 'infographics'],
    categoryLabel: 'Digital Awareness Campaign',
    aspectClass: 'aspect-square',
    colSpan: 'lg:col-span-4',
    format: '1:1 Square Awareness Post (1100 × 1100)',
    src: '@@ART:art-13@@',
    description: 'Empowering Arabic awareness design for December 3 (International Day of Persons with Disabilities) created for Asdam Volunteer Team. Pairs dynamic stretched Arabic kashida typography (“لكل ذي همة حكاية انتصار تبدأ بالعزيمة ولا تنتهي”) with an uplifting silhouette.'
  },
  {
    id: 'art-14',
    title: 'Hijri New Year 1448H Greeting — Ruyana',
    arabicTitle: 'كل عام وأنتم بخير — عام هجري مبارك ١٤٤٨ هـ',
    org: 'Ruyana Community (رؤانا)',
    handle: '@ruaanasa',
    categories: ['social', 'community'],
    categoryLabel: 'Community & Student Club Content',
    aspectClass: 'aspect-square',
    colSpan: 'lg:col-span-4',
    format: '1:1 Square Community Greeting (1100 × 1100)',
    src: '@@ART:art-14@@',
    description: 'Refined Hijri New Year 1448H greeting card designed for Ruyana. Blends geometric Kufic gold lettering (“كل عام وأنتم بخير”) with a monochrome montage of the Kaaba, desert dunes, and palm oasis framed inside Ruyana’s signature deep teal brand border.'
  },
  {
    id: 'art-15',
    title: 'Ruyana Is Looking For You — Recruitment Campaign',
    arabicTitle: 'رؤانا تدور عليك — شخص فارق في المكان',
    org: 'Ruyana Community (رؤانا)',
    handle: '@ruaanasa',
    categories: ['social', 'community'],
    categoryLabel: 'Community Recruitment Campaign',
    aspectClass: 'aspect-square',
    colSpan: 'lg:col-span-6',
    format: '1:1 Square Campaign Post (1100 × 1100)',
    src: '@@ART:art-15@@',
    description: 'Interactive-inspired recruitment visual for Ruyana (“رؤانا تدور عليك” — Ruyana is searching for you). Uses a clever UI search bar metaphor (“شخص فارق في المكان”) with three trait tags (Creative Thinking, Passion for Growth, Precise Execution) and a QR application callout.'
  },
  {
    id: 'art-16',
    title: 'Applied Artificial Intelligence Program (IBM SkillsBuild × EYouth)',
    arabicTitle: 'محتويات برنامج الذكاء الاصطناعي التطبيقي — نادي البرمجة',
    org: 'KAU Programming Club × IBM SkillsBuild',
    handle: '@ProggClub_KAU',
    categories: ['social', 'digital', 'community'],
    categoryLabel: 'Educational Tech & Club Content',
    aspectClass: 'aspect-square',
    colSpan: 'lg:col-span-6',
    format: '1:1 Square Educational Post (1100 × 1100)',
    src: '@@ART:art-16@@',
    description: 'Educational technology announcement designed for KAU Programming Club in collaboration with IBM SkillsBuild and EYouth Business. Clearly maps out the 6 practical training courses of the Applied AI Program (Practical AI, Big Data Analysis, LLMs, Smart Chatbots, Text-to-Speech, and AI Agents).'
  }
];

const CATEGORY_DESCRIPTIONS = {
  all: 'All <strong>16 pieces</strong> — campaigns, infographics, the Midan identity, print for Nahj, tech content, stickers and club work.',
  social: '<strong>Social Media Design & Campaigns:</strong> Event announcements, speaker spotlights, recruitment visuals, and community campaigns for KAU Programming Club and Ruyana.',
  infographics: '<strong>Infographics & Visual Communication:</strong> Educational and awareness compositions communicating Mental Health Day, Pink October, Taif Roses, and Disability Awareness.',
  branding: '<strong>Brand Identity & Branding:</strong> Complete visual identity system, color palette, bilingual typography, and geometric construction created for <em>Midan (ميدان)</em>.',
  print: '<strong>Print Design:</strong> Physical promotional roll-up banner created for <em>Nahj Solutions (نهج)</em> preserving original tall vertical print proportions.',
  digital: '<strong>Digital Design & Technology Awareness:</strong> Tech-focused announcements, IBM SkillsBuild Applied AI curriculum graphics, and club registration countdowns.',
  creative: '<strong>Creative Work & Digital Experiments:</strong> Scrapbook-ready die-cut sticker sheets for KAU Data Science Club and the Cultural & Artistic Committee (“Girl Code” & “Vibe Coder”).',
  community: '<strong>Community & Student Club Content:</strong> Dedicated showcase distinguishing work created for KAU Programming Club, Ruyana Community, Data Science Club, and Engineering Day.'
};

const PROJECTS_DATA = [
  {
    id: 'proj-01',
    number: '01',
    title: 'Jeddah Food Fest',
    subtitle: 'Interactive Event Dashboard developed in React',
    type: 'prototype',
    statusBadge: '1st Place Winner • Built Prototype',
    badgeBg: 'bg-butter text-navy',
    accentBg: 'from-peach-soft via-butter-soft to-cream',
    icon: 'citrus',
    summary: 'An interactive dashboard developed using React during my first vibe-coding experience — awarded First Place in the competition.',
    features: [
      'Interactive dashboard interface',
      'Arabic-friendly RTL layout',
      'Responsive mobile sidebar navigation',
      'Working Light and Dark modes',
      'Vibrant orange-inspired visual identity'
    ],
    focusTags: ['React', 'Vibe-Coding', 'Arabic UI', 'Light/Dark Mode', '1st Place Competition Winner'],
    honestNote: 'Interactive functional prototype built with React during my first vibe-coding competition experience, winning 1st place.'
  },
  {
    id: 'proj-02',
    number: '02',
    title: 'Tamkeen (تمكين)',
    subtitle: 'Interactive KAU Women’s Campus Map Concept',
    type: 'concept',
    statusBadge: 'UX & Navigation Concept',
    badgeBg: 'bg-pink-soft text-navy',
    accentBg: 'from-pink-blush via-lavender-soft/50 to-cream',
    icon: 'compass',
    summary: 'An interactive campus map concept designed to help students navigate the women’s campus at King Abdulaziz University with clarity and confidence.',
    features: [
      'Intuitive campus building & gate navigation',
      'Accessibility-focused routing & wayfinding',
      'Student-friendly digital user experience',
      'Structured campus information organization'
    ],
    focusTags: ['Navigation', 'Accessibility', 'Digital UX', 'Information Architecture', 'KAU Campus'],
    honestNote: 'Conceptual UX & digital navigation project focused on solving real daily wayfinding challenges for students at KAU.'
  },
  {
    id: 'proj-03',
    number: '03',
    title: 'A-Closet',
    subtitle: 'AI-Powered Smart Closet & Outfit Planner Concept',
    type: 'concept',
    statusBadge: 'AI Lifestyle Concept',
    badgeBg: 'bg-lavender-soft text-navy',
    accentBg: 'from-lavender-soft via-pink-blush/50 to-cream',
    icon: 'shirt',
    summary: 'An AI-powered smart closet concept that explores personalized outfit planning and smart wardrobe organization.',
    features: [
      'Artificial intelligence styling suggestions',
      'Personalization tailored to user preferences',
      'Seamless digital wardrobe experience',
      'Smart lifestyle organization concepts'
    ],
    focusTags: ['Artificial Intelligence', 'Personalization', 'Digital Experience', 'Smart Lifestyle'],
    honestNote: 'Product & AI experience concept exploring how everyday fashion choices can be simplified through intelligent personalization.'
  },
  {
    id: 'proj-04',
    number: '04',
    title: 'Custom Fashion Platform',
    subtitle: 'Independent Designer & Brand Collaboration Concept',
    type: 'concept',
    statusBadge: 'Digital Marketplace Concept',
    badgeBg: 'bg-peach-soft text-navy',
    accentBg: 'from-peach-soft/70 via-cream to-pink-blush/40',
    icon: 'scissors',
    summary: 'A platform concept connecting independent fashion designers with stores and brands so creators can showcase work and collaborate without needing to establish their own full businesses.',
    features: [
      'End-to-end platform concept development',
      'User research into independent designer needs',
      'Intersection of fashion and technology',
      'Curated digital marketplace experience'
    ],
    focusTags: ['Platform Concept', 'User Research', 'Fashion & Tech', 'Digital Marketplace'],
    honestNote: 'Research-driven platform concept bridging independent creative talent with commercial retail partners.'
  },
  {
    id: 'proj-05',
    number: '05',
    title: 'AI Academic Search Engine',
    subtitle: 'Credible Student Research & AI Chatbot Concept',
    type: 'concept',
    statusBadge: 'Academic AI Concept',
    badgeBg: 'bg-electric/20 text-navy dark:bg-electric/40 dark:text-cream',
    accentBg: 'from-lavender-soft/60 via-cream to-butter-soft/40',
    icon: 'book-open-check',
    summary: 'An academic concept combining an AI-powered search engine and chatbot to help students discover credible information from reliable, dated sources.',
    features: [
      'AI-powered semantic search + conversational assistant',
      'Strict focus on credible, clearly dated sources',
      'Student-focused academic information discovery',
      'Personalized study and research preferences'
    ],
    focusTags: ['AI Search', 'Credible Dated Sources', 'Student Discovery', 'Personalization'],
    honestNote: 'Academic product concept addressing student research pain points around source reliability and citation clarity.'
  },
  {
    id: 'proj-06',
    number: '06',
    title: 'Law Firm Consultation System',
    subtitle: 'Layered Software Architecture Academic Project',
    type: 'academic',
    statusBadge: 'Academic Software Project',
    badgeBg: 'bg-butter-soft text-navy',
    accentBg: 'from-butter-soft/60 via-cream to-lavender-soft/40',
    icon: 'scale',
    summary: 'An academic software project exploring a clean layered architecture for a legal consultation management system.',
    features: [
      'Structured layered software architecture',
      'Modular system organization & separation of concerns',
      'Clear legal consultation & client workflow modeling'
    ],
    focusTags: ['Software Architecture', 'System Organization', 'Consultation Workflows', 'IT Academic Project'],
    honestNote: 'Academic software engineering project demonstrating structured systems thinking and layered architectural design.'
  }
];

const EXPERIENCE_DATA = [
  {
    org: 'NAHJ SOLUTIONS (نهج)',
    role: 'Intern',
    category: 'internship',
    badge: 'Professional Internship',
    color: 'bg-butter text-navy',
    summary: 'Professional internship experience at a business solutions company.',
    details: 'Contributed to corporate visual communication and promotional print design, including the “لكل طموح، نهج واضح” corporate roll-up banner showcasing Nahj’s five strategic consulting and digital innovation pillars.',
    relatedArtId: 'art-09',
    relatedArtLabel: 'View Nahj Banner in Archive'
  },
  {
    org: 'KAU PROGRAMMING CLUB',
    role: 'Vice Leader',
    category: 'leadership',
    badge: 'Student Leadership',
    color: 'bg-pink-soft text-navy',
    summary: 'Leadership, team collaboration, club activities, and student initiatives at King Abdulaziz University.',
    details: 'Co-leading club strategy, mentoring student committees, coordinating technical workshops (such as the IBM SkillsBuild Applied AI series and career readiness sessions), and fostering an inclusive tech community at FCIT.',
    relatedArtId: 'art-01',
    relatedArtLabel: 'View Club Campaign Work'
  },
  {
    org: 'DRAG CLUB',
    role: 'Media & Marketing / Media & Design',
    category: 'media',
    badge: '2 Consecutive Years',
    color: 'bg-lavender-soft text-navy',
    summary: 'Two consecutive years of participation across content writing, marketing, and creative design.',
    details: 'Started with hands-on experience as a content writer in the marketing team, evolving into continued involvement in creative direction, visual storytelling, and design-related club initiatives.',
    relatedArtId: null,
    relatedArtLabel: null
  },
  {
    org: 'COLLEGE CULTURAL & ARTISTIC COMMITTEE',
    role: 'Design Section',
    category: 'media',
    badge: 'University Committee',
    color: 'bg-peach-soft text-navy',
    summary: 'Contributing to design work, announcements, and visual documentation of university activities.',
    details: 'Created expressive student-facing visuals and experimental digital sticker packs such as the “Build The Vibe / Girl Code” collection celebrating women in tech and campus creativity.',
    relatedArtId: 'art-11',
    relatedArtLabel: 'View “Girl Code” Sticker Sheet'
  },
  {
    org: 'RUYANA (رؤانا)',
    role: 'Student Club Member',
    category: 'media',
    badge: 'Community & Media',
    color: 'bg-pink-blush text-navy',
    summary: 'Previous involvement in the media team and creative collaboration.',
    details: 'Designed high-engagement community campaigns including “Ala Khutah” (على خطاه), Salla e-commerce speaker sessions, Hijri New Year 1448H greetings, and the “Ruyana Is Looking For You” recruitment campaign.',
    relatedArtId: 'art-02',
    relatedArtLabel: 'View Ruyana Campaigns'
  },
  {
    org: 'ENGINEERING DAY',
    role: 'Media Team',
    category: 'media',
    badge: 'Brand Identity Creation',
    color: 'bg-lavender text-navy',
    summary: 'Participation in media activities and the creation of the Midan (ميدان) visual identity.',
    details: 'Helped craft the geometric Arabic letterform logo, 6-color brand system, pattern language, and physical event applications for “Midan — From Engineering Drawing to the Arena of Competition.”',
    relatedArtId: 'art-07',
    relatedArtLabel: 'Inspect Midan Brand Identity'
  },
  {
    org: 'KAU PROGRAMMING CLUB',
    role: 'Planning Section',
    category: 'leadership',
    badge: 'Event & Initiative Planning',
    color: 'bg-butter-soft text-navy',
    summary: 'Involvement in student activities and planning initiatives.',
    details: 'Structured event roadmaps, student engagement timelines, and cross-team coordination to turn technical club concepts into smooth campus experiences.',
    relatedArtId: 'art-16',
    relatedArtLabel: 'View Applied AI Program Post'
  }
];

const SKILLS_DATA = {
  technical: [
    { name: 'Programming Fundamentals', icon: '', note: 'Core algorithmic thinking and structured problem-solving developed at FCIT, King Abdulaziz University.' },
    { name: 'React', icon: '', note: 'Used to build the 1st-place winning Jeddah Food Fest interactive dashboard with RTL support and light/dark themes.' },
    { name: 'Database Fundamentals', icon: '', note: 'Structuring relational data and organizing information for academic software and search concepts.' },
    { name: 'Software Development Concepts', icon: '', note: 'Applied layered software architecture and system modeling in the Law Firm Consultation System project.' },
    { name: 'AI Tools', icon: '', note: 'Integrating modern AI workflows into creative prototyping, vibe-coding, and smart product concepts like A-Closet.' },
    { name: 'UI/UX Fundamentals', icon: '', note: 'Designing accessible, human-centered digital flows for Tamkeen campus navigation and marketplace concepts.' }
  ],
  design: [
    { name: 'Graphic Design', icon: '', note: '16+ bilingual posters, social campaigns, and brand systems across university clubs and corporate internships.' },
    { name: 'Canva', icon: '', note: 'Rapid, high-polish layout composition, social media storytelling, and collaborative campaign production.' },
    { name: 'Blender', icon: '', note: 'Exploring 3D objects, lighting, and spatial visual elements to bring depth to digital design.' },
    { name: 'Visual Communication', icon: '', note: 'Translating complex statistics and processes into clear Arabic infographics (Taif Roses, Mental Health, Pink October).' },
    { name: 'Visual Storytelling', icon: '', note: 'Connecting emotion, cultural heritage, and typography in campaigns like Ruyana’s “Ala Khutah”.' },
    { name: 'Digital Design', icon: '', note: 'Creating custom die-cut sticker packs, pixel-art badges, and modern social media systems.' }
  ],
  creative: [
    { name: 'Content Creation', icon: '', note: 'Crafting bilingual copy and visual concepts across 2 consecutive years with Drag Club and Ruyana.' },
    { name: 'Marketing', icon: '', note: 'Positioning student initiatives, speaker events, and recruitment campaigns so people feel excited to join.' },
    { name: 'Creative Thinking', icon: '', note: 'Connecting unexpected dots between technology, fashion, campus life, and editorial design.' },
    { name: 'Team Collaboration', icon: '', note: 'Working closely with developers, writers, and designers across 5+ university clubs and committees.' },
    { name: 'Leadership', icon: '', note: 'Serving as Vice Leader of the KAU Programming Club — guiding teams with warmth and clarity.' },
    { name: 'Event Organization', icon: '', note: 'Planning bootcamps, technical lectures, and Engineering Day media initiatives.' },
    { name: 'Project Coordination', icon: '', note: 'Bridging planning sections and creative teams so ideas move smoothly from sketch to launch.' },
    { name: 'Communication', icon: '', note: 'Expressing technical and creative ideas clearly in both Arabic and English.' }
  ]
};

const INTEREST_DETAILS = [
  {
    tag: '01 / Technology & Innovation',
    connection: 'Connected to: FCIT KAU • Jeddah Food Fest (1st Place) • A-Closet • AI Search',
    desc: 'At King Abdulaziz University’s Faculty of Computing & IT, I learned to think in systems and architecture — whether structuring a layered Law Firm Consultation System, prototyping a 1st-place React dashboard, or imagining how AI can organize our wardrobes and academic research.'
  },
  {
    tag: '02 / Graphic Design',
    connection: 'Connected to: Midan Brand Identity • Nahj Print Banner • 16 Archive Artworks',
    desc: 'Graphic design is my visual voice. From constructing geometric Arabic letterforms for Engineering Day’s Midan identity to designing roll-up print banners at Nahj Solutions and die-cut campus stickers, I love making ideas look unforgettable.'
  },
  {
    tag: '03 / UI/UX & Digital Experiences',
    connection: 'Connected to: Tamkeen Campus Map • Custom Fashion Platform • Interactive Web',
    desc: 'Great technology should feel effortless and welcoming. I love mapping user journeys — like helping KAU students navigate the women’s campus through Tamkeen or designing clean bilingual interfaces with thoughtful micro-interactions.'
  },
  {
    tag: '04 / Marketing & Communication',
    connection: 'Connected to: Drag Club (2 Years) • Ruyana Campaigns • Programming Club',
    desc: 'Two years in Drag Club’s marketing & media teams taught me that design isn’t just decoration — it’s communication. I enjoy writing compelling copy, framing recruitment campaigns (“رؤانا تدور عليك”), and building excitement around community events.'
  },
  {
    tag: '05 / Photography & Visual Storytelling',
    connection: 'Connected to: Taif Roses Infographic • Ala Khutah Campaign • Visual Moodboards',
    desc: 'Whether through photography or editorial layouts, I’m drawn to visual storytelling — using light, texture, and cultural symbols (like Taif roses or historical Hijrah pathways) to make information feel human and memorable.'
  },
  {
    tag: '06 / Gaming & Virtual Worlds',
    connection: 'Connected to: Blender 3D • “Girl Code” Pixel Art Stickers • Playful UI',
    desc: 'Gaming and virtual worlds spark my love for playful interactivity — inspiring my 8-bit pixel stickers, 3D experiments in Blender, and the idea that a portfolio should feel like a creative digital playground rather than a static resume.'
  }
];

const ART_PALETTES = {
  'art-01': { colors: ['#120E24', '#6E3AFF', '#D96BFF', '#FFFFFF'], craft: 'Dark-mode neon gradient hierarchy + structured speaker agenda cards' },
  'art-02': { colors: ['#0B3B49', '#E6C739', '#2A7B88', '#F4F7F6'], craft: 'Cinematic Makkah-to-Madinah photography + custom yellow waypoint iconography' },
  'art-03': { colors: ['#CBE5E3', '#15474F', '#6EC4BC', '#FFFFFF'], craft: 'Editorial speaker cutouts + soft mint e-commerce layout for Salla × Ruyana' },
  'art-04': { colors: ['#071226', '#4FC3F7', '#B388FF', '#FFFFFF'], craft: 'Concentric wave line-art + 4 balanced mental health action pillars' },
  'art-05': { colors: ['#F8BBD0', '#D81B60', '#F48FB1', '#5D1936'], craft: '3D ribbon & floral layering + 3-step early detection visual progression' },
  'art-06': { colors: ['#FFF4F7', '#E94E89', '#5A2A27', '#6C8E72'], craft: 'Organic rose-petal cascade + 4-stage distillation process & data cards' },
  'art-07': { colors: ['#FEE4BC', '#FAAE8A', '#D33571', '#5442A8', '#1A1044'], craft: 'Full 6-color brand system + bilingual typography + event merch mockups' },
  'art-08': { colors: ['#F2F2F2', '#1A1044', '#5442A8', '#000000'], craft: 'Architectural engineering grid + geometric Arabic letterform construction' },
  'art-09': { colors: ['#FFFFFF', '#009E73', '#0B3D32', '#E8F5F1'], craft: 'Ascending isometric emerald steps + 5 consulting service pillars for print' },
  'art-10': { colors: ['#D7B49E', '#334E68', '#E63946', '#F4A261'], craft: 'Die-cut white sticker borders + Hijazi cultural icons & data science humor' },
  'art-11': { colors: ['#003F6B', '#FFB5D8', '#FFE66D', '#64DFDF'], craft: 'Y2K & 8-bit pixel art stickers + retro cascading OS dialog windows' },
  'art-12': { colors: ['#090718', '#F72585', '#7209B7', '#4CC9F0'], craft: '3D glowing hourglass focal point + scannable QR recruitment card' },
  'art-13': { colors: ['#A8DADC', '#F4D5D0', '#9B2226', '#1D3557'], craft: 'Expressive stretched Arabic kashida typography + empowering portrait framing' },
  'art-14': { colors: ['#004652', '#D4AF37', '#FFFFFF', '#1B262C'], craft: 'Geometric Kufic gold title + monochrome Kaaba & oasis collage' },
  'art-15': { colors: ['#004B57', '#2EC4B6', '#FF9F1C', '#FFFFFF'], craft: 'Interactive search-bar UI metaphor + recruitment trait pills' },
  'art-16': { colors: ['#050A24', '#1E3A8A', '#38BDF8', '#FFFFFF'], craft: 'Structured 2×3 course module grid for IBM SkillsBuild × Programming Club' }
};

