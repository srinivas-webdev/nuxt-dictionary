<script setup lang="ts">
  const {data: phrase}= await useFetch(`/api/phrase/phraseOfMoment`)
</script>

<template>
  <section class="grid grid-cols-1 custom-wrapper-style">
    <section 
      class="grid place-items-center bg-gradient-to-r from-orange-500 to-orange-600 shadow-2xl
      rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
    >
      <p class="text-2xl text-white font-semibold p-2">
        {{ phrase.name }}
      </p>
    </section>
    <section class="bg-gray-100 shadow-2xl rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none">
      <section 
        v-for="(meaning, index) in phrase.meanings"
        :key="index"
        class="py-2 px-4 flex flex-col gap-2 text-[#1d2a57]"
      >
        <p class="text-xl font-semibold italic">
          {{ index + 1 }}.  {{ meaning.name }}
        </p>
        <p 
          v-for="(example, exampleIndex) in meaning.examples"
          :key="example"
          class="pl-4 text-md font-medium"
        > 
          {{ exampleIndex+1 }}. {{ example }}
        </p>
        <MediaSlider 
          v-if="meaning.media?.length" 
          :id="'slider-'+index"
          :media-list="meaning.media" 
        />
      </section>  
    </section>
  </section>
</template>

<style scoped>
  .custom-wrapper-style {
    @media screen and (min-width: 640px){
      grid-template-columns: 1fr 2fr;
    }
  }
  
</style>