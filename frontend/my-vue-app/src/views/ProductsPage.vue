<template>
    <div class="products-page">
      <!-- Navbar -->
      <NavBar/>
  
      <!-- Page Title -->
      <header class="page-header">
        <h1>Our Products</h1>
        <p>Explore a wide range of high-quality products!</p>
      </header>
  
      <!-- Product List -->
      <section class="products-section">
        <ProductList />
      </section>
    </div>
  </template>
  
  <script>
  import ProductList from '@/components/ProductList.vue';
  import NavBar from '@/components/NavBar.vue';
  
  export default {
    components: {
      ProductList,
      NavBar
    },
    mounted() {
      
    },
  };
  </script>
  
  <style scoped>
  /* Navbar Styles */
  
  
  /* Page Header Styles */
  .page-header {
    text-align: center;
    padding: 2rem 0;
    background-color: #f4f4f4;
  }
  
  .page-header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .page-header p {
    font-size: 1.25rem;
    color: #666;
  }
  
  /* Product Section */
  .products-section {
    padding: 2rem;
    background-color: #fff;
  }
  </style>
  