export default defineEventHandler(async () => {
  const res = getRandomPhrase()
  return res
})