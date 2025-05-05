<template>
  <v-container fluid class="pa-0">
    <h1>{{ isEditMode ? 'Редактирование заявки' : 'Создание заявки' }}</h1>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ApplicationForm from '../components/ApplicationForm.vue'
import { useAuthStore } from '../stores/auth'
import { useApplicationStore } from '@/stores/applicationStore'
import { api } from '../services/api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const applicationStore = useApplicationStore()

const isEditMode = computed(() => !!route.params.id)

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
  status: 'Заявка подана',
  applicantType: 'Нет',
  inn: '77777777777778',
  regType: 'ОГРН',
  regNumber: '1234567890123',
  legalAddress: 'г.Москва, Романовско - Удельный проезд, д.34 к.7',
  actualAddress: 'г.Москва, Романовско - Удельный проезд, д.10 офис 324',
  phone: '+71112223544',
  email: 'client@client.cc',
  directorName: 'Романовский - Ивановский Иван Сергеевич',
  directorPosition: 'Директор ООО Ромашка',
  representative: 'генерального директора Романовски - Ивановского Ивана Сергеевича'
})

onMounted(async () => {
  const id = route.params.id
  console.log('ApplicationEditView mounted with ID:', id, 'Type:', typeof id)
  
  if (id) {
    try {
      // First try to get application from the store using the getter
      console.log('Looking for application in store with ID:', id)
      let storeApp = applicationStore.getApplication(id)
      
      if (!storeApp) {
        // If not found by the getter, try direct search
        console.log('Application not found via getter, trying direct search')
        storeApp = applicationStore.applications.find(app => 
          app.id === id || 
          (typeof app.id === 'number' && app.id === parseInt(id)) ||
          app.uuid === id
        )
      }
      
      if (storeApp) {
        console.log('Found application in store:', storeApp)
        // Map store data to form fields
        application.value = {
          id: storeApp.id || '',
          date: storeApp.date || application.value.date,
          time: storeApp.time || application.value.time,
          title: storeApp.title || '',
          type: storeApp.type || '',
          applicant: storeApp.client || storeApp.applicant || '',
          manager: storeApp.manager || '',
          expert: storeApp.expert || 'Не закреплен',
          cost: storeApp.amount || storeApp.cost || 0,
          status: storeApp.status || 'Заявка подана',
          applicationType: storeApp.applicationType || '',
          inn: storeApp.inn || '',
          regType: storeApp.regType || 'ОГРН',
          regNumber: storeApp.regNumber || '',
          legalAddress: storeApp.legalAddress || '',
          actualAddress: storeApp.actualAddress || '',
          phone: storeApp.phone || '',
          email: storeApp.email || '',
          directorName: storeApp.directorName || '',
          directorPosition: storeApp.directorPosition || '',
          representative: storeApp.representative || '',
          product: storeApp.product || '',
          tnved: storeApp.tnved || '',
          regulations: storeApp.regulations || [],
          manufacturerSame: storeApp.manufacturerSame || 'Нет',
          manufacturerName: storeApp.manufacturerName || '',
          manufacturerLegalAddress: storeApp.manufacturerLegalAddress || '',
          manufacturerActualAddress: storeApp.manufacturerActualAddress || '',
          productionType: storeApp.productionType || '',
          validityPeriod: storeApp.validityPeriod || '',
          hasProtocol: storeApp.hasProtocol || 'Нет',
          protocolCount: storeApp.protocolCount || '0',
          comments: storeApp.comments || '',
          ...storeApp
        }
      } else {
        // Fallback to API if not found in store
        console.log('Application not found in store, trying API')
        const data = await api.getApplication(id)
        console.log('Raw application data from API:', data)
        
        // Map API data to form fields
        application.value = {
          id: data.id || '',
          date: data.date || application.value.date,
          time: data.time || application.value.time,
          title: data.title || data.data?.title || '',
          type: data.type || data.data?.type || data.taskType || 'Декларирование',
          applicant: data.client || data.applicant || data.data?.applicant || 'ООО Ромашка ИНН 77777777777778 Тел:+71112223544 Email:client@client.cc',
          manager: data.manager || data.data?.manager || '',
          expert: data.expert || data.data?.expert || 'Не закреплен',
          cost: data.amount || data.cost || data.data?.cost || 0,
          status: data.status || data.data?.status || 'Заявка подана',
          applicationType: data.applicationType || '',
          inn: data.inn || data.data?.inn || '',
          regType: data.regType || data.data?.regType || 'ОГРН',
          regNumber: data.regNumber || data.data?.regNumber || '',
          legalAddress: data.legalAddress || data.data?.legalAddress || '',
          actualAddress: data.actualAddress || data.data?.actualAddress || '',
          phone: data.phone || data.data?.phone || '',
          email: data.email || data.data?.email || '',
          directorName: data.directorName || data.data?.directorName || '',
          directorPosition: data.directorPosition || data.data?.directorPosition || '',
          representative: data.representative || data.data?.representative || '',
          product: data.product || '',
          tnved: data.tnved || '',
          regulations: data.regulations || [],
          manufacturerSame: data.manufacturerSame || 'Нет',
          manufacturerName: data.manufacturerName || '',
          manufacturerLegalAddress: data.manufacturerLegalAddress || '',
          manufacturerActualAddress: data.manufacturerActualAddress || '',
          productionType: data.productionType || '',
          validityPeriod: data.validityPeriod || '',
          hasProtocol: data.hasProtocol || 'Нет',
          protocolCount: data.protocolCount || '0',
          comments: data.comments || '',
          ...data
        }
      }
      
      console.log('Final mapped application data:', application.value)
    } catch (error) {
      console.error('Failed to load application:', error)
      alert('Не удалось загрузить данные заявки. Пожалуйста, попробуйте еще раз.')
    }
  }
})

const saveApplication = async (data) => {
  try {
    console.log('Saving application data:', data)
    
    // Use the applicationStore to update the application
    const result = await applicationStore.saveApplication(data.id, data)
    
    if (result.success) {
      console.log('Application saved successfully:', result)
      alert('Заявка успешно сохранена!')
      router.push('/applications')
    } else {
      console.error('Failed to save application:', result)
      alert('Не удалось сохранить заявку. Пожалуйста, попробуйте еще раз.')
    }
  } catch (error) {
    console.error('Failed to save application:', error)
    alert('Произошла ошибка при сохранении заявки: ' + error.message)
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
