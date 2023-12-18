<script setup>
   definePageMeta({ layout: 'custom' })

   const supabase = useSupabaseClient()

   // const user = useSupabaseUser()

   const AuthStore = useAuthStore()

   // const login = async () => {

   // }
</script>

<template>
   <div class="mt-10">
      <h1 class="text-5xl font-bold mb-7">Log in</h1>
      <button
         class="bg-red-400 p-3 rounded text-white font-bold"
         @click="AuthStore.login"
      >
         Login with Google
      </button>
   </div>
</template>
