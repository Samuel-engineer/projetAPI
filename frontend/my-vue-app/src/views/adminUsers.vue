<template>
    <div>
      <NavbarAdmin />
      <div class="admin-container">
        <h1>Gestion des Utilisateurs</h1>
        <ul class="user-list">
          <li v-for="user in users" :key="user.id" class="user-item">
            <div class="user-info">
              <p><strong>Id :</strong> {{ user.id }}</p>
              <p><strong>Email :</strong> {{ user.email }}</p>
              

            </div>
            <button @click="deleteUser(user.id)" class="delete-btn">Supprimer Compte</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import NavbarAdmin from "@/components/NavbarAdmin.vue";
  import axios from "axios";

  
  export default {
    components: { NavbarAdmin },
    data() {
      return {
        users: [],
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      // Récupérer la liste des utilisateurs
      async fetchUsers() {
        const response = await axios.get('http://localhost:5000/api/admin/users');
        this.users = response.data;
      },
  
      // Supprimer un utilisateur
      async deleteUser(userId) {
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
        this.fetchUsers();
      },
    },
  };
  </script>
  <style scoped>
/* Global Styles */
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f6f9;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

h1 {
  font-size: 32px;
}

h2 {
  font-size: 24px;
  color: #555;
}

ul {
  list-style-type: none;
  padding: 0;
}

/* Form Styling */
.form-section {
  margin-bottom: 50px;
}

.product-form, .order-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s;
}

.form-input:focus, .form-textarea:focus {
  border-color: #007bff;
  outline: none;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn, .cancel-btn, .status-btn, .delete-btn, .edit-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn {
  background-color: #28a745;
  color: white;
}

.submit-btn:hover {
  background-color: #218838;
}

/* Button Styling */
.edit-btn, .status-btn {
  background-color: #ffc107;
  color: white;
}

.edit-btn:hover, .status-btn:hover {
  background-color: #e0a800;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
}

.cancel-btn:hover, .delete-btn:hover {
  background-color: #c82333;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

/* Product List Styling */
.product-list, .order-list, .user-list {
  margin: 0;
  padding: 0;
}

.product-item, .order-item, .user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.product-info, .order-info, .user-info {
  flex-grow: 1;
}

.product-info h3, .order-info h3, .user-info h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.product-info p, .order-info p, .user-info p {
  font-size: 16px;
  margin-bottom: 5px;
  color: #666;
}

/* Image Styling */
.product-image {
  max-width: 100px;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Table Styling */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 16px;
}

th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

td {
  background-color: #fff;
}

tr:hover {
  background-color: #f1f1f1;
}


</style>
  