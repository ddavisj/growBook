<script setup>
   const props = defineProps({
      user: Object,
      hideUserName: Boolean,
      hideFullName: Boolean,
      hideDescription: Boolean,
      hideLocation: Boolean,
      imageSize: String,
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
      <NuxtLink
         class="min-w-max text-cyan-400 mr-4"
         :to="`/${user.user_name}`"
      >
         <img
            class="rounded-full mr-4 h-24 w-24"
            :class="`h-${imageSize} w-${imageSize}`"
            :src="image"
         />
      </NuxtLink>
      <div>
         <NuxtLink
            v-if="!hideUserName"
            class="text-cyan-500 text-xl"
            :to="`/${user.user_name}`"
         >
            <span class="text-xl">{{
               user.user_name
            }}</span>
         </NuxtLink>
         <div v-if="!hideFullName" class="text-2xl mb-1">
            {{ user.first_name }} {{ user.last_name }}
         </div>
         <div
            v-if="!hideDescription"
            class="text-l dark:text-white"
         >
            {{ user.description }}
         </div>
         <div
            v-if="!hideLocation"
            class="text-l text-gray-500"
         >
            {{ user.city }}, {{ user.country }}
         </div>
      </div>
   </div>
</template>
