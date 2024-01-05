<script setup>
   definePageMeta({ layout: 'custom' })

   const supabase = useSupabaseClient()

   const message = ref('')
   const loadingReset = ref(false)

   const state = reactive({})

   const handleSignup = async () => {
      try {
         loadingReset.value = true
         const { data, error } = await supabase.auth.signUp(
            {
               email: state.email,
               password: state.password,
               options: {
                  emailRedirectTo: '/',
               },
            }
         )

         if (error) {
            console.log('E in SU try:', error)
         } else {
            loadingReset.value = false
            message.value =
               'To complete registration - please check your email and confirm'
         }
      } catch (error) {
         message.value =
            'There was an error: ' + error.message
      }
   }

   const submitDisabled = computed(() => {
      return !state.email || !state.password
   })
</script>

<template>
   <div class="mt-10">
      <h1 class="text-5xl font-bold mb-7">Sign up</h1>
   </div>

   <div class="flex flex-col mt-3">
      <h2 class="text-xl mt-24 mb-3 font-bold">
         Register with email and password
      </h2>
   </div>

   <div class="mt-3">
      <label class="block text-cyan-500 mt-3 mb-3 text-xl">
         Email*
      </label>
      <input
         type="text"
         class="text-white pl-3 block p-2 border w-100 w-4/5 md:w-1/3 bg-black border-slate-700 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-400 rounded-md"
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
         :loading="loadingReset"
         class="px-6 mt-3"
         :disabled="submitDisabled"
         @click="handleSignup"
         >Sign up</UButton
      >
      <p v-if="message" class="mt-5 text-orange-400">
         {{ message }}
      </p>
   </div>

   <!------->

   <!-- <div class="w-full text-left">
      <button
         :disabled="!state.email || !state.password"
         @click="handleSignup"
         class="bg-blue-400 text-white rounded py-2 px-7 mt-3"
      >
         Sign uppp
      </button>
      <p v-if="message" class="mt-3 text-orange-400">
         {{ message }}
      </p>
   </div> -->
</template>
