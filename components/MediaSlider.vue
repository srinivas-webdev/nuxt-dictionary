<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref } from "vue"

const props = defineProps({
  mediaList: {
    type: Object,
    default: null
  },
  id: {
    type: String,
    default: null
  }
})

const container = ref<HTMLElement | null>(null)
const disableLeftArrow = ref(true)
const disableRightArrow = ref(false)

let index = 0
const slideAmount = 248

const startPosX = ref(0)

const onTouchStart = (ev: TouchEvent) => {
  const posX = ev.touches[0].clientX
  startPosX.value = posX
}
const onTouchEnd = (ev: TouchEvent) => {
  const deltaX = ev.changedTouches[0].clientX - startPosX.value
  if (deltaX > 0) {
    onClickLeft()
  } else if (deltaX < 0) {
    onClickRight()
  }
}


onMounted(() => {
  const containerWidth = container.value?.offsetWidth
  const mediaWidth = props.mediaList.length * slideAmount
  disableLeftArrow.value = true

  if (props.mediaList.length === 1) {
    disableRightArrow.value = true
  }
  
  if (containerWidth && mediaWidth && containerWidth > mediaWidth) {
    disableRightArrow.value = true
  }
})

const onClickRight = () => {
  if (index < props.mediaList.length - 1) {
    index += 1
    gsap.to("#"+ props.id + " .slide", {
      x: Number(`-${index * slideAmount}`),
      duration: 0.5,
      onComplete: () => {
        disableLeftArrow.value = false
        if (index === props.mediaList.length - 1) 
          disableRightArrow.value = true
      }
    })
  }
}

const onClickLeft = () => {
  if (index > 0) {
    index -= 1
    gsap.to("#"+ props.id + " .slide", {
      x: Number(`${-index * slideAmount}`),
      duration: 0.5,
      onComplete: () => {
        disableRightArrow.value = false
        if (index === 0) 
          disableLeftArrow.value = true
      }
    })
  }
}
</script>

<template>
  <div 
    ref="container" 
    class="flex gap-2 overflow-hidden p-1"
  >
    <section class="grid place-items-center">
      <button 
        :disabled="disableLeftArrow"
        class="bg-purple-500 w-8 h-8 grid place-items-center disabled:bg-gray-400
        p-2 rounded-full hover:scale-125 hover:bg-orange-600"
        @click="onClickLeft"
      >
        <img 
          src="~/assets/chevron-left.svg" 
          alt="left" 
          class="w-4 h-4"
        >
      </button>
    </section>
    <section
      :id="props.id"
      class="flex gap-[8px] overflow-hidden slider"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div 
        v-for="(media) in props.mediaList"
        :key="media.url"
        class="shrink-0 w-64 cursor-pointer slide" 
      >
        <video 
          v-if="media.type == 'video'"
          :src="media.url" 
          controls
          class=" rounded-md"
        />
      </div>
    </section>
    <section class="grid place-items-center">
      <button 
        :disabled="disableRightArrow"
        class="bg-purple-500 w-8 h-8 grid place-items-center disabled:bg-gray-400
        p-2 rounded-full hover:scale-125 hover:bg-orange-600"
        @click="onClickRight"
      >
        <img 
          src="~/assets/chevron-right.svg" 
          alt="left" 
          class="w-4 h-4"
        >
      </button>
    </section>
  </div>
</template>