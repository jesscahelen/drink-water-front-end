import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
})
axios.interceptors.response.use(res => {
  return res
}, error => {
  console.log(axios.defaults.baseURL)
  if (error.response.status === 403) {
    alert('Não autorizado!')
  } else if (error.response.status === 401) {
    store.commit('logout')
    router.push('/login')
  }
  throw error
})

axios.defaults.baseURL = 'http://localhost:8080/drink-water'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
