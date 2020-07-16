<template>
<div v-if="this.token">
    Olá, {{ this.$store.state.usuario }}!
    <button v-on:click="logout()">logout</button>
    <p v-if="this.autorizacoes"> Usuário com autorizações: {{ getAutorizacoes() }}</p>
</div>

<div v-else>
    Faça login para postar seu consumo de água :)
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'token', 'autorizacoes'
    ])
  },
  methods: {
    logout () {
      this.$store.commit('logout')
    },
    getAutorizacoes () {
      return this.autorizacoes.map(autorizacao => autorizacao.nome).join()
    }
  }
}
</script>
<style>
</style>
