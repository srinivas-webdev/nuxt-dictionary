<script setup lang="ts">
useHead({
  title: 'Admin Page',
  htmlAttrs: {
    lang: 'en'
  }
});
const  { user, signIn, signOut } = useAuth();
</script>

<template>
  <main>
    <Head>
      <Title>Admin Page</Title>
    </Head>
    <section class="w-full mx-auto bg-white px-5 py-4 rounded-t shadow-xl">
      <section class="flex items-center justify-between">
        <h1 
          v-if="user" 
          class="[clip-path:polygon(0%_15%,0%_100%,100%_85%,100%_0%)] bg-yellow-500 p-2 capitalize text-2xl italic"
        >
          Hello {{ user }}
        </h1>
        <section class="flex items-center space-x-2">
          <button 
            v-if="user" 
            class="flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-lg py-2 px-3 text-lg" 
            @click="navigateTo('/phrase/create')"
          >
            <span>Add New Phrase</span>
          </button>
          <h1 v-else>
            Not logged in
          </h1>
        </section>
        <button 
          v-if="user" 
          class="flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg py-2 px-3 text-lg" 
          @click="signOut()"
        >
          <span>Logout</span>
        </button>
        <button 
          v-else 
          class="flex items-center justify-center space-x-2 bg-green-700 text-white rounded-lg py-2 px-3 text-lg" 
          @click="signIn()"
        >
          <span>Login</span>
        </button>
      </section>
    </section>
  </main>
</template>