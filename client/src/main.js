import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)

app.use(createPinia()) // Register Pinia for state management
app.use(router) // Register the router
app.mount('#app')
