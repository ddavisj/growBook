<script setup>
   // Register user page: /user/register
   definePageMeta({
      layout: 'custom',
   })

   const user = useSupabaseUser()

   const AuthStore = useAuthStore()

   const { countries } = useCountries()
   const countryNames = countries.map(a => a.name)

   // Check if user has regd - DH to fix
   const isFirstLogin = async () => {
      const { data } = await useFetch(
         '/api/user/get-user',
         {
            params: {
               userId: user.value.id,
            },
         }
      )
      // if (data.value) {
      //    navigateTo('/')
      // }
   }

   isFirstLogin()

   const info = useState('userinfo', () => {
      return {
         username: '',
         lastName: '',
         firstName: '',
         city: '',
         country: '',
      }
   })

   const onChangeInput = (data, name) => {
      info.value[name] = data
   }

   // const info.firstName ref('')
   // const lastNameState = ref('')
   // const usernameState = ref('')
   // const cityState = ref('')
   // const countryState = ref('')

   const usernameExists = reactive({
      checkComplete: false,
      value: false,
      message: '',
   })

   const isCheckDisabled = computed(() => {
      if (!info.value.username) {
         return true
      }
      return false
   })

   const isSubmitDisabled = computed(() => {
      if (!info.value.firstName || !!usernameExists.value) {
         return true
      }
      return false
   })

   const message = ref('')

   const handleUsernameCheck = async () => {
      const { data } = await useFetch(
         `/api/user/check-username/${info.value.username}`
      )

      usernameExists.checkComplete = true
      usernameExists.value = !!data.value

      usernameExists.message = !!data.value
         ? 'User name exists!'
         : 'Username available'
   }

   const handleSubmit = async () => {
      const body = {
         firstName: info.value.firstName,
         lastName: info.value.lastName,
         userName: info.value.username,
         city: info.value.city,
         country: info.value.country,
         userId: user.value.id,
      }

      try {
         const res = await $fetch(`/api/user/register`, {
            method: 'post',
            body,
         })
         message.value = 'Registration complete'
         AuthStore.username = info.value.username
      } catch (e) {
         message.value = 'There was an error: ' + e
      }
   }
</script>

<template>
   <div class="flex flex-col mt-2">
      <h1 class="text-6xl mt-24 mb-3">User Registration</h1>

      <div class="mt-6">
         <label
            for=""
            class="text-cyan-500 mt-4 mb-3 text-xl"
         >
            Enter a username*
         </label>
         <div class="flex mt-3 overflow-hidden mx-auto">
            <input
               type="text"
               class="p-2 border w-100 rounded"
               placeholder=""
               v-model="info.username"
            />
            <button
               class="bg-sky-500 px-10 text-white"
               @click="handleUsernameCheck"
               :disabled="isCheckDisabled"
            >
               Check
            </button>
         </div>
      </div>

      <div v-if="usernameExists.checkComplete">
         <p
            v-if="usernameExists.value"
            class="text-red-500 mt-2"
         >
            Username exists, try another
         </p>
         <p v-else class="text-green-500 mt-2">
            Username available!
         </p>
      </div>

      <label for="" class="text-cyan-500 mt-5 mb-3 text-xl">
         First name*
      </label>
      <input
         type="text"
         class="p-2 border w-100 rounded w-1/2"
         placeholder=""
         v-model="info.firstName"
         @focus="handleUsernameCheck"
      />

      <label for="" class="text-cyan-500 mt-5 mb-3 text-xl">
         Last name
      </label>
      <input
         type="text"
         class="p-2 border w-100 rounded w-1/2"
         placeholder=""
         v-model="info.lastName"
      />

      <PlantAddInput
         class="mt-4"
         ref="childInputComponentsRef"
         title="City"
         name="city"
         placeholder=""
         @change-input="onChangeInput"
      />

      <PlantAddSelect
         title="Country"
         class="mt-4"
         :options="countryNames"
         name="country"
         @change-input="onChangeInput"
      />

      <div class="w-full text-left">
         <button
            :disabled="isSubmitDisabled"
            @click="handleSubmit"
            class="bg-blue-400 text-white rounded py-2 px-7 mt-8"
         >
            Register
         </button>
         <p v-if="message" class="mt-3 text-orange-400">
            {{ message }}
         </p>
      </div>
   </div>
</template>
