<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref, watch } from "vue"

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
const leftArrow = ref()
const rightArrow = ref()
const showLeftArrow = ref(false)
const showRightArrow = ref(true)

let index = 0
const slideAmount = 264

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
  leftArrow.value.disabled = true

  if (props.mediaList.length === 1) {
    rightArrow.value.disabled = true
  }
  
  if (containerWidth && mediaWidth && containerWidth > mediaWidth) {
    rightArrow.value.disabled = true
  }
})

watch(showLeftArrow, (leftArrowStatus) => {
  if (!leftArrowStatus) {
    leftArrow.value.disabled = true
  } else {
    leftArrow.value.disabled = false
  }
})

watch(showRightArrow, (rightArrowStatus) => {
  if (!rightArrowStatus) {
    rightArrow.value.disabled = true
  } else {
    rightArrow.value.disabled = false
  }
})

const onClickRight = () => {
  if (index < props.mediaList.length - 1) {
    index += 1
    gsap.to("#"+ props.id + " .slide", {
      x: Number(`-${index * slideAmount}`),
      duration: 0.5,
      onComplete: () => {
        showLeftArrow.value = true
        if (index === props.mediaList.length - 1) 
          showRightArrow.value = false
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
        showRightArrow.value = true
        if (index === 0) 
          showLeftArrow.value = false
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
        ref="leftArrow"
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
        ref="rightArrow"
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