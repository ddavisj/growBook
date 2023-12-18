<script setup>
   // import { NuxtLink } from '#build/components'

   // My user details: /user/account
   definePageMeta({
      layout: 'custom',
      middleware: ['page-auth'],
   })

   const user = useSupabaseUser()

   const AuthStore = useAuthStore()

   //    const state = ref(null)

   //    const getResponse = async () => {
   //       const {data} = await useFetch('/api/user/get-user', {
   //          params: {
   //             userId: user.value.id,
   //          },
   //       })

   //       state.value = data.value.user_name
   //    }
   // getResponse()
</script>

<template>
   <div>
      <h1 class="mt-24 text-6xl text-black-600 mb-4">
         My account
      </h1>

      <div class="flex items-center">
         <GoogleAvatar />

         <div class="text-xl ml-5 mb-3 mt-5">
            <p v-if="AuthStore.username">
               {{ AuthStore.username }}
            </p>
            <p v-else>
               <NuxtLink
                  to="/user/register"
                  class="text-blue-400"
                  >Not yet registered.. Register
                  now!</NuxtLink
               >
            </p>
         </div>
      </div>
      <p class="text-xl mb-3 mt-5">
         Email: {{ user.email }}
      </p>
   </div>
</template>
