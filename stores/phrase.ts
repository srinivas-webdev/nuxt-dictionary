import { defineStore } from 'pinia'

export const usePhraseStore = defineStore('phrase', () => {
  const phraseDetails = ref<PhraseDetails>({
    name: '',
    meanings: []
  })
  const editedPhraseId = ref<number|undefined>(0)
  
  return {
    phraseDetails,
    editedPhraseId
  }
})