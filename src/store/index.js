import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: null,
    usuario: null,
    metadiaria: null
  },
  mutations: {
    setUsuario (state, usuario) {
      state.usuario = usuario
    },
    setToken (state, token) {
      state.token = token
    },
    setMetaDiaria (state, metadiaria) {
      state.metadiaria = metadiaria
    },
    logout (state) {
      state.token = null
      state.usuario = null
      state.metadiaria = null
    }
  },
  actions: {
    login (context, { usuario, senha }) {
      axios
        .post('login', {
          username: usuario,
          password: senha
        })
        .then(res => {
          console.log(res)
          context.commit('setUsuario', usuario)
          context.commit('setToken', res.data.token)
          router.push('/')
        })
        .catch(error => console.log(error))
    },
    getUserInfo (context, { usuario }) {
      axios
        .get('usuario/get/' + usuario, {
          headers: { Accept: 'application/json' }
        })
        .then(res => {
          console.log(res)
          context.commit('setMetaDiaria', res.data.metadiaria)
          router.push('/')
        })
        .catch(error => console.log(error))
    }
  },
  modules: {}
})
