import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as { 
      email: string; 
      name: string;
      role: string;
     } | null, // Reactive state
  }),
  actions: {
    setUser(userData: { email: string; name: string; role: string; }) {
      console.log('starting to set user:', userData)
      this.user = userData;
    },
    logout() {
      this.user = null;
    }
  },
  persist: true,
})