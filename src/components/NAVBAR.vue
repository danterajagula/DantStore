<template>
  <nav class="navbar">
    <!-- Brand Section -->
    <div class="brand">
      <h1 class="brand-title">basketball shoes</h1>
      <p class="brand-tagline">feel your energy</p>
    </div>

    <!-- Search Bar Section -->
    <div class="search-section">
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="SEARCH BAR"
        >
        <button class="search-btn">
          <span>🔍</span>
        </button>
      </div>
    </div>

    <!-- Actions Section -->
    <div class="actions">
      <button class="action-btn">
        <span>✉️</span>
      </button>
      <button class="action-btn">
        <span>🔔</span>
      </button>
      <button class="action-btn">
        <span>👤</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 280px;
  right: 0;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #e8eef5;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Brand Section */
.brand {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 200px;
}

.brand-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.5px;
}

.brand-tagline {
  font-size: 12px;
  color: #888;
  margin: 0;
  font-weight: 500;
}

/* Search Section */
.search-section {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 40px;
}

.search-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background-color: #e8eef5;
  border-radius: 24px;
  overflow: hidden;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 12px 18px;
  font-size: 13px;
  color: #666;
  outline: none;
}

.search-input::placeholder {
  color: #999;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.search-btn {
  background-color: #e0e0e0;
  border: none;
  padding: 12px 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.3s ease;
  border-radius: 0 24px 24px 0;
}

.search-btn:hover {
  background-color: #d0d0d0;
}

/* Actions Section */
.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-btn {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: none;
  background-color: #5dd9d1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(93, 217, 209, 0.2);
}

.action-btn:hover {
  background-color: #45d4ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(93, 217, 209, 0.3);
}

.action-btn:active {
  transform: translateY(0);
}
</style>
