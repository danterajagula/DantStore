<template>
  <div class="payment-section">
    <!-- Payment Header -->
    <div class="payment-header">
      <h1 class="payment-title">Checkout</h1>
    </div>

    <div class="payment-container">
      <!-- Payment Methods Section -->
      <div class="payment-methods-section">
        <h2 class="section-title">Choose Payment Method</h2>
        <div class="payment-methods-grid">
          <div
            v-for="method in paymentMethods"
            :key="method.id"
            class="payment-card"
            :class="{ active: selectedPaymentMethod === method.id }"
            @click="selectedPaymentMethod = method.id"
          >
            <div class="payment-card-header">
              <input
                type="radio"
                :value="method.id"
                v-model="selectedPaymentMethod"
                :id="`payment-${method.id}`"
              >
              <label :for="`payment-${method.id}`" class="payment-label">{{ method.name }}</label>
            </div>
            <div class="payment-card-image-area">
              <img v-if="method.customImage" :src="method.customImage" :alt="method.name" class="payment-card-image">
              <div v-else class="payment-card-icon">{{ method.icon }}</div>
              <label :for="`upload-${method.id}`" class="upload-btn" title="Upload custom image">
                📷
              </label>
              <input
                :id="`upload-${method.id}`"
                type="file"
                accept="image/*"
                @change="handleImageUpload($event, method.id)"
                style="display: none"
              >
            </div>
            <p class="payment-description">{{ method.description }}</p>
          </div>
        </div>
      </div>

      <!-- Delivery Form Section -->
      <div class="delivery-form-section">
        <h2 class="section-title">Delivery Information</h2>
        <form class="delivery-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                v-model="deliveryForm.firstName"
                placeholder="Enter your first name"
                required
              >
            </div>
            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                v-model="deliveryForm.lastName"
                placeholder="Enter your last name"
                required
              >
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input
              type="email"
              id="email"
              v-model="deliveryForm.email"
              placeholder="Enter your email address"
              required
            >
            <small>Confirmation will be sent to your email</small>
          </div>

          <div class="form-group">
            <label for="address">Address *</label>
            <input
              type="text"
              id="address"
              v-model="deliveryForm.address"
              placeholder="Enter your complete address"
              required
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="country">Country *</label>
              <input
                type="text"
                id="country"
                v-model="deliveryForm.country"
                value="Indonesia"
                readonly
              >
            </div>
            <div class="form-group">
              <label for="province">Province/State *</label>
              <select
                id="province"
                v-model="deliveryForm.province"
                required
              >
                <option value="">Select province</option>
                <option value="DKI Jakarta">DKI Jakarta</option>
                <option value="West Java">West Java</option>
                <option value="Central Java">Central Java</option>
                <option value="East Java">East Java</option>
                <option value="Bali">Bali</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">City *</label>
              <select
                id="city"
                v-model="deliveryForm.city"
                required
              >
                <option value="">Select city</option>
                <option value="Jakarta">Jakarta</option>

                
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="district">District *</label>
              <select
                id="district"
                v-model="deliveryForm.district"
                required
              >
                <option value="">Select district</option>
                <option value="District 1">District 1</option>
                <option value="District 2">District 2</option>
                <option value="District 3">District 3</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="postalCode">Postal Code *</label>
              <input
                type="text"
                id="postalCode"
                v-model="deliveryForm.postalCode"
                placeholder="Enter postal code"
                required
              >
            </div>
            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                v-model="deliveryForm.phone"
                placeholder="+62 (ex. 081234567890)"
                required
              >
            </div>
          </div>
        </form>
      </div>

      <!-- Order Summary Section -->
      <div class="order-summary-section">
        <h2 class="section-title">Order Summary</h2>
        <div class="order-items">
          <div v-for="item in store.cartItems" :key="item.cartItemId" class="order-item">
            <div class="item-info">
              <img :src="item.image" :alt="item.name" class="item-image">
              <div class="item-details">
                <h4>{{ item.name }}</h4>
                <p>Qty: {{ item.quantity }}</p>
              </div>
            </div>
            <div class="item-price">
              ${{ (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>

        <div class="order-totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>${{ getSubtotal().toFixed(2) }}</span>
          </div>
          <div class="total-row">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div class="total-row">
            <span>Tax (10%):</span>
            <span>${{ (getSubtotal() * 0.1).toFixed(2) }}</span>
          </div>
          <div class="total-row grand-total">
            <span>Grand Total:</span>
            <span>${{ (getSubtotal() * 1.1).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="payment-actions">
      <button class="back-btn" @click="goBack">Back to Cart</button>
      <button class="complete-btn" @click="completePayment">Complete Payment</button>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'Payment',
  data() {
    return {
      store,
      selectedPaymentMethod: 'credit-card',
      paymentMethods: [
        {
          id: 'credit-card',
          name: 'Credit Card',
          icon: '💳',
          description: 'Visa, Mastercard, or Amex'
        },
        {
          id: 'debit-card',
          name: 'Debit Card',
          icon: '🏦',
          description: 'Direct bank transfer'
        },
        {
          id: 'ewallet',
          name: 'E-Wallet',
          icon: '📱',
          description: 'GCash, PayMaya, or similar'
        }
      ],
      deliveryForm: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        country: 'Indonesia',
        province: '',
        city: '',
        district: '',
        postalCode: '',
        phone: ''
      }
    }
  },
  methods: {
    getSubtotal() {
      return this.store.getCartTotal()
    },
    goBack() {
      this.store.setPage('cart')
    },
    completePayment() {
      // Validate form
      if (!this.isFormValid()) {
        alert('Please fill in all required fields')
        return
      }

      // Process payment
      alert(`Payment of $${(this.getSubtotal() * 1.1).toFixed(2)} completed successfully!\nOrder will be delivered to: ${this.deliveryForm.address}`)
      
      // Clear cart
      this.store.cartItems = []
      
      // Go back home
      this.store.setPage('home')
    },
    isFormValid() {
      return (
        this.deliveryForm.firstName.trim() !== '' &&
        this.deliveryForm.lastName.trim() !== '' &&
        this.deliveryForm.email.trim() !== '' &&
        this.deliveryForm.address.trim() !== '' &&
        this.deliveryForm.province !== '' &&
        this.deliveryForm.city !== '' &&
        this.deliveryForm.district !== '' &&
        this.deliveryForm.postalCode.trim() !== '' &&
        this.deliveryForm.phone.trim() !== ''
      )
    },
    handleImageUpload(event, methodId) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const method = this.paymentMethods.find(m => m.id === methodId)
          if (method) {
            method.customImage = e.target.result
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style scoped>
.payment-section {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  padding-bottom: 40px;
}

.payment-header {
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.payment-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.payment-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* Payment Methods Section */
.payment-methods-section {
  width: 100%;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.payment-methods-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

.payment-card {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  position: relative;
}

.payment-card:hover {
  border-color: #5dd9d1;
  box-shadow: 0 4px 12px rgba(93, 217, 209, 0.2);
}

.payment-card.active {
  border-color: #5dd9d1;
  background: #f0fffe;
  box-shadow: 0 4px 16px rgba(93, 217, 209, 0.3);
}

.payment-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.payment-card-header input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #5dd9d1;
}

.payment-label {
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  margin: 0;
}

.payment-card-image-area {
  position: relative;
  height: 80px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.payment-card-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.upload-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background: #5dd9d1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.upload-btn:hover {
  background: #00bfa5;
  transform: scale(1.1);
}

.payment-description {
  font-size: 13px;
  color: #666;
  margin: 0;
}

/* Delivery Form Section */
.delivery-form-section {
  width: 100%;
}

.delivery-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 14px;
}

.form-group input,
.form-group select {
  padding: 12px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #5dd9d1;
  box-shadow: 0 0 0 3px rgba(93, 217, 209, 0.1);
}

.form-group input:readonly {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-group small {
  font-size: 12px;
  color: #999;
}

/* Order Summary Section */
.order-summary-section {
  width: 100%;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 24px;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info {
  display: flex;
  gap: 12px;
  flex: 1;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: white;
  border-radius: 8px;
  padding: 5px;
}

.item-details h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #1a1a1a;
}

.item-details p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.item-price {
  font-weight: 600;
  color: #5dd9d1;
  font-size: 14px;
}

.order-totals {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.total-row.grand-total {
  border-top: 2px solid #e0e0e0;
  padding-top: 12px;
  font-weight: 700;
  font-size: 16px;
  color: #1a1a1a;
}

/* Action Buttons */
.payment-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.back-btn,
.complete-btn {
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn {
  background: #f0f0f0;
  color: #1a1a1a;
  border: 1px solid #e0e0e0;
}

.back-btn:hover {
  background: #e0e0e0;
}

.complete-btn {
  background: #5dd9d1;
  color: white;
}

.complete-btn:hover {
  background: #00bfa5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(93, 217, 209, 0.3);
}

/* Responsive */
@media (max-width: 1024px) {
  .payment-methods-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .payment-methods-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .payment-actions {
    flex-direction: column;
  }

  .back-btn,
  .complete-btn {
    width: 100%;
  }
}
</style>
