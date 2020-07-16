<template>
  <div id="app" class="container">
    <user-bar/>
    <div id="nav" class="row text-center">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/drink-water">Drink Water</router-link> |
      <router-link to="/usuario">Profile</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import UserBar from './components/UserBar.vue'

export default {
  data () {
    return {
      menuUser: null
    }
  },
  created () {
    this.menuUser = this.verificaUser()
  },
  components: {
    'user-bar': UserBar
  },
  methods: {
    verificaUser () {
      if (this.$store.state.token) {
        return true
      } else {
        return false
      }
    }
  }

}
</script>
