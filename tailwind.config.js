/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f8fafc",
        steel: "#64748b",
        ocean: "#2563eb",
        pine: "#16a34a",
        ember: "#f97316"
      },
      boxShadow: {
        card: "0 18px 45px -30px rgba(15, 23, 42, 0.4)"
      }
    }
  },
  plugins: []
};
