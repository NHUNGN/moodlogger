<template>
  <div class="auth-form">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="isLoading">Sign Up</button>
    </form>

    <!-- Error message -->
    <p v-if="error" class="error-message">{{ error }}</p>
    
    <!-- Loading Spinner -->
    <p v-if="isLoading">Signing up...</p>

    <!-- Link to Login page -->
    <p>Already have an account? <router-link to="/login" class="login-link">Log In</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Data binding and state variables
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const router = useRouter()

// Signup function
const signup = async () => {
  // Reset error message and set loading state
  error.value = ''
  isLoading.value = true

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailPattern.test(email.value)) {
    error.value = 'Please enter a valid email address.'
    isLoading.value = false
    return
  }

  try {
    console.log('Submitting signup with:', email.value, password.value);

    const res = await axios.post('http://localhost:3000/api/auth/signup', {
      email: email.value,
      password: password.value,
    })
    // Redirect to login page upon success
    router.push('/login')
  } catch (err) {
    console.error('Signup error:', err.response ? err.response.data : err);
    error.value = err.response?.data?.message || 'Signup failed. Please try again.';
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

.login-link {
  color: #301934; /* Link color */
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
