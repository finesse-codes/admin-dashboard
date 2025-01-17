import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as { 
      id: number;
      email: string; 
      username: string;
      role: string;
      updatedAt: string;
      blocked: boolean;
      confirmed: boolean;
      provider: string;
     } | null, // Reactive state
  }),
  actions: {
    setUser(userData: any ) {
      console.log('starting to set user:', userData)
      this.user = userData;
    },
    logout() {
      this.user = null;
    }
  },
  persist: true,
})