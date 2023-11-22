import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()

// Create a single supabase client for interacting with your database
const supabase = createClient(config.supaBaseUrl, config.supaBaseKey)

async function getUser(name: String, pwd: String) {
  const { data } = await supabase
  .from('user')
  .select("id, name, secret")
  .eq('name', name)
  .eq('secret', pwd)
  .limit(1)
  .single()

  return data
}

export {
  getUser
}