<template>
  <div class="product-card">
    <!-- Image Section -->
    <div class="image-section">
      <img src="https://via.placeholder.com/300x300?text=PUMA+Basketball+Shoes" alt="PUMA x LAMELO BALL" class="product-image">
    </div>

    <!-- Details Section -->
    <div class="details-section">
      <!-- Title -->
      <h2 class="product-title">PUMA x LAMELO BALL | PUMA</h2>
      
      <!-- Description -->
      <p class="product-description">
        PUMA x LAMELO BALL MB.03 LaFrance Men's Basketball Shoes, Fluro Green Pes-PUMA Green-Fluro Yellow Pes, extralarge
      </p>

      <!-- Price -->
      <div class="price-section">
        <span class="price-label">Price</span>
        <span class="price-value">$150</span>
      </div>

      <!-- Color Selector -->
      <div class="color-section">
        <label class="color-label">COLOR</label>
        <div class="color-options">
          <button class="color-btn active" style="background: linear-gradient(135deg, #90EE90 0%, #FFD700 100%)" title="Green-Yellow"></button>
        </div>
      </div>

      <!-- Quantity Selector -->
      <div class="quantity-section">
        <button class="qty-btn minus">−</button>
        <div class="qty-display">0</div>
        <button class="qty-btn plus">+</button>
      </div>

      <!-- Action Buttons -->
      <div class="actions-section">
        <button class="wishlist-btn">
          <span>♡</span>
        </button>
        <button class="add-to-cart-btn">Add to cart</button>
        <button class="buy-now-btn">Buy now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BigCard',
  data() {
    return {
      quantity: 0
    }
  },
  methods: {
    incrementQuantity() {
      this.quantity++
    },
    decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity--
      }
    },
    toggleWishlist() {
      // Handle wishlist toggle
    },
    addToCart() {
      // Handle add to cart
    },
    buyNow() {
      // Handle buy now
    }
  }
}
</script>

<style scoped>
.product-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  gap: 60px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8eef5;
  max-width: 1000px;
  margin: 0 auto;
}

/* Image Section */
.image-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
}

.product-image {
  width: 100%;
  max-width: 350px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
}

/* Details Section */
.details-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 350px;
}

.product-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
}

.product-description {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
}

/* Price Section */
.price-section {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.price-label {
  font-size: 14px;
  color: #666;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.price-value {
  font-size: 32px;
  font-weight: 700;
  color: #20897e;
}

/* Color Section */
.color-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.color-label {
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 700;
  letter-spacing: 1px;
}

.color-options {
  display: flex;
  gap: 12px;
}

.color-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-btn.active {
  border-color: #5dd9d1;
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #5dd9d1;
}

.color-btn:hover {
  transform: scale(1.1);
}

/* Quantity Section */
.quantity-section {
  display: flex;
  align-items: center;
  gap: 0;
  background-color: #e8f2f1;
  border-radius: 30px;
  padding: 4px;
  width: fit-content;
}

.qty-btn {
  width: 40px;
  height: 40px;
  border: none;
  background-color: #5dd9d1;
  color: #1a1a1a;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background-color: #45d4ca;
  transform: scale(1.05);
}

.qty-btn:active {
  transform: scale(0.95);
}

.qty-display {
  width: 50px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

/* Actions Section */
.actions-section {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 10px;
}

.wishlist-btn {
  width: 48px;
  height: 48px;
  border: 2px solid #20897e;
  background-color: transparent;
  color: #20897e;
  border-radius: 12px;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.wishlist-btn:hover {
  background-color: #f0fffe;
  transform: scale(1.05);
}

.add-to-cart-btn {
  flex: 1;
  padding: 14px 24px;
  border: 2px solid #20897e;
  background-color: transparent;
  color: #20897e;
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.add-to-cart-btn:hover {
  background-color: #f0fffe;
  transform: translateY(-2px);
}

.buy-now-btn {
  flex: 1;
  padding: 14px 24px;
  border: none;
  background-color: #5dd9d1;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(93, 217, 209, 0.3);
}

.buy-now-btn:hover {
  background-color: #45d4ca;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(93, 217, 209, 0.4);
}

.buy-now-btn:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
    gap: 30px;
    padding: 30px;
  }

  .product-title {
    font-size: 22px;
  }

  .price-value {
    font-size: 28px;
  }

  .actions-section {
    flex-direction: column;
  }

  .add-to-cart-btn,
  .buy-now-btn {
    width: 100%;
  }
}
</style>
