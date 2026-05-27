import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  $production: {
    devtools: { enabled: false },
  },

  $development: {
    devtools: { enabled: true },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt"],
});