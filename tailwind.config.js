/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary (Deep Navy)
        primary: '#0B1F3A',
        primaryHover: '#0F2A4D',
        
        // Accent (Bright AI Blue)
        accent: '#2563EB',
        accentHover: '#1D4ED8',
        
        // Backgrounds
        background: '#FFFFFF',
        sectionBg: '#F8FAFC',
        cardBg: '#EEF2F7',
        
        // Text & Greys
        textPrimary: '#0F172A',
        textBody: '#334155',
        textSecondary: '#64748B',
        border: '#CBD5E1',
        borderLight: '#E2E8F0',
        
        // Legacy support (will be phased out)
        card: '#EEF2F7',
        section: '#F8FAFC',
        footer: '#0B1F3A'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      transitionDuration: {
        '250': '250ms',
      }
    },
  },
  plugins: [],
}