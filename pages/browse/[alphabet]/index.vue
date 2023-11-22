<script setup lang="ts">
const route = useRoute()
const {data: phrases}= await useFetch(`/api/phrase/searchAll?word=${route.params.alphabet}`)

const getHref = (phrase: string[]) =>{
  let href = ""
  if (phrase[0] === phrase[1]) {
    href = "/dictionary?search="+phrase[0]
  } else {
    href = "/browse/"+route.params.alphabet+"/from-to"
    +"?from="+phrase[0]+"&to="+phrase[1]
  }
  
  return href
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
      <Title>{{ "Phrases starting with: " + route.params.alphabet }}</Title>
    </Head>
    <section class="grid grid-cols-1 m-8 gap-4">
      <p class="text-3xl font-lg text-[#1d2a57] pb-4 border-dotted border-b-2">
        Words starting with 
        <span class="font-extrabold text-sky-600">
          {{ route.params.alphabet }}
        </span>
      </p>
      <BrowseContainer />
      <menu class="flex flex-wrap">
        <a 
          v-for="phrase in phrases"
          :key="phrase"
          class="m-4 p-2 rounded-md text-xl bg-sky-300 flex gap-2 shadow-md
          hover:bg-green-400 hover:outline 
          hover:outline-sky-600 hover:outline-offset-2
          w-full sm:w-max flex flex-col items-center sm:flex-row"
          :href="getHref(phrase)"
        >
          <span class="">{{ phrase[0] }}</span> 
          {{ (phrase[0] !== phrase[1]) ? " ...... ": "" }} 
          <span class=" ">
            {{ (phrase[0] !== phrase[1]) ? phrase[1]: "" }}
          </span>
        </a>
      </menu>
    </section>
  </main>
</template>