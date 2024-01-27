<script setup>
   // Register user page: /user/register
   definePageMeta({
      layout: 'custom',
      middleware: ['page-auth'],
   })

   const user = useSupabaseUser()
   const supabase = useSupabaseClient()

   const AuthStore = useAuthStore()
   const UserStore = useUserStore()

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
      if (data.value) {
         navigateTo('/profile/plants/create')
      }
   }

   // isFirstLogin()

   const info = ref({
      username: '',
      lastName: '',
      firstName: '',
      city: '',
      country: '',
      image: null,
      description: '',
   })

   const onChangeInput = (data, name) => {
      info.value[name] = data
   }

   const usernameExists = reactive({
      checkComplete: false,
      value: false,
      message: '',
      messageColor: 'text-green-500',
   })

   const checkifEmpty = () => {
      if (info.value.username === '') {
         usernameExists.checkComplete = false
      }
   }

   const isCheckDisabled = computed(() => {
      if (!info.value.username) {
         return true
      }
      return false
   })

   const isSubmitDisabled = computed(() => {
      if (
         !info.value.firstName ||
         !!usernameExists.value ||
         !usernameExists.checkComplete
      ) {
         return true
      }
      return false
   })

   const message = ref('')

   const handleUsernameCheck = async () => {
      if (info.value.username !== '') {
         info.value.username = info.value.username
            .toLowerCase()
            .trim()

         const { data } = await useFetch(
            `/api/user/check-username/${info.value.username}`
         )

         usernameExists.checkComplete = true
         usernameExists.value = !!data.value

         if (data.value) {
            usernameExists.messageColor = 'text-red-500'
            usernameExists.message = 'Username unavailable'
         } else {
            usernameExists.messageColor = 'text-green-500'
            usernameExists.message = 'Username available'
         }
      } else {
         usernameExists.checkComplete = false
      }
   }

   const handleSubmit = async () => {
      const fileName = Math.floor(
         Math.random() * 10000000000000000000
      )

      const { data, error } = await supabase.storage
         .from('images')
         .upload('profile/' + fileName, info.value.image)

      if (error) {
         return (errorMessage.value = 'Cannot upload image')
      }

      const body = {
         firstName: info.value.firstName,
         lastName: info.value.lastName,
         userName: info.value.username.toLowerCase(),
         city: info.value.city,
         country: info.value.country,
         userId: user.value.id,
         image: info.value.image ? data.path : null,
         description: info.value.description,
      }

      try {
         const res = await $fetch(`/api/user/register`, {
            method: 'post',
            body,
         })
         message.value = 'Registration complete'

         info.value.image
            ? AuthStore.loadUploadedImage(res)
            : ''

         AuthStore.username = info.value.username
         AuthStore.description = info.value.description

         // Before adding to P state, convert object keys to snake case
         const bodySnakeCase = {
            first_name: info.value.firstName,
            last_name: info.value.lastName,
            user_name: info.value.username.toLowerCase(),
            city: info.value.city,
            country: info.value.country,
            user_id: user.value.id,
            image: info.value.image ? data.path : null,
            description: info.value.description,
         }

         UserStore.addGrower(bodySnakeCase)

         setTimeout(() => {
            navigateTo('/profile/plants')
         }, 700)
      } catch (e) {
         message.value = 'There was an error: ' + e

         await supabase.storage
            .from('images')
            .remove(data.path)
      }
   }
</script>

<template>
   <div class="flex flex-col mt-2">
      <h1 class="text-6xl mt-24 mb-3">Welcome</h1>
      <h2 class="text-4xl mt-24 mb-3">
         Please complete your registration
      </h2>
      <p class="text-xl mt-24 mb-3">
         Fields with * are required
      </p>

      <div class="mt-6">
         <label
            for=""
            class="text-cyan-500 mt-4 mb-3 text-xl"
         >
            Username *
         </label>
         <div class="flex mt-3 overflow-hidden mx-auto">
            <input
               type="text"
               class="p-2 border w-2/3 rounded"
               placeholder=""
               @input="checkifEmpty"
               v-model="info.username"
            />
            <UButton
               class="bg-sky-500 px-10 text-white rounded-md ml-1"
               @click="handleUsernameCheck"
               :disabled="isCheckDisabled"
            >
               Check
            </UButton>
         </div>
      </div>

      <div v-if="usernameExists.checkComplete">
         <p
            class="mt-2"
            :class="usernameExists.messageColor"
         >
            {{ usernameExists.message }}
         </p>
      </div>

      <label for="" class="text-cyan-500 mt-5 mb-3 text-xl">
         First name*
      </label>
      <input
         type="text"
         class="p-2 border w-100 rounded w-2/3"
         placeholder=""
         v-model="info.firstName"
         @focus="handleUsernameCheck"
      />

      <label for="" class="text-cyan-500 mt-5 mb-3 text-xl">
         Last name
      </label>
      <input
         type="text"
         class="p-2 border w-100 rounded w-2/3"
         placeholder=""
         v-model="info.lastName"
      />

      <PlantAddInput
         class="mt-4 w-2/3"
         ref="childInputComponentsRef"
         title="City"
         labelClass="text-xl"
         name="city"
         placeholder=""
         @change-input="onChangeInput"
      />

      <PlantAddSelect
         class="mt-4"
         title="Country"
         labelClass="text-xl"
         :options="countryNames"
         name="country"
         @change-input="onChangeInput"
      />

      <PlantAddImage
         label="Profile picture"
         labelClass="text-xl"
         :showTitle="true"
         title="Add image"
         icon="i-heroicons-camera"
         class="mt-8"
         ref="plantImageInputRef"
         @change-input="onChangeInput"
      />

      <PlantAddTextarea
         class="mt-8"
         areaWidth="w-full sm:w-2/3"
         labelClass="text-xl"
         ref="childTAComponentRef"
         title="About you"
         name="description"
         placeholder="A sentence or two (max 50 chars).."
         @change-input="onChangeInput"
         v-model="info.description"
         :maxLength="50"
      />

      <div class="w-full text-left">
         <UButton
            :disabled="isSubmitDisabled"
            @click="handleSubmit"
            class="bg-blue-400 text-white rounded py-2 px-7 mt-8"
         >
            Update
         </UButton>
         <p v-if="message" class="mt-3 text-orange-400">
            {{ message }}
         </p>
      </div>
   </div>
</template>
