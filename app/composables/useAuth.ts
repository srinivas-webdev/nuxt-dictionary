import { sessionCookieName } from "@@/shared/constants";

const signIn = () => {
  const { path } = useRoute();
  navigateTo('/login?redirectTo='+path);
}

const signOut = () => {
  const { path } = useRoute();
  const user = useCookie<string | null>(sessionCookieName);
  user.value = null;
  navigateTo(path);
}

export default function () {
  return  {
    user : useCookie<string | null>(sessionCookieName),
    signIn : signIn,
    signOut: signOut,

  }
}