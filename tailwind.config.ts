import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			ai: {
  				blue: '#2563eb',
  				purple: '#7c3aed',
  				teal: '#0d9488',
  				orange: '#ea580c',
  				pink: '#db2777'
  			},
  			tool: {
  				calculator: '#0ea5e9',
  				search: '#3b82f6',
  				document: '#8b5cf6',
  				custom: '#ec4899'
  			},
  			state: {
  				success: '#22c55e',
  				warning: '#f59e0b',
  				error: '#ef4444',
  				info: '#3b82f6'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
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
  		fontFamily: {
  			sans: [
  				'var(--font-sans)',
                    ...fontFamily.sans
                ],
  			mono: [
  				'var(--font-mono)',
                    ...fontFamily.mono
                ],
  			heading: [
  				'var(--font-heading)',
                    ...fontFamily.sans
                ]
  		},
  		boxShadow: {
  			'ai-sm': '0 1px 2px 0 rgba(37, 99, 235, 0.05)',
  			'ai-md': '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -2px rgba(37, 99, 235, 0.1)',
  			'ai-lg': '0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -4px rgba(37, 99, 235, 0.1)',
  			tool: '0 1px 3px 0 rgba(14, 165, 233, 0.1), 0 1px 2px -1px rgba(14, 165, 233, 0.1)'
  		},
  		animation: {
  			'ai-pulse': 'ai-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'tool-bounce': 'tool-bounce 1.5s infinite'
  		},
  		keyframes: {
  			'ai-pulse': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.5'
  				}
  			},
  			'tool-bounce': {
  				'0%, 100%': {
  					transform: 'translateY(-25%)',
  					animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
  				},
  				'50%': {
  					transform: 'translateY(0)',
  					animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
  				}
  			}
  		},
  		spacing: {
  			'ai-sm': '0.5rem',
  			'ai-md': '1rem',
  			'ai-lg': '1.5rem',
  			'ai-xl': '2rem'
  		},
  		borderRadius: {
  			'ai-sm': '0.5rem',
  			'ai-md': '0.75rem',
  			'ai-lg': '1rem',
  			'ai-xl': '1.5rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
      require("tailwindcss-animate")
],
} satisfies Config