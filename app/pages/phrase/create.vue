<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePhraseStore } from '@@/stores/phrase';
definePageMeta({
  middleware: [
    'auth',
  ],
})

const store = usePhraseStore();
const { phraseDetails, editedPhraseId } = storeToRefs(store);

const phraseName = ref("")
const phraseType = ref<PhraseType>(0)
const idiomOrigin = ref("")
const meanings = ref<Meaning[]>([])
const toBeUpdated = ref(false);
const extraDetails = ref<[string, string[]][]>([]);

onMounted(() => {
  const phrase = phraseDetails?.value
  if (phrase && phrase.name.length && phrase.meanings.length) {
    toBeUpdated.value = true
    phraseName.value = phrase.name
    meanings.value = phrase.meanings
    if (phrase.type) 
      phraseType.value = phrase.type
    if (phrase.origin)
      idiomOrigin.value = phrase.origin
    if (phrase.extraDetails) 
      extraDetails.value = phrase.extraDetails
  }
})

async function onConfirm() {
  if (toBeUpdated.value) {
    $fetch('/api/phrase/update', { 
      method: 'POST', 
      body: { 
        id: editedPhraseId.value,
        name: phraseName.value.trim(),
        type: phraseType.value,
        origin: idiomOrigin.value.trim(),
        extraDetails: extraDetails.value,
        meanings: meanings.value
       } 
    })
  } else {
    $fetch('/api/phrase/create', { 
      method: 'POST', 
      body: { 
        name: phraseName.value.trim(),
        type: phraseType.value,
        origin: idiomOrigin.value.trim(),
        extraDetails: extraDetails.value,
        meanings: phraseDetails.value?.meanings
       } 
    })
  }
  //navigateTo('/admin')
 }

  const addExtraDetailsButtonStyle = `my-1 px-1 bg-sky-600 
  text-white rounded-md font-md border-2 border-sky-600 
  hover:outline hover:outline-offset-1 hover:outline-sky-600`

  
  function onClickAddExtraDetails() {
    extraDetails.value.push(["", []])
  }

function updateExtraDetailsTitle(newTitle: string, index: number) {
  if (extraDetails.value[index]) 
    extraDetails.value[index][0] = newTitle;
}

function addExtraDetailsText(index: number) {
  if (extraDetails.value[index]) {
    const textArr = extraDetails.value[index][1];
    textArr.push('')
  }
}

function updateExtraDetailsText(titleIndex: number, textIndex: number, text: string) {
  if (extraDetails.value[titleIndex]) {
    extraDetails.value[titleIndex][1][textIndex] = text;
  }   
}

function deleteExtraDetailsText(titleIndex: number, textIndex: number) {
  if (extraDetails.value[titleIndex]) {
    extraDetails.value[titleIndex][1].splice(textIndex, 1)
    if (extraDetails.value[titleIndex][1].length === 0) {
      extraDetails.value.splice(titleIndex, 1);
    }
  }   
}
</script>

<template>
  <main>
    <Head>
      <Title>{{ toBeUpdated ? " Update Phrase ": "Create New Phrase" }}</Title>
    </Head>
    <form 
      name="new phrase" 
      class="flex flex-col gap-2"
    >
      <header class="flex justify-between items-center bg-gray-300 px-2 py-2 gap-4"> 
        <section class="flex gap-1 items-center">
          <h3 
            v-if="!toBeUpdated" 
            class="text-xl font-extrabold"
          >
            New Phrase
          </h3>
          <h3 
            v-else 
            class="text-xl font-extrabold"
          >
            Update Phrase
          </h3>
        </section>
        <menu class="flex gap-2">
          <button 
            value="confirm"
            class="px-2 py-1 bg-yellow-400 hover:bg-green-600 rounded-md 
            font-bold hover:outline hover:outline-offset-2 hover:outline-sky-600"
            @click="onConfirm"
          >
            Confirm
          </button>
        </menu>
      </header>
      <section class="relative mx-2 my-1">
        <input 
          id="new_phrase" 
          v-model="phraseName"
          type="text" 
          class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm 
            text-gray-900 bg-gray-50 dark:bg-gray-700 
            border-0 border-b-2 border-gray-300 appearance-none 
            dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
          placeholder=" " 
        >
        <label 
          for="new_phrase" 
          class="absolute text-sm text-gray-500 dark:text-gray-400 
          duration-300 transform -translate-y-4 scale-75 top-4 z-10 
          origin-[0] left-2.5 peer-focus:text-blue-600 
          peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
          peer-focus:-translate-y-4"
        >
          Phrase Name
        </label>
      </section>
      <section class="flex flex-col gap-2 mx-4 my-1">
        <fieldset>
          <legend class="text-md font-semibold">
            Phrase Type
          </legend>
          <ul class="flex gap-2 text-gray-900 bg-white">
            <li class="flex gap-2 items-center text-md font-semibold p-2 hover:bg-gray-100 rounded-md border-solid border-green-500 border-2">
              <input 
                id="phrasal-verb" 
                v-model="phraseType"
                type="radio" 
                value="0"
                class="peer/pverb"
                :checked="phraseType == 0"
              >
              <label 
                for="phrasal-verb" 
                class="text-gray-900 peer-checked/pverb:text-orange-600"
              >
                Phrassal Verb 
              </label>
            </li>
            <li class="flex gap-2 items-center text-md font-semibold p-2 hover:bg-gray-100 rounded-md border-solid border-purple-500 border-2">
              <input 
                id="idiom" 
                v-model="phraseType"
                type="radio" 
                value="1" 
                class="peer/idiom"
                :checked="phraseType == 1"
              >
              <label 
                for="idiom" 
                class="text-gray-900 peer-checked/idiom:text-orange-600"
              >
                Idiom 
              </label>
            </li>
          </ul>
        </fieldset>
      </section>
      <section class="relative mx-2 my-1">
        <textarea 
          id="origin" 
          v-model="idiomOrigin"
          type="text" 
          class="relative block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full 
          text-md text-gray-900 bg-gray-50
          border-0 border-b-2 border-gray-300 appearance-none 
          focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " 
        />
        <label 
          for="origin" 
          class="absolute text-lg text-gray-900
          duration-300 transform -translate-y-4 scale-75 top-4 z-10 
          origin-[0] left-2.5 peer-focus:text-blue-600 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
          peer-focus:-translate-y-4"
        >
          Origin
        </label>
      </section>
      <fieldset class="relative m-2 p-2 rounded-md bg-teal-300">
        <legend class="text-lg font-semibold bg-yellow-400 px-4 rounded-md">
          Additional Info
          <ButtonContainer 
            name="Add Details" 
            class="ml-8"
            :custom-style="addExtraDetailsButtonStyle"
            @click-event="onClickAddExtraDetails" 
          />
        </legend>
        <ul>
          <ExtraDetails
            v-for="(details, index) in extraDetails"
            :key="index"
            :index="index"
            :title="details[0]"
            :details="details[1]"
            @update-extra-details-title="(newTitle) => updateExtraDetailsTitle(newTitle, index)"
            @add-extra-details-text="addExtraDetailsText"
            @update-extra-details-text="updateExtraDetailsText"
            @delete-extra-details-text="deleteExtraDetailsText"
          />
        </ul>
      </fieldset>
      <PhraseMeanings />
    </form>
  </main>
</template>