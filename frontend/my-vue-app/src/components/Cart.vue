<template>
    <div>
      <h1>Produits</h1>
      <ul v-if="products.length">
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ product.price }}€
        </li>
      </ul>
      <p v-else>Aucun produit trouvé.</p>
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
    async created() {
      try {
        this.products = await api.getProducts();
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    }
  };
  </script>
  