<script setup>
   const props = defineProps({
      title: String,
      showTitle: Boolean,
      preview: Boolean,
   })

   // const showTitle = ref(props.showTitle)

   const title = props.title ? props.title : 'Image*'

   const image = useState('carImage', () => {
      return {
         preview: null,
         image: null,
      }
   })

   const emits = defineEmits(['changeInput'])

   const onImageUpload = event => {
      console.log('CHANGEDDDDD')
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
      console.log('Clearing image')
      image.value.image = null
      image.value.preview = null
   }
   defineExpose({
      clearImage,
   })

   const myInput = ref()
</script>

<template>
   <div class="col=md-5 offset-md-1 mt-2 w-[100%]">
      <div v-if="showTitle">
         <label for="" class="text-cyan-500 mb-1 text-sm">
            {{ title }}</label
         >
      </div>
      <form class="mt-2">
         <div class="form-group">
            <div class="relative">
               <input
                  required
                  type="file"
                  accept="image/*"
                  class="h-[24px] text-[0px] opacity-0 absolute w-full cursor-pointer"
                  @change="onImageUpload"
                  ref="myInput"
               />
               <UButton
                  icon="i-heroicons-pencil-square-solid"
                  color="gray"
                  @click="$refs.myInput.click()"
                  dynamic
               />
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
