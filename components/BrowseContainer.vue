<script setup lang="ts">
const alphabets: string[] = [...Array(26)].map((_, y) => String.fromCharCode(y + 97))
const route = useRoute()

const getCustomStyles = (ch: string) => {
  let customStyle = "";
  if (route.params?.alphabet?.length) {
    customStyle = " text-black "
    if (route.params.alphabet == ch) {
      customStyle += " bg-sky-400 "
    } else {
      customStyle += " bg-white "
    }
  }

  return customStyle     
}

const onClickAlphabet = (alphabet: string) => {
  navigateTo('/browse/' + alphabet)
}
</script>

<template>
  <section 
    class="p-2 pl-8 flex flex-col gap-2  text-white rounded-md custom-shadow"
    :class="[$route.params?.alphabet?.length === 1 ? 'bg-gray-200 text-black' : 'bg-gradient-to-br from-indigo-900 to-rose-900']"
  >
    <h1 
      v-if="!$route.params?.alphabet"
      class="text-xl font-lg"
    >
      Browse English Phrases 
    </h1>
    <menu class="my-container py-4">
      <button 
        v-for="ch in alphabets"
        :key="ch"
        class="grid place-items-center text-xl font-bold rounded-full 
        bg-gray-500 w-12 p-2  shadow-md
        hover:outline hover:outline-2 
        hover:outline-offset-2 hover:outline-sky-400"
        :class="getCustomStyles(ch)"
        @click="onClickAlphabet(ch)"
      >
        {{ ch }}
      </button>
    </menu>
  </section>
</template>

<style scoped>
  .my-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
    row-gap: 0.5rem;
  }
  .custom-shadow {
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.6);
  }
</style>