<template>
<div v-if="this.verificaUser()" class="text-center">
    <h1> Olá, {{ this.$store.state.usuario }}! </h1>
    <button v-on:click="logout()">logout</button>
    <form @submit.prevent='trocarSenha'>
      <h2>Trocar Senha</h2>
    <div class='form-group'>
        <label for='antiga-senha'>Antiga Senha</label>
        <input id='antiga-senha' style="display: inline-block;" class='form-control ' required v-model='antigaSenha'>
        <label for='nova-senha'>NovaSenha</label>
        <input id='nova-senha' style="display: inline-block;" class='form-control ' required v-model='novaSenha'>
    </div>
    <button class='btn btn-lg btn-success btn-block' type='submit'>
        Trocar Senha
    </button>
</form>
</div>

<div v-else class="text-center">
    Faça login para postar seu consumo de água :)
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['usuario'])
  },
  data () {
    return {
      antigaSenha: '',
      novaSenha: ''
    }
  },
  methods: {
    verificaUser () {
      if (this.$store.state.token) {
        return true
      } else {
        return false
      }
    },
    logout () {
      this.$store.commit('logout')
    },
    trocarSenha () {
      axios
        .post('usuario/changePass', {
          username: this.usuario,
          oldPass: this.antigaSenha,
          newPass: this.novaSenha
        })
        .then(res => {
          console.log(res)
          alert('Senha alterada com sucesso!')
          this.antigaSenha = ''
          this.novaSenha = ''
        })
        .catch(error => {
          console.log(error)
          alert(JSON.stringify(error))
        })
    }
  }
}
</script>
<style>
</style>
