/* Rana Yaser portfolio — page text shared by every design.
   Everything in CONTENT is Rana's wording, copied verbatim from the original site.
   Everything in AR is new Arabic for headings/menu — please check the wording. */
const CONTENT = {
  name: 'Rana Yaser',
  brand: 'Beauty & Brains',
  tagline: 'Technology meets creativity',
  campus: 'FCIT · KAU',
  heroQuote: 'Part tech enthusiast, part creative soul, always collecting ideas.',
  status: 'currently creating something',
  headline: ['Somewhere', 'between', 'logic', 'and', 'creativity.'],
  headlineAlt: ['Creative', 'mind.', 'Technical', 'curiosity.', 'Endless ideas.'],
  lede: 'IT student, creative thinker, and someone who loves making things happen.',
  hello: 'Hi, I’m Rana! 👋',
  helloTag: 'powered by curiosity',
  bio: [
    'An IT student with a creative mind and a love for turning ideas into experiences. I enjoy exploring the intersection of <strong>technology, design, and creativity</strong> — from building digital concepts and experimenting with interfaces to creating visual identities and meaningful content.',
    'I’m passionate about learning, collaborating, creating, and finding new ways to bring ideas to life. <mark>I believe the best ideas happen when creativity meets technology.</mark>'
  ],
  ctaWork: 'Explore My Work',
  ctaAbout: 'Get to Know Me',
  traitsIntro: 'A few words that describe me — tap one',
  traits: [
    ['Creative', 'Turning blank canvases into expressive posters, sticker packs, and brand stories.'],
    ['Curious', 'Always asking ‘how does this work?’ — from React state to Taif rose distillation infographics.'],
    ['Playful', 'Bringing joy and warmth into interfaces with sticker art, micro-interactions, and personality.'],
    ['Ambitious', 'Won 1st Place at the Jeddah Food Fest dashboard competition during my very first vibe-coding experience!'],
    ['Detail-oriented', 'Obsessed with typography alignment, Arabic letterform geometry, and clean architectural grids.'],
    ['Feminine', 'Soft pinks, editorial elegance, and expressive warmth paired with sharp technical thinking.'],
    ['Collaborative', 'Vice Leader at KAU Programming Club & active across Ruyana, Drag Club, and Cultural Committee.'],
    ['Tech-inspired', 'Studying Information Technology at FCIT KAU — building AI concepts, dashboards, and software architecture.'],
    ['Expressive', 'Blending visual storytelling, marketing communication, and cultural identity into every piece.']
  ],
  stickers: ['design enthusiast 🎨', '📌 always collecting ideas', 'Identity concept', 'Why choose one?', '100% both · IT + design'],
  highlights: ['Information Technology @ KAU', 'Graphic Design & Visual Storytelling', 'UI/UX & Digital Experiences', 'KAU Programming Club Vice Leader', '1st Place Jeddah Food Fest Dashboard'],

  aboutLabel: 'Behind The Screen',
  aboutTitle: ['More than just', 'a major.'],
  aboutParas: [
    'I’m an <strong>Information Technology student</strong> at <strong>King Abdulaziz University’s Faculty of Computing and Information Technology (FCIT)</strong>.',
    'While technology introduced me to problem-solving and digital systems, creativity has always been a major part of how I think and work.',
    'I enjoy graphic design, visual storytelling, UI/UX, marketing, digital experiences, and exploring new technologies.',
    'I also enjoy being part of student communities, collaborating with different teams, organizing initiatives, and turning ideas into something people can experience.'
  ],
  aboutQuote: 'I don’t like limiting myself to one creative direction. I enjoy exploring different fields and discovering how they can complement each other.',
  interestsTitle: 'What I keep coming back to',
  interestsIntro: 'Six interests, and where each one shows up in my work.',
  interests: [
    ['laptop', 'Technology & Innovation', 'Exploring software systems, AI concepts, React dashboards, and how emerging tools solve real student and human problems.'],
    ['pen-tool', 'Graphic Design', 'Crafting brand identities (like Midan), bilingual posters, sticker sheets, and high-impact social campaigns.'],
    ['mouse-pointer-click', 'UI/UX & Digital Experiences', 'Designing intuitive campus navigation (Tamkeen), Arabic-friendly dashboards, and human-centered user journeys.'],
    ['megaphone', 'Marketing & Communication', 'Shaping community campaigns, content writing at Drag Club, and translating complex ideas into engaging messages.'],
    ['camera', 'Photography & Visual Storytelling', 'Capturing atmosphere, framing visual narratives, and turning cultural or educational themes into visual stories.'],
    ['gamepad-2', 'Gaming & Virtual Worlds', 'Inspired by interactive game UI, 3D spaces in Blender, pixel art aesthetics, and playful digital world-building.']
  ],

  archiveTitle: ['My Creative', 'Archive.'],
  archiveIntro: 'Sixteen pieces made for student clubs, community campaigns and an internship — shown at their original proportions, with the Arabic and English type exactly as designed. Open any piece to see it full size.',
  archiveQuote: 'Made with curiosity, creativity, and a little bit of obsession with details.',
  filters: [['all', 'All work'], ['social', 'Social & campaigns'], ['infographics', 'Infographics'], ['branding', 'Brand identity'], ['print', 'Print'], ['digital', 'Tech & digital'], ['creative', 'Stickers & experiments'], ['community', 'Student clubs']],

  projectsTitle: ['Technical & Conceptual', 'Case Studies.'],
  projectsIntro: 'Things I’ve built, designed or architected at FCIT and in competitions. Each one is labelled for what it is: a working prototype, a concept, or a coursework project.',
  projFilters: [['all', 'All'], ['prototype', 'Built prototype'], ['concept', 'UX & AI concepts'], ['academic', 'Software architecture']],

  journeyLabel: 'Experience & Leadership',
  journeyTitle: ['Where ideas', 'meet people.'],
  journeyIntro: 'From my professional internship at <strong>Nahj Solutions</strong> to serving as <strong>Vice Leader of the KAU Programming Club</strong> and contributing across media, marketing, and cultural committees — community and collaboration are at the heart of how I grow.',
  expFilters: [['all', 'All roles'], ['internship', 'Internship'], ['leadership', 'Leadership & Planning'], ['media', 'Media & Design']],

  skillsLabel: 'My Creative Toolbox',
  skillsTitle: ['Skills &', 'Capabilities.'],
  skillsIntro: 'What I work with, grouped by how I use it. Pick any skill to see where it shows up in my work.',
  clusters: [
    { key: 'technical', tag: 'Logic', icon: 'cpu', title: 'Technical', desc: 'Foundations from FCIT KAU, front-end prototyping, and modern AI workflows.', quote: 'Building clean logic with user empathy.' },
    { key: 'design', tag: 'Visual', icon: 'palette', title: 'Design', desc: 'Visual identity systems, bilingual typography, 3D exploration, and editorial storytelling.', quote: 'Obsessed with visual harmony & details.' },
    { key: 'creative', tag: 'People', icon: 'users', title: 'Creative & Professional', desc: 'Leading student teams, organizing events, crafting marketing campaigns, and communicating ideas.', quote: 'Turning solo sparks into team achievements.' }
  ],
  skillsEmpty: ['Pick a skill above', 'Each one links back to a real club campaign, internship or project.'],

  beyondLabel: 'Beyond The Work',
  beyondTitle: ['Things that make', 'me, me.'],
  beyondIntro: 'A digital scrapbook of the little inspirations, hobbies, and visual worlds that keep my creativity charged outside the classroom.',
  beyond: [
    { icon: 'ribbon', tag: 'aesthetic collector', title: 'A Love for Creative Design', text: 'Whether it’s noticing packaging typography at a café or turning campus culture into witty laptop stickers (like the Vimto bottle, samboosa, and <em>“Back Up Your Data”</em> stickers), design is how I observe the world.', foot: 'Favorite vibe: Editorial meets playful maximalism' },
    { icon: 'gamepad-2', tag: 'player one', title: 'Gaming & Virtual Worlds', text: 'Exploring virtual worlds and game interfaces taught me how environments tell stories without words — inspiring my 8-bit <em>“GIRL CODE”</em> pixel hearts, arcade ghosts, and Blender 3D curiosity.', foot: 'Always noticing HUDs, sound cues & world-building' },
    { icon: 'bot', tag: 'vibe coder', title: 'Curiosity About New Technology', text: 'I love testing emerging AI tools, experimenting with vibe-coding, and asking how technology can feel warmer, smarter, and more helpful in everyday student life.', foot: 'First vibe-coding experiment → 1st place' },
    { icon: 'camera', tag: 'visual diary', title: 'Photography & Visual Storytelling', text: 'Framing moments through a lens — lighting, color harmony, and small details that turn an ordinary scene into a moodboard worth remembering.', foot: 'Framing light, architecture & everyday beauty' },
    { icon: 'swatch-book', tag: 'color palette lover', title: 'Enjoying Colorful, Playful Aesthetics', text: 'Who says tech portfolios have to be cold dark terminals? Soft pink, warm cream, deep navy, lavender, and butter yellow prove that serious capability can still smile.', swatches: [['#FAD2E1', 'Soft pink'], ['#FFF9F4', 'Warm cream'], ['#121528', 'Deep navy'], ['#C5B3F6', 'Lavender'], ['#FFE169', 'Butter yellow']] },
    { icon: 'flask-conical', tag: 'always experimenting', title: 'Discovering New Ideas & Experimenting', text: 'Collecting inspirations in notebooks, sketching new platform concepts, and mixing disciplines that don’t usually sit at the same table.', idea: 'Draw a random note from my Idea Jar →' }
  ],
  ideas: [
    '“Somewhere between logic and creativity.”',
    '“Part tech enthusiast, part creative soul, always collecting ideas.”',
    '“Made with curiosity, creativity, and a little bit of obsession with details.”',
    '“I believe the best ideas happen when creativity meets technology.”',
    '“Why choose between clean code and expressive typography when they make each other better?”',
    '“First vibe-coding experiment → 1st Place at the Jeddah Food Fest dashboard competition!”'
  ],

  contactStatus: 'open for collaborations & opportunities',
  contactLabel: 'Contact • Let’s Connect',
  contactTitle: ['Have an idea?', 'I’m listening.'],
  contactIntro: 'Always open to creative collaborations, interesting opportunities, and meeting people who love bringing ideas to life.',
  email: 'ranayaser.contact@email.com',
  linkedin: { href: 'https://www.linkedin.com/in/rana-yaser', label: 'linkedin.com/in/rana-yaser' },
  x: { href: 'https://x.com/ITechRana', label: '@ITechRana' },
  topics: [['Creative Collaboration', 'Design or branding collaboration'], ['IT / UI-UX Opportunity', 'IT / UI-UX internship or project'], ['Student Club / Event Initiative', 'Student initiative or speaking'], ['Just Saying Hi!', 'Just saying hi']],
  footer: 'Rana Yaser — “Beauty & Brains”',
  footerNote: 'Rana Yaser · FCIT, King Abdulaziz University · Designed & built by me',

  cv: {
    education: ['B.Sc. in Information Technology — King Abdulaziz University (KAU)', 'Faculty of Computing and Information Technology (FCIT)'],
    experience: [
      ['Nahj Solutions', 'Intern (Business Solutions & Corporate Visual Design)'],
      ['KAU Programming Club', 'Vice Leader & Planning Section'],
      ['Drag Club', 'Media & Marketing / Media & Design (2 consecutive years)'],
      ['College Cultural & Artistic Committee', 'Design Section'],
      ['Ruyana', 'Student Club Member (Media Team & Creative Collaboration)'],
      ['Engineering Day', 'Media Team (Co-created the Midan Visual Identity)']
    ],
    projects: [
      ['Jeddah Food Fest React Dashboard', '1st place in competition'],
      ['Tamkeen', 'KAU Women’s Campus Interactive Navigation Map Concept'],
      ['A-Closet', 'AI-Powered Smart Wardrobe & Outfit Planning Concept'],
      ['Custom Fashion Platform', 'Independent Fashion Designer Marketplace Concept'],
      ['AI Academic Search Engine', 'Credible Student Research & Chatbot Concept'],
      ['Law Firm Consultation System', 'Layered Software Architecture Academic Project']
    ]
  }
};

/* New Arabic headings & menu labels (to be checked by Rana) */
const AR = {
  name: 'رنا ياسر',
  brand: 'جمالٌ وذكاء',
  nav: { about: 'عنّي', archive: 'الأعمال', projects: 'المشاريع', experience: 'المسيرة', skills: 'المهارات', beyond: 'خارج العمل', contact: 'تواصل' },
  headline: 'في مكانٍ ما بين المنطق والإبداع.',
  headlineAlt: 'عقلٌ مبدع. فضولٌ تقني. أفكارٌ لا تنتهي.',
  about: 'أكثر من مجرد تخصص.',
  aboutLabel: 'خلف الشاشة',
  interests: 'ما أعود إليه دائمًا',
  archive: 'أرشيفي الإبداعي.',
  projects: 'دراسات حالة تقنية ومفاهيمية.',
  journey: 'حيث تلتقي الأفكار بالناس.',
  skills: 'المهارات والقدرات.',
  beyond: 'أشياء تجعلني أنا.',
  contact: 'لديك فكرة؟ أنا أُصغي.'
};
