/* Which of Rana's artworks / projects illustrate each part of the site.
   Only links that her own text supports (it names the piece, club or project). */
const RELATED = {
  // CONTENT.interests, in order
  interests: [
    { art: ['art-16', 'art-01'] },            // Technology & Innovation — AI program, tech-career session
    { art: ['art-07', 'art-08'] },            // Graphic Design — "brand identities (like Midan)"
    { art: ['art-15'], project: 'proj-02' },  // UI/UX — search-bar UI metaphor + Tamkeen
    { art: ['art-15', 'art-02'] },            // Marketing & Communication — community campaigns
    { art: ['art-02', 'art-14'] },            // Photography & Visual Storytelling — cultural themes as visual stories
    { art: ['art-11'] }                       // Gaming & Virtual Worlds — pixel art aesthetics
  ],
  // SKILLS_DATA names
  skills: {
    'React': { project: 'proj-01' },
    'Database Fundamentals': { project: 'proj-05' },
    'Software Development Concepts': { project: 'proj-06' },
    'AI Tools': { project: 'proj-03' },
    'UI/UX Fundamentals': { project: 'proj-02' },
    'Graphic Design': { art: ['art-07', 'art-09'] },
    'Visual Communication': { art: ['art-06', 'art-04', 'art-05'] },
    'Visual Storytelling': { art: ['art-02'] },
    'Digital Design': { art: ['art-10', 'art-11'] },
    'Content Creation': { art: ['art-15', 'art-14'] },
    'Marketing': { art: ['art-03', 'art-15', 'art-12'] },
    'Leadership': { art: ['art-12', 'art-01'] },
    'Event Organization': { art: ['art-01', 'art-07'] }
  },
  // CONTENT.beyond, in order
  beyond: [
    { art: ['art-10'] },          // stickers: Vimto, samboosa, Back Up Your Data
    { art: ['art-11'] },          // GIRL CODE pixel hearts, arcade ghosts
    { project: 'proj-01' },       // first vibe-coding experiment → 1st place
    { art: ['art-02', 'art-14'] },// framing light, architecture & everyday beauty
    {},                           // palette card
    {}                            // idea jar
  ],
  // Close-up "detail plates": artwork, focal point (object-position %), zoom, caption
  details: [
    { art: 'art-06', x: 18, y: 30, zoom: 2.2, caption: 'Rose-petal cascade' },
    { art: 'art-08', x: 30, y: 82, zoom: 2.1, caption: 'Geometric Arabic letterform construction' },
    { art: 'art-11', x: 70, y: 22, zoom: 2.4, caption: '8-bit “GIRL CODE” heart' },
    { art: 'art-13', x: 60, y: 30, zoom: 1.9, caption: 'Stretched kashida typography' },
    { art: 'art-07', x: 50, y: 40, zoom: 2.3, caption: 'Midan colour system & patterns' },
    { art: 'art-10', x: 35, y: 55, zoom: 2.4, caption: 'Die-cut sticker details' }
  ]
};
