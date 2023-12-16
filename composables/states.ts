import { type PhraseDetails } from '../types/'

export const usePhraseDetails = () => useState<PhraseDetails|null>('phraseDetails', () => ({
  name: '',
  meanings: []
}))

export const useEditedPhraseId = () => useState<number|undefined>('editedPhraseId',() => 0)