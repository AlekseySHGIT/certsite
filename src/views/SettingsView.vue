<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Настройки прав доступа</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-table density="comfortable" hover>
              <thead>
                <tr>
                  <th>Страница</th>
                  <th v-for="role in roles" :key="role.id">{{ role.name }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in menuItems" :key="item.path">
                  <td>{{ item.name }}</td>
                  <td v-for="role in roles" :key="`${item.path}-${role.id}`">
                    <v-checkbox-btn
                      v-model="permissions[role.id][item.path]"
                      :label="'Доступ'"
                      density="compact"
                      @change="updatePermissions(role.id, item.path)"
                    ></v-checkbox-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="savePermissions">
              Сохранить изменения
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const roles = [
  { id: 'guest', name: 'Гость сайта' },
  { id: 'client', name: 'Клиент' },
  { id: 'expert', name: 'Эксперт' },
  { id: 'manager', name: 'Менеджер' },
  { id: 'admin', name: 'Администратор' },
  { id: 'tester', name: 'Испытатель' }
]

const menuItems = [
  { path: '/applications', name: 'Заявки' },
  { path: '/news', name: 'Новости' },
  { path: '/profile', name: 'Профиль' },
  { path: '/heavy-industry', name: 'Тяжелая промышленность' },
  { path: '/light-industry', name: 'Легкая промышленность' },
  { path: '/rejection-letter', name: 'Письма об отказе' },
  { path: '/technical-specification', name: 'Технические условия' },
  { path: '/manual', name: 'Руководство' }
]

const permissions = ref({})

// Initialize permissions structure
roles.forEach(role => {
  permissions.value[role.id] = {}
  menuItems.forEach(item => {
    permissions.value[role.id][item.path] = false
  })
})

// Load saved permissions
onMounted(async () => {
  try {
    const response = await fetch('/api/permissions')
    const data = await response.json()
    permissions.value = data
  } catch (error) {
    console.error('Failed to load permissions:', error)
  }
})

const updatePermissions = (roleId, path) => {
  console.log(`Updated ${roleId} permissions for ${path}:`, permissions.value[roleId][path])
}

const savePermissions = async () => {
  try {
    await fetch('/api/permissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(permissions.value),
    })
    // Show success message
 //34
  } catch (error) {
    console.error('Failed to save permissions:', error)
    // Show error message
  }
}
</script>
