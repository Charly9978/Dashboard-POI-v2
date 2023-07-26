import { boot } from 'quasar/wrappers'
import { api } from './axios'
import { useUserStore } from 'src/stores/user'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ( { store,redirect } ) => {
  try {
    const resp = await api.get('/auth/profile')
    const userStore = useUserStore(store)
    userStore.user= resp.data
  } catch (error) {
    redirect('http://localhost:3000/auth/google')
  }
})
