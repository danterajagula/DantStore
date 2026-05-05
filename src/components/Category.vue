<template>
  <div class="category-section">
    <div class="category-header">
      <h3 class="category-title">Shop by Category</h3>
    </div>
    <div class="category-grid">
      <div 
        class="category-item"
        :class="{ active: selectedCategory === 'Speedcats' }"
        @click="selectedCategory = 'Speedcats'"
      >
        <div class="category-label">Speedcats</div>
        <img src="https://via.placeholder.com/200x150?text=Speedcats" alt="Speedcats">
      </div>
      <div 
        class="category-item"
        :class="{ active: selectedCategory === 'Pokemon' }"
        @click="selectedCategory = 'Pokemon'"
      >
        <div class="category-label">Pokemon</div>
        <img src="https://via.placeholder.com/200x150?text=Pokemon" alt="Pokemon">
      </div>
      <div 
        class="category-item"
        :class="{ active: selectedCategory === 'Suede' }"
        @click="selectedCategory = 'Suede'"
      >
        <div class="category-label">Suede</div>
        <img src="https://via.placeholder.com/200x150?text=Suede" alt="Suede">
      </div>
      <div 
        class="category-item"
        :class="{ active: selectedCategory === 'Lamello Ball' }"
        @click="selectedCategory = 'Lamello Ball'"
      >
        <div class="category-label">Lamello Ball</div>
        <img src="https://via.placeholder.com/200x150?text=Lamello+Ball" alt="Lamello Ball">
      </div>
    </div>

    <!-- Product Grid -->
    <div class="products-section">
      <h3 class="products-title">Featured Products</h3>
      <div class="products-grid">
        <div class="product-card" v-for="product in filteredProducts" :key="product.id" @click="viewProductDetail(product)">
          <div class="product-img">
            <img :src="product.image" :alt="product.name">
            <button 
              :class="['wishlist-heart', { active: store.isInWishlist(product.id) }]"
              @click.stop="toggleWishlist(product)"
              :title="store.isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
            >
              {{ store.isInWishlist(product.id) ? '♥' : '♡' }}
            </button>
          </div>
          <h4 class="product-name">{{ product.name }}</h4>
          <p class="product-price">PRICE {{ product.price }}</p>
          <div class="product-rating">
            <span class="rating-stars">★ {{ product.rating }}</span>
            <button class="add-btn" @click="addToCart(product)" title="Add to cart">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'Category',
  data() {
    return {
      store,
      selectedCategory: 'Speedcats',
      products: [
        {
          id: 1,
          name: "PUMA LaMelo Ball MB.04 Lo 'LaFrance'",
          price: '$182',
          rating: 4.8,
          image: 'https://via.placeholder.com/150x150?text=PUMA+LaMelo',
          category: 'Speedcats'
        },
        {
          id: 2,
          name: "PUMA LaMelo Ball MB.04 Lo 'LaFrance'",
          price: '$182',
          rating: 4.8,
          image: 'https://via.placeholder.com/150x150?text=PUMA+LaMelo',
          category: 'Speedcats'
        },
        {
          id: 3,
          name: "PUMA LaMelo Ball MB.04 Lo 'LaFrance'",
          price: '$182',
          rating: 4.8,
          image: 'https://via.placeholder.com/150x150?text=PUMA+LaMelo',
          category: 'Pokemon'
        },
        {
          id: 4,
          name: "PUMA LaMelo Ball MB.04 Lo 'LaFrance'",
          price: '$182',
          rating: 4.8,
          image: 'https://via.placeholder.com/150x150?text=PUMA+LaMelo',
          category: 'Pokemon'
        },
        {
          id: 5,
          name: "PUMA LaMelo Ball MB.04 Lo 'LaFrance'",
          price: '$182',
          rating: 4.8,
          image: 'https://via.placeholder.com/150x150?text=PUMA+LaMelo',
          category: 'Suede'
        },
        {
          id: 6,
          name: "PUMA LaMelo Ball MB.04 Lo 'LaFrance'",
          price: '$182',
          rating: 4.8,
          image: 'https://via.placeholder.com/150x150?text=PUMA+LaMelo',
          category: 'Suede'
        },
        {
          id: 7,
          name: "PUMA LaMelo Ball MB.04 Lo 'LaFrance'",
          price: '$182',
          rating: 4.8,
          image: 'https://via.placeholder.com/150x150?text=PUMA+LaMelo',
          category: 'Lamello Ball'
        },
        {
          id: 8,
          name: "PUMA LaMelo Ball MB.04 Lo 'LaFrance'",
          price: '$182',
          rating: 4.8,
          image: 'https://via.placeholder.com/150x150?text=PUMA+LaMelo',
          category: 'Lamello Ball'
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.category === this.selectedCategory)
    }
  },
  methods: {
    toggleWishlist(product) {
      if (this.store.isInWishlist(product.id)) {
        this.store.removeFromWishlist(product.id)
      } else {
        this.store.addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          rating: product.rating,
          image: product.image,
          dateAdded: new Date().toISOString()
        })
      }
    },
    addToCart(product) {
      this.store.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        rating: product.rating,
        image: product.image
      })
    },
    viewProductDetail(product) {
      this.store.setSelectedProduct(product)
    }
  }
}
</script>

<style scoped>
.category-section {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.category-header {
  margin-top: 20px;
}

.category-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
}

.category-item {
  position: relative;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  outline: 2px solid #e0e0e0;
  outline-offset: -2px;
}

.category-item:hover {
  transform: translateY(-5px);
}

.category-item.active {
  transform: scale(1.05);
  border-color: #5dd9d1;
  box-shadow: 0 4px 16px rgba(93, 217, 209, 0.3);
}

.category-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-label {
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  color: #1a1a1a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Products Section */
.products-section {
  width: 100%;
  margin-top: 20px;
}

.products-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 30px 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
}

.product-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.product-img {
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
}

.wishlist-heart {
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #666;
}

.wishlist-heart:hover {
  color: #ff6b6b;
  transform: scale(1.1);
  background: #fff5f5;
}

.wishlist-heart.active {
  color: #ff6b6b;
  background: #ffe0e0;
}

.product-name {
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  font-size: 12px;
  color: #666;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.product-rating {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.rating-stars {
  font-size: 12px;
  color: #5dd9d1;
  font-weight: 600;
}

.add-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: #5dd9d1;
  color: white;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #00bfa5;
  transform: scale(1.1);
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .category-grid {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
