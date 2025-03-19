import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Products from '../views/ProductsPage.vue';
import Login from '../views/LoginPage.vue';
import Register from '../views/RegisterPage.vue';
import checkout from "../views/CheckOut.vue";
import OrderDetails from "../views/OrdersDetails.vue";
import AdvicePage from "../views/AdvicePage.vue";
import OpinionPage from "../views/OpinionPage.vue";
import AdminLogPage from '@/views/AdminLogPage.vue';
import AdminPage from '@/views/AdminPage.vue';
import AdminCart from '@/views/AdminCart.vue';
import adminUsers from '@/views/adminUsers.vue';
import {jwtDecode} from 'jwt-decode';


//Define your routes
const routes = [
  { path: '/', name: "LoginPage", component: Login },
  { path: '/products', component: Products,  meta: { requiresAuth: true }},
  { path: '/home', component: Home,  meta: { requiresAuth: true }}, 
  { path: '/order', component: OrderDetails,  meta: { requiresAuth: true }},
  { path: '/checkout', component: checkout,  meta: { requiresAuth: true }},
  { path: '/opinion', component: OpinionPage,  meta: { requiresAuth: true }},
  { path: '/advice', component: AdvicePage},
  { path: '/logadmin', component: AdminLogPage },
  { path: '/adminpage',  component: AdminPage },
  { path: '/register', component: Register },
  { path: '/adminusers',  component: adminUsers },
  { path: '/admincart', component: AdminCart },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),  
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Obtenir le temps actuel en secondes (timestamp Unix)
      localStorage.setItem('userId', decodedToken.id)
      // Vérifier si le token a expiré en comparant `exp` avec le temps actuel
      if (decodedToken.exp > currentTime) {
        isAuthenticated = true; // Le token est valide et non expiré
      } else {
        localStorage.removeItem('token'); // Supprimer le token expiré du localStorage
      }
    } catch (error) {
      // Si le token est invalide ou corrompu, supprimer du localStorage
      localStorage.removeItem('token');
    }
  }

  // Si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'LoginPage' });  // Rediriger vers la page de connexion si non authentifié
    } else {
      next();  // Continuer vers la route si authentifié
    }
  } else {
    next();  // Continuer si la route ne nécessite pas d'authentification
  }
});


export default router;


