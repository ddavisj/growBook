<script setup>
   definePageMeta({ layout: 'custom' })

   const AuthStore = useAuthStore()

   const state = reactive({})

   const message = ref('')

   const supabase = useSupabaseClient()

   const handleSignin = async () => {
      try {
         await supabase.auth.signInWithPassword({
            email: state.email,
            password: state.password,
         })
         console.log('Signed in!')
         message.value = 'Signing in..'
         setTimeout(() => {
            navigateTo('/profile/plants')
            AuthStore.loggedIn = true
         }, 500)
      } catch (error) {
         message.value = 'There was an error: ' + e
      }
   }
</script>

<template>
   <div class="mt-10">
      <h1 class="text-5xl font-bold mb-7">Log in</h1>
      <button
         class="bg-red-400 p-3 rounded text-white font-bold"
         @click="AuthStore.login"
      >
         Login with Google
      </button>
   </div>

   <div class="flex flex-col mt-6">
      <h1 class="text-xl mt-24 mb-3 font-bold">
         Sign in with email/password
      </h1>
   </div>

   <div class="mt-3">
      <label for="" class="text-cyan-500 mt-5 mb-3 text-xl">
         Email*
      </label>
      <input
         type="text"
         class="p-2 border w-100 rounded w-1/2"
         name="email"
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
         name="password"
         class="p-2 border w-100 rounded w-1/2"
         placeholder=""
         v-model="state.password"
      />
   </div>

   <div class="w-full text-left">
      <button
         :disabled="!state.email && !state.password"
         @click="handleSignin"
         class="bg-blue-400 text-white rounded py-2 px-7 mt-3"
      >
         Login
      </button>
      <p v-if="message" class="mt-3 text-orange-400">
         {{ message }}
      </p>
   </div>

   <div class="w-full text-left">
      <NuxtLink to="/signup">Sign Up</NuxtLink>
   </div>
</template>
