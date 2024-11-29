import { getRandomPhrase } from "~/server/utils/phrase"

export default defineEventHandler(async () => {
  const res = getRandomPhrase()
  return res
})