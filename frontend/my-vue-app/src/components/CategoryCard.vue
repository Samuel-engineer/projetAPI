<template>
    <div class="category-card">
      <img :src="category.imageUrl" alt="category image" />
      <h3>{{ category.name }}</h3>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      category: Object
    }
  };
  </script>
  
  <style scoped>
  .category-card {
    width: 150px;
    text-align: center;
  }
  
  .category-card img {
    width: 100%;
    height: auto;
  }
  </style>
  