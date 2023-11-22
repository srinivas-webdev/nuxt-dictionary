<script setup lang="ts">
import { ref, watch } from 'vue'

type SearchResult = {
  name: string;
}
const route = useRoute()
const searchText: string = typeof route.query["search"] === 'string' ? route.query["search"] : ""
const searchBtnHovered = ref(false)
const searchBtnFocused = ref(false)
const fillColor = ref('black')
const matchedPhrases = ref<string[] | null>(null)
const matchedPhrasesMenu = ref<HTMLElement | null>(null)
const showResultsMenu = ref(false)
const searchInputText = ref<string | null>(searchText)
const searchInputRef = ref<HTMLElement | null>(null)
const originalSearchText = ref<string | null>(null)
const activePhraseIndex = ref<number>(-1)

watch(searchBtnHovered, (newSearchBtnHovered) => {
  fillColor.value = newSearchBtnHovered ? 'white' : 'black'
})

watch(searchBtnFocused, (newSearchBtnFocused) => {
  fillColor.value = newSearchBtnFocused ? 'white' : 'black'
})

const debounce = (fn: Function, ms = 500) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

watch(searchInputText, debounce((newSearchText: string) =>{
  searchPhrase(newSearchText)
}))

async function searchPhrase(searchText: string) {
  if (!searchText.length) {
    matchedPhrases.value = null
    showResultsMenu.value = false
    activePhraseIndex.value = -1
    originalSearchText.value = ""
  } else {
    // check the results are shown and no change in the search string
    // due to up and down keys
    if (showResultsMenu.value && 
      (searchText == originalSearchText.value || activePhraseIndex.value !== -1)) {
      return
    }
    // save the search Input Text
    originalSearchText.value = searchText

    // get the search results
    const matchedResults: SearchResult[] = await $fetch('/api/phrase/search', { 
      method: 'GET', 
      query: { phrase: searchText } 
    })
    if (matchedResults?.length) {
      matchedPhrases.value = matchedResults?.map((result)  => result.name)
    } else {
      showResultsMenu.value = false
      matchedPhrases.value = null
    }
  }
}

function onClickSearchInput() {
  if (matchedPhrases.value?.length && !showResultsMenu.value) {
    showResultsMenu.value = true
  } else {
    showResultsMenu.value = false
  }
}

function onKeyEnterSearchInput() {
  const element: HTMLElement | null = document?.querySelector('#search-query-button')
  element?.click()
}

function onClick(e: MouseEvent) {
  const matchedPhrasesMenuDimentions: DOMRect | undefined = matchedPhrasesMenu?.value?.getBoundingClientRect()
  let isClickOutsidePhrasesMenu = false;
  
  // if the click is outside the displayed phrases list container
  if (
    e.clientX < matchedPhrasesMenuDimentions!.left ||
    e.clientX > matchedPhrasesMenuDimentions!.right ||
    e.clientY < matchedPhrasesMenuDimentions!.top ||
    e.clientY > matchedPhrasesMenuDimentions!.bottom
  ) {
    isClickOutsidePhrasesMenu = true
  }

  // if the click is inside search input box
  const searchInputTextDimentions: DOMRect | undefined = searchInputRef?.value?.getBoundingClientRect()
  let isClickInsideSeachInput = true
  if (
    e.clientX < searchInputTextDimentions!.left ||
    e.clientX > searchInputTextDimentions!.right ||
    e.clientY < searchInputTextDimentions!.top ||
    e.clientY > searchInputTextDimentions!.bottom
  ) {
    isClickInsideSeachInput = false
  }

  if (isClickOutsidePhrasesMenu) {
    if (isClickInsideSeachInput) {
      showResultsMenu.value = true
    } else {
      showResultsMenu.value = false
    }
  }
}

watch(matchedPhrases, (newMatchedPhrases) => {
  if (newMatchedPhrases?.length) {
    showResultsMenu.value = true
  } else {
    showResultsMenu.value = false
  }
})

watch(showResultsMenu, (newShowResultsMenu) => {
  if (newShowResultsMenu) {
    window.addEventListener("click", onClick)
  } else {
    window.removeEventListener("click", onClick)
  }
})

function handleMouseEventOnActivePhrase(index: number, eventType: string) {
  if (eventType == "mouseenter") {
    activePhraseIndex.value = index
  }
}

function handleKeyEventOnActivePhrase(eventType: string, event: Event) {
  event.stopPropagation()
  if (!showResultsMenu.value) {
    return
  }

  if (eventType === "keydown") {
    const matchedPhrasesSize = matchedPhrases.value?.length
    if (matchedPhrasesSize &&
      (activePhraseIndex.value === matchedPhrasesSize)) {
      activePhraseIndex.value = -1
    } else {
      activePhraseIndex.value++
    }
  } else if (eventType == "keyup") {
    if (activePhraseIndex.value == -1 && matchedPhrases?.value) {
      activePhraseIndex.value = matchedPhrases.value.length - 1
    } else {
      activePhraseIndex.value--
    }
  }
  
  if (activePhraseIndex.value == -1) {
    searchInputText.value = originalSearchText.value
  } else {
    if (matchedPhrases.value) {
      searchInputText.value = matchedPhrases.value[activePhraseIndex.value]
    }
  }
}

function onClickClearButton() {
  searchInputText.value = ""
}

function onChangeSearchText(ev: Event) {
  searchInputText.value = (ev.target as HTMLInputElement).value
}

function onCompositionUpdate(ev: CompositionEvent) {
  searchInputText.value = ev.data
}
</script>

<template>
  <header class="flex flex-col gap-1 p-1 py-2 sm:flex-row">
    <section class="flex items-center gap-2 mr-4">
      <picture 
        class="cursor-pointer" 
        title="Click to home"
        @click="navigateTo('/')" 
      >
        <img 
          src="~/assets/app-icon.png" 
          alt="logo" 
          width="30" 
          height="30"
        >
      </picture>
      <p class="font-semibold text-white text-lg">
        Dictionary of Idioms/Phrasal Verbs
      </p>
    </section>
    <section 
      id="search-wrapper" 
      class="flex flex-col sm:w-2/5 shadow-md shadow-gray-800 hover:shadow-xl hover:shadow-gray-700"
      :class="{'rounded-br-md rounded-bl-md': !showResultsMenu}"
    >
      <section class="flex h-10 sm:h-12">
        <input
          ref="searchInputRef" 
          :value="searchInputText"
          placeholder="Search here"
          class="w-full rounded-tl-md outline-none pl-2"
          :class="{ 'rounded-bl-md': !showResultsMenu}" 
          @compostionUpdate="onCompositionUpdate"
          @input="onChangeSearchText" 
          @click="onClickSearchInput"
          @keyup.enter="onKeyEnterSearchInput"
          @keyup.down="handleKeyEventOnActivePhrase('keydown', $event)"
          @keyup.up="handleKeyEventOnActivePhrase('keyup', $event)"
          @keyup.page-down="handleKeyEventOnActivePhrase('keydown', $event)"
          @keyup.page-up="handleKeyEventOnActivePhrase('keyup', $event)"
        >
        <section 
          v-show="searchInputText?.length" 
          class="grid items-center bg-white"
          @click="onClickClearButton"
        >
          <button 
            id="clear-query-button" 
            class="grid items-center bg-gray-300 
            hover:bg-sky-300 p-1 mr-[1px] rounded-md" 
            aria-label="Clear"
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              class=""
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M2.06834 13.4173C1.68757 13.7981 1.07024 13.7981 0.689477 13.4173C0.308716 13.0365 0.308716 12.4192 0.689477 12.0384L5.67424 7.05368L0.688891 2.06833C0.30813 1.68757 0.30813 1.07023 0.688891 0.68947C1.06965 0.308709 1.68699 0.308709 2.06775 0.68947L7.0531 5.67482L12.0385 0.68938C12.4193 0.308618 13.0366 0.308618 13.4174 0.689379C13.7982 1.07014 13.7982 1.68748 13.4174 2.06824L8.43196 7.05368L13.4168 12.0385C13.7976 12.4193 13.7976 13.0366 13.4168 13.4174C13.0361 13.7982 12.4187 13.7982 12.038 13.4174L7.0531 8.43254L2.06834 13.4173Z" 
                fill="black"
              />
            </svg>
          </button>
        </section>
        <section class="h-full bg-white">
          <div 
            class="relative mt-1 w-3/4 h-3/4 border-solid border-r-2 border-gray-300 pr-1"
          />
        </section>
        <section 
          id="search-query-button-wrapper" 
          tabindex="0"
          class="z-20 grid items-center bg-white px-4 rounded-tr-md"
          :class="{'rounded-br-md': !showResultsMenu, 'bg-gradient-to-r from-yellow-500 to-pink-700': searchBtnFocused || searchBtnHovered}"
          @focusin="searchBtnFocused = true" 
          @focusout="searchBtnFocused = false"
          @mouseenter="searchBtnHovered = true" 
          @mouseleave="searchBtnHovered = false"
        >
          <button 
            id="search-query-button" 
            role="button"
            aria-label="Search" 
            tabindex="-1" 
            class="cursor-pointer"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="17" 
              class="icon" 
              viewBox="0 0 18 17"
            >
              <path 
                :fill="fillColor" 
                fill-rule="evenodd" 
                d="M1.6 7.336a5.736 5.736 0 1 1 11.471 0 5.736 5.736 0 0 1-11.471 0ZM7.336 0a7.336 7.336 0 1 0 4.957 12.743l3.56 3.561a.8.8 0 0 0 1.132-1.131l-3.636-3.636A7.336 7.336 0 0 0 7.335 0Z" 
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </section>
      </section>
      <section 
        v-if="showResultsMenu"
        ref="matchedPhrasesMenu"
        class="relative w-full z-10"
      >
        <section class="absolute flex flex-col bg-white  border-2 border-t-0 w-full rounded-b-md pb-1 shadow-2xl shadow-zinc-900/50">
          <section 
            class="flex flex-col w-full before:border-t-[1px] before:border-gray-300 before:pb-2 before:mx-2"
          >
            <a 
              v-for="(word, index) in matchedPhrases" 
              :key="index"
              class="pl-2 cursor-pointer"  
              :href="'/dictionary?search='+word"
              :class="{'bg-blue-100 cursor:pointer': index == activePhraseIndex}"
              @click="searchInputText = word"
              @mouseenter="handleMouseEventOnActivePhrase(index, 'mouseenter')"
              @mouseleave="activePhraseIndex = -1"
            >
              {{ word }}
            </a>
          </section>
        </section>
      </section>
    </section>
  </header>
</template>

<style scoped>
  header {
    padding-left: .25rem;
    box-shadow: rgb(47, 53, 60) 0px 15px 10px -10px;
    background:linear-gradient(to right,rgb(0 0 0 / 80%), rgb(176, 176, 176), rgb(0 0 0 / 80%));
  }
</style>