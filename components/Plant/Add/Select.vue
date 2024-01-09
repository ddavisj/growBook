<script setup>
   const props = defineProps({
      title: String,
      options: Array,
      name: String,
      default: String,
      width: Number,
   })

   const emits = defineEmits(['changeInput'])
   const state = ref(props.default)
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
   <div class="flex flex-col mt-2">
      <label for="" class="text-cyan-500 mb-1 text-sm">
         {{ title }}
      </label>
      <select
         class="p-2 border rounded cursor-pointer"
         :class="
            props.width ? `w-${props.width}` : 'w-[48%]'
         "
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
