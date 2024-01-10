<script setup>
   const props = defineProps({
      user: Object,
   })

   if (props.user.image === 'NULL') {
      props.user.image = null
   }

   import userIcon from '@/assets/user.png'

   const config = useRuntimeConfig()

   const image = props.user.image
      ? `${config.public.supabase.url}/storage/v1/object/public/images/${props.user.image}`
      : userIcon
</script>

<template>
   <div class="flex items-center mb-4 mt-8">
      <div>
         <NuxtLink
            class="text-cyan-400"
            :to="`/${user.user_name}`"
         >
            <img
               class="rounded-full mr-4 h-24 w-24"
               :src="image"
            />
         </NuxtLink>
      </div>
      <div>
         <NuxtLink
            class="text-cyan-500 text-xl"
            :to="`/${user.user_name}`"
         >
            <span class="text-xl">{{
               user.user_name
            }}</span>
         </NuxtLink>
         <div class="text">
            {{ user.first_name }} {{ user.last_name }}
         </div>
         <div class="text-l text-gray-500">
            {{ user.description }}
         </div>
         <div class="text-l text-gray-500">
            {{ user.city }}, {{ user.country }}
         </div>
      </div>
   </div>
</template>
