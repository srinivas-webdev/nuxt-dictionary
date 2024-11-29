<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap';
import { storeToRefs } from 'pinia'
import { usePhraseStore } from '@/stores/phrase'

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

const baseColors = [
  'indigo', 'purple', 'DarkMagenta', 'red', 
  'OrangeRed', 'MediumVioletRed', 'DarkSlateBlue',
  'green', 'crimson', 'DarkSlateGray', 'maroon'
]
let initBaseColor = '';

const getRandomBaseColor = (index: number) => {
  if (index === 0) {
    initBaseColor = baseColors[Math.floor(Math.random() * baseColors.length)]
  }
  return initBaseColor
}

const getColorOffset = (total: number, index: number) => {
  const middleIndex = Math.floor(total/2-1)
  return (middleIndex - index) * 0.05
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
      class="meaning-container"
    >
      <section 
        v-for="meaning in phraseData.meanings"
        :key="meaning.name"
        class="meaning m-1 mr-2 rounded-md p-1 rounded-xl border-solid border-4 border-teal-500
          text-gray-900 gap-2 shadow-xl bg-teal-50"
      >
        <section class="item">
          <p class="text-xl font-normal">
            {{ meaning.name }}
          </p>
        </section>
        <section class="item flex flex-col gap-2">
          <p class="text-lg text-blue-900 font-bold">
            Example Sentences:
          </p>
          <p
            v-for="(example, index) in meaning.examples"
            :key="index"
            data-allow-mismatch
            class="leading-normal italic text-xl font-normal rounded-md shadow-md p-2 bg-orange-600 text-white" 
            :style="{ 'background-color': 'oklch(from '+getRandomBaseColor(index)+' calc(l + '+getColorOffset(meaning.examples?.length ?? 0, index)+') c h)' }"
          >
            {{ index+1 }}. {{ example }} 
          </p>
        </section>
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
            <section class="text-xl text-orange-600 font-bold">
              Word Origin
            </section>
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
        </section>
        
        <MediaContainer :media-list="meaning.media" />
      </section>
    </menu>
  </main>
</template>

<style scoped>
  .meaning-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    grid-template-rows: auto;
  }
  .custom-shadow {
    box-shadow: 3px 3px 2px 0px rgb(65, 1, 1);
  }

  .meaning {
    display: grid;
    grid-row: span 4;
    grid-template-rows: subgrid;
  }

  .item {
    padding-block-end: 0.25rem;
    border-bottom: 2px solid #d1d5db;
  }
</style>