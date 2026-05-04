<template>
  <div class="detail-section" v-if="store.selectedProduct">
    <!-- Back Button -->
    <button class="back-button" @click="goBack">← Back</button>

    <div class="detail-container">
      <!-- Left Section - Image -->
      <div class="image-section">
        <div class="product-image-container">
          <img :src="store.selectedProduct.image" :alt="store.selectedProduct.name" class="product-image">
          <button 
            :class="['wishlist-btn-detail', { active: store.isInWishlist(store.selectedProduct.id) }]"
            @click="toggleWishlist"
          >
            {{ store.isInWishlist(store.selectedProduct.id) ? '♥' : '♡' }}
          </button>
        </div>
      </div>

      <!-- Right Section - Details -->
      <div class="details-section">
        <!-- Product Name -->
        <h1 class="product-name">{{ store.selectedProduct.name }}</h1>

        <!-- Price -->
        <div class="price-section">
          <span class="price">Rp. {{ formatPrice(store.selectedProduct.price) }}</span>
          <span class="original-price">Rp. 3.000.000</span>
        </div>

        <!-- Rating -->
        <div class="rating-section">
          <span class="stars">★★★★★</span>
          <span class="rating-text">{{ store.selectedProduct.rating }} ({{ store.selectedProduct.rating }}k ulasan)</span>
        </div>

        <!-- Size Selection -->
        <div class="size-section">
          <h3 class="section-title">Size</h3>
          <div class="size-grid">
            <button 
              v-for="size in sizes" 
              :key="size"
              :class="['size-btn', { active: selectedSize === size }]"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Color Selection -->
        <div class="color-section">
          <h3 class="section-title">Color</h3>
          <div class="color-options">
            <button 
              v-for="color in colors"
              :key="color.name"
              :class="['color-btn', { active: selectedColor === color.name }]"
              :style="{ backgroundColor: color.hex }"
              :title="color.name"
              @click="selectedColor = color.name"
            ></button>
          </div>
        </div>

        <!-- Quantity Selection -->
        <div class="quantity-section">
          <h3 class="section-title">Quantity</h3>
          <div class="quantity-control">
            <button class="qty-btn" @click="decreaseQuantity">−</button>
            <input type="number" v-model.number="quantity" class="qty-input" min="1">
            <button class="qty-btn" @click="increaseQuantity">+</button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="add-to-cart-btn" @click="addToCart">Add to cart</button>
          <button class="checkout-btn" @click="checkout">Checkout</button>
        </div>

        <!-- Additional Info -->
        <div class="additional-info">
          <div class="info-item">
            <span class="icon">🚚</span>
            <span class="text">Free ongkir untuk area Jakarta</span>
          </div>
          <div class="info-item">
            <span class="icon">🎁</span>
            <span class="text">Garansi 100% keaslian atau uang kembali</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'DetailItem',
  data() {
    return {
      store,
      selectedSize: 'EU 42',
      selectedColor: 'White',
      quantity: 1,
      sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
      colors: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' },
        { name: 'Gray', hex: '#808080' },
        { name: 'Red', hex: '#FF6B6B' }
      ]
    }
  },
  methods: {
    goBack() {
      this.store.setPage('home')
      this.store.selectedProduct = null
    },
    toggleWishlist() {
      if (this.store.isInWishlist(this.store.selectedProduct.id)) {
        this.store.removeFromWishlist(this.store.selectedProduct.id)
      } else {
        this.store.addToWishlist({
          id: this.store.selectedProduct.id,
          name: this.store.selectedProduct.name,
          price: this.store.selectedProduct.price,
          rating: this.store.selectedProduct.rating,
          image: this.store.selectedProduct.image,
          dateAdded: new Date().toISOString()
        })
      }
    },
    formatPrice(price) {
      const priceNum = parseFloat(price.replace('$', ''))
      return (priceNum * 25000).toLocaleString('id-ID')
    },
    increaseQuantity() {
      this.quantity++
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      for (let i = 0; i < this.quantity; i++) {
        this.store.addToCart({
          id: this.store.selectedProduct.id,
          name: this.store.selectedProduct.name,
          price: this.store.selectedProduct.price,
          rating: this.store.selectedProduct.rating,
          image: this.store.selectedProduct.image,
          size: this.selectedSize,
          color: this.selectedColor
        })
      }
      this.quantity = 1
    },
    checkout() {
      this.addToCart()
      this.store.setPage('cart')
    }
  }
}
</script>

<style scoped>
.detail-section {
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
}

.back-button {
  padding: 10px 20px;
  background: transparent;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  transition: all 0.3s ease;
  margin-bottom: 30px;
}

.back-button:hover {
  border-color: #5dd9d1;
  color: #5dd9d1;
  transform: translateX(-4px);
}

.detail-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

/* Image Section */
.image-section {
  display: flex;
  justify-content: center;
}

.product-image-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.wishlist-btn-detail {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #ddd;
  background: white;
  color: #666;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.wishlist-btn-detail:hover {
  border-color: #ff6b6b;
  color: #ff6b6b;
  transform: scale(1.1);
}

.wishlist-btn-detail.active {
  background: #ffe0e0;
  border-color: #ff6b6b;
  color: #ff6b6b;
}

/* Details Section */
.details-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.product-name {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.price {
  font-size: 32px;
  font-weight: 700;
  color: #5dd9d1;
}

.original-price {
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stars {
  font-size: 18px;
  color: #FFB800;
}

.rating-text {
  font-size: 14px;
  color: #666;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Size Selection */
.size-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.size-btn {
  padding: 10px 12px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #1a1a1a;
  transition: all 0.3s ease;
}

.size-btn:hover {
  border-color: #5dd9d1;
  color: #5dd9d1;
}

.size-btn.active {
  background: #5dd9d1;
  border-color: #5dd9d1;
  color: white;
}

/* Color Selection */
.color-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.color-options {
  display: flex;
  gap: 12px;
}

.color-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-btn:hover {
  transform: scale(1.1);
}

.color-btn.active {
  border-color: #5dd9d1;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #5dd9d1;
}

/* Quantity Selection */
.quantity-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: #1a1a1a;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  border-color: #5dd9d1;
  color: #5dd9d1;
}

.qty-input {
  width: 60px;
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}

.qty-input:focus {
  outline: none;
  border-color: #5dd9d1;
}

/* Action Buttons */
.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;
}

.add-to-cart-btn,
.checkout-btn {
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn {
  background: white;
  color: #5dd9d1;
  border: 2px solid #5dd9d1;
}

.add-to-cart-btn:hover {
  background: #f0fffe;
  transform: translateY(-2px);
}

.checkout-btn {
  background: #5dd9d1;
  color: white;
  box-shadow: 0 4px 12px rgba(93, 217, 209, 0.3);
}

.checkout-btn:hover {
  background: #00bfa5;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(93, 217, 209, 0.4);
}

/* Additional Info */
.additional-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid #e8eef5;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #666;
}

.icon {
  font-size: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .detail-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .product-name {
    font-size: 22px;
  }

  .price {
    font-size: 24px;
  }

  .size-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
