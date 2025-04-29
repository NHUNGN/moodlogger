<template>
  <div class="app-container">
    <div class="logo-container">
      <router-link to="/" class="logo-link">
        <img :src="logoImage" alt="Mood Logger Logo" class="logo" />
      </router-link>
    </div>

    <nav class="navbar">
      <router-link to="/main" class="nav-link">Mood</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/signup" class="nav-link">Sign Up</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
const logoImage = new URL('./assets/logo.png', import.meta.url).href
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  background-color: #a2c8f2;
  font-family: Arial, sans-serif;
}

.app-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  text-align: center;
}

.logo-container {
  position: absolute;
  top: 20px;
  left: 20px;
}

.logo-link {
  text-decoration: none;
}

.logo {
  width: 300px;
  height: auto;
}

.navbar {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
  z-index: 1000;
}

.nav-link {
  text-decoration: none;
  color: white;
  background-color: #3a80b6;
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #2f6e9c;
}
</style>
