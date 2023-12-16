<script setup lang="ts">
import { ref, onMounted } from 'vue';

const phraseDetails = usePhraseDetails()
const props = defineProps({
  activeMeaningIndex: {
    type: Number,
    default: 0
  }
})

const associatedMeaning = ref<Meaning>();
onMounted(() => {
  associatedMeaning.value = phraseDetails.value?.meanings[props.activeMeaningIndex]
})

function onClickAddExample() {
  associatedMeaning.value?.examples?.push("")
}

function onUpdateExample(index: number, text: string) {
  if (associatedMeaning.value?.examples?.length)
    associatedMeaning.value.examples[index] = text
}

function onDeleteExample(index: number) {
  associatedMeaning.value?.examples?.splice(index, 1)
}
</script>

<template>
  <section 
    class="realtive px-2 flex justify-between items-center flex-wrap gap-4
    bg-pink-100"
  >
    <p class="mx-2 text-md font-bold bg-pink-100 rounded-md">
      Examples
    </p>
    <p 
      class="text-white bg-sky-900 p-1 rounded-md my-1 cursor-pointer
      hover:outline hover:outline-offset-1 hover:outline-yellow-600"
      @click="onClickAddExample"
    >
      Add an Example
    </p>
  </section>
  <menu>
    <li 
      v-for="(example, index) in associatedMeaning?.examples" 
      :key="example"
    >
      <MeaningExample 
        :index="index" 
        :text="example"
        @update-example="onUpdateExample"
        @delete-example="onDeleteExample"
      />
    </li>
  </menu>
</template>