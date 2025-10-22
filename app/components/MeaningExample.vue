<script setup lang="ts">
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(['updateExample', 'deleteExample'])

function onExampleTextChange(ev: Event) {
  emit('updateExample', props.index, (ev.target as HTMLInputElement).value)
}

const deleteButtonStyle = `my-1 px-1 bg-red-600 
  text-white rounded-md font-md border-2 border-red-600 
  hover:outline hover:outline-offset-1 hover:outline-sky-600`

function onClickDelete() {
  emit('deleteExample', props.index)
}
</script>

<template>
  <menu class="flex items-center gao-5 ">
    <section class="relative mx-2 my-1 w-3/4">
      <textarea 
        :id="'example-'+index" 
        type="text" 
        :value="props.text"
        class="relative block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full 
        text-md text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white
        border-0 border-b-2 border-gray-300 appearance-none 
        focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        @change="onExampleTextChange" 
      />
      <label 
        :for="'example-'+index"
        class="absolute text-sm text-gray-500 duration-300 
        transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 
        peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
        peer-focus:-translate-y-4"
      >Example</label>
    </section>
    <ButtonContainer 
      name="Delete" 
      :custom-style="deleteButtonStyle"
      @click-event="onClickDelete" 
    />
  </menu>
</template>