<template>
    <NavBar/>
    <div class="checkout">
      <h1>Votre Panier</h1>
  
      <div v-if="cartItems.length > 0" class="cart-items">
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <img :src="item.image" :alt="item.name" class="product-image"/>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.price }}€</p>
            <div class="quantity-controls">
              <button @click="updateQuantity(item, 'decrease')">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item, 'increase')">+</button>
            </div>
            <button @click="removeItem(item.id)" class="remove-btn">Retirer</button>
          </div>
        </div>
  
        <div class="cart-summary">
          <h3>Total : {{ totalAmount }}€</h3>
          <button @click="validateOrder" class="checkout-btn">Valider la commande</button>
        </div>
      </div>
  
      <p v-else>Votre panier est vide.</p>
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
        cartItems: [], // Les articles du panier seront chargés ici
      };
    },
    computed: {
      totalAmount() {
        // Calcul du montant total du panier
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    },
    methods: {
      updateQuantity(item, action) {
        // Mise à jour de la quantité d'un article dans le panier
        if (action === 'increase') {
          item.quantity++;
        } else if (action === 'decrease' && item.quantity > 1) {
          item.quantity--;
        }
        this.saveCart(); // Sauvegarder la mise à jour du panier
      },
      removeItem(itemId) {
        // Supprimer un article du panier
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.saveCart(); // Sauvegarder le panier après suppression
      },
      saveCart() {
        // Sauvegarder le panier dans le localStorage
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      },
      loadCart() {
        // Charger les articles du panier depuis le localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
        }
      },
      async validateOrder() {
        try {
           
          // Vérification des stocks avant validation
          const items = this.cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            
          }));
  
          const response = await api.verifyCart({ items });
          
          
  
          if (response.status === 200) {
            // Si tout va bien, passer la commande
            alert("Stock suffisant. Passons à la commande.");
            await this.completeOrder(); // Logique pour valider la commande (ex. redirection paiement)
          } 
          else {
            alert('Certains produits ne sont pas en stock en quantité suffisante.');
            console.error('Problème de stock', response.data.stockIssues);
          }
        }catch (error) {
          console.error('Erreur lors de la validation de la commande:', error);
          alert('Erreur lors de la validation de la commande:', error)
        }
      },
      async completeOrder() {
        // Appeler l'API pour finaliser la commande
        try {
          const response = await api.completeCart({ items: this.cartItems });
          if (response.status === 201) {
            alert('Commande validée avec succès !');
            this.clearCart();
          }
        } catch (error) {
          console.error('Erreur lors de la finalisation de la commande:', error);
        }
      },
      async clearCart() {
        this.cartItems = [];
        this.saveCart();
      },
    },
    mounted() {
      // Charger le panier au montage du composant
      this.loadCart();
    },
  };
</script>
   
<style scoped>
/* Container for the checkout page */
.checkout {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
}

/* Cart items container */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Individual cart item */
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
  margin-left: 20px;
}

.item-details h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.item-details p {
  font-size: 16px;
  color: #27ae60;
  margin-bottom: 10px;
}

/* Quantity controls */
.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-controls button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.quantity-controls button:hover {
  background-color: #2980b9;
}

.quantity-controls span {
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
}

/* Remove button */
.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #c0392b;
}

/* Cart summary */
.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cart-summary h3 {
  font-size: 22px;
  color: #333;
}

/* Checkout button */
.checkout-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #219150;
}

/* Empty cart message */
p {
  text-align: center;
  font-size: 18px;
  color: #777;
}

</style>
  