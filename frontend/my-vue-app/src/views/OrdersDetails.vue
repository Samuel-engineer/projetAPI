<template>
  <NavBar/>
  <div>
    <h1>Mes Paniers</h1>
    
    <div v-if="carts.length">
      <div v-for="(cart, index) in carts" :key="index" class="cart">
        <h2>Panier #{{ cart.id }} - Statut : {{ cart.status }}</h2>
        <ul>
          <li v-for="(item, itemIndex) in cart.items" :key="itemIndex">
            <div class="cart-item">
              <img :src="item.image" :alt="item.name" class="cart-item-image" />
              <div class="cart-item-details">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
                <p>Prix : {{ item.price }}€</p>
                <p>Quantité : {{ item.quantity }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <p v-else>Aucun panier trouvé ou une erreur est survenue.</p>
  </div>
</template>

<script>
  import {api} from '@/services/api'; // API pour requêtes HTTP
  import NavBar from "@/components/NavBar.vue"

export default {
  components: {
    NavBar

},
  data() {
    return {
      carts: []
    };
  },
  methods: {
    async fetchCart() {
      try {
        const response = await api.printCart();
        
        this.carts = await response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchCart();
  }
};
</script>



<style>
.cart {
  margin-bottom: 40px; /* Séparation entre les différents paniers */
}
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.cart-item-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
}
.cart-item-details {
  flex-grow: 1;
}
</style>
