<script setup>
   const props = defineProps({
      link: String,
   })
</script>

<template>
   <NuxtLink
      :to="link"
      class="w-9 h-9 border-blue-400 border-2 bg-black flex justify-center items-center rounded-full text-blue-400 font-bold cursor-pointer"
      >+</NuxtLink
   >
</template>
