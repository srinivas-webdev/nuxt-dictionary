<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Welcome to Godavari Water Booking App',
  ogTitle: 'Welcome to Godavari Water Booking App',
  description: 'Online water provider in Vizag',
})
useHead({
  title: 'Godavari Water',
  meta: [
    { name: 'description', content: 'Godavari Water in Vizag' },
    { name: 'theme-color', content: '#FFFFFF', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#000000', media: '(prefers-color-scheme: dark)' }
  ],
  link: [
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      href: '/favicon-32x32.png',
      type: "image/png",
      sizes: "32x32"
    },
    {
      rel: 'icon',
      href: '/favicon-16x16.png',
      type: "image/png",
      sizes: "16x16"
    }
  ]
})
</script>
