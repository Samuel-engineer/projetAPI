<template>
    <div>
      <NavBar/>
      <div class="recommendations-section">
        <h2>Produits recommandés</h2>
        <div v-if="recommendations.length > 0">
          <ul>
            <li v-for="product in recommendations" :key="product.id" class="product-item">
              <h4>{{ product.name }}</h4>
              <p>{{ product.description }}</p>
              <p><strong>Prix :</strong> {{ product.price }}€</p>
            </li>
          </ul>
        </div>
        <p v-else>Aucune recommandation disponible.</p>
      </div>
    </div>
</template>
  
  <script>
  import {api} from "@/services/api";
  import NavBar from "@/components/NavBar.vue"
  
  export default {
    components: {
    NavBar

},
    data() {
      return {
        recommendations: [],
      };
    },
    created() {
      this.fetchRecommendations();
    },
    methods: {
      async fetchRecommendations() {
        this.recommendations = api.recommendations(this.userId);
      }
    },
  };
  </script>
  
<style scoped>
  .recommendations-section {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .product-item {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }
  
  .product-item h4 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #444;
  }
  
  .product-item p {
    font-size: 14px;
    color: #666;
  }
  
  .product-item strong {
    font-weight: bold;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 15px;
  }
  
  p {
    margin: 0;
  }
  
  @media (min-width: 768px) {
    .recommendations-section ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  
    .product-item {
      padding: 20px;
    }
  
    .product-item h4 {
      font-size: 20px;
    }
  
    .product-item p {
      font-size: 16px;
    }
  }
</style>
  
  