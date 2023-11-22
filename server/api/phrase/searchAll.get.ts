export default defineEventHandler(async (event) => {
  const query: any = getQuery(event)
  const res = await searchAllPhrases(query.word)
  const phrases = res?.map(phrase => phrase.name)
  
  // divide the phrases into groups of 10 
  // and get first and last phrases in each group
  const groupSize = 10
  let groupedPhrases: any = []
  if (phrases) {
    groupedPhrases = new Array(Math.floor(phrases.length / groupSize))
    
    for (let i = 0; i < groupedPhrases.length; i++) {
      groupedPhrases[i] = [phrases[i*groupSize], phrases[((i+1)*groupSize)-1]]
    }
    if(phrases.length > (groupedPhrases.length)*groupSize) {
      groupedPhrases.push([phrases[(groupedPhrases.length)*groupSize], phrases.at(-1)])
    }
  }
  
  return groupedPhrases
})