<template>
  <div class="sidebar">
    <!-- Logo -->
    <div class="logo">
      <div class="logo-icon">8o</div>
      <div class="logo-text">HoopStep</div>
    </div>

    <!-- Menu Items -->
    <nav class="menu">
      <div class="menu-item">
        <span class="icon">🏠</span>
        <span class="label">HOME</span>
      </div>
      <div class="menu-item">
        <span class="icon">🔍</span>
        <span class="label">EXPLORE</span>
      </div>
      <div class="menu-item">
        <span class="icon">❤️</span>
        <span class="label">SAVED</span>
      </div>
      <div class="menu-item">
        <span class="icon cart-icon">🛒</span>
        <span class="label">CART</span>
        <span class="badge">1</span>
      </div>
      <div class="menu-item">
        <span class="icon">⏱️</span>
        <span class="label">PURCHASE HISTORY</span>
      </div>
      <div class="menu-item">
        <span class="icon">⚙️</span>
        <span class="label">SETTINGS</span>
      </div>
    </nav>

    <!-- Customer Service Button -->
    <div class="customer-service">
      <span class="cs-icon">🎧</span>
      <span class="cs-text">Customer Service</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background-color: #2d3436;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  border-right: 2px solid #1e272c;
  position: fixed;
  left: 0;
  top: 0;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  background-color: #5dd9d1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}

.logo-text {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 1px;
}

/* Menu */
.menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.menu-item:hover {
  background-color: #3d4a4f;
  color: #5dd9d1;
}

.menu-item.active {
  background-color: #5dd9d1;
  border-left: 4px solid #00bfa5;
}

.menu-item.active .label,
.menu-item.active .icon {
  color: #2d3436;
  font-weight: 600;
}

.icon {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0bec5;
}

.label {
  font-size: 14px;
  color: #90a4ae;
  font-weight: 500;
  letter-spacing: 0.5px;
  flex: 1;
}

.menu-item:hover .label {
  color: #5dd9d1;
}

/* Badge for Cart */
.badge {
  width: 20px;
  height: 20px;
  background-color: #5dd9d1;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

/* Customer Service */
.customer-service {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 20px;
  background-color: #5dd9d1;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.customer-service:hover {
  background-color: #45d4ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(93, 217, 209, 0.3);
}

.cs-icon {
  font-size: 20px;
}

.cs-text {
  font-size: 14px;
  font-weight: 600;
  color: #2d3436;
}
</style>
