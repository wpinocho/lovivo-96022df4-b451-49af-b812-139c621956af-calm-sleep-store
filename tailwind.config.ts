import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(210 100% 92%)',
				input: 'hsl(210 100% 92%)',
				ring: 'hsl(199 89% 48%)',
				background: 'hsl(0 0% 100%)',
				foreground: 'hsl(220 60% 8%)',
				primary: {
					DEFAULT: 'hsl(199 89% 48%)',
					foreground: 'hsl(0 0% 100%)'
				},
				secondary: {
					DEFAULT: 'hsl(204 100% 94%)',
					foreground: 'hsl(220 60% 8%)'
				},
				destructive: {
					DEFAULT: 'hsl(0 84.2% 60.2%)',
					foreground: 'hsl(0 0% 100%)'
				},
				muted: {
					DEFAULT: 'hsl(204 100% 94%)',
					foreground: 'hsl(220 40% 40%)'
				},
				accent: {
					DEFAULT: 'hsl(204 100% 94%)',
					foreground: 'hsl(220 60% 8%)'
				},
				popover: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(220 60% 8%)'
				},
				card: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(220 60% 8%)'
				},
				sidebar: {
					DEFAULT: 'hsl(0 0% 98%)',
					foreground: 'hsl(220 60% 8%)',
					primary: 'hsl(199 89% 48%)',
					'primary-foreground': 'hsl(0 0% 100%)',
					accent: 'hsl(204 100% 94%)',
					'accent-foreground': 'hsl(220 60% 8%)',
					border: 'hsl(210 100% 92%)',
					ring: 'hsl(199 89% 48%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;