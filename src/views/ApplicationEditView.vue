<template>
  <v-container fluid class="pa-0">
    <h1>Создание заявки</h1>
    <v-container fluid class="pa-4 bg-grey-lighten-4">
      <v-text-field
        v-model="application.title"
        label="Название заявки"
        variant="outlined"
        bg-color="yellow-lighten-4"
        density="comfortable"
        hide-details="auto"
        class="mb-3 application-title"
        required
        persistent-placeholder
      ></v-text-field>

      <application-form
        :initial-data="application"
        @save="saveApplication"
        @cancel="cancel"
      />
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ApplicationForm from '../components/ApplicationForm.vue'
import { useAuthStore } from '../stores/auth'
import { api } from '../services/api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const application = ref({
  id: '',
  date: new Date().toLocaleDateString('ru-RU'),
  time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
  title: '',
  type: '',
  applicant: '',
  manager: authStore.role === 'manager' ? authStore.user?.fullName : '',
  expert: 'Не закреплен',
  cost: 0,
  status: 'Заявка подана'
})

onMounted(async () => {
  const id = route.params.id
  if (id) {
    try {
      const data = await api.getApplication(id)
      application.value = data
    } catch (error) {
      console.error('Failed to load application:', error)
    }
  }
})

const saveApplication = async (data) => {
  try {
    const result = await api.submitApplication(data)
    console.log('Application saved:', result)
    router.push('/applications')
  } catch (error) {
    console.error('Failed to save application:', error)
  }
}

const cancel = () => {
  router.push('/applications')
}
</script>

<style scoped>
.application-title :deep(.v-field__input) {
  background-color: rgb(255, 255, 200) !important;
}
</style>
