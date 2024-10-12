<script setup>
useHead({
  title: 'Word Reductions',
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

const categories = [
  {
    name: "what",
    items: [
      [
        "What do you", "వాజ్యూ"
      ]
    ]
  },
  {
    name: "why",
    items: [
      [
        "Why do you", "వైజ్యూ"
      ]
    ]
  }
]
</script>

<template>
  <main class="accordion my-4 mx-2">
    <menu @click="onClickAccordion">
      <section 
        v-for="category in categories" 
        :key="category.name"
        class="accordion-panel"
      >
        <button 
          class="accordion-trigger" 
          aria-expanded="true"
        >
          <p class="header-title">
            {{ category.name }}
          </p>
          <img 
            src="~/assets/accordion-icon.svg" 
            alt="toggleIcon" 
            class="icon" 
            aria-hidden="true"
          >
        </button>
        <menu class="accordion-content">
          <ul>
            <li 
              v-for="item in category.items"
              :key="item[0]"
            >
              {{ item[0] }} - {{ item[1] }}
            </li>
          </ul>
        </menu>
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

.accordion-content > ul {
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

.accordion-trigger > p {
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