<template>
  <div class="auth-form">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="isLoading">Log In</button>
    </form>

    <!-- Error message -->
    <p v-if="error" class="error-message">{{ error }}</p>

    <!-- Loading Spinner -->
    <p v-if="isLoading">Logging in...</p>

    <!-- Sign up link -->
    <p>Don't have an account? <router-link to="/signup" class="signup-link">Sign Up</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const router = useRouter()

const login = async () => {
  // Reset error message and set loading state
  error.value = ''
  isLoading.value = true

  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value,
    })
    // Assuming a token is returned after login
    // Save the token (e.g., to localStorage or Pinia store)
    localStorage.setItem('token', res.data.token)
    router.push('/main')  // Redirect to main page after successful login
  } catch (err) {
    error.value = 'Login failed. Check your credentials.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: auto;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

input, button {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.signup-link {
  color: #301934;  /* Link color */
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
