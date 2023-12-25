import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()

// Create a single supabase client for interacting with the database
const supabase = createClient(config.supaBaseUrl, config.supaBaseKey)

async function createPhrase(name: String, type: string, origin: string, meanings: Object) {
  const { data } = await supabase
    .from('phrase')
    .insert([
      { name: name, type: type, origin: origin, meanings: meanings },
    ])
    .select()

    return data
  }

async function searchPhrase(name: String) {
  const { data: phrase } = await supabase
  .from('phrase')
  .select("name")
  .ilike('name', name+'%')
  .limit(10)
  .order('name', { ascending: true })
  
  return phrase
}

async function searchExactPhrase(name: String) {
  const { data: phrase } = await supabase
    .from('phrase')
    .select("id, name, type, origin, meanings")
    .eq('name', name)
    .single()

  return phrase
}

async function updatePhrase(id: String, name:String, type: string, origin: string, meanings:Object) {
  const { error } = await supabase
    .from('phrase')
    .update({ name: name, type: type, origin: origin, meanings: meanings })
    .eq('id', id)

  return error
}

async function searchAllPhrases(phraseType: string, name: String) {
  let type = 0
  if (phraseType == 'idioms') type = 1

  const { data: phrase } = await supabase
  .from('phrase')
  .select("name")
  .eq('type', type)
  .ilike('name', name+'%')
  .order('name', { ascending: true })

  return phrase
}

async function searchPhrasesFromTo(phraseType:string,  alphabet: String, from: String, to: String) {
  let type = 0
  if (phraseType == 'idioms') type = 1

  const { data: phrase } = await supabase
  .from('phrase')
  .select("name")
  .eq('type', type)
  .ilike('name', alphabet+'%')
  .order('name', { ascending: true })
  .gte('name', from)
  .lte('name', to)

  return phrase
}

async function getRandomPhrase() {
  const { data: idList } = await supabase
  .from('phrase')
  .select("id")
  
  let randomRowId = 1
  if (idList?.length) {
    randomRowId = Math.floor(Math.random()* idList?.length)
    randomRowId = idList[randomRowId].id
  }
  
  const { data: phrase } = await supabase
    .from('phrase')
    .select("name, meanings")
    .eq('id', randomRowId)
    .single()

  return phrase
}

export { 
  createPhrase, 
  searchPhrase, 
  searchExactPhrase, 
  updatePhrase,
  searchAllPhrases,
  searchPhrasesFromTo,
  getRandomPhrase,
}