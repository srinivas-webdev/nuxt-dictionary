<script setup lang="ts">
import { ref, onMounted, watch } from "vue"

const phraseDetails = usePhraseDetails()
const props = defineProps({
  activeMeaningIndex: {
    type: Number,
    default: 0
  }
})

const associatedMeaning = ref<Meaning>();
onMounted(() => {
  associatedMeaning.value = phraseDetails.value?.meanings[props.activeMeaningIndex]
})

const uploadInProgress = ref(false)
const uploadInput = ref<HTMLInputElement | null>(null)

const loadingDialog = ref()
watch(uploadInProgress, (isUploading) => {
  if (isUploading) {
    loadingDialog.value?.showModal()
  } else {
    loadingDialog.value?.close()
  }
})

async function  onUploadMedia() {
  if (uploadInput.value?.files?.length) {
    uploadInProgress.value = true
    const file = uploadInput.value.files[0]
    let mediaType = "image"
    if (file.type.includes("video")) {
      mediaType = "video"
    }
    const res = await uploadFile(file, mediaType)
    if (res.url.startsWith("http://")) {
      res.url = "https"+res.url.slice(4)
    }
    associatedMeaning.value?.media?.push({
      url: res.url,
      publicId: res.public_id,
      type: mediaType
    })
    uploadInProgress.value = false
  }
}

async function  deleteMedia(index: number, media: Media) {
  $fetch('/api/media/delete', { 
      method: 'POST', 
      body: { media: media } 
  })
  associatedMeaning.value?.media?.splice(index, 1)
}

</script>

<template>
  <menu class="px-4 flex gap-4 items-center bg-pink-100">
    <p class="text-md font-bold rounded-md">
      Media
    </p>
    <label 
      for="uploadMedia" 
      class="text-white bg-sky-900 p-1 rounded-md my-1 cursor-pointer
      hover:outline hover:outline-offset-1 hover:outline-yellow-600"
    >
      Upload Image/Video
      <input 
        id="uploadMedia" 
        ref="uploadInput" 
        type="file" 
        name="uploadMedia" 
        hidden
        @change="onUploadMedia"
      >
    </label>
  </menu>
  <menu 
    class="flex flex-wrap m-2 gap-3 items-center bg-black rounded-md"
  >
    <li 
      v-for="(media, index) in associatedMeaning?.media" 
      :key="media.url" 
      class="relative bg-gray-800 rounded-md m-3"
    >
      <img 
        v-if="media?.type == 'image'"
        :src="media.url" 
        alt="image" 
        class="object-contain h-48 w-48" 
      >
      <video 
        v-if="media?.type == 'video'"
        :key="media.url" 
        controls 
        class="z-30 h-48 w-48 cursor-pointer"
      >
        <source 
          :src="media.url" 
          type="video/mp4"
        >
      </video>
    
      <button 
        type="button" 
        title="Upload Image" 
        class="absolute -right-2 -top-2 rounded-full p-1 
          bg-red-500 hover:bg-red-700
          hover:outline hover:outline-offset-1 hover:outline-white"
        @click="deleteMedia(index, media)"
      >
        <title>Upload Image</title>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
        >
          <line 
            x1="18" 
            y1="6" 
            x2="6" 
            y2="18" 
            stroke="black" 
            stroke-width="3px"
          />
          <line 
            x1="6" 
            y1="6" 
            x2="18" 
            y2="18" 
            stroke="black" 
            stroke-width="3px"
          />
        </svg>
      </button>
    </li>
  </menu>
  <dialog 
    id="loading-dialog"
    ref="loadingDialog" 
    class="rounded-lg grid items-center max-w-2xl p-8"
  >
    <menu class="flex flex-col gap-4">
      <h1>Please wait. Upload InProgress</h1>
      <section class="progress-bar">
        <div class="progress-bar-value" />
      </section>
    </menu>
  </dialog>
</template>

<style scoped>
  dialog {
    transition: opacity 0.5s ease-in-out;
  }
  dialog:not([open]) {
    pointer-events: none;
    opacity: 0;
  }
  dialog::backdrop {
    backdrop-filter: blur(1rem);
  }

  .progress-bar {
    height: 4px;
    background-color: rgba(5, 114, 206, 0.2);
    width: 100%;
    overflow: hidden;
  }

  .progress-bar-value {
    width: 100%;
    height: 100%;
    background-color: rgb(5, 114, 206);
    animation: indeterminateAnimation 1s infinite linear;
    transform-origin: 0% 50%;
  }

  @keyframes indeterminateAnimation {
    0% {
      transform:  translateX(0) scaleX(0);
    }
    40% {
      transform:  translateX(0) scaleX(0.4);
    }
    100% {
      transform:  translateX(100%) scaleX(0.5);
    }
  }
</style>