<script setup>
   definePageMeta({ layout: 'custom' })

   const supabase = useSupabaseClient()

   const AuthStore = useAuthStore()

   const state = reactive({})

   const message = ref('')

   const handleSignup = async () => {
      try {
         const { data, error } = await supabase.auth.signUp(
            {
               email: state.email,
               password: state.password,
               options: {
                  emailRedirectTo:
                     'https//example.com/welcome',
               },
            }
         )

         message.value = 'Registration complete'
      } catch (e) {
         message.value = 'There was an error: ' + e
      }
   }
</script>

<template>
   <div class="mt-10">
      <h1 class="text-5xl font-bold mb-7">Sign up</h1>
   </div>

   <div class="flex flex-col mt-3">
      <h2 class="text-xl mt-24 mb-3 font-bold">
         Sign up with email/password
      </h2>
   </div>

   <div class="mt-3">
      <label for="" class="text-cyan-500 mt-5 mb-3 text-xl">
         Email*
      </label>
      <input
         type="text"
         class="p-2 border w-100 rounded w-1/2"
         placeholder=""
         v-model="state.email"
      />
   </div>

   <div class="mt-3">
      <label for="" class="text-cyan-500 mt-5 mb-3 text-xl">
         Password*
      </label>
      <input
         type="text"
         class="p-2 border w-100 rounded w-1/2"
         placeholder=""
         v-model="state.password"
      />
   </div>

   <div class="w-full text-left">
      <button
         :disabled="!state.email && !state.password"
         @click="handleSignup"
         class="bg-blue-400 text-white rounded py-2 px-7 mt-3"
      >
         Sign up
      </button>
      <p v-if="message" class="mt-3 text-orange-400">
         {{ message }}
      </p>
   </div>
</template>
