export default defineEventHandler(async (event) => {
  const query: any = getQuery(event)
  const res = await searchPhrasesFromTo(query.alphabet, query.from, query.to)
  const phrases = res?.map(phrase => phrase.name)
  
  return phrases
})