<template>
  <v-container fluid class="pa-0">
    <v-tabs
      v-model="activeTab"
      bg-color="white"
      color="primary"
      align-tabs="start"
      height="48"
      class="profile-tabs"
    >
      <v-tab value="profile" class="text-none">Профиль</v-tab>
      <v-tab value="applications" class="text-none">Мои заявки</v-tab>
      <v-tab value="documents" class="text-none">Документы</v-tab>
      <v-tab v-if="authStore.isAdmin" value="users" class="text-none">Пользователи</v-tab>
    </v-tabs>

    <v-container fluid class="pa-4 bg-grey-lighten-4">
      <!-- Profile Tab -->
      <v-window v-model="activeTab">
        <v-window-item value="profile">
          <v-card variant="outlined" elevation="0">
            <v-card-title class="text-subtitle-1 font-weight-bold bg-grey-lighten-3 py-2 px-4">
              Личные данные
            </v-card-title>
            <v-card-text class="pa-4">
              <v-form @submit.prevent="updateProfile" ref="profileForm">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.name"
                      label="Ф.И.О. / Название компании"
                      required
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'Это поле обязательно']"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.email"
                      label="Email"
                      type="email"
                      required
                      variant="outlined"
                      density="comfortable"
                      disabled
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.phone"
                      label="Контактный телефон"
                      required
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'Телефон обязателен']"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.inn"
                      label="ИНН"
                      required
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'ИНН обязателен']"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.ogrn"
                      label="ОГРН"
                      required
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'ОГРН обязателен']"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.advancePayment"
                      label="Сумма авансового платежа"
                      variant="outlined"
                      density="comfortable"
                      type="number"
                      disabled
                      :hint="!authStore.isAdmin ? 'Редактируется администратором' : ''"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-textarea
                      v-model="profileData.bankDetails"
                      label="Банковские реквизиты"
                      required
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'Банковские реквизиты обязательны']"
                      rows="2"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.legalAddress"
                      label="Юридический адрес"
                      required
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'Юридический адрес обязателен']"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.physicalAddress"
                      label="Фактический адрес"
                      required
                      variant="outlined"
                      density="comfortable"
                      :rules="[v => !!v || 'Фактический адрес обязателен']"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.contractNumber"
                      label="Номер договора"
                      variant="outlined"
                      density="comfortable"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.contractDate"
                      label="Дата договора"
                      variant="outlined"
                      density="comfortable"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.edsNumber"
                      label="Номер ЭЦП"
                      variant="outlined"
                      density="comfortable"
                      hint="Необязательное поле"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="profileData.edsDate"
                      label="Дата ЭЦП"
                      variant="outlined"
                      density="comfortable"
                      type="date"
                      hint="Необязательное поле"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-btn
                  type="submit"
                  color="primary"
                  variant="elevated"
                  :loading="loading"
                  :disabled="loading"
                  class="mt-4"
                >
                  Сохранить изменения
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-window-item>
        
        <!-- Applications Tab -->
        <v-window-item value="applications">
          <v-card variant="outlined" elevation="0">
            <v-card-title class="d-flex justify-space-between align-center bg-grey-lighten-3 py-2 px-4">
              <span class="text-subtitle-1 font-weight-bold">Мои заявки</span>
              <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                variant="elevated"
                size="small"
                @click="router.push('/application/create')"
              >
                Новая заявка
              </v-btn>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="applicationHeaders"
                :items="applications"
                :items-per-page="10"
                class="elevation-0"
              >
                <template v-slot:item.status="{ item }">
                  <v-chip
                    :color="getStatusColor(item.status)"
                    size="small"
                    class="text-white"
                  >
                    {{ item.status }}
                  </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    icon
                    variant="text"
                    size="small"
                    color="primary"
                    @click="viewApplication(item.id)"
                  >
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    variant="text"
                    size="small"
                    color="primary"
                    @click="editApplication(item.id)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-window-item>
        
        <!-- Documents Tab -->
        <v-window-item value="documents">
          <v-card variant="outlined" elevation="0">
            <v-card-title class="text-subtitle-1 font-weight-bold bg-grey-lighten-3 py-2 px-4">
              Документы
            </v-card-title>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="documentHeaders"
                :items="documents"
                :items-per-page="10"
                class="elevation-0"
              >
                <template v-slot:item.status="{ item }">
                  <v-chip
                    :color="getDocumentStatusColor(item.status)"
                    size="small"
                    class="text-white"
                  >
                    {{ item.status }}
                  </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    icon
                    variant="text"
                    size="small"
                    color="primary"
                    @click="downloadDocument(item.id)"
                  >
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="authStore.isClient || authStore.isManager || authStore.isAdmin"
                    icon
                    variant="text"
                    size="small"
                    color="primary"
                    @click="updateDocumentStatus(item.id)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-window-item>
        
        <!-- Users Tab (Admin only) -->
        <v-window-item value="users" v-if="authStore.isAdmin">
          <v-card variant="outlined" elevation="0">
            <v-card-title class="d-flex justify-space-between align-center bg-grey-lighten-3 py-2 px-4">
              <span class="text-subtitle-1 font-weight-bold">Пользователи</span>
              <v-btn
                color="primary"
                prepend-icon="mdi-account-plus"
                variant="elevated"
                size="small"
                @click="showAddUserDialog = true"
              >
                Добавить пользователя
              </v-btn>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="userHeaders"
                :items="users"
                :items-per-page="10"
                class="elevation-0"
              >
                <template v-slot:item.role="{ item }">
                  <v-chip
                    :color="getRoleColor(item.role)"
                    size="small"
                    class="text-white"
                  >
                    {{ getRoleName(item.role) }}
                  </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    icon
                    variant="text"
                    size="small"
                    color="primary"
                    @click="editUser(item.id)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
          
          <!-- Add User Dialog -->
          <v-dialog v-model="showAddUserDialog" max-width="600px">
            <v-card>
              <v-card-title class="text-h5 bg-grey-lighten-3 py-2 px-4">
                Добавить пользователя
              </v-card-title>
              <v-card-text class="pa-4">
                <v-form @submit.prevent="addUser" ref="addUserForm">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="newUser.name"
                        label="Ф.И.О."
                        required
                        variant="outlined"
                        density="comfortable"
                        :rules="[v => !!v || 'Это поле обязательно']"
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12">
                      <v-text-field
                        v-model="newUser.email"
                        label="Email"
                        type="email"
                        required
                        variant="outlined"
                        density="comfortable"
                        :rules="[
                          v => !!v || 'Email обязателен', 
                          v => /.+@.+\..+/.test(v) || 'Email должен быть валидным'
                        ]"
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12">
                      <v-select
                        v-model="newUser.role"
                        label="Роль"
                        :items="roleOptions"
                        item-title="text"
                        item-value="value"
                        required
                        variant="outlined"
                        density="comfortable"
                        :rules="[v => !!v || 'Роль обязательна']"
                      ></v-select>
                    </v-col>
                    
                    <v-col cols="12">
                      <v-text-field
                        v-model="newUser.position"
                        label="Должность"
                        variant="outlined"
                        density="comfortable"
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12">
                      <v-text-field
                        v-model="newUser.password"
                        label="Пароль"
                        type="password"
                        required
                        variant="outlined"
                        density="comfortable"
                        :rules="[v => !!v || 'Пароль обязателен', v => v.length >= 6 || 'Пароль должен содержать не менее 6 символов']"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="pa-4 pt-0">
                <v-spacer></v-spacer>
                <v-btn
                  color="grey-darken-1"
                  variant="text"
                  @click="showAddUserDialog = false"
                >
                  Отмена
                </v-btn>
                <v-btn
                  color="primary"
                  variant="elevated"
                  @click="addUser"
                  :loading="loading"
                  :disabled="loading"
                >
                  Добавить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-window-item>
      </v-window>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, USER_ROLES } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()
const activeTab = ref('profile')
const profileForm = ref(null)
const addUserForm = ref(null)
const loading = ref(false)
const showAddUserDialog = ref(false)

// Profile data
const profileData = ref({
  name: '',
  email: '',
  phone: '',
  inn: '',
  ogrn: '',
  bankDetails: '',
  legalAddress: '',
  physicalAddress: '',
  contractNumber: '',
  contractDate: '',
  edsNumber: '',
  edsDate: '',
  advancePayment: 0
})

// Applications
const applications = ref([
  {
    id: 1,
    number: 'ТП-2024-001',
    date: '01.04.2024',
    type: 'Тяжелая промышленность',
    title: 'Подтверждение соответствия продукции',
    status: 'В обработке'
  },
  {
    id: 2,
    number: 'ТП-2024-002',
    date: '02.04.2024',
    type: 'Легкая промышленность',
    title: 'Декларация соответствия',
    status: 'Завершено'
  }
])

const applicationHeaders = [
  { title: 'Номер', key: 'number', sortable: true },
  { title: 'Дата', key: 'date', sortable: true },
  { title: 'Тип', key: 'type', sortable: true },
  { title: 'Название', key: 'title', sortable: true },
  { title: 'Статус', key: 'status', sortable: true },
  { title: 'Действия', key: 'actions', sortable: false }
]

// Documents
const documents = ref([
  {
    id: 1,
    number: 'СЧ-2024-001',
    date: '01.04.2024',
    type: 'Счет',
    applicationNumber: 'ТП-2024-001',
    amount: 5000,
    status: 'Не оплачен'
  },
  {
    id: 2,
    number: 'АКТ-2024-001',
    date: '02.04.2024',
    type: 'Акт',
    applicationNumber: 'ТП-2024-002',
    amount: 3000,
    status: 'Закрыт'
  }
])

const documentHeaders = [
  { title: 'Номер', key: 'number', sortable: true },
  { title: 'Дата', key: 'date', sortable: true },
  { title: 'Тип', key: 'type', sortable: true },
  { title: 'Заявка', key: 'applicationNumber', sortable: true },
  { title: 'Сумма', key: 'amount', sortable: true },
  { title: 'Статус', key: 'status', sortable: true },
  { title: 'Действия', key: 'actions', sortable: false }
]

// Users (Admin only)
const users = ref([
  {
    id: 1,
    name: 'Иванов Иван Иванович',
    email: 'admin@example.com',
    role: USER_ROLES.ADMIN,
    position: 'Главный администратор'
  },
  {
    id: 2,
    name: 'Петров Петр Петрович',
    email: 'manager@example.com',
    role: USER_ROLES.MANAGER,
    position: 'Менеджер по работе с клиентами'
  },
  {
    id: 3,
    name: 'Сидоров Сидор Сидорович',
    email: 'expert@example.com',
    role: USER_ROLES.EXPERT,
    position: 'Ведущий эксперт'
  },
  {
    id: 4,
    name: 'ООО "Ромашка"',
    email: 'client@example.com',
    role: USER_ROLES.CLIENT,
    position: ''
  }
])

const userHeaders = [
  { title: 'Имя', key: 'name', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'Роль', key: 'role', sortable: true },
  { title: 'Должность', key: 'position', sortable: true },
  { title: 'Действия', key: 'actions', sortable: false }
]

const roleOptions = [
  { text: 'Клиент', value: USER_ROLES.CLIENT },
  { text: 'Эксперт', value: USER_ROLES.EXPERT },
  { text: 'Менеджер', value: USER_ROLES.MANAGER },
  { text: 'Администратор', value: USER_ROLES.ADMIN },
  { text: 'Испытатель', value: USER_ROLES.TESTER }
]

// New user form
const newUser = ref({
  name: 'admin',
  email: 'admin',
  role: USER_ROLES.CLIENT,
  position: '',
  password: ''
})

onMounted(() => {
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }
  
  // Load user profile data
  if (authStore.user) {
    profileData.value = { ...authStore.user }
  }
  
  // Load applications, documents, and users data
  // In a real app, these would be loaded from an API
})

// Methods
const updateProfile = async () => {
  const { valid } = await profileForm.value.validate()
  
  if (!valid) return
  
  loading.value = true
  
  try {
    await authStore.updateUserProfile(profileData.value)
    // Show success message
  } catch (error) {
    console.error('Failed to update profile:', error)
    // Show error message
  } finally {
    loading.value = false
  }
}

const viewApplication = (id) => {
  router.push(`/application/${id}`)
}

const editApplication = (id) => {
  router.push(`/application/${id}/edit`)
}

const downloadDocument = (id) => {
  // In a real app, this would download the document
  console.log('Downloading document:', id)
}

const updateDocumentStatus = (id) => {
  // In a real app, this would open a dialog to update the document status
  console.log('Updating document status:', id)
}

const editUser = (id) => {
  // In a real app, this would open a dialog to edit the user
  console.log('Editing user:', id)
}

const addUser = async () => {
  const { valid } = await addUserForm.value.validate()
  
  if (!valid) return
  
  loading.value = true
  
  try {
    // In a real app, this would make an API call to add a user
    users.value.push({
      id: users.value.length + 1,
      ...newUser.value
    })
    
    showAddUserDialog.value = false
    newUser.value = {
      name: '',
      email: '',
      role: USER_ROLES.CLIENT,
      position: '',
      password: ''
    }
  } catch (error) {
    console.error('Failed to add user:', error)
    // Show error message
  } finally {
    loading.value = false
  }
}

// Helper functions
const getStatusColor = (status) => {
  switch (status) {
    case 'В обработке': return 'blue'
    case 'Завершено': return 'green'
    case 'Отклонено': return 'red'
    default: return 'grey'
  }
}

const getDocumentStatusColor = (status) => {
  switch (status) {
    case 'Оплачен': return 'green'
    case 'Закрыт': return 'green'
    case 'Не оплачен': return 'orange'
    default: return 'grey'
  }
}

const getRoleColor = (role) => {
  switch (role) {
    case USER_ROLES.ADMIN: return 'deep-purple'
    case USER_ROLES.MANAGER: return 'indigo'
    case USER_ROLES.EXPERT: return 'blue'
    case USER_ROLES.TESTER: return 'teal'
    case USER_ROLES.CLIENT: return 'green'
    default: return 'grey'
  }
}

const getRoleName = (role) => {
  switch (role) {
    case USER_ROLES.ADMIN: return 'Администратор'
    case USER_ROLES.MANAGER: return 'Менеджер'
    case USER_ROLES.EXPERT: return 'Эксперт'
    case USER_ROLES.TESTER: return 'Испытатель'
    case USER_ROLES.CLIENT: return 'Клиент'
    default: return 'Гость'
  }
}
</script>

<style scoped>
.profile-tabs {
  border-bottom: 1px solid #e0e0e0;
}
</style>
