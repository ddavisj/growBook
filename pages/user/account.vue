<script setup>
   // My user details: /user/account
   definePageMeta({
      layout: 'custom',
      middleware: ['page-auth'],
   })

   const supabase = useSupabaseClient()
   const user = useSupabaseUser()

   const AuthStore = useAuthStore()

   console.log(
      'Init AuthStore.description: ',
      AuthStore.description
   )

   const message = ref('')
   const errorMessage = ref('')
   const showConfirm = ref(false)
   const showUploadedAvatar = ref(true)

   const imageInputRef = ref(null)

   // ** STATE
   // const state = reactive({})
   // - Used by onChangeInput.. all works!

   // ** INFO
   const info = useState('profile', () => {
      return {
         description: '',
         image: '',
      }
   })

   watch(
      () => AuthStore.description,
      () => {
         info.value.description = AuthStore.description

         console.log(
            'Updated AuthStore description: ',
            AuthStore.description
         )
      }
   )

   const onChangeInput = (data, name) => {
      console.log(name)
      info.value[name] = data

      if (name === 'image') {
         showConfirm.value = true
         showUploadedAvatar.value = false
      }
      if (name === 'description') {
         console.log('data:', data)

         console.log('State desc', info.value.description)
      }
      isDataDifferent.value
         ? (showConfirm.value = true)
         : (showConfirm.value = false)
   }

   // Show confirm if data is new
   const isDataDifferent = computed(() => {
      if (
         AuthStore.description !== info.value.description
      ) {
         return true
      } else {
         return false
      }
   })

   const cancelImageUpload = () => {
      imageInputRef.value.clearImage()
      showConfirm.value = false
      showUploadedAvatar.value = true
   }

   const handleSubmit = async () => {
      console.log('HEEEERRREE')

      const fileName = Math.floor(
         Math.random() * 10000000000000000000
      )

      const { data, error } = await supabase.storage
         .from('images')
         .upload('profile/' + fileName, info.value.image)

      console.log('Data..', data)

      if (error) {
         return (errorMessage.value = 'Cannot upload image')
      }

      const body = {
         userId: user.value.id,

         image: data.path,
         description: info.value.description,
      }

      // If there's no new prop, don't update, delete it from the body
      !info.value.image ? delete body.image : ''
      !info.value.description ? delete body.description : ''

      console.log('U2: ', user.value.id)

      try {
         console.log('IMAGE UPLOADINGGG..')
         const res = await $fetch(`/api/user/add-image`, {
            method: 'put',
            body,
         })

         // Don't load image if it's not being changed
         !!info.value.image
            ? AuthStore.loadUploadedImage(res)
            : ''

         cancelImageUpload()
         message.value = 'Image uploaded'
      } catch (e) {
         message.value = 'There was an error: ' + e

         await supabase.storage
            .from('images')
            .remove(data.path)
      }
   }

   //          <!-- @change-input="onImageUpload" -->

   const runMe = () => {
      console.log('---', info.value.description)
   }
</script>

<template>
   <div>
      <h1 class="mt-24 text-6xl text-black-600 mb-4">
         My account
      </h1>

      <div class="mt-10 flex items-center">
         <div
            v-if="
               AuthStore.uploadedImage && showUploadedAvatar
            "
         >
            <img
               class="w-32 rounded-full"
               :src="AuthStore.uploadedImage"
               alt=""
            />
         </div>
         <GoogleAvatar v-if="!AuthStore.uploadedImage" />
         <div v-if="!!AuthStore.username">
            <PlantAddImage
               :showTitle="false"
               class="mt-6"
               ref="imageInputRef"
               @change-input="onChangeInput"
               :preview="false"
            />
         </div>

         <div class="text-xl ml-5 mb-3 mt-5">
            <div v-if="AuthStore.username === undefined">
               <p>Loading..</p>
            </div>
            <div v-if="!!AuthStore.username">
               <p>
                  {{ AuthStore.username }}
               </p>
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
      <p v-if="AuthStore.user" class="text-xl mb-3 mt-5">
         Email: {{ AuthStore.user.email }}
      </p>
      <PlantAddTextarea
         :text="info.description"
         ref="childTAComponentRef"
         title="About you"
         name="description"
         placeholder=""
         @change-input="onChangeInput"
         v-model="info.description"
      />

      <button class="mt-4" @click="runMe">Test</button>

      <Confirm
         :showConfirm="showConfirm"
         :errorMessage="errorMessage"
         @cancel="cancelImageUpload"
         @save="handleSubmit"
      />
   </div>
</template>
