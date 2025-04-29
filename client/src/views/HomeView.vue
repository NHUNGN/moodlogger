<template>
  <div class="home-container">
    <!-- Image and Welcome Text stacked with overlay -->
    <div class="welcome-section">
      <img :src="welcomeImage" alt="Welcome to Mood Logger" class="welcome-image" />
      <div class="overlay">
        <h1 class="title">Welcome to Mood Logger</h1>
      </div>
    </div>

    <!-- Navigation to Login -->
    <router-link to="/login" class="login-button">Go to Login</router-link>
  </div>
</template>

<script setup>
const welcomeImage = new URL('../assets/home_page.png', import.meta.url).href
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #a2c8f2;
  overflow: hidden;
}

.welcome-section {
  position: relative;
  width: 100%;
  max-width: 1000px;
}

.welcome-image {
  width: 100%;
  height: auto;
  display: block;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2f4f7f;
}

/* Style for Login Button */
.login-button {
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #3a80b6;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
}

.login-button:hover {
  background-color: #357b94;
}
</style>
