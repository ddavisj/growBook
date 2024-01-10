<script setup>
   const props = defineProps({
      user: Object,
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
      <div>
         <NuxtLink
            class="text-cyan-400"
            :to="`/${user.user_name}`"
         >
            <img
               :class="`h-${imageSize} w-${imageSize}`"
               class="rounded-full mr-4"
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
         <div v-if="!hideFullName" class="text">
            {{ user.first_name }} {{ user.last_name }}
         </div>
         <div
            v-if="!hideDescription"
            class="text-l text-gray-500"
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
