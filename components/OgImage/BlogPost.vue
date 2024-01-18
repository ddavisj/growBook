<script setup lang="ts">
   withDefaults(
      defineProps<{
         title?: string
         borderColor?: string
      }>(),
      {
         title: 'title',
         borderColor: 'blue-500',
      }
   )
</script>

<template>
   <div
      :class="[`border-${borderColor}`]"
      class="h-full w-full flex items-start justify-start border-solid border-[12px] bg-black"
   >
      >
      <div class="flex items-start justify-start h-full">
         <div class="flex flex-col justify-between w-full h-full">
            <h2 class="text-7xl pt-8 pb-10 px-20 text-green-600 font-bold mb-0">
               growBook 🌿
            </h2>
            <h1 class="text-[80px] pl-20 pr-20 text-gray-300 text-left">
               {{ title }}
            </h1>
            <p class="text-4xl pb-20 px-20 text-green-600 font-bold mb-0">
               growbook.vercel.app
            </p>
         </div>
      </div>
   </div>
</template>
