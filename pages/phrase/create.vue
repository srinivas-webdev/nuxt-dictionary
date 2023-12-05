<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to) {
      if (process.client) return
      const { status, session } = useAuth()
      const runtimeConfig = useRuntimeConfig()

      if (!session.value || 
        session.value.user?.email !== runtimeConfig.adminEmail) {
          return navigateTo(`/api/auth/signin?callbackUrl=${to.path}`)
      }
    }
  ]
});
</script>

<template>
  <h1>New Phrase</h1>
</template>