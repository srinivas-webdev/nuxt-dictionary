import { searchPhrasesFromTo } from "~~/server/utils/phrase"

export default defineEventHandler(async (event) => {
  const query: {phraseType: string, alphabet: string, from: string, to: string} = getQuery(event)
  const res = await searchPhrasesFromTo(query.phraseType, query.alphabet, query.from, query.to)
  const phrases = res?.map(phrase => phrase.name)
  
  return phrases
})