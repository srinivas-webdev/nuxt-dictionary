import { searchPhrase } from "~~/server/utils/phrase"

export default defineEventHandler(async (event) => {
  const query: {phrase: string} = getQuery(event)
  const res = searchPhrase(query.phrase)
  return res
})