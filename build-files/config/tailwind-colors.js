// JOSA.AI Brand Color Palette — paste into tailwind.config.ts under theme.extend.colors
module.exports = {
  brand: {
    // Purple family — identity, personality, hero sections, primary actions
    'midnight-plum': '#421C52',
    'royal-purple': '#8D4BBB',
    'mauve-purple': '#A882EE',
    'soft-lavender': '#E3D4F3',
    // Blue family — trust, professionalism, secondary elements, body content
    'deep-navy': '#1E3A8A',
    'tech-blue': '#3B82F6',
    'cool-azure': '#93C5FD',
    'frosted-blue': '#DAF0FF',
  },
  // Semantic aliases for easier usage
  primary: {
    DEFAULT: '#8D4BBB',    // Royal Purple — buttons, CTAs
    dark: '#421C52',       // Midnight Plum — hero bg, headings, footer
    light: '#E3D4F3',      // Soft Lavender — light section bg, cards
    hover: '#A882EE',      // Mauve Purple — hover states
  },
  secondary: {
    DEFAULT: '#3B82F6',    // Tech Blue — links, secondary buttons
    dark: '#1E3A8A',       // Deep Navy — body text, nav
    light: '#DAF0FF',      // Frosted Blue — alt backgrounds, inputs
    accent: '#93C5FD',     // Cool Azure — tags, badges
  },
};
