<template>
  <div class="main">
    <h2>Log Your Mood</h2>

    <label>
      Select Mood:
      <select v-model="moodOption">
        <option disabled value="">Select a mood</option>
        <option>Happy</option>
        <option>Sad</option>
        <option>Angry</option>
        <option>Anxious</option>
        <option>Neutral</option>
        <option>Other</option>
      </select>
    </label>

    <label v-if="moodOption === 'Other'">
      Enter your mood:
      <input v-model="customMood" placeholder="Type your mood..." />
    </label>

    <label>
      Note:
      <textarea v-model="note" placeholder="Write a short note..."></textarea>
    </label>

    <label>
      Date:
      <input type="date" v-model="date" />
    </label>

    <button @click="submitMood">Submit</button>
    <p v-if="message">{{ message }}</p>

    <div class="actions">
      <router-link to="/calendar">
        <button class="calendar-button">📅 View Calendar</button>
      </router-link>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const moodOption = ref('')
const customMood = ref('')
const note = ref('')
const date = ref(new Date().toISOString().split('T')[0])
const message = ref('')
const authStore = useAuthStore()
const router = useRouter()

const submitMood = async () => {
  const mood = moodOption.value === 'Other' ? customMood.value : moodOption.value
  if (!mood) {
    message.value = 'Please enter your mood.'
    return
  }

  try {
    const token = authStore.token
    await axios.post('http://localhost:3000/api/moods/addMood', {
      mood,
      note: note.value,
      date: date.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    message.value = 'Mood logged!'
    moodOption.value = ''
    customMood.value = ''
    note.value = ''
    date.value = new Date().toISOString().split('T')[0]
  } catch (err) {
    console.error('Error logging mood:', err)
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

label {
  display: block;
  margin: 10px 0;
  text-align: left;
}

select, textarea, input, button {
  display: block;
  width: 100%;
  margin: 5px 0 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.calendar-button,
.logout-button {
  flex: 1;
  margin: 0 5px;
  padding: 10px;
  background-color: #3a80b6;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.calendar-button:hover,
.logout-button:hover {
  background-color: #2f6e9c;
}
</style>
