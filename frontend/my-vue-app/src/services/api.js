import axios from "axios";

const API_URL = 'http://localhost:5000/api';  // L'URL de ton backend Express

export const api = {
  async getProducts() {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  async getProduct(id) {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  },

  async register(user) {
    const response = await axios.post(`${API_URL}/users/register`, user);
    return response.data;
  },

  async login(credentials) {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  },
  createOrder(order) {
    return axios.post(`${API_URL}/orders`, order, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  },
  async verifyCart(cart) {
    const response = await axios.post(`${API_URL}/cartOrders/verify`, cart)
    return response
  },
  async completeCart(cart) {
    return await axios.post(
      `${API_URL}/cartOrders/complete`, cart,  // Corps vide pour la requête POST, car les headers sont dans l'autre paramètre
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
  },

  async printCart() {
    return await axios.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  },
  async recommendations(userId) {
    try {
      const token = localStorage.getItem('token');
      return await axios.get(`${API_URL}/recommendations/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    } catch (error) {
      console.error("Erreur lors de la récupération des recommandations :", error);
    }
  },
  async fetchReviews(productId) {
    try {
      const response = await axios.get(`${API_URL}/reviews/products/${productId}/review`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des avis :", error);
    }
  },
  async submitReview(productId, review) {

    const token = localStorage.getItem('token');
    return await axios.post(`${API_URL}/reviews/products/${productId}/review`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async get(endpoint) {
    return await axios.get(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  },
  async post(endpoint, data) {
    return await axios.post(`${API_URL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  },
  async delete(endpoint) {
    return await axios.delete(`${API_URL}/admin/products/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  },
  async loginadmin(user) {
    return await axios.post(`${API_URL}/admin/login`, user);

  },
  async addProducts(product) {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  },
  async updateProducts(productId, product) {
    const response = await axios.put(`${API_URL}/products/${productId}`, product);
    return response.data;
  },


};
