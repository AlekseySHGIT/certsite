import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Icons
import '@mdi/font/css/materialdesignicons.css'

// Router
import router from './router'

// Components
import App from './App.vue'
import { setupCASL } from './casl-setup'

// Stores
import { useApplicationStore } from './stores/applicationStore'
import { useAuthStore } from './stores/auth'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  },
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(vuetify)

setupCASL(app)

// Initialize data from API
const initializeData = async () => {
  // Get store instances
  const applicationStore = useApplicationStore()
  const authStore = useAuthStore()
  
  // Load applications from API
  await applicationStore.loadApplicationsFromApi()
  
  console.log('Application initialized with data from API')
}

// Mount and then initialize data
app.mount('#app')
initializeData().catch(error => {
  console.error('Failed to initialize application data:', error)
})
