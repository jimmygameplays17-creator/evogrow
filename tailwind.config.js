/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#0B0F1A",
        steel: "#94a3b8",
        ocean: "#2563eb",
        pine: "#00FFA3",
        ember: "#FF8C00",
        money: "#00FFA3",
        crypto: "#7C3AED",
        accent: "#00E5FF",
        card: "#151b2b"
      },
      boxShadow: {
        card: "0 18px 45px -30px rgba(15, 23, 42, 0.4)"
      }
    }
  },
  plugins: []
};
