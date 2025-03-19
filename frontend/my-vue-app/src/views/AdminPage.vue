<template>
    <div>
      <NavbarAdmin />
      <div class="admin-container">
        <h1>Gestion des Produits</h1>
  
        <!-- Formulaire pour ajouter ou modifier un produit -->
        <div class="form-section">
          <h2>{{ editMode ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit' }}</h2>
          <form @submit.prevent="editMode ? updateProduct() : addProduct()" class="product-form">
            <!-- Champs de formulaire -->
            <div class="form-group">
              <label for="product-name">Nom du produit :</label>
              <input id="product-name" v-model="newProduct.name" placeholder="Nom du produit" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="product-description">Description du produit :</label>
              <textarea id="product-description" v-model="newProduct.description" placeholder="Description du produit" required class="form-textarea"></textarea>
            </div>
            <div class="form-group">
              <label for="product-price">Prix (€) :</label>
              <input id="product-price" v-model.number="newProduct.price" placeholder="Prix (€)" type="number" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="product-stock">Stock disponible :</label>
              <input id="product-stock" v-model.number="newProduct.stock" placeholder="Stock disponible" type="number" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="product-image">URL de l'image du produit :</label>
              <input id="product-image" v-model="newProduct.image" placeholder="URL de l'image" required class="form-input" />
            </div>
            <button type="submit" class="submit-btn">{{ editMode ? 'Mettre à jour' : 'Ajouter Produit' }}</button>
          </form>
        </div>
  
        <!-- Liste des produits -->
        <div class="product-list-section">
          <h2>Liste des Produits</h2>
          <ul class="product-list">
            <li v-for="product in products" :key="product.id" class="product-item">
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
                <p><strong>Prix :</strong> {{ product.price }}€</p>
                <p><strong>Stock :</strong> {{ product.stock }}</p>
                <p><strong>Image :</strong> 
                <img :src="product.image" alt="Image du produit" class="product-image" /></p>
              </div>
              <button @click="loadProduct(product)" class="edit-btn">Modifier</button>
              <button @click="deleteProduct(product.id)" class="delete-btn">Supprimer</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { api } from "@/services/api";
  import NavbarAdmin from "@/components/NavbarAdmin.vue";
  
  export default {
    components: { NavbarAdmin },
    data() {
      return {
        newProduct: {
          name: '',
          description: '',
          price: 0,
          stock: 0,
          image: '',
        },
        editMode: false, // Mode édition
        products: [],
      };
    },
    created() {
      this.fetchProducts();
    },
    methods: {
      // Récupérer la liste des produits
      async fetchProducts() {
        this.products = await api.getProducts();
      },
      
      // Ajouter un nouveau produit
      async addProduct() {
        await api.addProducts(this.newProduct);
        
        this.fetchProducts();
        this.newProduct = { name: '', description: '', price: 0, stock: 0, image: '' };
      },
      
      // Charger un produit pour l'édition
      loadProduct(product) {
        this.newProduct = { ...product };
        this.editMode = true;
      },
      
      // Mettre à jour un produit
      async updateProduct() {
        await api.updateProducts(this.newProduct.id, this.newProduct);
        this.fetchProducts();
        this.newProduct = { name: '', description: '', price: 0, stock: 0, image: '' };
        this.editMode = false;
      },
  
      // Supprimer un produit
      async deleteProduct(productId) {
        await api.delete(productId);
        this.fetchProducts();
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* Global styles for admin container */
  .admin-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Section styling */
  .form-section, .product-list-section {
    margin-bottom: 40px;
  }
  
  /* Form styling */
  .product-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .form-input, .form-textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .form-textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .submit-btn {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-btn:hover {
    background-color: #218838;
  }
  
  /* Product list styling */
  .product-list {
    list-style: none;
    padding: 0;
  }
  
  .product-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 20px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .product-info {
    flex-grow: 1;
  }
  
  .product-info h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .product-info p {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .product-image {
    max-width: 100px;
    height: auto;
    margin-top: 10px;
    border-radius: 5px;
  }
  
  /* Delete button */
  .delete-btn {
    padding: 8px 16px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .delete-btn:hover {
    background-color: #c82333;
  }
  </style>
  