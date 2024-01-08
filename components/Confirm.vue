<script setup>
   const props = defineProps({
      showConfirm: Boolean,
      errorMessage: String,
   })

   const emits = defineEmits([
      'cancel',
      'handleSubmit',
      'save',
   ])
</script>

<template>
   <div
      id="confirm"
      v-if="showConfirm"
      class="w-full text-center"
   >
      <button
         :disabled="isButtonDisabled"
         @click="emits('cancel')"
         class="bg-red-400 text-white rounded py-2 px-7 mt-8 mr-3"
      >
         Cancel
      </button>
      <button
         :disabled="isButtonDisabled"
         @click="emits('save')"
         class="bg-lime-500 text-white rounded py-2 px-7 mt-8"
      >
         Save
      </button>
      <p v-if="errorMessage" class="mt-3 text-red-400">
         {{ errorMessage }}
      </p>
   </div>
</template>
