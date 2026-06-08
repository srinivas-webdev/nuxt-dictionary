<script setup lang="ts">
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: ""
  },
  details: {
    type: Array,
    default: null
  }
})
const emit = defineEmits([
  'updateExtraDetailsTitle',
  'addExtraDetailsText',
  'updateExtraDetailsText',
  'deleteExtraDetailsText'
])


const deleteButtonStyle = `my-1 px-1 bg-red-600 
  text-white rounded-md font-md border-2 border-red-600 
  hover:outline hover:outline-offset-1 hover:outline-sky-600`

function onClickDelete(titleIndex: number, detailIndex: number) {
  emit('deleteExtraDetailsText', titleIndex, detailIndex)
}


function onDetailTextChange(titleIndex: number, detailIndex: number, ev: Event) {
  emit('updateExtraDetailsText', titleIndex, detailIndex, (ev.target as HTMLInputElement).value)
}

function onTitleTextChange(ev: Event) {
  emit('updateExtraDetailsTitle', (ev.target as HTMLInputElement).value)
}

const addButtonStyle = `my-1 px-1 bg-sky-600 
  text-white rounded-md font-md border-2 border-sky-600 
  hover:outline hover:outline-offset-1 hover:outline-sky-600`

function onClickAdd(titleIndex: number) {
  emit('addExtraDetailsText', titleIndex)
}
</script>

<template>
  <div class="flex flex-col gap-2 bg-yellow-400 rounded-md m-2 p-2 shadow-xl">
    <menu class="flex items-center gao-5 justify-between ">
      <section class="relative mx-2 my-1 w-3/4">
        <input 
          :id="'details-title-'+index"
          type="text"
          :value="props.title"
          class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-1/2 text-sm 
            text-gray-900 bg-gray-50 dark:bg-gray-700 
            border-0 border-b-2 border-gray-300 appearance-none 
            dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
          placeholder=" " 
          @change="onTitleTextChange" 
        >
        <label 
          :for="'details-title-'+index"
          class="absolute text-sm text-gray-500 dark:text-gray-400 
          duration-300 transform -translate-y-4 scale-75 top-4 z-10 
          origin-[0] left-2.5 peer-focus:text-blue-600 
          peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
          peer-focus:-translate-y-4"
        >Title</label>
      </section>
      <ButtonContainer 
        name="Add Extra Info" 
        :custom-style="addButtonStyle"
        class="font-bold shadow-2xl"
        @click-event="onClickAdd(props.index)" 
      />
    </menu>
    <ul 
      v-for="(detail, detailIndex) in props.details"
      :key="detailIndex"
      class="list-disc list-outside w-3/4"
    >
      <li class="flex items-center gap-5">
        <input 
          class="ml-4 p-2 w-full"
          :value="detail"
          @change="onDetailTextChange(index, detailIndex, $event)" 
        >
        <ButtonContainer 
          name="Delete" 
          :custom-style="deleteButtonStyle"
          class="font-bold shadow-2xl"
          @click-event="onClickDelete(index, detailIndex)" 
        />
      </li>
      
    </ul>
  </div>
  
</template>