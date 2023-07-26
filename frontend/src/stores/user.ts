import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

enum Role {
  READER = 'reader',
  WRITER = 'writer'
}


interface User {
  name: string
  email: string
  picture: string
  admin: boolean
  logRole: Role
  dashBoardRole: Role
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),


  actions: {
    async getUser () {
      const resp = await api.get('/auth/profile')
      console.log('resp', resp)
    }
  }
});
