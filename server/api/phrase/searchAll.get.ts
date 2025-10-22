import { searchAllPhrases } from "~~/server/utils/phrase"

export default defineEventHandler(async (event) => {
  const query: {phraseType: string, word: string} = getQuery(event);
  const res: {name: unknown}[] | null = await searchAllPhrases(query.phraseType, query.word);
  
  // divide the phrases into groups of 10 
  // and get first and last phrases in each group
  const groupSize = 10;
  let groupedPhrases: [string, string][] = [];
  if (res) {
    const phrases: string[] = [];
    res.forEach(phrase => {
      if (typeof phrase.name === 'string') {
        phrases.push(phrase.name);
      }
    });
    if (phrases.length) {
      groupedPhrases = new Array(Math.floor(phrases.length / groupSize))
    
      for (let i = 0; i < groupedPhrases.length; i++) {
        const first = phrases[i*groupSize];
        const last = phrases[((i+1)*groupSize)-1];
        if (first && last)
          groupedPhrases[i] = [first, last];
      }
      if(phrases.length > (groupedPhrases.length)*groupSize) {
        const first = phrases[(groupedPhrases.length)*groupSize];
        const last = phrases[phrases.length-1];
        if (first && last)
          groupedPhrases.push([first, last])
      }
    }
  }

  return groupedPhrases;
})