// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
  ],
  eslint: {
    lintOnStart: false
  },
  runtimeConfig: {
    supaBaseUrl: process.env.SUPABASE_URL,
    supaBaseKey: process.env.SUPABASE_KEY,
  },
})