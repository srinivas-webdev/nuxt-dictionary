export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let res = null;
  if (typeof query.phrase === 'string')
    res = searchExactPhrase(query.phrase)
   
  return res
})