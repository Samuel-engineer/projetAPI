<template>
    <div class="product-card">
      <img :src="product.imageUrl" alt="product image" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}</p>
    </div>
</template>
  
  <script>
  export default {
    props: {
      product: Object
    }
  };
  </script>
  
  <style scoped>
  .product-card {
    border: 1px solid #ccc;
    padding: 20px;
    text-align: center;
  }
  
  .product-card img {
    width: 100%;
    height: auto;
  }
  </style>
  