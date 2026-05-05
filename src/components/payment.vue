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
            @click="openPaymentMenu(method.id)"
          >
            <div class="payment-card-header">
              <input
                type="radio"
                :value="method.id"
                v-model="selectedPaymentMethod"
                :id="`payment-${method.id}`"
                @click.stop
              >
              <label :for="`payment-${method.id}`" class="payment-label">{{ method.name }}</label>
            </div>
            <div class="payment-card-icon">{{ method.icon }}</div>
            <p class="payment-description">{{ method.description }}</p>
          </div>
        </div>
      </div>

      <!-- Payment Menu Overlay -->
      <div v-if="showPaymentMenu" class="payment-overlay" @click="closePaymentMenu">
        <div class="payment-modal" @click.stop>
          <div class="modal-header">
            <h3>{{ selectedPaymentMethodData.name }}</h3>
            <button class="close-btn" @click="closePaymentMenu">✕</button>
          </div>
          <div class="modal-body">
            <div v-if="selectedPaymentMethodData.id === 'ewallet'" class="payment-options">
              <div v-for="option in ewalletOptions" :key="option.id" class="payment-option" @click="selectPaymentOption(option, 'ewallet')">
                <div class="option-icon">{{ option.icon }}</div>
                <div class="option-name">{{ option.name }}</div>
              </div>
            </div>
            <div v-else-if="selectedPaymentMethodData.id === 'bank-transfer'" class="payment-options">
              <div v-for="option in bankOptions" :key="option.id" class="payment-option" @click="selectPaymentOption(option, 'bank')">
                <div class="option-icon">{{ option.icon }}</div>
                <div class="option-name">{{ option.name }}</div>
              </div>
            </div>
            <div v-else class="payment-options">
              <div class="payment-option selected">
                <div class="option-icon">{{ selectedPaymentMethodData.icon }}</div>
                <div class="option-name">{{ selectedPaymentMethodData.name }}</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="confirm-btn" @click="confirmPaymentSelection">Confirm</button>
          </div>
        </div>
      </div>

      <!-- Selected Payment Display -->
      <div v-if="selectedPaymentOption" class="selected-payment-section">
        <h3 class="selected-title">Selected Payment Method</h3>
        <div class="selected-payment-card">
          <div class="selected-payment-icon">{{ selectedPaymentOption.icon }}</div>
          <div class="selected-payment-info">
            <div class="selected-payment-type">{{ selectedPaymentMethodData.name }}</div>
            <div class="selected-payment-name">{{ selectedPaymentOption.name }}</div>
          </div>
          <button class="change-btn" @click="changePayment">Change</button>
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
      selectedPaymentMethod: 'bank-transfer',
      showPaymentMenu: false,
      selectedEwalletOption: null,
      selectedBankOption: null,
      selectedPaymentOption: null,
      paymentMethods: [
        {
          id: 'bank-transfer',
          name: 'Bank Transfer',
          icon: '🏦',
          description: 'BCA, Mandiri, BNI'
        },
        {
          id: 'ewallet',
          name: 'E-Wallet',
          icon: '📱',
          description: 'GoPay, Dana, OVO'
        }
      ],
      // Bank payment options - Easy to customize icons here
      bankOptions: [
        {
          id: 'bca',
          name: 'BCA',
          icon: '🔵' // Change this icon to your custom icon
        },
        {
          id: 'mandiri',
          name: 'Mandiri',
          icon: '🔴' // Change this icon to your custom icon
        },
        {
          id: 'bni',
          name: 'BNI',
          icon: '🟡' // Change this icon to your custom icon
        }
      ],
      // E-wallet payment options - Easy to customize icons here
      ewalletOptions: [
        {
          id: 'gopay',
          name: 'GoPay',
          icon: '🔵' // Change this icon to your custom icon
        },
        {
          id: 'dana',
          name: 'Dana',
          icon: '🔴' // Change this icon to your custom icon
        },
        {
          id: 'ovo',
          name: 'OVO',
          icon: '🟣' // Change this icon to your custom icon
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
    openPaymentMenu(methodId) {
      this.selectedPaymentMethod = methodId
      this.showPaymentMenu = true
      this.selectedEwalletOption = null
      this.selectedBankOption = null
    },
    closePaymentMenu() {
      this.showPaymentMenu = false
      this.selectedEwalletOption = null
      this.selectedBankOption = null
    },
    selectPaymentOption(option, type) {
      if (type === 'ewallet') {
        this.selectedEwalletOption = option
      } else if (type === 'bank') {
        this.selectedBankOption = option
      }
    },
    confirmPaymentSelection() {
      const selectedOption = this.selectedEwalletOption || this.selectedBankOption
      if (selectedOption) {
        this.selectedPaymentOption = selectedOption
      }
      this.showPaymentMenu = false
    },
    changePayment() {
      this.openPaymentMenu(this.selectedPaymentMethod)
    },
    completePayment() {
      // Validate form
      if (!this.isFormValid()) {
        alert('Please fill in all required fields')
        return
      }

      // Validate payment method selected
      if (!this.selectedPaymentOption) {
        alert('Please select a payment method')
        return
      }

      // Store the selected payment method
      this.store.selectedPaymentMethod = this.selectedPaymentMethod

      // Show loading page
      this.store.setPage('loading')
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
    }
  },
  computed: {
    selectedPaymentMethodData() {
      return this.paymentMethods.find(m => m.id === this.selectedPaymentMethod) || {}
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

/* Selected Payment Section */
.selected-payment-section {
  width: 100%;
  padding: 24px;
  background: linear-gradient(135deg, #f0fffe 0%, #e8fffe 100%);
  border-radius: 12px;
  border: 2px solid #5dd9d1;
}

.selected-title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.selected-payment-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(93, 217, 209, 0.15);
}

.selected-payment-icon {
  font-size: 40px;
  min-width: 50px;
  text-align: center;
}

.selected-payment-info {
  flex: 1;
}

.selected-payment-type {
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.selected-payment-name {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.change-btn {
  padding: 8px 16px;
  background: #5dd9d1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.change-btn:hover {
  background: #00bfa5;
  transform: translateY(-2px);
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

/* Payment Menu Overlay */
.payment-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.payment-modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
  background: #f9f9f9;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  color: #1a1a1a;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #1a1a1a;
}

.modal-body {
  padding: 24px;
}

.payment-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
}

.payment-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.payment-option:hover {
  border-color: #5dd9d1;
  background: #f0fffe;
  transform: translateY(-2px);
}

.payment-option.selected {
  border-color: #5dd9d1;
  background: #f0fffe;
}

.option-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.option-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
  background: #f9f9f9;
}

.confirm-btn {
  padding: 10px 24px;
  background: #5dd9d1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-btn:hover {
  background: #00bfa5;
  transform: translateY(-2px);
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
