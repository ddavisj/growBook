<script setup>
   definePageMeta({ layout: 'custom' })

   const state = ref('')

   const message = ref('')

   const supabase = useSupabaseClient()

   const handleUpdate = async () => {
      try {
         const { data, error } =
            await supabase.auth.updateUser({
               password: state.value,
            })

         if (error) {
            message.value = error.message
         } else {
            message.value =
               'Success! Your password was updated'
            setTimeout(() => {
               navigateTo('/')
            }, 700)
         }
      } catch (error) {
         console.log('Error: ' + error)
      }
   }

   const submitDisabled = computed(() => {
      return !state.value
   })
</script>

<template>
   <div class="mt-10">
      <h1 class="text-5xl font-bold mb-7">
         Password update
      </h1>
   </div>
   <div class="mt-3">
      <label class="block text-cyan-500 mt-3 mb-3 text-xl">
         New password*
      </label>
      <input
         type="text"
         class="pl-3 block p-2 border w-100 w-4/5 md:w-1/3 bg-black border-slate-700 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-400 rounded-md"
         name="password"
         v-model="state"
      />
   </div>

   <div class="w-full text-left">
      <UButton
         size="lg"
         class="px-6 mt-3"
         :disabled="submitDisabled"
         @click="handleUpdate"
         >Update</UButton
      >
      <p v-if="message" class="mt-3 text-orange-400">
         {{ message }}
      </p>
   </div>
</template>
