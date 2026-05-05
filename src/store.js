import { reactive } from 'vue'

export const store = reactive({
  currentPage: 'home', // 'home', 'wishlist', 'cart', 'payment', 'loading', or 'detail'
  selectedProduct: null,
  wishlistItems: [],
  cartItems: [],
  
  setPage(page) {
    this.currentPage = page
  },
  
  setSelectedProduct(product) {
    this.selectedProduct = product
    this.currentPage = 'detail'
  },
  
  // Wishlist methods
  addToWishlist(item) {
    const exists = this.wishlistItems.find(
      (wishItem) => wishItem.id === item.id
    )
    if (!exists) {
      this.wishlistItems.push(item)
    }
  },
  
  removeFromWishlist(itemId) {
    this.wishlistItems = this.wishlistItems.filter(
      (item) => item.id !== itemId
    )
  },
  
  isInWishlist(itemId) {
    return this.wishlistItems.some((item) => item.id === itemId)
  },
  
  // Cart methods
  addToCart(item) {
    const exists = this.cartItems.find((cartItem) => cartItem.id === item.id)
    if (exists) {
      exists.quantity += 1
    } else {
      this.cartItems.push({
        ...item,
        quantity: 1,
        cartItemId: Date.now() // unique id for each cart entry
      })
    }
  },
  
  removeFromCart(cartItemId) {
    this.cartItems = this.cartItems.filter(
      (item) => item.cartItemId !== cartItemId
    )
  },
  
  updateCartQuantity(cartItemId, quantity) {
    const item = this.cartItems.find((item) => item.cartItemId === cartItemId)
    if (item && quantity > 0) {
      item.quantity = quantity
    } else if (quantity === 0) {
      this.removeFromCart(cartItemId)
    }
  },
  
  getCartTotal() {
    return this.cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return total + price * item.quantity
    }, 0)
  },
  
  getCartCount() {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0)
  }
})

