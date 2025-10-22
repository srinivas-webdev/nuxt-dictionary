<script setup lang="ts">
const { query } = useRoute();

const credentials = ref({
  userName: '',
  password: '',
});

async function login () {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: credentials.value,
    })
    
    await navigateTo(`${query.redirectTo || '/'}`);
  } catch {
    alert('Bad credentials')
  }
}
</script>

<template>
  <form @submit.prevent="login">
    <div class="w-full font-semibold">
      <label for="userId" class="block text-left w-full">
        User ID
      </label>
      <input
        id="userId"
        v-model="credentials.userName"
        placeholder="John Doe"
        required
        class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
    </div>
    <div class="w-full font-semibold">
      <label for="password" class="block text-left w-full">
        Password
      </label>
      <input
        id="password"
        v-model="credentials.password"
        type="password"
        autocomplete="current-password"
        placeholder="••••••••"
        minLength={6}
        required
        class="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
    </div>
    <button
      type="submit"
      class="w-full px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg hover:from-sky-700 hover:to-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg shadow-sky-500/25"
    >
      Submit
    </button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
  width: 20rem;
  place-self: center;
}
</style>