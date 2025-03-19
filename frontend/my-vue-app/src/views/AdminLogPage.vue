<template>
  <NavBar/>
    <div class="login-container">
      <h2>Connexion Administrateur</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p> <router-link to="/"> Are you a user ?</router-link></p>
        <p>don't have an account? <router-link  to="/register">create one</router-link></p>
      </form>
    </div>
  </template>
  
  <script>
  import { api } from "@/services/api";
  import NavBar from "@/components/NavBar.vue"
  
  export default {
    components: {
    NavBar
  },
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await api.loginadmin({ email: this.email, password: this.password });
          localStorage.setItem('token', response.data.token); // Stocker le token dans le localStorage
          this.$router.push('/adminpage'); // Rediriger vers la page admin
        } catch (error) {
          this.errorMessage = error.response?.data?.error || 'Erreur lors de la connexion';
        }
      }
    },
    mounted(){
      this.errorMessage =''
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    max-width: 400px;
    margin: auto;
  }
  
  .error {
    color: red;
  }
  </style>
  