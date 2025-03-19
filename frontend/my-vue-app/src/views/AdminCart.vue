<template>
  <div>
    <NavbarAdmin />
    <div class="admin-container">
      <h1>Gestion des Commandes</h1>

      <div class="cart-list-section">
        <h2>Liste des Commandes</h2>

        <ul class="cart-list">
          <li v-for="cart in carts" :key="cart.id" class="cart-item">
            <div class="cart-info">
              <h3>Commande #{{ cart.id }}</h3>
              <p><strong>Utilisateur :</strong> {{ cart.user_id }}</p>
              <p><strong>Statut :</strong> {{ cart.status }}</p>
            </div>
            <button @click="updatecartStatus(cart.id, 'validated')" class="status-btn">
              Expédier
            </button>

            <button @click="cancelcart(cart.id)" class="cancel-btn">
              Annuler
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import NavbarAdmin from "@/components/NavbarAdmin.vue";

  export default {
    components: { NavbarAdmin },
    data() {
      return {
        carts: [],
      };
    },
    mounted() {
      this.fetchcarts();
    },
    methods: {
      // Récupérer la liste des commandes
      async fetchcarts() {
        try {
          const response = await axios.get('http://localhost:5000/api/orders');
          this.carts = response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des commandes :', error);
        }
      },

      // Mettre à jour le statut d'une commande
      async updatecartStatus(cartId, status) {
        try {
          const response = await axios.put(`http://localhost:5000/api/orders/${cartId}`, { status });
          if (response.status === 200) {
            this.fetchcarts();  // Rafraîchir les commandes après mise à jour
          } else {
            console.error('Erreur lors de la mise à jour du statut');
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour du statut :', error);
        }
      },

      // Annuler une commande avec confirmation
      async cancelcart(cartId) {
        if (confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
          try {
            await axios.delete(`http://localhost:5000/api/orders/${cartId}`);
            this.fetchcarts();  // Rafraîchir les commandes après annulation
          } catch (error) {
            console.error('Erreur lors de l\'annulation de la commande :', error);
          }
        }
      }
    }
  };
</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart-list-section {
  margin-top: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
}

.cart-info h3 {
  margin: 0;
}

.status-btn {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
