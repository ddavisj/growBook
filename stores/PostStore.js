export const usePostStore = defineStore('PostStore', {
   state: () => {
      return {
         posts: [],
      }
   },
   getters: {},
   actions: {
      async loadLatestPosts() {
         if (!this.posts.length) {
            const { data: posts } = await useFetch(
               '/api/plant/listings/get-latest'
            )
            this.posts = posts.value
         }
      },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
}
