<script setup>
   const props = defineProps({
      title: String,
      options: Array,
      name: String,
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
   <div class="flex flex-col w-[48%] mt-2">
      <label for="" class="text-cyan-500 mb-1 text-sm">
         {{ title }}
      </label>
      <select
         name=""
         id=""
         class="p-2 border w-100 rounded cursor-pointer"
         @change="onChange"
         v-model="state"
      >
         <option
            v-for="option in options"
            :key="option.id"
            :value="option"
         >
            {{ option }}
         </option>
      </select>
   </div>
</template>
