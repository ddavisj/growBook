<script setup>
   // Note - Plant table in DB uses camelCase.. User table uses snake_case.. Hence different cases below..
   // TODO: Make consistent?

   const props = defineProps({
      listing: Object,
      showDivider: Boolean,
   })

   const UserStore = useUserStore()

   const config = useRuntimeConfig()

   // Hyphenate common name for plant details url
   const commonNameHyph = props.listing.commonName
      .replace(/\s+/g, '-')
      .toLowerCase()

   const { listing } = props

   // User details
   const user = UserStore.getGrowerByID(listing.listerId)

   // If user deleted but plants remain! Plants may be orphaned..
   // .. Delete user's plants when deleting user!
   import userIcon from '@/assets/user.png'
   let userImage
   if (user) {
      // ie. if user exists
      userImage = user.image
         ? `${config.public.supabase.url}/storage/v1/object/public/images/${user.image}`
         : userIcon
   }
</script>

<template>
   <div
      class="shadow rounded overflow-hidden flex justify-between mb-6 mt-6"
   >
      <div class="flex items-center flex-col sm:flex-row">
         <div class="sm:hidden w-full">
            <PlantRecentPostsCardMob
               :listing="listing"
               :commonNameHyph="commonNameHyph"
               :user="user"
               :userImage="userImage"
            />

            <div
               v-if="showDivider"
               class="w-full mt-9 mb-0"
            >
               <UDivider
                  :ui="{
                     border: {
                        size: {
                           horizontal: 'dark:border-t-4',
                        },
                        base: 'border-gray-600 dark:border-gray-900',
                     },
                  }"
               />
            </div>
         </div>

         <div class="hidden sm:block">
            <PlantRecentPostsCardWide
               :listing="listing"
               :commonNameHyph="commonNameHyph"
               :user="user"
               :userImage="userImage"
            />
         </div>
      </div>
   </div>
</template>
