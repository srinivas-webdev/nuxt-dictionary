<script setup lang="ts">
const props = defineProps({
  phraseType: {
    type: String,
    default: "Idioms" 
  },
  bgColor: {
    type: String,
    default: "bg-yellow-400"
  },
  hoverColor: {
    type: String,
    default: "#16a34a"
  },
  textColor: {
    type: String,
    default: "bg-blue-950"
  }
})
const alphabets: string[] = [...Array(26)].map((_, y) => String.fromCharCode(y + 97))

const onClickAlphabet = (alphabet: string) => {
  let phraseType = 'phrasal-verbs'
  if (props.phraseType == 'Idioms') phraseType = 'idioms'
  if (props.phraseType == 'phrases') phraseType = 'phrases'
  navigateTo(`/browse/${phraseType}/${alphabet}`)
}
</script>

<template>
  <section 
    class="p-2 pl-8 flex flex-col items-center gap-2  text-white rounded-md custom-shadow"
    :class="[$route.params?.alphabet?.length === 1 ? 'bg-gray-200 text-black' : 'shadow-2xl']"
  >
    <h1 
      v-if="!$route.params?.alphabet"
      class="text-2xl text-blue-950 font-semibold"
    >
      Browse {{ props.phraseType }} 
    </h1>
    <menu class="flex flex-wrap justify-center gap-2 py-4">
      <button 
        v-for="ch in alphabets"
        :key="ch"
        class="grid place-items-center text-xl font-bold rounded-md 
        w-12 p-2 shadow-md alphabet
        hover:text-white"
        :class="['text-'+$props.textColor, $props.bgColor]"
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
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }

  .alphabet:hover {
    background-color: v-bind('$props.hoverColor');
  }
</style>