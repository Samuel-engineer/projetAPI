<template>
    <div class="homepage">
      <!-- Navbar -->
      <nav aria-label="Main Navigation">
        <div class="navbar-brand">
          <RouterLink to="/home" class="navbar-item">BrandName</RouterLink>
        </div>
        <div class="navbar-menu">
          <div >
            <RouterLink to="/home" class="navbar-item">Home</RouterLink>
  
            <a href="#" class="navbar-item">Categories</a>
            <RouterLink to="/products" class="navbar-item">Featured Products</RouterLink>
            <RouterLink to="/checkout" class="navbar-item">Cart</RouterLink>
            <RouterLink to="/order" class="navbar-item">Orders</RouterLink>
            <RouterLink to="/opinion" class="navbar-item">Avis </RouterLink>
            <RouterLink to="/advice" class="navbar-item">Advice </RouterLink>



          </div>
        </div>    
      </nav>
    </div>
</template>

<style scoped>
/* General styles for the navbar */
nav {
  display: flex;                             /* Flexbox layout */
  justify-content: space-between;            /* Space between brand and menu */
  align-items: center;                       /* Vertically align items */
  padding: 1rem 2rem;                        /* Padding for spacing */
  background-color: #333;                    /* Dark background color */
  color: #fff;                               /* White text color */
}

.navbar-brand a {
  font-size: 1.5rem;                         /* Font size for brand name */
  font-weight: bold;                         /* Bold brand name */
  color: #fff;                               /* Brand text color */
  text-decoration: none;                     /* Remove underline from link */
  transition: color 0.3s;                    /* Smooth transition for hover */
}

.navbar-brand a:hover {
  color: #ff6200;                            /* Change color on hover */
}

/* Navbar menu items */
.navbar-menu div {
  display: flex;                             /* Flexbox for horizontal layout */
  gap: 1.5rem;                               /* Space between menu items */
}

.navbar-item {
  color: #2fc1e6;                               /* White text color */
  text-decoration: none;                     /* Remove underline */
  font-size: 1rem;                           /* Font size for links */
  padding: 0.5rem 1rem;                      /* Padding for clickable area */
  transition: background-color 0.3s,         /* Smooth background transition */
              color 0.3s;
}

.navbar-item:hover {
  background-color: #444;                    /* Darker background on hover */
  color: #ff6200;                            /* Highlighted color on hover */
  border-radius: 5px;                        /* Rounded corners for hover */
}

/* Responsive styles */
@media (max-width: 768px) {
  nav {
    flex-direction: column;                  /* Stack navbar vertically */
  }

  .navbar-menu div {
    flex-direction: column;                  /* Stack menu items vertically */
    align-items: center;                     /* Center align menu items */
    gap: 1rem;                               /* Reduce gap between items */
  }

  .navbar-item {
    padding: 1rem 0;                         /* Larger padding for touch devices */
  }
}


</style>

