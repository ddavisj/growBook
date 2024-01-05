<script setup>
   const route = useRoute()

   const message = reactive({
      name: '',
      email: '',
      phone: '',
      message: '',
   })

   const errorMessage = ref('')

   const successMessage = ref('')

   const disableButton = computed(() => {
      // for (let key in message.value) {
      //    if (!message.value[key]) return true
      // }
      // return false
      if (message.message) {
         return false
      }
      return true
   })

   const onSubmit = async () => {
      try {
         const response = await $fetch(
            `/api/car/listings/${route.params.id}/message`,
            {
               method: 'post',
               body: message.value,
            }
         )
         message.value = {
            name: '',
            email: '',
            phone: '',
            message: '',
         }
         successMessage.value = 'Message sent!'
         errorMessage.value = ''
      } catch (err) {
         errorMessage.value = err.statusMessage
         successMessage.value = ''
      }
   }
</script>

<template>
   <div class="mt-10">
      <h1 class="text-3xl mb-4">Contact</h1>

      <!-- <div class="flex flex-col w-[400px] justify-between">
         <input
            v-model="message.name"
            type="text"
            class="pl-2 border p-1 mb-3"
            placeholder="Name"
         />
         <input
            v-model="message.email"
            type="text"
            class="pl-2 border p-1 mb-3"
            placeholder="Email"
         />
         <input
            v-model="message.phone"
            type="text"
            class="pl-2 border p-1"
            placeholder="Phone"
         />
      </div> -->
      <div>
         <div class="fkex mt-4 w-[600px]">
            <textarea
               v-model="message.message"
               class="pl-2 border p-1 w-full"
               placeholder="Message"
            ></textarea>
         </div>
         <UButton
            :disabled="disableButton"
            @click="onSubmit"
            class="mt-3 bg-blue-400 text-white px-10 py-3 rounded"
         >
            Send message
         </UButton>

         <p
            v-if="successMessage"
            class="mt-3 text-green-400"
         >
            {{ successMessage }}
         </p>
         <p v-if="errorMessage" class="mt-3 text-red-400">
            {{ errorMessage }}
         </p>
      </div>
   </div>
</template>
