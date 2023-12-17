<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePhraseStore } from '@/stores/phrase'
const store = usePhraseStore()
const { phraseDetails } = storeToRefs(store)
//const phraseDetails = usePhraseDetails()
const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
})

function onChange(event: Event) {
  if (phraseDetails.value)
    phraseDetails.value.meanings[props.index].name = (event.target as HTMLInputElement).value
}
</script>

<template>
  <div class="relative mx-2 my-1">
    <input 
      id="floating_meaning" 
      type="text" 
      :value="phraseDetails?.meanings[props.index].name"
      class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full 
      text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 
      border-0 border-b-2 border-gray-300 appearance-none 
      dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
      focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
      placeholder="" 
      @input="onChange"
    >
    <label 
      for="floating_meaning" 
      class="absolute text-sm text-gray-500 dark:text-gray-400 
      duration-300 transform -translate-y-4 scale-75 top-4 z-10 
      origin-[0] left-2.5 peer-focus:text-blue-600 
      peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
      peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
      peer-focus:-translate-y-4"
    >
      Meaning
    </label>
    <ExampleContainer :active-meaning-index="props.index" />
    <PhraseMedia :active-meaning-index="props.index" />
  </div>
</template>