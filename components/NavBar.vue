<script setup>
   const AuthStore = useAuthStore()

   AuthStore.checkLogin()
</script>

<template>
   <header
      class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
   >
      <NuxtLink class="text-3xl font-mono" to="/"
         >cartrader</NuxtLink
      >

      <div
         v-if="AuthStore.loggedIn"
         class="flex items-center font-mono"
      >
         <NuxtLink to="/user/account">
            <GoogleAvatar class="h-10" />
         </NuxtLink>

         <NuxtLink to="/profile/listings" class="ml-4 mr-5"
            >Profile</NuxtLink
         >

         <p
            class="font-mono cursor-pointer"
            @click="AuthStore.logout"
         >
            Logout
         </p>
      </div>

      <NuxtLink v-else class="font-mono mr-5" to="/login"
         >Login</NuxtLink
      >
   </header>
</template>
