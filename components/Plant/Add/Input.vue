<script setup>
   const props = defineProps({
      title: String,
      name: String,
      placeholder: String,
      labelClass: String,
   })

   const emits = defineEmits(['changeInput'])
   const state = ref('')
   const onChange = () => {
      emits('changeInput', state.value, props.name)
   }

   const clearState = () => {
      state.value = null
   }
   defineExpose({
      clearState,
   })
</script>

<template>
   <div class="flex flex-col md:w-[48%] mt-4">
      <label
         for=""
         class="text-cyan-500 mb-1 text-sm mb-3"
         :class="labelClass"
      >
         {{ title }}
      </label>
      <input
         type="text"
         class="p-2 border w-100 rounded"
         :placeholder="placeholder"
         v-model="state"
         :name="name"
         @input="onChange"
      />
   </div>
</template>
