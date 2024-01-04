<script setup>
   defineProps({
      bgColor: String,
   })

   const password = ref('')
   const show = ref(true)

   const emits = defineEmits(['update:modelValue'])
</script>

<template>
   <div class="w-1/2 mt-3">
      <UInput
         :type="!!show ? 'text' : 'password'"
         name="password"
         v-model="password"
         autocomplete="on"
         color="gray"
         :ui="{
            icon: { trailing: { pointer: '' } },
            size: 'xl',
            color: {
               gray: {
                  outline: 'dark:bg-black bg-black',
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
               @click="show = !show"
               >{{ !!show ? 'Hide' : 'Show' }}</UButton
            >
         </template>
      </UInput>
   </div>
</template>
