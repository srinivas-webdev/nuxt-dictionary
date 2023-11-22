<script setup lang="ts">
const route = useRoute()
const {data: phrases}= await useFetch(`/api/phrase/searchFromTo`, {
  query: {
    alphabet: route.params.alphabet,
    from: route.query["from"], 
    to: route.query["to"],
   }
})

const onClick = (phrase: string) =>{
  navigateTo(`/dictionary?search=${phrase}`)
}

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <main>
    <Head>
      <Title>{{ "Phrases: " + route.query["from"] + " - " + route.query["to"] }}</Title>
    </Head>
    <section class="grid grid-cols-1 m-8 gap-4">
      <p class="text-3xl font-lg text-[#1d2a57] pb-4 border-dotted border-b-2">
        Words starting from 
        <span class="font-extrabold text-sky-600 px-2">
          {{ route.query["from"] }} 
        </span>
        to
        <span class="font-extrabold text-sky-600 px-2">
          {{ route.query["to"] }}
        </span>
      </p>
      <BrowseContainer />
      <section class="flex flex-wrap">
        <button 
          v-for="phrase in phrases"
          :key="phrase"
          class="m-4 p-2 rounded-md text-xl bg-sky-300 flex gap-2 shadow-md
          hover:bg-green-400 hover:outline 
          hover:outline-sky-600 hover:outline-offset-2
          w-full sm:w-max flex flex-col items-center sm:flex-row"
          @click="onClick(phrase)"
        >
          {{ phrase }}
        </button>
      </section>
    </section>
  </main>
</template>