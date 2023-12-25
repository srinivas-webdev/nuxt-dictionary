export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const res = createPhrase(body.name, body.type, body.origin, body.meanings)
  return res
})