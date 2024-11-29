export default defineEventHandler(async (event) => {
  const {phrase: phrase} : {phrase: string} = getQuery(event)
  const res = searchPhrase(phrase)
  return res
})