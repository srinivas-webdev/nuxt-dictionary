<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: "Click"
  },
  customStyle: {
    type: String,
    default: ""
  }
})
defineEmits(['clickEvent'])
</script>

<template>
  <button 
    type="button"
    :class="customStyle"
    @click="$emit('clickEvent')"
  >
    {{ name }}
  </button>
</template>