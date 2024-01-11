<script setup>
   const AuthStore = useAuthStore()

   AuthStore.checkLogin()

   watch(
      () => AuthStore.username,
      () => {
         AuthStore.loadUserName()
      }
   )
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
            to="/users"
            class="hidden sm:inline ml-4 md:ml-4 text-sm md:text-base"
            >Growers</NuxtLink
         >

         <NuxtLink
            to="/profile/plants"
            class="ml-4 md:ml-4 text-sm md:text-base"
            >Profile</NuxtLink
         >

         <p
            class="ml-5 md:ml-8 font-mono cursor-pointer text-sm md:text-base mr-2"
            @click="AuthStore.logout"
         >
            Logout
         </p>
         <ColorModeButton />
      </div>

      <div
         v-if="!AuthStore.loggedIn"
         class="flex items-center"
      >
         <NuxtLink
            to="/users"
            class="ml-4 mr-6 md:ml-4 font-mono"
            >Growers</NuxtLink
         >
         <NuxtLink class="font-mono mr-2" to="/login"
            >Login</NuxtLink
         >
         <ColorModeButton />
      </div>
   </header>
</template>
