<script setup>
   defineProps({
      bgColor: String,
      passwordType: String,
   })
   // passwordType: new-password (signup) - or - current-password (login)

   const password = ref('')
   const showButton = ref(false)

   const emits = defineEmits(['update:modelValue'])
</script>

<template>
   <div class="w-4/5 md:w-1/3 mt-2">
      <UInput
         :type="showButton ? 'text' : 'password'"
         name="password"
         v-model="password"
         :autocomplete="passwordType"
         color="gray"
         :ui="{
            icon: { trailing: { pointer: '' } },
            size: 'xl',
            color: {
               gray: {
                  outline:
                     'dark:bg-black bg-black text-white',
               },
            },
         }"
         @input="
            $emit('update:modelValue', $event.target.value)
         "
      >
         <template #trailing>
            <UButton
               v-show="password !== ''"
               variant="link"
               :padded="false"
               @click="showButton = !showButton"
               >{{ showButton ? 'Hide' : 'Show' }}</UButton
            >
         </template>
      </UInput>
   </div>
</template>
