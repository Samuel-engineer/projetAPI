<template>
  <div>
    <ul v-if="products.length">
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3 class="product-title">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }}€</p>
          <button @click="addToCart(product)" class="add-to-cart-btn">Ajouter au panier</button>
        </div>
      </div>
    </ul>
    <p v-else class="no-products">Aucun produit trouvé.</p>
  </div>
</template>

  
  <script>
  import { api } from '../services/api';
  
  export default {
    data() {
      return {
        products: []
      };
    },
    methods: {
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Produit ajouté au panier');
    }
  },
    async created() {
      try {
        this.products = await api.getProducts();
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    }
  };
  </script>
  
  <style scoped>
/* Container for the entire product section */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
  align-items: start;
}

/* Each product card */
.product-card {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  max-width: 300px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

/* Product image */
.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Product title */
.product-title {
  font-size: 18px;
  margin: 10px 0;
  color: #333;
}

/* Product price */
.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 10px;
}

/* Button for adding to cart */
.add-to-cart-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}

/* Message when no products are found */
.no-products {
  text-align: center;
  font-size: 18px;
  color: #777;
  margin-top: 20px;
}

</style>
