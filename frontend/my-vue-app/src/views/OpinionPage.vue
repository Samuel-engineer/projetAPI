<template>
  <div>
    <NavBar />
    <div class="reviews-section">
      <h2>Choisir un produit pour laisser un avis</h2>
      <div>
        <label for="product-select">Sélectionner un produit :</label>
        <select v-model="selectedProductId" @change="fetchReviews" id="product-select">
          <option value="" disabled>Sélectionnez un produit</option>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>
      </div>

      <h2>Avis pour le produit</h2>
      <div v-if="reviews.length > 0">
        <ul>
          <li v-for="review in reviews" :key="review.id" class="review-item">
            <h4>Note : {{ review.rating }}/5</h4>
            <p>{{ review.comment }}</p>
            <p><strong>Utilisateur :</strong> {{ review.user_id }}</p>
          </li>
        </ul>
      </div>
      <p v-else>Aucun avis pour ce produit.</p>

      <h3>Laisser un avis</h3>
      <form @submit.prevent="submitReview" v-if="selectedProductId">
        <div>
          <label for="rating">Note :</label>
          <select v-model="newReview.rating" required>
            <option value="" disabled>Choisir une note</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <div>
          <label for="comment">Commentaire :</label>
          <textarea v-model="newReview.comment" required></textarea>
        </div>
        <button type="submit">Envoyer l'avis</button>
      </form>
    </div>
  </div>
</template>

<script>
import { api } from "@/services/api"; // Import API
import NavBar from "@/components/NavBar.vue"; // Import NavBar component

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      products: [], // Liste des produits
      selectedProductId: null, // ID du produit sélectionné
      reviews: [],
      newReview: {
        rating: null,
        comment: '',
      },
    };
  },
  created() {
    this.fetchProducts(); // Charger les produits lors de la création du composant
  },
  methods: {
    // Méthode pour récupérer les produits depuis l'API
    async fetchProducts() {
      try {
        this.products = await api.getProducts(); // Remplacez par votre méthode API pour obtenir les produits
         // Stocker les produits
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    },

    // Méthode pour récupérer les avis du produit sélectionné
    async fetchReviews() {
      if (!this.selectedProductId) return; // Sortir si aucun produit n'est sélectionné
      try {
        this.reviews = await api.fetchReviews(this.selectedProductId); // Passer le productId dans l'appel d'API
          // Stocker les avis
      } catch (error) {
        console.error('Erreur lors de la récupération des avis :', error);
      }
    },

    // Méthode pour soumettre un avis
    async submitReview() {
      try {
        await api.submitReview(this.selectedProductId, this.newReview); // Envoyer l'avis avec le productId et les données du formulaire
        this.fetchReviews(); // Rafraîchir les avis après soumission
        this.newReview = { rating: null, comment: '' }; // Réinitialiser le formulaire
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'avis :", error);
      }
    },
  },
};
</script>

<style scoped>
.reviews-section {
  padding: 20px;
}
.review-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
