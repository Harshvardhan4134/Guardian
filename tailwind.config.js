/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary (Deep Navy) — navbar, primary buttons, headings, footer
        primary: '#0B1F3A',
        primaryHover: '#0F2A4D',

        // Accent (Bright AI blue) — highlights, links, active states only
        accent: '#2563EB',
        accentHover: '#1D4ED8',

        // Backgrounds
        background: '#FFFFFF',
        sectionBg: '#F8FAFC',
        cardBg: '#EEF2F7',

        // Text & greys
        textPrimary: '#0F172A',
        textBody: '#334155',
        textSecondary: '#64748B',
        border: '#CBD5E1',
        borderLight: '#E2E8F0',

        // Legacy aliases
        card: '#EEF2F7',
        section: '#F8FAFC',
        footer: '#0B1F3A'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        // Soft elevation for cards
        card: '0 1px 2px 0 rgba(15, 23, 42, 0.05), 0 1px 3px 0 rgba(15, 23, 42, 0.08)',
        'card-hover': '0 2px 8px 0 rgba(15, 23, 42, 0.06), 0 2px 4px 0 rgba(15, 23, 42, 0.06)',
      },
      transitionDuration: {
        200: '200ms',
        250: '250ms',
        300: '300ms',
      },
      transitionTimingFunction: {
        smooth: 'ease',
      },
    },
  },
  plugins: [],
}
