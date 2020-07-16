<template>
<div v-if="this.token">
    Olá, {{ this.$store.state.usuario }}!
    <span class='badge badge-info' v-if='this.autorizacoes'>{{ getAutorizacoes() }}</span>
    <br>
    <span class='badge badge-danger' v-on:click="logout()">logout</span>
    <!--<button type='button' class='btn btn-danger btn-sm' v-on:click="logout()">logout</button>-->
    <!--<p v-if="this.autorizacoes"> Usuário com autorizações: {{ getAutorizacoes() }} </p>-->
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
