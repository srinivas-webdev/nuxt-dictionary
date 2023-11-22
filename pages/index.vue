<script setup lang="ts">
useHead({
  title: 'Dictionary of Idioms and Phrasal verbs',
  meta: [
    { name: 'description', content: 'Find essential Idioms and Phrasal verbs on this app.' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>


<template>
  <main class="flex flex-col gap-8 m-4">
    <div class="flex h-12 shadow-lg shadow-gray-500 w-max">
      <div class="h-12 w-12 bg-yellow-400" />
      <p class="text-2xl text-white font:base sm:font-lg bg-[#1d2a57] w-max p-2 px-4">
        Phrase of the Moment
      </p>
    </div>
    <WordOfMoment />
    <BrowseContainer />
  </main>
</template>
