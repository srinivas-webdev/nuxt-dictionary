import { updatePhrase } from "~~/server/utils/phrase"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const res = updatePhrase(body.id, body.name, body.type, body.origin, body.extraDetails, body.meanings)
  return res
})