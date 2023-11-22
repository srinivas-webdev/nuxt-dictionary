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
const colors = [
  'rgb(30, 50, 100)', 'rgb(0, 100, 80)',
  'rgb(232, 17, 91)', 'rgb(194 0 23)',
  'rgb(30, 50, 100)', 'rgb(140, 25, 50)',
  'rgb(20, 138, 8)', 'rgb(235, 30, 50)'
]

const route = useRoute()
const searchText = route.query['search']
const {data: phraseData}= await useFetch(`/api/phrase/exactSearch?phrase=${searchText}`)

</script>

<template>
  <main>
    <menu class="flex justify-between items-center mt-2 p-1">
      <p class="text-blue-900 italic">
        Meaning(s) of <span class="font-extrabold text-xl">
          {{ searchText }}</span> in English
      </p>
    </menu>
  
    <menu 
      v-if="phraseData?.length"
      class="my-container"
    >
      <section 
        v-for="meaning in phraseData[0].meanings"
        :key="meaning"
        class="m-1 mr-2 rounded-md p-1 rounded-md 
          text-white flex flex-col gap-2 custom-shadow"
        :style="{ 'background-color': colors[Math.floor(Math.random()*colors.length)] }"
      >
        <p class="text-xl font-normal">
          {{ meaning.name }}
        </p>
        <p class="border border-b-2  border-green-500" />
        <p class="text-lg font-semibold">
          Example Sentences:
        </p>
        <li 
          v-for="(example, index) in meaning.examples"
          :key="index"
          class="italic flex flex-col gap-2 text-xl font-normal  leading-4" 
        >
          {{ index+1 }}. {{ example }} 
        </li>
        <p class="border border-b-2 border-gray-400" />
        <MediaContainer :media-list="meaning.media" />
      </section>
    </menu>
  </main>
</template>

<style scoped>
  .my-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
  .custom-shadow {
    box-shadow: 3px 3px 2px 0px rgb(65, 1, 1);
  }
</style>