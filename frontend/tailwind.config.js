/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                fontFamily: {
                        sans: ['Jost', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                        display: ['Jost', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                },
                colors: {
                        navy: {
                                DEFAULT: '#1B4C6B',
                                dark: '#153B54',
                                deep: '#102D40',
                        },
                        brand: {
                                // Orange de marque. Réservé aux aplats décoratifs, aux icônes et
                                // au texte posé sur fond navy (4,75:1 sur #102D40 : conforme).
                                orange: '#E8743B',
                                orangeDark: '#D06530',

                                // Variantes accessibles de la même teinte (H 20°), pour tout ce qui
                                // porte du texte. #E8743B ne donne que 3,00:1 avec du blanc comme
                                // avec du texte foncé : insuffisant face au seuil WCAG AA de 4,5:1.
                                //   cta     — fond des boutons à texte blanc      (4,66:1)
                                //   ctaDark — survol de ces mêmes boutons         (6,04:1)
                                //   ink     — libellés orange sur fond clair      (4,66:1)
                                //   light   — libellés orange sur fond navy       (4,50:1 sur #1B4C6B)
                                cta: '#C45017',
                                ctaDark: '#A8430F',
                                ink: '#C45017',
                                light: '#F0A47F',
                        },
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                keyframes: {
                        'accordion-down': {
                                from: { height: '0' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'accordion-up': {
                                from: { height: 'var(--radix-accordion-content-height)' },
                                to: { height: '0' }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
