<template>
  <div class="success-section">
    <div class="success-container">
      <!-- Success Header -->
      <div class="success-header">
        <div class="success-icon-wrapper">
          <div class="success-circle">
            <div class="checkmark">✓</div>
          </div>
        </div>
        <h1 class="success-title">Payment Success</h1>
        <p class="success-subtitle">You have successfully purchased {{ totalItems }} item(s)</p>
      </div>

      <!-- Order Details Card -->
      <div class="order-details-card">
        <div class="card-header">
          <div class="header-left">
            <div class="order-icon">📦</div>
            <div class="order-info">
              <div class="order-label">Order Information</div>
              <div class="order-id">{{ getOrderId() }}</div>
            </div>
          </div>
          <div class="status-badge">✓ Success</div>
        </div>

        <div class="card-body">
          <div class="details-row">
            <div class="detail-item">
              <span class="detail-label">Reference ID</span>
              <span class="detail-value">{{ getRefId() }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Total Amount</span>
              <span class="detail-value">${{ getTotalAmount() }}</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="payment-details">
            <div class="detail-item">
              <span class="detail-label">Payment Date</span>
              <span class="detail-value">{{ getCurrentDate() }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Payment Time</span>
              <span class="detail-value">{{ getCurrentTime() }}</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="payment-method-section">
            <div class="detail-item full">
              <span class="detail-label">Payment Method</span>
              <div class="payment-method">
                <span class="payment-icon">{{ paymentMethodIcon }}</span>
                <span class="payment-name">{{ paymentMethodName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Items Summary -->
      <div class="items-summary">
        <h3 class="summary-title">Items Purchased</h3>
        <div class="items-list">
          <div v-for="item in cartItems" :key="item.cartItemId" class="item-summary">
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-qty">Qty: {{ item.quantity }}</div>
            </div>
            <div class="item-amount">
              ${{ (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="success-actions">
        <button class="continue-btn" @click="goHome">Continue Shopping</button>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'Success',
  data() {
    return {
      store,
      orderSummary: {
        items: [],
        total: 0,
        paymentMethod: '',
        paymentDate: new Date()
      }
    }
  },
  computed: {
    cartItems() {
      return this.store.cartItems
    },
    totalItems() {
      return this.store.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    },
    paymentMethodIcon() {
      if (this.store.selectedPaymentMethod === 'bank-transfer') {
        return '🏦'
      } else if (this.store.selectedPaymentMethod === 'ewallet') {
        return '📱'
      }
      return '💳'
    },
    paymentMethodName() {
      if (this.store.selectedPaymentMethod === 'bank-transfer') {
        return 'Bank Transfer'
      } else if (this.store.selectedPaymentMethod === 'ewallet') {
        return 'E-Wallet'
      }
      return 'Credit Card'
    }
  },
  methods: {
    getOrderId() {
      return '#' + Math.random().toString(36).substr(2, 9).toUpperCase()
    },
    getRefId() {
      return Math.random().toString(36).substr(2, 9).toUpperCase()
    },
    getTotalAmount() {
      return (this.store.getCartTotal() * 1.1).toFixed(2)
    },
    getCurrentDate() {
      const now = new Date()
      return now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    },
    getCurrentTime() {
      const now = new Date()
      return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    },
    goHome() {
      this.store.setPage('home')
    }
  }
}
</script>

<style scoped>
.success-section {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #f9f9f9 100%);
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-container {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Success Header */
.success-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.success-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.success-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d97e 0%, #00c76a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 217, 126, 0.3);
  animation: bounce 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.checkmark {
  font-size: 56px;
  color: white;
  font-weight: bold;
}

.success-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.success-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* Order Details Card */
.order-details-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f9f9f9;
  border-bottom: 1px solid #e8e8e8;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.order-icon {
  font-size: 32px;
}

.order-label {
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.order-id {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #e8f5e9;
  color: #00c76a;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.card-body {
  padding: 20px;
}

.details-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-item.full {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.divider {
  height: 1px;
  background: #e8e8e8;
  margin: 16px 0;
}

.payment-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 16px;
}

.payment-method-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
}

.payment-icon {
  font-size: 24px;
}

.payment-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

/* Items Summary */
.items-summary {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.summary-title {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item-summary {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
}

.item-image {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.item-qty {
  font-size: 12px;
  color: #999;
}

.item-amount {
  font-size: 13px;
  font-weight: 700;
  color: #00c76a;
}

/* Action Buttons */
.success-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.continue-btn {
  padding: 14px 32px;
  background: #00c76a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-btn:hover {
  background: #00a652;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 199, 106, 0.3);
}

@media (max-width: 768px) {
  .success-container {
    gap: 24px;
  }

  .details-row,
  .payment-details {
    grid-template-columns: 1fr;
  }

  .success-title {
    font-size: 24px;
  }
}
</style>
