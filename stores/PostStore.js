export const usePostStore = defineStore('PostStore', {
   state: () => {
      return {
         recentPosts: [],
         myPosts: [],
      }
   },
   getters: {
      getMyPosts: state => userId =>
         state.myPosts.find(post => post.id === +plantId),
      getPostByID: state => plantId =>
         state.recentPosts.find(
            post => post.id === +plantId
         ),
   },
   actions: {
      async loadPost(id) {
         const { data } = await useFetch(`/api/plant/${id}`)
         this.recentPosts.push(data.value)
         return data.value
      },
      async loadRecentPosts() {
         if (this.recentPosts.length <= 1) {
            // ie. if just one or no posts loaded (user adds before visiting home page)
            const { data: posts } = await useFetch(
               '/api/plant/listings/get-latest'
            )
            this.recentPosts = posts.value
         }
      },
      addRecentPost(post) {
         this.recentPosts.unshift(post)
      },
      addMyPost(post) {
         this.myPosts.unshift(post)
      },
      async loadMyPosts(userId) {
         if (this.myPosts.length <= 1) {
            const { data } = await useFetch(
               `/api/plant/listings/user/${userId}`
            )
            this.myPosts = data.value
         }
      },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(
      acceptHMRUpdate(usePostStore, import.meta.hot)
   )
}
