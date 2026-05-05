<script setup>
import Sidebar from './components/BAR.vue'
import Navbar from './components/NAVBAR.vue'
import BigCard from './components/BIGCARD.vue'
import Category from './components/Category.vue'
import Wishlist from './components/Wishlist.vue'
import Cart from './components/cart.vue'
import Payment from './components/payment.vue'
import Loading from './components/loading.vue'
import Success from './components/success.vue'
import DetailItem from './components/detail_item.vue'
import { store } from './store.js'
</script>

<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-wrapper">
      <Navbar />
      <div class="main-content">
        <!-- Home Page -->
        <template v-if="store.currentPage === 'home'">
          <BigCard />
          <Category />
        </template>
        
        <!-- Wishlist Page -->
        <template v-else-if="store.currentPage === 'wishlist'">
          <Wishlist />
        </template>

        <!-- Cart Page -->
        <template v-else-if="store.currentPage === 'cart'">
          <Cart />
        </template>

        <!-- Payment Page -->
        <template v-else-if="store.currentPage === 'payment'">
          <Payment />
        </template>

        <!-- Loading Page -->
        <template v-else-if="store.currentPage === 'loading'">
          <Loading />
        </template>

        <!-- Success Page -->
        <template v-else-if="store.currentPage === 'success'">
          <Success />
        </template>

        <!-- Product Detail Page -->
        <template v-else-if="store.currentPage === 'detail'">
          <DetailItem />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f9fbfd 100%);
}

.main-wrapper {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 100px 30px 30px 30px;
  overflow-y: auto;
  background: linear-gradient(135deg, #ffffff 0%, #f9fbfd 100%);
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}
</style>
