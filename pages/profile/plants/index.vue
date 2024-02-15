<script setup>
   // My posts - viewable by user only

   definePageMeta({
      layout: 'wide',
      middleware: ['page-auth'],
   })

   const user = useSupabaseUser()
   const AuthStore = useAuthStore()
   const PostStore = usePostStore()

   PostStore.loadMyPosts(user.value.id)

   const handleDelete = async id => {
      await $fetch(`/api/plant/listings/${id}`, {
         method: 'delete',
      })
      // Remove listing from this page
      PostStore.myPosts = PostStore.myPosts.filter(
         listing => listing.id !== id
      )
      // Remove listing from P state
      PostStore.posts = PostStore.posts.filter(
         post => post.id !== id
      )
   }
</script>

<template>
   <div>
      <div class="flex justify-between mt-24 items-center">
         <h1 class="text-6xl">My Plants</h1>
         <PlantAddButton link="/profile/plants/create" />
      </div>
      <h3 class="text-xl text-blue-400 mt-5">
         <NuxtLink to="/user/account">My account</NuxtLink>
      </h3>
      <div
         class="shadow rounded pt-3 mt-5"
         v-if="
            !PostStore.myPosts.length && AuthStore.username
         "
      >
         <NuxtLink to="/profile/plants/create">
            <UButton class="text-lg">
               No plants added yet.. Add one now!
            </UButton>
         </NuxtLink>
      </div>
      <div
         class="shadow rounded pt-3 mt-5"
         v-if="
            !PostStore.myPosts.length && !AuthStore.username
         "
      >
         <NuxtLink to="/user/register">
            <UButton class="text-lg">
               Complete your registration to add plants!
            </UButton>
         </NuxtLink>
      </div>

      <div
         class="shadow rounded pt-3 mt-5"
         v-if="PostStore.myPosts.length"
      >
         <PlantMyListingCard
            v-for="listing in PostStore.myPosts"
            :key="listing.id"
            :listing="listing"
            @delete-click="handleDelete"
         />
      </div>
   </div>
</template>
