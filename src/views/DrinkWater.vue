<template>
  <div>
    <form @submit.prevent='cadastrar'>
      <h2>Drink Water</h2>
      <div class='form-group'>
        <label for='consumoMl'>Quantidade</label>
        <input
          type='text'
          id='consumoMl'
          class='form-control'
          required
          autofocus
          v-model='consumoMl'
        />
      </div>
      <div class='form-group'>
        <label for='observacao'>Observação</label>
        <textarea id='observacao' class='form-control' required v-model='observacao'>
        </textarea>
      </div>
      <button class='btn btn-lg btn-success btn-block' type='submit'>
        Adicionar
      </button>
    </form>
    <br />
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <table class='table table-striped'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Quantidade</th>
          <th>Observacao</th>
          <th>Data/hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='historico in historicos' :key='historico.id'>
          <td>{{ historico.id }}</td>
          <td>{{ historico.consumoMl }}</td>
          <td>{{ historico.observacao }}</td>
          <td>{{ historico.dataHora }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'historicoConsumo',
  data () {
    return {
      consumoMl: '',
      observacao: '',
      total: '',
      historicos: []
    }
  },
  computed: {
    ...mapState(['usuario'])
  },
  methods: {
    cadastrar () {
      axios
        .post('drink-water/historicoConsumo/addHistorico', {
          consumoMl: this.consumoMl,
          observacao: this.observacao,
          usuario: this.usuario
        })
        .then(res => {
          console.log(res)
          this.consumoMl = ''
          this.observacao = ''
          this.atualizar()
        })
        .catch(error => console.log(error))
    },
    atualizar () {
      axios
        .get('/historicoConsumo/getByUser/' + this.usuario, {
          headers: { Accept: 'application/json' }
        })
        .then(res => {
          console.log(res)
          this.historicos = res.data
        })
        .catch(error => console.log(error))
    },
    calculaMeta () {
    }
  },
  created () {
    this.atualizar()
  }
}
</script>
