/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                lightApp: "#dddedd",
                darkApp: "#1c2429",
                light: "#f4f5f8",
            },
            height: {
                90: "90vh",
            },
            width: {
                90: "90vw",
            },
            borderRadius: {
                "5xl": "20px",
            },
            boxShadow: {
                c1: "#64646f33 0 7px 29px 0",
                c2: "#32325d40 0 6px 12px -2px, #0000004d 0 3px 7px -3px",
            },
            flexGrow: {
                30: ".3",
                70: ".7",
            },
        },
    },
    plugins: [],
};
