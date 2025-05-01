<template>
  <div class="calendar-wrapper">
    <h2 class="title">Mood History Calendar</h2>

    <v-date-picker
      v-model="selectedDate"
      color="indigo"
      is-expanded
      :attributes="calendarAttributes"
      @update:model-value="fetchMood"
    />

    <div class="mood-display">
      <div v-if="loading">Loading mood...</div>

      <div v-else-if="moodData">
        <h3>{{ formattedDate }}</h3>
        <p><strong>Mood:</strong> {{ moodData.mood }}</p>
        <p><strong>Note:</strong> {{ moodData.note }}</p>

        <div class="buttons">
          <button class="edit" @click="editMode = true">✏️ Edit</button>
          <button class="delete" @click="confirmDelete">🗑️ Delete</button>
        </div>

        <div v-if="editMode" class="edit-form">
          <input v-model="editMood" placeholder="Edit mood" />
          <textarea v-model="editNote" placeholder="Edit note..."></textarea>
          <button class="save" @click="updateMood">Save Changes</button>
          <button class="cancel" @click="editMode = false">Cancel</button>
        </div>
      </div>

      <div v-else>
        <p>No mood logged for this day.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'

const selectedDate = ref(new Date().toISOString().split('T')[0])
const moodData = ref(null)

const loading = ref(false)
const editMode = ref(false)
const editMood = ref('')
const editNote = ref('')
const calendarAttributes = ref([])

const formattedDate = computed(() => {
  const dateObj = new Date(selectedDate.value)
  return dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
})

const fetchMood = async () => {
  loading.value = true
  moodData.value = null
  try {
    const res = await axios.get(`http://localhost:3000/api/moods/by-date?date=${selectedDate.value}`)

    if (res.data) {
      moodData.value = res.data
      editMood.value = res.data.mood
      editNote.value = res.data.note
      updateCalendarHighlight([selectedDate.value])
    } else {
      moodData.value = null
      updateCalendarHighlight([])
    }
  } catch (err) {
    console.error('Fetch failed:', err)
    moodData.value = null
    updateCalendarHighlight([])
  } finally {
    loading.value = false
  }
}

const updateCalendarHighlight = (dates) => {
  calendarAttributes.value = [
    {
      key: 'logged-mood',
      highlight: {
        color: 'green',
        fillMode: 'light',
      },
      dates
    }
  ]
}

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this mood entry?')) {
    deleteMood()
  }
}

const deleteMood = async () => {
  // Format the date as YYYY-MM-DD
  const formattedDate = new Date(selectedDate.value).toISOString().split('T')[0]

  try {
    await axios.delete(`http://localhost:3000/api/moods/delete`, {
      params: { date: formattedDate }
    })
    moodData.value = null
    editMode.value = false
    updateCalendarHighlight([])
    alert('Mood entry deleted.')
  } catch (err) {
    console.error('Failed to delete mood:', err)
    alert('Failed to delete mood.')
  }
}


const updateMood = async () => {
  const formattedDate = new Date(selectedDate.value).toISOString().split('T')[0]

  try {
    await axios.put(`http://localhost:3000/api/moods/update`, {
      date: formattedDate,
      mood: editMood.value,
      note: editNote.value
    })
    alert('Mood updated successfully!')
    editMode.value = false
    fetchMood()
  } catch (err) {
    console.error('Failed to update mood:', err)
    alert('Failed to update mood.')
  }
}


watch(selectedDate, fetchMood)
fetchMood()
</script>

<style scoped>
.calendar-wrapper {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 16px;
  background: #e4f0fa;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2f4f7f;
  text-align: center;
}

.mood-display {
  margin-top: 20px;
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}

.edit-form input,
.edit-form textarea {
  display: block;
  margin: 10px auto;
  width: 90%;
  padding: 10px;
  border-radius: 5px;
}

.buttons {
  margin-top: 15px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  border: none;
}

.edit {
  background-color: #ffc107;
  color: white;
}

.delete {
  background-color: #dc3545;
  color: white;
}

.save {
  background-color: #28a745;
  color: white;
}

.cancel {
  background-color: #6c757d;
  color: white;
}
</style>
