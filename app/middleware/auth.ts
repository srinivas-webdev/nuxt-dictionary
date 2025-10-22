import * as auth from '@@/shared/constants';

export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on client side entirely
  if (import.meta.client) {
    return
  }
  
  const user = useCookie<{ name: string } | null>(auth.sessionCookieName)
  if (!user.value) {
    return navigateTo('/login?redirectTo='+from.path);
  }
})
