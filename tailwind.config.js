import { withTV } from 'tailwind-variants/transformer'
import animatePlugin from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default withTV({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Base colors
        background: '#faf9f7',
        foreground: '#2d1810',
        card: '#ffffff',
        popover: '#ffffff',
        primary: '#c14242', // Armenian red
        secondary: '#f4e4b8', // Warm gold
        muted: '#f0ebe2',
        accent: '#d4965c', // Apricot gold
        destructive: '#d4183d',
        border: 'rgba(45, 24, 16, 0.15)',
        input: 'transparent',
        ring: '#c14242',

        // Text/foreground colors
        'card-foreground': '#2d1810',
        'popover-foreground': '#2d1810',
        'primary-foreground': '#ffffff',
        'secondary-foreground': '#2d1810',
        'muted-foreground': '#6b5b4f',
        'accent-foreground': '#2d1810',
        'destructive-foreground': '#ffffff',

        // Armenian food colors
        armenian: {
          red: '#c14242',
          gold: '#d4965c',
          cream: '#f4e4b8',
          brown: '#8b4513',
          orange: '#e67e22',
        },
      },
      borderRadius: {
        lg: '0.75rem', // --radius
        md: 'calc(0.75rem - 2px)',
        sm: 'calc(0.75rem - 4px)',
        xl: 'calc(0.75rem + 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 5px rgba(193, 66, 66, 0.5)' },
          to: { boxShadow: '0 0 20px rgba(193, 66, 66, 0.8)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-in': 'slideIn 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      backgroundImage: {
        'hero-pattern': "url('/Yerevan_at_night_2560.jpg')",
      },
    },
  },
  plugins: [animatePlugin],
})
