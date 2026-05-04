<template>
  <div class="cart-section">
    <!-- Cart Header -->
    <div class="cart-header">
      <h1 class="cart-title">
        <span class="cart-icon">🛒</span>
        Add To Your Cart
      </h1>
    </div>

    <!-- Empty Cart State -->
    <div v-if="store.cartItems.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h3>Your cart is empty</h3>
      <p>Add items to your cart to get started</p>
      <button class="continue-btn" @click="goHome">Continue Shopping</button>
    </div>

    <!-- Cart Table -->
    <div v-else class="cart-container">
      <div class="cart-table">
        <div class="table-header">
          <div class="col col-name">Nama Item</div>
          <div class="col col-price">Price</div>
          <div class="col col-qty">Qty</div>
          <div class="col col-subtotal">Subtotal</div>
          <div class="col col-action">Action</div>
        </div>

        <div class="table-body">
          <div v-for="item in store.cartItems" :key="item.cartItemId" class="table-row">
            <div class="col col-name">
              <div class="item-info">
                <img :src="item.image" :alt="item.name" class="item-image">
                <span class="item-name">{{ item.name }}</span>
              </div>
            </div>
            <div class="col col-price">{{ item.price }}</div>
            <div class="col col-qty">
              <div class="qty-control">
                <button @click="decreaseQty(item.cartItemId)" class="qty-btn">−</button>
                <input 
                  type="number" 
                  :value="item.quantity" 
                  @change="updateQty(item.cartItemId, $event)"
                  class="qty-input"
                  min="1"
                >
                <button @click="increaseQty(item.cartItemId)" class="qty-btn">+</button>
              </div>
            </div>
            <div class="col col-subtotal">
              ${{ (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2) }}
            </div>
            <div class="col col-action">
              <button 
                @click="removeItem(item.cartItemId)"
                class="remove-btn"
                title="Remove from cart"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <div class="summary-row">
          <span class="summary-label">Subtotal:</span>
          <span class="summary-value">${{ getSubtotal().toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Shipping:</span>
          <span class="summary-value">$0.00</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Tax:</span>
          <span class="summary-value">${{ (getSubtotal() * 0.1).toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span class="summary-label">Total:</span>
          <span class="summary-value">${{ (getSubtotal() * 1.1).toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Cart Actions -->
    <div class="cart-actions">
      <button class="back-btn" @click="goHome">Back</button>
      <button v-if="store.cartItems.length > 0" class="checkout-btn">Check Out</button>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'Cart',
  data() {
    return {
      store
    }
  },
  methods: {
    increaseQty(cartItemId) {
      const item = this.store.cartItems.find((item) => item.cartItemId === cartItemId)
      if (item) {
        this.store.updateCartQuantity(cartItemId, item.quantity + 1)
      }
    },
    decreaseQty(cartItemId) {
      const item = this.store.cartItems.find((item) => item.cartItemId === cartItemId)
      if (item && item.quantity > 1) {
        this.store.updateCartQuantity(cartItemId, item.quantity - 1)
      }
    },
    updateQty(cartItemId, event) {
      const quantity = parseInt(event.target.value)
      if (quantity > 0) {
        this.store.updateCartQuantity(cartItemId, quantity)
      }
    },
    removeItem(cartItemId) {
      this.store.removeFromCart(cartItemId)
    },
    getSubtotal() {
      return this.store.getCartTotal()
    },
    goHome() {
      this.store.setPage('home')
    }
  }
}
</script>

<style scoped>
.cart-section {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 40px;
}

.cart-header {
  padding: 20px 0;
  border-bottom: 2px solid #e8eef5;
}

.cart-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.cart-icon {
  font-size: 32px;
}

/* Empty Cart State */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-cart h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 0;
}

.empty-cart p {
  font-size: 16px;
  color: #666;
  margin: 0 0 30px 0;
}

.continue-btn {
  padding: 12px 30px;
  background: #5dd9d1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-btn:hover {
  background: #00bfa5;
  transform: scale(1.05);
}

/* Cart Table */
.cart-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cart-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.8fr;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 2px solid #e8eef5;
  font-weight: 600;
  color: #1a1a1a;
}

.table-body {
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-y: auto;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.8fr;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid #e8eef5;
  align-items: center;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: #f9fbfd;
}

.col {
  display: flex;
  align-items: center;
}

.col-name {
  justify-content: flex-start;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: contain;
  background: #f5f5f5;
  padding: 4px;
}

.item-name {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 14px;
}

.col-price,
.col-qty,
.col-subtotal {
  justify-content: center;
}

.col-price {
  font-weight: 600;
  color: #1a1a1a;
}

.col-subtotal {
  font-weight: 700;
  color: #5dd9d1;
  font-size: 15px;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 4px 8px;
}

.qty-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  color: #5dd9d1;
  transform: scale(1.2);
}

.qty-input {
  width: 40px;
  border: none;
  background: white;
  text-align: center;
  font-weight: 600;
  color: #1a1a1a;
  border-radius: 4px;
}

.col-action {
  justify-content: center;
}

.remove-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #ff6b6b;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-weight: bold;
}

.remove-btn:hover {
  background: #ff5252;
  transform: scale(1.1);
}

/* Cart Summary */
.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  margin-left: auto;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 8px 0;
  border-bottom: 1px solid #e8eef5;
}

.summary-row.total {
  border-bottom: none;
  border-top: 2px solid #e8eef5;
  padding-top: 12px;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
}

.summary-label {
  color: #666;
  font-weight: 600;
}

.summary-value {
  color: #1a1a1a;
  font-weight: 600;
}

.summary-row.total .summary-value {
  color: #5dd9d1;
}

/* Cart Actions */
.cart-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
}

.back-btn,
.checkout-btn {
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn {
  background: #2d3436;
  color: white;
}

.back-btn:hover {
  background: #1a1a1a;
  transform: scale(1.05);
}

.checkout-btn {
  background: #5dd9d1;
  color: white;
}

.checkout-btn:hover {
  background: #00bfa5;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .table-header,
  .table-row {
    grid-template-columns: 1.5fr 1fr 1fr 1fr 0.6fr;
    gap: 8px;
    padding: 12px;
    font-size: 12px;
  }

  .item-image {
    width: 40px;
    height: 40px;
  }

  .item-name {
    font-size: 12px;
  }

  .cart-summary {
    max-width: 100%;
  }

  .cart-actions {
    flex-direction: column;
  }
}
</style>
