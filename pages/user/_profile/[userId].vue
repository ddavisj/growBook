<script setup>
   // Update user profile
   definePageMeta({
      layout: 'custom',
   })

   const supabase = useSupabaseClient()

   const user = useSupabaseUser()

   const errorMessage = ref('')

   const handleSubmit = async () => {
      const {data: user, error} =
         await supabase.auth.admin.updateUserById(user.id, {
            user_metadata: {username: 'hack'},
         })

      // alert('User updated!')
      if (error) {
         return (errorMessage.value = error.statusMessage)
      }
   }
</script>

<template>
   <div class="flex flex-col w-[48%] mt-2">
      <h1 class="text-6xl mb-3">User Profile</h1>
      <h3 class="text-lg mb-3">User ID: {{ user.id }}</h3>

      <label for="" class="text-cyan-500 mb-3 text-xl">
         Enter a username
      </label>
      <input
         type="text"
         class="p-2 border w-100 rounded"
         placeholder=""
      />
      <div class="w-full text-left">
         <button
            :disabled="false"
            @click="handleSubmit"
            class="bg-blue-400 text-white rounded py-2 px-7 mt-8"
         >
            Save
         </button>
         <p v-if="errorMessage" class="mt-3 text-red-400">
            {{ errorMessage }}
         </p>
      </div>
   </div>
</template>
