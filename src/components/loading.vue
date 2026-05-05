<template>
  <div class="loading-section">
    <div class="loading-container">
      <div class="loading-spinner">
        <div class="spinner-circle">
          <div class="spinner-check">✓</div>
        </div>
      </div>
      <h2 class="loading-title">Wait a Minute...</h2>
      <p class="loading-subtitle">Setting up your order and analyzing your goals...</p>
      <div class="loading-dots">
        <span class="dot" :style="{ animationDelay: '0s' }"></span>
        <span class="dot" :style="{ animationDelay: '0.2s' }"></span>
        <span class="dot" :style="{ animationDelay: '0.4s' }"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'Loading',
  data() {
    return {
      store
    }
  },
  mounted() {
    // Simulate loading and redirect after 3 seconds
    setTimeout(() => {
      this.store.setPage('success')
    }, 3000)
  }
}
</script>

<style scoped>
.loading-section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef8f3 0%, #fef5ef 50%, #fffbf9 100%);
  padding: 20px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
}

.spinner-circle {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e0f7f6 0%, #b3ebe8 100%);
  border: 3px solid #5dd9d1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s ease-in-out infinite;
  box-shadow: 0 0 0 0 rgba(93, 217, 209, 0.7);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(93, 217, 209, 0.7);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(93, 217, 209, 0);
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(93, 217, 209, 0);
    transform: scale(1);
  }
}

.spinner-check {
  font-size: 48px;
  color: #5dd9d1;
  font-weight: bold;
  animation: checkmark 0.6s ease-in-out 0.4s both;
}

@keyframes checkmark {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-45deg);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.loading-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.loading-subtitle {
  font-size: 16px;
  color: #999;
  margin: 0;
  max-width: 300px;
  line-height: 1.6;
}

.loading-dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #5dd9d1;
  animation: bounce 1.4s infinite ease-in-out both;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  40% {
    opacity: 1;
    transform: translateY(-10px);
  }
}
</style>
