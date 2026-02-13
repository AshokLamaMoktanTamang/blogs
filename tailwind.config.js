/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                cv: {
                    bg: "#0f172a",
                    "bg-alt": "#0b1120",
                    "text-primary": "#f8fafc",
                    "text-secondary": "#94a3b8",
                    accent: "#2dd4bf",
                    border: "#334155",
                }
            }
        },
    },
    plugins: [],
};
