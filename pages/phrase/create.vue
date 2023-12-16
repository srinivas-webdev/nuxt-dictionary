<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to) {
      if (process.client) return
      const { session } = useAuth()
      const runtimeConfig = useRuntimeConfig()

      if (!session.value || 
        session.value.user?.email !== runtimeConfig.adminEmail) {
          return navigateTo(`/api/auth/signin?callbackUrl=${to.path}`)
      }
    }
  ]
});

const phraseDetails = usePhraseDetails()
const editedPhraseId = useEditedPhraseId()

const phraseName = ref("")
const meanings = ref<Meaning[]>([])
const toBeUpdated = ref(false)

onMounted(() => {
  const phrase = phraseDetails?.value
  if (phrase && phrase.name.length && phrase.meanings.length) {
    toBeUpdated.value = true
    phraseName.value = phrase.name
    meanings.value = phrase.meanings
  }
})

async function onConfirm() {
  if (toBeUpdated.value) {
    $fetch('/api/phrase/update', { 
      method: 'POST', 
      body: { 
        id: editedPhraseId.value,
        name: phraseName.value.trim(),
        meanings: meanings.value
       } 
    })
  } else {
    $fetch('/api/phrase/create', { 
      method: 'POST', 
      body: { 
        name: phraseName.value.trim(),
        meanings: phraseDetails.value?.meanings
       } 
    })
  }
  navigateTo('/admin')
}
</script>

<template>
  <main>
    <Head>
      <Title>{{ toBeUpdated ? " Update Phrase ": "Create New Phrase" }}</Title>
    </Head>
    <form 
      name="new phrase" 
      class="flex flex-col"
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
      <PhraseMeanings />
    </form>
  </main>
</template>