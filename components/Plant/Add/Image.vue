<script setup>
   const props = defineProps({
      title: String,
      showTitle: Boolean,
      preview: Boolean,
      icon: String,
   })

   const title = props.title ? props.title : 'Image*'

   const image = useState('carImage', () => {
      return {
         preview: null,
         image: null,
      }
   })

   const emits = defineEmits(['changeInput'])

   const onImageUpload = event => {
      const input = event.target
      if (input.files) {
         const reader = new FileReader()
         reader.onload = e => {
            image.value.preview = e.target.result
         }
         image.value.image = input.files[0]
         reader.readAsDataURL(input.files[0])
         emits('changeInput', input.files[0], 'image')
      }
   }

   const clearImage = () => {
      image.value.image = null
      image.value.preview = null
   }

   defineExpose({
      clearImage,
   })

   const myInput = ref()
</script>

<template>
   <div class="w-[100%]" :key="props.key">
      <form>
         <div class="form-group">
            <div class="relative">
               <UButton :icon="icon" color="gray" dynamic>
                  <div v-if="showTitle">
                     <label
                        class="text-cyan-500 mb-1 ml-1 text-sm"
                     >
                        {{ title }}</label
                     >
                  </div>
                  <input
                     required
                     type="file"
                     accept="image/*"
                     class="h-[24px] text-[0px] opacity-0 absolute w-full cursor-pointer"
                     @change="onImageUpload"
                     ref="myInput"
                  />
               </UButton>
            </div>
            <div v-if="!preview">
               <div
                  class="border p-2 mt-3 w-56"
                  v-if="image.preview"
               >
                  <img
                     :src="image.preview"
                     class="img-fluid"
                  />
               </div>
            </div>
         </div>
      </form>
   </div>
</template>
