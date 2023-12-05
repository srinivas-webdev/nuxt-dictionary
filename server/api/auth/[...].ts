import Credentials from "@auth/core/providers/credentials";
import GitHub from '@auth/core/providers/github';
import type { AuthConfig } from "@auth/core/types"
import { NuxtAuthHandler } from "#auth"
import type { User } from '@auth/core/types';

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig()

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
        //const userDetails = await getUser(credentials.username as string , credentials.password as string, env.get("SUPABASE_URL") as string, env.get("SUPABASE_KEY") as string)
        const userDetails = {
          id: "1",
          name: "Dhruthi"
        }
        const user: User = {
          id: userDetails?.id,
          name: userDetails?.name,
        };

        return user;
      },
    }),
  ]
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }