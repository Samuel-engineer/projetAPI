<template>
    <div class="testimonial-card">
      <p>"{{ testimonial.text }}"</p>
      <img :src="testimonial.imageUrl" alt="testimonial image" />
      <h4>{{ testimonial.name }}</h4>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      testimonial: Object
    }
  };
  </script>
  
  <style scoped>
  .testimonial-card {
    max-width: 300px;
    text-align: center;
    padding: 20px;
    background-color: #f0f0f0;
  }
  </style>
  