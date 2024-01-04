<script setup>
   definePageMeta({ layout: 'custom' })

   const AuthStore = useAuthStore()

   const state = reactive({
      email: '',
      password: '',
   })

   const message = ref('')

   const supabase = useSupabaseClient()

   const handleSignin = async () => {
      try {
         const { data, error } =
            await supabase.auth.signInWithPassword({
               email: state.email,
               password: state.password,
            })
         if (error) {
            message.value = error.message
         } else {
            message.value = 'Signing in..'
            setTimeout(() => {
               navigateTo('/')
               AuthStore.loggedIn = true
            }, 700)
         }
      } catch (error) {
         console.log('Error: ' + error)
      }
   }

   const submitDisabled = computed(() => {
      return !state.email || !state.password
   })
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
      <h1 class="text-xl mt-16 mb-3 font-bold">
         Log in with email and password
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
         v-model="state.email"
      />
   </div>

   <div class="mt-3">
      <label class="text-cyan-500 mt-5 mb-3 text-xl">
         Password*
      </label>

      <Password v-model="state.password" name="password" />
   </div>

   <div class="w-full text-left">
      <UButton
         size="lg"
         class="px-6 mt-3"
         :disabled="submitDisabled"
         @click="handleSignin"
         >Login</UButton
      >
      <p v-if="message" class="mt-3 text-orange-400">
         {{ message }}
      </p>
      <div class="mt-4 text-blue-400">
         <NuxtLink to="/password-reset"
            >Reset password</NuxtLink
         >
      </div>
   </div>

   <div class="text-blue-400">
      <NuxtLink to="/signup">New user? Sign up!</NuxtLink>
   </div>
</template>
