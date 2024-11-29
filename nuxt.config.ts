// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@hebilicious/authjs-nuxt",
    "@pinia/nuxt",
    '@vite-pwa/nuxt',
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
  },

  nitro: {
    compressPublicAssets: {
      brotli: true
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Idioms & Phrasal Verbs Dictionary',
      short_name: 'Idioms',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
          }
        }
      ]
    },
    client: {
      installPrompt: true,
    },
  },

  compatibilityDate: '2024-10-28'
})