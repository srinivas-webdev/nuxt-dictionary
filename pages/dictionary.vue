<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap';

useHead({
  title: 'Dictionary of Idioms and Phrasal verbs',
  meta: [
    { name: 'description', content: 'Find essential Idioms and Phrasal verbs on this app.' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})


const { status } = useAuth()

import { storeToRefs } from 'pinia'
import { usePhraseStore } from '@/stores/phrase'
const store = usePhraseStore()
const { phraseDetails, editedPhraseId } = storeToRefs(store)

const showWordOrigin = ref(false)

onMounted(() => {
  showWordOrigin.value = true
})

const route = useRoute()
const searchText = route.query['search']
const {data: phraseData} = await useFetch<PhraseDetails>(`/api/phrase/exactSearch?phrase=${searchText}`)

const onClickUpdate = () => {
  if (phraseData.value) {
    phraseDetails.value = phraseData.value
    editedPhraseId.value =  phraseData.value.id
    navigateTo('/phrase/create')
  }
}

const onBeforeEnter = (el: Element) => {
  gsap.set(el, {
    opacity: 0,
    xPercent: 10
  })
  gsap.set(".hand-icon", {
    rotate: -90,
  })
}

const onEnter = (el: Element, done: () => void) => {
  gsap.to(el, {
    duration: 0.5,
    opacity: 1,
    xPercent: 0,
    ease: 'elastic.Out(2, 1)',
    onComplete: done
  })
  gsap.to(".hand-icon", {
    duration: 0.5,
    rotate: 0,
    ease: 'elastic.Out(2, 1)',
  })
}

const onLeave = (el: Element, done: () => void) => {
  gsap.to(el, {
    duration: 0.5,
    opacity: 0,
    xPercent: 10,
    ease: 'elastic.Out(2, 1)',
    onComplete: done
  })
  gsap.to(".hand-icon", {
    duration: 0.5,
    rotate: -90,
    ease: 'elastic.Out(2, 1)',
  })
}
</script>

<template>
  <main>
    <menu class="flex justify-between items-center mt-2 p-1">
      <p class="text-blue-900 italic">
        Meaning(s) of 
        <span class="font-extrabold text-2xl">
          {{ searchText }}
        </span>
        <span class="pl-2 font-extrabold text-xl text-orange-500">
          {{ phraseData?.type == 1 ? '(Idiom)' : '(Phrasal Verb)' }}
        </span>
        in English
      </p>
      <button 
        v-if="status === 'authenticated'" 
        class="flex items-center justify-center space-x-2 bg-blue-900 text-white rounded-lg 
        py-2 px-4 text-lg shadow-2xl hover:bg-purple-700" 
        @click="onClickUpdate"
      >
        <span>Update Phrase</span>
      </button>
    </menu>
  
    <menu 
      v-if="phraseData"
      class="my-container"
    >
      <section 
        v-for="meaning in phraseData.meanings"
        :key="meaning.name"
        class="m-1 mr-2 rounded-md p-1 rounded-xl border-solid border-4 border-teal-500
          text-gray-900 flex flex-col gap-2 shadow-xl bg-teal-50"
      >
        <p class="text-xl font-normal">
          {{ meaning.name }}
        </p>
        <p class="border border-b-2  border-gray-300" />
        <p class="text-lg text-blue-900 font-bold">
          Example Sentences:
        </p>
        <p
          v-for="(example, index) in meaning.examples"
          :key="index"
          class="leading-normal italic text-xl font-normal rounded-md shadow-md p-2 bg-orange-600 text-white" 
        >
          {{ index+1 }}. {{ example }} 
        </p>
        <p class="border border-b-2 border-gray-300" />
        
        <section 
          v-if="phraseData?.origin" 
          class="flex flex-col gap-2 bg-teal-100 rounded-xl" 
        >
          <section 
            class="flex gap-2 rounded-lg p-2 rounded-lg 
            border-solid border-2 
            border-purple-500 hover:bg-indigo-100 hover:cursor-pointer"
            @click="showWordOrigin = !showWordOrigin"
          >
            <img 
              src="~/assets/hand.png"
              class="hand-icon w-8 h-8"
            >
            <summary class="text-xl text-orange-600 font-bold">
              Word Origin
            </summary>
          </section>
          
          <Transition 
            appear
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
          >
            <p 
              v-if="showWordOrigin" 
              class="italic text-lg font-semibold rounded-xl p-2 m-2 shadow-2xl bg-teal-50"
            >
              {{ phraseData.origin }}
            </p>
          </Transition>
          
          <p class="border border-b-2 border-gray-300" />
        </section>
        
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