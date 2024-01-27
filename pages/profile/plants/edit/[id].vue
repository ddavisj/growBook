<script setup>
   definePageMeta({
      layout: 'wide',
      middleware: ['page-auth'],
   })

   const route = useRoute()

   const PostStore = usePostStore()

   // Get ID from route
   const { id: plantId } = route.params

   const plant = PostStore.getMyPostByID(plantId)
   !plant ? PostStore.loadPost(plantId) : ''

   // console.log(
   //    'PostStore.myPosts.length',
   //    PostStore.myPosts.length
   // )

   // const plant = PostStore.myPosts.find(
   //    post => post.id === +plantId
   // )

   // console.log({ plant })
</script>

<template>
   <p>Editing: {{ plantId }}</p>
   <p>
      {{ plant }}
   </p>
</template>
