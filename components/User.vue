<script setup>
   const props = defineProps({
      user: Object,
   })
</script>

<template>
   <div class="flex flex-row mb-4 mt-8">
      <div class="flex items-center">
         <NuxtLink
            class="text-cyan-400"
            :to="`/${user.user_name}`"
         >
            <NuxtImg
               class="rounded-full mr-4 h-10 w-10"
               src="/user.png"
            />
         </NuxtLink>
      </div>
      <div>
         <div>
            <NuxtLink
               class="text-cyan-400 text-xl"
               :to="`/${user.user_name}`"
            >
               {{ user.user_name }}
            </NuxtLink>
         </div>
         <p class="text-xl">
            {{ user.first_name }} {{ user.last_name }}
         </p>
      </div>
   </div>
</template>
