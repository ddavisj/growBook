<script setup>
   const AuthStore = useAuthStore()
   AuthStore.checkLogin()
   AuthStore.loadUserName()
</script>

<template class="">
   <header
      class="dark:bg-black bg-white sticky top-0 z-50 flex justify-between items-center space-x-1 border-b p-4 shadow-md"
   >
      <NuxtLink class="text-xl md:text-3xl font-mono" to="/"
         >growBook</NuxtLink
      >

      <div
         v-if="AuthStore.loggedIn"
         class="flex items-center font-mono"
      >
         <NuxtLink to="/user/account">
            <GoogleAvatar showTitle class="h-9" />
         </NuxtLink>

         <NuxtLink
            to="/profile/plants"
            class="ml-4 text-sm md:text-base mr-4 md:ml-4 md:mr-5"
            >Profile</NuxtLink
         >

         <p
            class="font-mono cursor-pointer text-sm md:text-base"
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
