<script setup>
   definePageMeta({ layout: 'logins' })

   useSeoMeta({
      title: 'growBook - Login',
   })

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
            AuthStore.checkLogin()
            AuthStore.loadUserName()
            setTimeout(() => {
               navigateTo('/')
            }, 500)
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
   <div class="mt-8">
      <h1 class="text-5xl font-bold mb-7">Log in</h1>
   </div>

   <div class="flex flex-col">
      <h1 class="text-xl mt-4 mb-2 font-bold">
         Log in with email and password
      </h1>
   </div>

   <div class="mt-2">
      <label class="block text-cyan-500 mt-2 mb-2 text-xl">
         Email*
      </label>
      <input
         type="email"
         autocomplete="on"
         name="email"
         class="pl-3 block text-white p-2 border w-100 w-4/5 bg-black border-slate-700 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-400 rounded-md"
         v-model="state.email"
      />
   </div>

   <div class="mt-2">
      <label class="text-cyan-500 mt-2 mb-2 text-xl">
         Password*
      </label>

      <Password
         v-model="state.password"
         name="password"
         passwordType="current-password"
      />
   </div>

   <div class="w-full text-left">
      <UButton
         size="lg"
         class="px-6 mt-2"
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

   <div class="flex flex-col mt-4 mb-4">
      <h1 class="mt-2 mb-1 text-gray-500">or</h1>
   </div>

   <div>
      <button
         class="bg-cyan-400 p-2 px-3 rounded text-black font-bold mb-6"
      >
         <NuxtLink to="/signup">Register here</NuxtLink>
      </button>
   </div>
</template>
