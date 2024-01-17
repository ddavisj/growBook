export const useUserStore = defineStore('UserStore', {
   state: () => {
      return {
         growers: [], // delineate users, ie. growers vs browsers
      }
   },
   getters: {
      getGrowerByID: state => userId =>
         state.growers.find(grower => grower.id === userId),
   },
   actions: {
      async getUsers() {
         const { data: growers } = await useFetch(`/api/users`)
         this.growers = growers.value
      },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
