<script setup>
import categories from '~/data/contractions.json'

useHead({
  title: 'Word Contractions',
  htmlAttrs: {
    lang: 'en'
  }
})

let openedPanel = null

const onClickAccordion = (e) => {
  const activePanelButton = e.target.closest("button");
  if (!activePanelButton) return;
  if (openedPanel && openedPanel !== activePanelButton) {
    toggleAccordion(openedPanel);
  }
  toggleAccordion(activePanelButton);
}


function toggleAccordion(activePanelButton) {
  const icon = activePanelButton.querySelector("img")
  const activePanelContent = activePanelButton.nextElementSibling
  
  if (icon.getAttribute("aria-hidden") === "true") {
    activePanelContent.setAttribute("aria-hidden", false)
    icon.setAttribute("aria-hidden", false)
    openedPanel = activePanelButton
  } else {
    activePanelContent.setAttribute("aria-hidden", true)
    icon.setAttribute("aria-hidden", true)
    openedPanel = null
  }
}


</script>

<template>
  <main class="accordion my-4 mx-2">
    <menu @click="onClickAccordion">
      <section 
        v-for="category in categories" 
        :key="category.name"
        class="accordion-panel flex flex-col gap-1"
      >
        <button 
          class="accordion-trigger" 
          aria-expanded="true"
        >
          <p class="header-title font-medium text-xl">
            {{ category.name }}
          </p>
          <img 
            src="~/assets/accordion-icon.svg" 
            alt="toggleIcon" 
            class="icon" 
            aria-hidden="true"
          >
        </button>
        <table class="accordion-content table-fixed px-2 pb-1 text-xl font-medium border-separate">
          <tbody>
            <tr
              v-for="item in category.items"
              :key="item[0]"
              class="mx-4"
            >
              <td 
                class="bg-purple-300 rounded-md shadow-md px-2"
              >
                {{ item[0] }}
              </td>
              <td 
                class="bg-sky-200 rounded-md shadow-md px-2"
              >
                {{ item[1] }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </menu>
  </main>
</template>

<style scoped>
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 500ms ease-in-out;
}

.accordion-content[aria-hidden=false] {
  grid-template-rows: 1fr;
}

.accordion-content > tbody {
  overflow: hidden;
}

.accordion-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: yellowgreen;
  border-radius: .5rem;
  border-style: solid;
}

.accordion-trigger:hover {
  background-color: paleturquoise;
  cursor: pointer;
}

.accordion-trigger > td {
  font-weight: 700;
  font-size: large;
}

.accordion-trigger > img {
  transition: transform 500ms ease-in-out;  
}

.accordion-trigger > img[aria-hidden=false] {
  transform: rotate(-180deg);
}

.header-title {
  color: black;
  padding-left: 1rem;
  padding-block: .25rem;
}

menu {
  padding: 0px;
  margin: .25rem;
}
</style>