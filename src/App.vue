<script setup>
import Sidebar from './components/BAR.vue'
import Navbar from './components/NAVBAR.vue'
import BigCard from './components/BIGCARD.vue'
</script>

<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-wrapper">
      <Navbar />
      <div class="main-content">
        <BigCard />
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
  align-items: center;
  justify-content: center;
}
</style>
