<template>
  <div id="app">
    <nav>
      <!-- Links to different routes -->
      
    </nav>
    <login />
    <!-- This is where the routed components will be displayed -->
    <router-view />
  </div>
</template>

<script>
import login from "./views/LoginPage.vue"
export default {
  name: 'App',
  component : login
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  margin-bottom: 30px;
}

nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #42b983;
}
</style>
