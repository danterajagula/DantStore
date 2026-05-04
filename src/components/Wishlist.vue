<template>
  <div class="wishlist-section">
    <div class="wishlist-header">
      <div class="header-top">
        <h1 class="wishlist-title">My Wishlist</h1>
        <div class="filter-group">
          <button 
            v-for="period in ['TODAY', 'YESTERDAY', 'LAST WEEK', 'LAST MONTH']"
            :key="period"
            :class="['filter-btn', { active: activePeriod === period }]"
            @click="activePeriod = period"
          >
            {{ period }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredItems.length === 0" class="empty-state">
      <div class="empty-icon">♡</div>
      <h3>No items in your wishlist</h3>
      <p>Start adding your favorite shoes to your wishlist</p>
    </div>

    <!-- Wishlist Items Grid -->
    <div v-else class="wishlist-grid">
      <div 
        v-for="item in filteredItems" 
        :key="item.id"
        class="wishlist-card"
      >
        <div class="card-image">
          <img :src="item.image" :alt="item.name">
          <button 
            class="remove-btn"
            @click="removeFromWishlist(item.id)"
            title="Remove from wishlist"
          >
            ✕
          </button>
        </div>
        <h4 class="card-name">{{ item.name }}</h4>
        <p class="card-price">PRICE {{ item.price }}</p>
        <div class="card-footer">
          <span class="rating">★ {{ item.rating }}</span>
          <button class="add-cart-btn">→ Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'Wishlist',
  data() {
    return {
      store,
      activePeriod: 'TODAY'
    }
  },
  computed: {
    filteredItems() {
      return this.store.wishlistItems.filter((item) => {
        const itemDate = item.dateAdded ? new Date(item.dateAdded) : new Date()
        const today = new Date()
        
        // Reset time to compare only dates
        itemDate.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)
        
        const diffTime = today.getTime() - itemDate.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        switch (this.activePeriod) {
          case 'TODAY':
            return diffDays === 0
          case 'YESTERDAY':
            return diffDays === 1
          case 'LAST WEEK':
            return diffDays > 1 && diffDays <= 7
          case 'LAST MONTH':
            return diffDays > 7 && diffDays <= 30
          default:
            return true
        }
      })
    }
  },
  methods: {
    removeFromWishlist(itemId) {
      this.store.removeFromWishlist(itemId)
    }
  }
}
</script>

<style scoped>
.wishlist-section {
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 40px;
}

.wishlist-header {
  padding: 0;
}

.header-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.wishlist-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  min-width: 200px;
}

.filter-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-btn {
  padding: 10px 16px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #5dd9d1;
  color: #5dd9d1;
}

.filter-btn.active {
  background: #5dd9d1;
  border-color: #5dd9d1;
  color: white;
}

/* Empty State */
.empty-state {
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

.empty-state h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 0;
}

.empty-state p {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* Wishlist Grid */
.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  width: 100%;
}

.wishlist-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.wishlist-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.card-image {
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 12px;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #ff6b6b;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.remove-btn:hover {
  background: #ff5252;
  transform: scale(1.1);
}

.card-name {
  font-size: 14px;
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

.card-price {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.rating {
  font-size: 13px;
  color: #5dd9d1;
  font-weight: 600;
}

.add-cart-btn {
  padding: 8px 12px;
  border: none;
  background: #5dd9d1;
  color: white;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-cart-btn:hover {
  background: #00bfa5;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .wishlist-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }

  .header-top {
    flex-direction: column;
  }

  .wishlist-title {
    font-size: 24px;
  }

  .filter-group {
    width: 100%;
  }
}
</style>
