<template>
  <div class="login-container">
      <div class="login-form-container">
          <form id="loginForm" @submit="handleSubmit" novalidate autocomplete="off">
              <h3>LOGIN</h3>

              <div v-if="errors.length" class="error-box">
                  <ul>
                      <li v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
              </div>

              <div class="form-group">
                  <input type="email" id="uEmail" name="uEmail" class="form-control" placeholder="enter your email"
                      v-model="loginObj.email" />
              </div>

              <div class="form-group">
                  <input type="password" id="uPass" name="uPass" class="form-control"
                      placeholder="enter your password" v-model="loginObj.pass" />
              </div>

              <div class="form-group">
                  <input type="submit" value="login now" class="btn">
                  <p>don't have an account? <router-link @click="scrollToTop()" to="/register">create one
                      </router-link>
                  </p>
                  <p> <router-link to="/logadmin"> Are you a Admin ?</router-link></p>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
  import { api } from '../services/api';
  export default {
  name: 'LoginPage',

  data() {
      return {
          loginObj: { email: "", pass: "" },
          
          errors: [],
      }
  },

  methods: {

      scrollToTop() {
          window.scrollTo(0, 0);
      },

      async login() {
        try {
          const response = await api.login({
            email: this.loginObj.email,
            password: this.loginObj.pass
          });

          if (response.token) {
            localStorage.setItem('token', response.token);  // Stocker le token JWT
            this.$router.push('/home');  // Rediriger après connexion réussie
          } else {
            throw new Error('Token non fourni');
          }
        } catch (error) {
          console.error('Erreur de connexion:', error);
          this.errors.push('Invalid credentials or error during login');
        }
      },

      async handleSubmit(e) {
          this.errors = [];

          if (!this.loginObj.email) {
              this.errors.push("Entering a email is required");
          }
          else {
              if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.loginObj.email)) {
                  this.errors.push('Email must be valid');
              }
          }


          if (!this.loginObj.pass) {
              this.errors.push('Password is required');
          }

          if (!this.errors.length == 0) {
              e.preventDefault();
          }
          else {
              e.preventDefault();
              this.login();
              this.$router.push('/home');  // Rediriger après connexion réussie
          }
      }

  }

}
</script>

<style scoped>
.login-container {
  padding: 2rem 9%;
}

.login-container .login-form-container {
  background-image: url('https://www.shutterstock.com/shutterstock/photos/2467126597/display_1500/stock-photo-cyber-security-and-security-password-login-online-concept-hands-typing-and-entering-username-and-2467126597.jpg');
  background-size: cover; /* Makes the background cover the entire container */
  background-position: center; /* Centers the image */
  height: 80vh;
}


.login-container .login-form-container form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;
  width: 100%;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: .5rem;
  animation: fadeUp .4s linear;
}

.login-container .login-form-container form h3 {
  padding-bottom: 1rem;
  font-size: 2rem;
  font-weight: bolder;
  text-transform: uppercase;
  color: #130f40;
  margin: 0;
}

.login-container .login-form-container form .form-control {
  margin: .7rem 0;
  border-radius: .5rem;
  background: #f7f7f7;
  padding: 2rem 1.2rem;
  font-size: 1.6rem;
  color: #130f40;
  text-transform: none;
  width: 100%;
  border: none;
}

.login-container .login-form-container form .btn {
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 100%;
}

.login-container .login-form-container form p {
  padding-top: 1rem;
  font-size: 1.5rem;
  color: #e90000;
  margin: 0;
}

.login-container .login-form-container form p a {
  color: #c398c5;
}

.login-container .login-form-container form p a:hover {
  color: #130f40;
  text-decoration: underline;
}

.login-container .login-form-container form .error-box {
  background-color: #fff9fa;
  box-sizing: border-box;
  border: 2px solid rgba(255, 66, 79, .2);
  border-radius: 2px;
  font-size: 12px;
  margin-bottom: 20px;
}

.login-container .login-form-container form .error-box ul {
  list-style-type: none;
  margin: 0;
  padding: 10px 0px;
}

.login-container .login-form-container form .error-box ul li {
  padding-left: 10px;
  color: rgb(182, 0, 0);
}
</style>
  