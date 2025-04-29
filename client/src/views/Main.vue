<template>
  <div class="main">
    <h2>Log Your Mood</h2>
    <select v-model="mood">
      <option disabled value="">Select a mood</option>
      <option>Happy</option>
      <option>Sad</option>
      <option>Angry</option>
      <option>Anxious</option>
      <option>Neutral</option>
    </select>
    <textarea v-model="note" placeholder="Write a short note..."></textarea>
    <button @click="submitMood">Submit</button>
    <p v-if="message">{{ message }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'

const mood = ref('')
const note = ref('')
const message = ref('')
const authStore = useAuthStore()
const router = useRouter()

const submitMood = async () => {
  if (!authStore.isAuthenticated) {
    message.value = 'You must be logged in to log your mood.'
    return
  }

  const token = authStore.token
  try {
    await axios.post('http://localhost:3000/api/moods/addMood', {
      mood: mood.value,
      note: note.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    message.value = 'Mood logged!'
    mood.value = ''
    note.value = ''
  } catch (err) {
    message.value = 'Error logging mood.'
  }
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.main {
  max-width: 500px;
  margin: auto;
  text-align: center;
}
select, textarea, button {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}
</style>
