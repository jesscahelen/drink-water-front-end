<template>
  <div id="app" class="container">
    <div id="nav" class="row text-center">
      <router-link to="/">Home</router-link> |
      <router-link to="/drink-water">Drink Water</router-link> |
      <router-link to="/usuario">Profile</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>
