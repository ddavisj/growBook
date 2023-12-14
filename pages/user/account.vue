<script setup>
   // My user details: /user/account
   definePageMeta({
      layout: 'custom',
   })

   const user = useSupabaseUser()

   const state = ref(null)

   const getResponse = async () => {
      const {data} = await useFetch('/api/user/get-user', {
         params: {
            userId: user.value.id,
         },
      })

      state.value = data.value.user_name
   }

   getResponse()
</script>

<template>
   <div v-if="state">
      <h1 class="mt-24 text-6xl text-black-600 mb-4">
         My account
      </h1>

      <div class="flex items-center">
         <NuxtImg
            :src="user.user_metadata.picture"
            class="rounded-full"
         ></NuxtImg>

         <p class="text-xl ml-5 mb-3 mt-5">
            {{ state }}
         </p>
      </div>
      <p class="text-xl mb-3 mt-5">
         Email: {{ user.email }}
      </p>
   </div>
</template>
