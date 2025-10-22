import { sessionCookieName } from "@@/shared/constants";
import { createClient } from '@supabase/supabase-js'

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { userName, password } = await readBody(event);
  const userDetailsFromDB = await getUser(userName as string , password);
  if (userName === userDetailsFromDB?.name) {
    setCookie(event, sessionCookieName, userName, {
      httpOnly: false,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    return {}
  }
  throw createError({
    statusCode: 401,
    message: 'Bad credentials',
  })
})

async function getUser(username: string, password: string) {
  const supabaseClient = createClient(runtimeConfig.supaBaseUrl, runtimeConfig.supaBaseKey)
  const { data } = await supabaseClient
  .from('user')
  .select("id, name, email")
  .eq('name', username)
  .eq('secret', password)
  .limit(1)
  .single()
  
  return data
}