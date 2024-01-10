<script setup>
   const props = defineProps({
      title: String,
      name: String,
      placeholder: String,
      text: String,
   })

   const emits = defineEmits(['changeInput'])

   const state = ref(props.text)

   watch(
      () => props.text,
      () => {
         state.value = props.text
      }
   )
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
   <div class="flex flex-col w-[100%]">
      <label for="" class="text-cyan-500 mb-1 text-sm">
         {{ title }}
      </label>
      <textarea
         type="text"
         class="p-2 border w-100 rounded w-full h-20 mt-3 bg-neutral-900 border-gray-600"
         :placeholder="placeholder"
         v-model="state"
         :name="name"
         @input="onChange"
      ></textarea>
   </div>
</template>
