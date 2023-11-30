<script setup>
   const supabase = useSupabaseClient()

   const user = useSupabaseUser()

   const signOut = () => {
      const {error} = supabase.auth.signOut()

      if (error) {
         console.log(error)
      }
   }
</script>

<template>
   <header
      class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
   >
      <NuxtLink class="text-3xl font-mono" to="/"
         >cartrader</NuxtLink
      >
      <div v-if="user" class="flex font-mono">
         <NuxtLink to="/profile/listings" class="mr-5"
            >Profile</NuxtLink
         >
         <p
            class="font-mono cursor-pointer"
            @click="signOut"
            to="/"
            v-if="user"
         >
            Logout
         </p>
      </div>

      <NuxtLink v-else class="font-mono mr-5" to="/login"
         >Login</NuxtLink
      >
   </header>
</template>
