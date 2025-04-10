<template>
  <v-container fluid class="pa-0">
    <v-tabs
      v-model="activeTab"
      bg-color="white"
      color="primary"
      align-tabs="start"
      height="48"
      class="application-tabs"
    >
      <v-tab value="heavy" class="text-none">Тяжелая промышленность</v-tab>
      <v-tab value="light" class="text-none">Легкая промышленность</v-tab>
      <v-tab value="rejection" class="text-none">Отказные письма</v-tab>
      <v-tab value="manual" class="text-none">Руководства по эксплуатации</v-tab>
      <v-tab value="passport" class="text-none">Паспорт продукции</v-tab>
      <v-tab value="safety" class="text-none">Обоснование безопасности</v-tab>
      <v-tab value="tu" class="text-none">ТУ</v-tab>
    </v-tabs>

    <v-container fluid class="pa-4 bg-grey-lighten-4">
      <h2 class="text-h6 mb-4">
        {{ isNew ? 'Создание новой заявки' : 'Подтверждение соответствия продукции согласно дог №470 от 04 апреля 2021 / АЕ 756 от 10 ноября 2019 года по заявке № ЛП 569. Редактирование' }}
      </h2>

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
import { useAuthStore } from '../store/auth'
import { api } from '../services/api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const activeTab = ref('light')

const isNew = computed(() => !route.params.id)

const application = ref({
  id: '',
  date: new Date().toLocaleDateString('ru-RU'),
  time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
  title: '',
  type: 'Декларирование',
  applicant: 'ООО "Ромашка" ИНН 77777777777778 Тел:+71112223544 Email:client@client.cc',
  manager: authStore.role === 'manager' ? 'Петров Василий Иванович Tel:Email: manager@manager.cc' : '',
  expert: 'Не закреплен',
  cost: 1120,
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
    router.push('/')
  } catch (error) {
    console.error('Failed to save application:', error)
  }
}

const cancel = () => {
  router.push('/')
}
</script>

<style scoped>
.application-tabs {
  border-bottom: 1px solid #e0e0e0;
}
</style>
