import { reactive } from 'vue'

export const store = reactive({
  currentPage: 'home', // 'home' or 'wishlist'
  wishlistItems: [],
  
  setPage(page) {
    this.currentPage = page
  },
  
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
  }
})
