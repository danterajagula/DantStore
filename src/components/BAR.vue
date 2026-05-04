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
        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg></span>
        <span class="label">HOME</span>
      </div>
      <div class="menu-item">
        <span class="icon cart-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg></span>
        <span class="label">CART</span>
        <span class="badge">1</span>
      </div>
      <div class="menu-item">
        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg></span>
        <span class="label">SETTINGS</span>
      </div>
    </nav>

    <!-- Customer Service Button -->
    <div class="customer-service">
      <span class="cs-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440ZM331.5-411.5Q320-423 320-440t11.5-28.5Q343-480 360-480t28.5 11.5Q400-457 400-440t-11.5 28.5Q377-400 360-400t-28.5-11.5Zm240 0Q560-423 560-440t11.5-28.5Q583-480 600-480t28.5 11.5Q640-457 640-440t-11.5 28.5Q617-400 600-400t-28.5-11.5ZM241-462q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"/></svg></span>
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
