// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@hebilicious/authjs-nuxt"
  ],
  eslint: {
    lintOnStart: false
  },
  runtimeConfig: {
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    supaBaseUrl: process.env.SUPABASE_URL,
    supaBaseKey: process.env.SUPABASE_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET // You can generate one with `openssl rand -base64 32`
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET
    },
    public: {
      cloudinaryApiBase: process.env.CLOUDINARY_URL,
      cloudinaryApiCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryApiUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
      }
    }
  },
  alias: {
    cookie: "cookie"
  }
})