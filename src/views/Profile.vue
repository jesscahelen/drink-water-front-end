<template>
<div v-if="this.verificaUser()" class="text-center">
    <h1> Olá, {{ this.$store.state.usuario }}! </h1>
    <button v-on:click="logout()">logout</button>
    <h4>Meta Diária: {{ this.verificaMeta() }}mL</h4>
    <br>
    <form @submit.prevent='enviarMeta'>
        <div class='form-group'>
            <label for='meta-diaria'>Inserir Nova Meta</label>
            <input type="number" id='meta-diaria' style="display: inline-block;" class='form-control ' required v-model='metaDiaria'>
        </div>
        <button class='btn btn-lg btn-success btn-block' type='submit'>
            Inserir Meta Diaria
        </button>
    </form>
    <br>
    <form @submit.prevent='trocarSenha'>
      <h4>Trocar Senha</h4>
    <div class='form-group'>
        <label for='antiga-senha'>Antiga Senha</label>
        <input id='antiga-senha' type="password" style="display: inline-block;" class='form-control ' required v-model='antigaSenha'>
        <label for='nova-senha'>NovaSenha</label>
        <input id='nova-senha' type="password" style="display: inline-block;" class='form-control ' required v-model='novaSenha'>
    </div>
        <button class='btn btn-lg btn-success btn-block' type='submit'>
            Trocar Senha
        </button>
    </form>
    <br>
    <div v-if="this.verificaAdmin()" class="text-center">
        <h4>Seção Admins:</h4>
        <table class='table table-striped'>
        <thead>
        <tr>
          <th>Usuario</th>
          <th>Meta Diaria</th>
          <th>Autorizacoes</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='usuario in usuarios' :key='usuario.id'>
          <td>{{ usuario.nome }}</td>
          <td>{{ usuario.metadiaria ? usuario.metadiaria : 'Sem meta' }}</td>
         <td>{{ usuario.autorizacoes.map(autorizacao => autorizacao.nome).join() }}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <label>Novo Usuario</label>
    <form @submit.prevent='adicionarUser'>
    <div class='form-group'>
        <label for='nome-new-user'>Nome</label>
        <input id='nome-new-user' style="display: inline-block;" class='form-control ' required v-model='nomeNewUser'>
        <label for='senha-new-user'>Senha</label>
        <input id='senha-new-user' type="password" style="display: inline-block;" class='form-control ' required v-model='senhaNewUser'>
    </div>
        <button class='btn btn-lg btn-success btn-block' type='submit'>
            Adicionar Usuario
        </button>
    </form>
    <br>
    <form @submit.prevent='removerUser'>
    <div class='form-group'>
        <label for='remove-user'>Remover Usuário (Insira Nome)</label>
        <input id='remove-user' style="display: inline-block;" class='form-control ' required v-model='removeUser'>
    </div>
        <button class='btn btn-lg btn-success btn-block' type='submit'>
            Remover Usuario
        </button>
    </form>
    </div>
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
    ...mapState(['usuario', 'autorizacoes', 'metadiaria'])
  },
  data () {
    return {
      usuarios: [],
      antigaSenha: '',
      novaSenha: '',
      metaDiaria: '',
      nomeNewUser: '',
      senhaNewUser: '',
      removeUser: ''
    }
  },
  created () {
    this.atualizar()
  },
  methods: {
    atualizar () {
      if (this.verificaAdmin()) {
        axios
          .get('usuario/getAllComplete', {
            headers: { Accept: 'application/json' }
          })
          .then(res => {
            console.log(res)
            this.usuarios = res.data
          })
          .catch(error => console.log(error))
      }
    },
    verificaUser () {
      if (this.$store.state.token) {
        return true
      } else {
        return false
      }
    },
    verificaAdmin () {
      return this.getAutorizacoes().includes('ROLE_ADMIN')
    },
    verificaMeta () {
      if (this.metadiaria) {
        return this.metadiaria
      }
      return 'Sem meta!'
    },
    logout () {
      this.$store.commit('logout')
    },
    enviarMeta () {
      axios
        .post('usuario/setMetaDiaria', {
          nome: this.usuario,
          metadiaria: this.metaDiaria
        })
        .then(res => {
          console.log(res)
          this.$alert('Meta inserida com sucesso!', 'Sucesso', 'success')
          this.$store.state.metadiaria = this.metaDiaria
          this.metaDiaria = ''
          this.atualizar()
        })
        .catch(error => {
          console.log(error)
          alert(JSON.stringify(error))
        })
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
          this.$alert('Senha alterada com sucesso!', 'Sucesso', 'success')
          this.antigaSenha = ''
          this.novaSenha = ''
        })
        .catch(error => {
          console.log(error)
          alert(JSON.stringify(error))
        })
    },
    adicionarUser () {
      axios
        .post('usuario/addUser', {
          nome: this.nomeNewUser,
          senha: this.senhaNewUser,
          autorizacao: 'ROLE_USER'
        })
        .then(res => {
          console.log(res)
          this.$alert('Usuário ' + this.nomeNewUser + ' adicionado!', 'Sucesso', 'success')
          this.nomeNewUser = ''
          this.senhaNewUser = ''
          this.atualizar()
        })
        .catch(error => {
          console.log(error)
          alert(JSON.stringify(error))
        })
    },
    removerUser () {
      this.$confirm('Você tem certeza?', 'Remover usuário', 'question').then(() => {
        axios
          .post('usuario/deleteUser', {
            nome: this.removeUser
          })
          .then(res => {
            console.log(res)
            this.$alert('Usuário ' + this.removeUser + ' removido!', 'Sucesso', 'success')
            this.removeUser = ''
            this.atualizar()
          })
          .catch(error => {
            console.log(error)
            alert(JSON.stringify(error))
          })
      })
    },
    getAutorizacoes () {
      return this.autorizacoes.map(autorizacao => autorizacao.nome)
    }
  }
}
</script>
<style>
</style>
