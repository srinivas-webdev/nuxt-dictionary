import Credentials from "@auth/core/providers/credentials";
import GitHub from '@auth/core/providers/github';
import type { AuthConfig } from "@auth/core/types"
import { NuxtAuthHandler } from "#auth"
import type { User } from '@auth/core/types';

const runtimeConfig = useRuntimeConfig()

import { createClient } from '@supabase/supabase-js'

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

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  providers: [
    GitHub({
      clientId: runtimeConfig.github.clientId,
      clientSecret: runtimeConfig.github.clientSecret
    }),
    Credentials({
      credentials: {
        username: { 
          label: 'Username', 
          type: 'text',
          placeholder: '(hint: john)', 
          required: true,
          minLength: 4
        },
        password: { 
          label: 'Password', 
          type: 'password', 
          placeholder: '(hint: doe)',
          required: true,
          minLength: 4
        }
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) {
          return null;
        }
        const userDetails = await getUser(credentials.username as string , credentials.password as string)
        if (!userDetails) return null
        const user: User = {
          id: userDetails?.id,
          name: userDetails?.name,
          email: userDetails?.email
        };
        
        return user;
      },
    }),
  ]
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
