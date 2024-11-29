import { searchPhrase } from "~/server/utils/phrase"

export default defineEventHandler(async (event) => {
  const query: any = getQuery(event)
  const res = searchPhrase(query.phrase)
  return res
})