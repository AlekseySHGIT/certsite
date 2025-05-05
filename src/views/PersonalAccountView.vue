<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4" variant="outlined" elevation="1">
          <v-card-title class="text-h5 px-4 py-3 bg-grey-lighten-4">
            Личный кабинет
          </v-card-title>

          <v-card-text class="pa-4">
            <div class="d-flex align-center mb-4">
              <v-avatar color="primary" size="64" class="mr-4">
                <span class="text-h4 text-white">{{ userInitials }}</span>
              </v-avatar>
              <div>
                <div class="text-h6">{{ authStore.user?.name || 'Гость' }}</div>
                <div class="text-subtitle-1 text-grey-darken-1">
                  {{ getDetailedRoleName() }}
                </div>
              </div>
            </div>

            <v-divider class="mb-4"></v-divider>

            <div class="text-subtitle-1 font-weight-bold mb-2">Информация о пользователе</div>
            <v-row>
              <v-col cols="12" md="6">
                <v-list>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-email</v-icon>
                    </template>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{ authStore.user?.email || 'Не указан' }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-phone</v-icon>
                    </template>
                    <v-list-item-title>Телефон</v-list-item-title>
                    <v-list-item-subtitle>{{ authStore.user?.phone || 'Не указан' }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-office-building</v-icon>
                    </template>
                    <v-list-item-title>Организация</v-list-item-title>
                    <v-list-item-subtitle>{{ authStore.user?.company || 'Не указана' }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="6">
                <v-list>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-identifier</v-icon>
                    </template>
                    <v-list-item-title>ИНН</v-list-item-title>
                    <v-list-item-subtitle>{{ authStore.user?.inn || 'Не указан' }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-card-account-details</v-icon>
                    </template>
                    <v-list-item-title>ОГРН</v-list-item-title>
                    <v-list-item-subtitle>{{ authStore.user?.ogrn || 'Не указан' }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-map-marker</v-icon>
                    </template>
                    <v-list-item-title>Адрес</v-list-item-title>
                    <v-list-item-subtitle>{{ authStore.user?.address || 'Не указан' }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Recent Applications -->
        <v-card variant="outlined" elevation="1">
          <v-card-title class="text-h5 px-4 py-3 bg-grey-lighten-4">
            Последние заявки
          </v-card-title>

          <v-card-text class="pa-4">
            <v-table>
              <thead>
                <tr>
                  <th>Номер</th>
                  <th>Тип</th>
                  <th>Дата</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="app in recentApplications" :key="app.id">
                  <td>{{ app.appNumber }}</td>
                  <td>{{ getApplicationTypeName(app.type) }}</td>
                  <td>{{ app.date }}</td>
                  <td>
                    <v-chip
                      :color="getStatusColor(app.status)"
                      size="small"
                      variant="elevated"
                    >
                      {{ getStatusText(app.status) }}
                    </v-chip>
                  </td>
                  <td>
                    <v-btn
                      variant="text"
                      color="primary"
                      density="comfortable"
                      @click="viewApplication(app.id)"
                    >
                      Просмотреть
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()

// Get user's initials for avatar
const userInitials = computed(() => {
  const name = authStore.user?.name || 'Гость'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Mock recent applications data
const recentApplications = computed(() => {
  return authStore.userApplications?.slice(0, 5) || []
})

const getDetailedRoleName = () => {
  // If user has a specific client group role, show that instead of generic "client"
  if (authStore.user?.role?.startsWith('client_group_')) {
    if (authStore.user.role === 'client_group_1') {
      return 'Клиент (Прямой клиент)'
    } else if (authStore.user.role === 'client_group_2') {
      return 'Клиент (Посредник)'
    }
  }

  // Otherwise use the standard role mapping
  const roleMap = {
    'guest': 'Гость',
    'client': 'Клиент',
    'expert': 'Эксперт',
    'manager': 'Менеджер',
    'admin': 'Администратор',
    'tester': 'Тестировщик'
  }
  return roleMap[authStore.role] || 'Неизвестная роль'
}

const getApplicationTypeName = (type) => {
  const typeMap = {
    'light': 'Легкая промышленность',
    'heavy': 'Тяжелая промышленность',
    'rejection': 'Отказное письмо',
    'manual': 'Руководство по эксплуатации',
    'passport': 'Паспорт продукции',
    'safety': 'Обоснование безопасности',
    'tu': 'ТУ'
  }
  return typeMap[type] || type
}

const getStatusText = (status) => {
  const statusMap = {
    'draft': 'Черновик',
    'pending': 'На рассмотрении',
    'in_progress': 'В работе',
    'completed': 'Завершена',
    'rejected': 'Отклонена'
  }
  return statusMap[status] || status
}

const getStatusColor = (status) => {
  const colorMap = {
    'draft': 'grey',
    'pending': 'warning',
    'in_progress': 'info',
    'completed': 'success',
    'rejected': 'error'
  }
  return colorMap[status] || 'grey'
}

const viewApplication = (id) => {
  router.push(`/application/${id}/view`)
}
</script>
