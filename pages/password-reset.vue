<script setup>
   definePageMeta({ layout: 'custom' })

   const state = ref('')

   const loadingReset = ref(false)

   const message = ref('')

   const supabase = useSupabaseClient()

   const handleReset = async () => {
      try {
         loadingReset.value = true
         const { data, error } =
            await supabase.auth.resetPasswordForEmail(
               state.value,
               {
                  redirectTo:
                     'http://localhost:3000/password-update',
               }
            )

         if (error) {
            message.value = error.message
         } else {
            loadingReset.value = false
            message.value =
               'Please check your email for a password reset link'
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
         Reset password
      </h1>
   </div>
   <div class="mt-3">
      <label class="block text-cyan-500 mt-3 mb-3 text-xl">
         Email*
      </label>
      <input
         type="text"
         class="pl-3 block p-2 border w-100 w-4/5 md:w-1/2 bg-black border-slate-700 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-400 rounded-md"
         name="email"
         v-model="state"
      />
   </div>

   <div class="w-full text-left">
      <UButton
         size="lg"
         class="px-6 mt-3"
         :disabled="submitDisabled"
         @click="handleReset"
         :loading="loadingReset"
         >Reset</UButton
      >
      <p v-if="message" class="mt-5 text-orange-400">
         {{ message }}
      </p>
   </div>
</template>
