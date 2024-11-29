<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from 'pinia'
import { usePhraseStore } from '@/stores/phrase'

const colors = [
  'rgb(30, 50, 100)', 'rgb(0, 100, 80)',
  'rgb(232, 17, 91)', 'rgb(194 0 23)',
  'rgb(30, 50, 100)', 'rgb(140, 25, 50)',
  'rgb(20, 138, 8)', 'rgb(235, 30, 50)'
]

const store = usePhraseStore()
const { phraseDetails } = storeToRefs(store)
//const phraseDetails = usePhraseDetails()

let activeMenuIndex: number|undefined = 0;
const editMeaning = ref(false);

const cancelButtonStyle = `my-1 px-1 bg-white text-pink-600 rounded-md 
  font-bold border-2 border-pink-600 
  hover:outline hover:outline-offset-1 hover:outline-sky-600`

const confirmButtonStyle = `my-1 px-1 bg-rose-600 
  text-white rounded-md font-md border-2 border-pink-600 
  hover:outline hover:outline-offset-1 hover:outline-sky-600`

function onClickEditMeaning(index: number) {
  activeMenuIndex = index
  editMeaning.value = true
}

function onClickAddMeaning() {
  activeMenuIndex = phraseDetails.value?.meanings.length
  phraseDetails.value?.meanings.push({
    name: "",
    examples: [],
    media: []
  })
  
  editMeaning.value = true
}

function onClickCancel() {
  if (activeMenuIndex == undefined) return
  
  //delete associated media from backend
  const uploadedMedia = phraseDetails.value?.meanings[activeMenuIndex].media
  if (uploadedMedia?.length) {
    for(const media of uploadedMedia) {
      $fetch('/api/media/delete', { 
        method: 'POST', 
        body: { media: media } 
      })
    }
  }
  
  phraseDetails.value?.meanings.splice(activeMenuIndex, 1)
  editMeaning.value = false
}

function onClickConfirm() {
  if (activeMenuIndex == undefined || phraseDetails.value?.meanings == undefined ) return
  const clonedMeaning = structuredClone(toRaw(phraseDetails.value?.meanings[activeMenuIndex]))
  phraseDetails.value.meanings[activeMenuIndex] = clonedMeaning
  editMeaning.value = false
}

</script>

<template>
  <section>
    <section class="realtive px-2 flex justify-between items-center flex-wrap bg-pink-100">
      <p class="mx-2 text-md font-bold bg-pink-100 rounded-md">
        Meanings
      </p>
      <menu class="flex gap-2">
        <ButtonContainer 
          v-if="editMeaning"
          name="Delete"
          :custom-style="cancelButtonStyle"
          @click-event="onClickCancel" 
        />
        <ButtonContainer 
          v-if="editMeaning"
          name="Save" 
          :custom-style="confirmButtonStyle"
          @click-event="onClickConfirm" 
        />
        <p 
          v-if="!editMeaning"
          class="text-white font-semibold bg-sky-900 p-2 rounded-md my-1 cursor-pointer
          hover:outline hover:outline-offset-1 hover:outline-yellow-600"
          @click="onClickAddMeaning"
        >
          Add Meaning
        </p>
      </menu>
    </section>
    <menu 
      v-if="!editMeaning" 
      :class="{'flex flex-wrap gap-2 rounded-sm p-2 bg-black': phraseDetails?.meanings?.length}"
    >
      <li 
        v-for="(meaning, index) in phraseDetails?.meanings"
        :key="meaning.name"
        class="p-2 rounded-md text-white w-32 h-32 text-ellipsis cursor-pointer"
        :style="{ 'background-color': colors[Math.floor(Math.random()*colors.length)] }"
        @click="onClickEditMeaning(index)"
      >
        <p class="text-ellipsis overflow-hidden whitespace-normal line-clamp-5">
          {{ meaning.name }}
        </p>
      </li>
    </menu>
    <section v-if="editMeaning">
      <PhraseMeaning :index="activeMenuIndex" />
    </section>
  </section>
</template>