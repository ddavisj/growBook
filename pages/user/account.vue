<script setup>
   // My user details: /user/account
   definePageMeta({
      layout: 'wide',
      middleware: ['page-auth'],
   })

   console.log('HEREEHERE')

   const supabase = useSupabaseClient()
   const user = useSupabaseUser()

   const AuthStore = useAuthStore()

   const message = ref('')
   const errorMessage = ref('')
   const imageChanged = ref(false)
   const showConfirm = ref(false)
   const showUploadedAvatar = ref(true)

   const accountImageInputRef = ref(null)

   const info = useState('profile', () => {
      return {
         description: '',
         image: '',
      }
   })

   // const clearInfo = () => {
   //    for (let key in info.value) {
   //       info.value[key] = null
   //    }
   // }

   // Load once
   info.value.description = AuthStore.description

   // When authstore loads, desc doesn't update on page load (ie. reloading this page!)
   watch(
      () => AuthStore.description,
      () => {
         info.value.description = AuthStore.description
      }
   )

   const onChangeInput = (data, name) => {
      info.value[name] = data

      if (name === 'image') {
         imageChanged.value = true
         showConfirm.value = true // Allow user to save
         showUploadedAvatar.value = false // Hide prev image
      }
      if (name === 'description') {
         showConfirm.value = !!isDataDifferent.value
      }
   }

   // Show confirm if data is new
   const isDataDifferent = computed(
      () =>
         AuthStore.description !== info.value.description ||
         imageChanged.value
   )

   const cancelImageUpload = () => {
      accountImageInputRef.value.clearImage()
      showConfirm.value = false
      showUploadedAvatar.value = true
      accountImageInputRef.value.clearImage()
      // clearInfo()
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
         userId: user.value.id,

         image: data.path,
         description: info.value.description,
      }

      // If there's no new prop, don't update, delete it from body
      !info.value.image ? delete body.image : ''
      !info.value.description ? delete body.description : ''

      try {
         const res = await $fetch(`/api/user/add-image`, {
            method: 'put',
            body,
         })

         // Don't load image if not being changed
         !!info.value.image
            ? AuthStore.loadUploadedImage(res)
            : ''

         AuthStore.description = info.value.description // sync store desc

         cancelImageUpload()
         message.value = 'Image uploaded'
      } catch (e) {
         message.value = 'There was an error: ' + e

         await supabase.storage
            .from('images')
            .remove(data.path)
      }
   }

   const cardUi = {
            background: 'bg-white dark:bg-black',
            ring: 'ring-2 ring-gray-200 dark:ring-gray-900',
            divide: 'dark:divide-y-4 dark:divide-gray-900',
            shadow: 'shadow',
            rounded: 'rounded-3xl',
         }
</script>

<template>
   <div class="w-full flex flex-col gap-y-4">
      <UCard
         :ui="cardUi"
      >
         <div class="space-y-4">
            <h1 class="mt-24 text-6xl text-black-600 mb-4">
               My account
            </h1>
         </div>
      </UCard>

      <UCard
         :ui="cardUi"
      >
         <div v-if="!!AuthStore.username" class="mb-5 text-xl text-lime-400">
            <p>
               @{{ AuthStore.username }}
            </p>
         </div>

         <div class="flex items-center">
            <div
               v-if="
                  AuthStore.uploadedImage &&
                  showUploadedAvatar
               "
            >
               <img
                  class="w-32 rounded-full"
                  :src="AuthStore.uploadedImage"
                  alt=""
               />
            </div>
            <GoogleAvatar v-if="!AuthStore.uploadedImage" />
            <div v-if="!!AuthStore.username" class="ml-4">
               <PlantAddImage
                  key="account"
                  :showTitle="false"
                  title=""
                  icon="i-heroicons-photo"
                  ref="accountImageInputRef"
                  @change-input="onChangeInput"
                  :preview="false"
               />
            </div>

            <div class="text-xl ml-5">
               <div v-if="AuthStore.username === undefined">
                  <p>Loading..</p>
               </div>
               <div v-if="!!AuthStore.username">

                  <p class="mt-1">
                     <NuxtLink
                        class="text-blue-400"
                        :to="`/${AuthStore.username}`"
                        >My public profile</NuxtLink
                     >
                  </p>
               </div>
               <p v-if="AuthStore.username === null">
                  <NuxtLink
                     to="/user/register"
                     class="text-blue-400"
                     >Not yet registered.. Register
                     now!</NuxtLink
                  >
               </p>
            </div>
         </div>
         <p v-if="AuthStore.user" class="mb-3 mt-10">
            <p class="text-cyan-500">Email</p>
            <p class="mt-1">{{
               AuthStore.user.email
            }}</p>
         </p>
      </UCard>

      <UCard
         :ui="cardUi"
      >
         <div class="mb-8">
            <PlantAddTextarea
               :text="info.description"
               ref="childTAComponentRef"
               title="About you"
               name="description"
               placeholder="A sentence or two.."
               @change-input="onChangeInput"
               v-model="info.description"
            />

            <Confirm
               :showConfirm="showConfirm"
               :errorMessage="errorMessage"
               @cancel="cancelImageUpload"
               @save="handleSubmit"
            />
         </div>
      </UCard>
   </div>
</template>
