/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                spotlight: "spotlight 3s ease-out infinite",
                scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
            },
            keyframes: {
                spotlight: {
                    "0%": {
                        opacity: 0,
                        transform: "scale(0.9) translate(0, 20px)",
                    },
                    "50%": {
                        opacity: 1,
                        transform: "scale(1.1) translate(0, -10px)",
                    },
                    "100%": {
                        opacity: 0,
                        transform: "scale(0.9) translate(0, 20px)",
                    },
                },
                scroll: {
                    "0%": {
                        transform: "translateX(0)",
                    },
                    "100%": {
                        transform: "translateX(-100%)",
                    },
                },
            },
            colors: {
                // Light Theme - Cyan-Blue Gradient Palette
                'cyan-lightest': '#EFFFFD',
                'cyan-light': '#B8FFF9',
                'cyan': '#85F4FF',
                'blue': '#42C2FF',

                // Background colors
                'background-light': '#EFFFFD',
                'background-light-hover': '#B8FFF9',
                'text-primary-light': '#2C3E50',
                'text-secondary-light': '#34495E',
                'border-light': '#B8FFF9',

                // Keep existing dark theme colors
                'background-dark': '#000000',
                'text-primary-dark': '#F9FAFB',
                'text-secondary-dark': '#9CA3AF',
                'border-dark': '#374151',

                // Gradients and hover states for light theme
                'gradient-start': '#EFFFFD',
                'gradient-end': '#42C2FF',
                'hover-light': '#85F4FF',
                'hover-dark': '#42C2FF',
            },
            keyframes: {
                shine: {
                    '0%': { 'background-position': '200% center' },
                    '100%': { 'background-position': '-200% center' },
                },
            },
            animation: {
                shine: 'shine 5s linear infinite',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, var(--color-primary-blue), var(--color-primary-purple))',
                'gradient-background': 'linear-gradient(to bottom, var(--color-background-gradient-1), var(--color-background-gradient-2))',
            },
        },
    },
    plugins: [],
};