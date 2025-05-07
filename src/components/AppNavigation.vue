<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    :width="280"
    class="navigation-drawer"
  >
    <div class="d-flex align-center pa-4">
      <v-avatar
        color="warning"
        size="36"
        class="me-2"
      >
        <v-icon>mdi-card-account-details-outline</v-icon>
      </v-avatar>
      <span class="text-h6 white--text">Центр сертификации</span>
    </div>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <!-- Main menu items from routes -->
      <template v-for="route in menuItems" :key="route.path">
        <v-list-item
          v-if="route.meta?.showInMenu"
          :prepend-icon="route.meta.icon"
          :title="route.meta.title"
          :value="route.name"
          :to="route.path"
        ></v-list-item>
      </template>

      <!-- Applications Section - using CASL for permissions -->
      <Can I="create" a="Application">
        <v-list-item
          prepend-icon="mdi-plus-circle"
          title="Создать заявку"
          value="create-application"
          to="/application/create"
        ></v-list-item>
      </Can>

      <!-- Additional menu items using CASL for permissions -->
      <!-- Invoices - Only for admin and manager roles -->
      <Can I="manage" a="Invoice">
        <v-list-item 
          prepend-icon="mdi-bank" 
          title="Счета" 
          value="invoices" 
          to="/invoices"
        ></v-list-item>
      </Can>
      
      <!-- Contacts - For authenticated users -->
      <Can I="read" a="Profile">
        <v-list-item 
          prepend-icon="mdi-contacts" 
          title="Контакты" 
          value="contacts" 
          to="/contacts"
        ></v-list-item>
      </Can>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-menu v-model="userMenu" :close-on-content-click="false" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              block
              color="primary"
              variant="tonal"
              v-bind="props"
            >
              <v-avatar size="32" color="primary" class="mr-2">
                <span class="text-white">{{ userInitials }}</span>
              </v-avatar>
              {{ authStore.user?.name || 'Гость' }}
              <v-icon class="ml-2">mdi-chevron-up</v-icon>
            </v-btn>
          </template>

          <v-card min-width="200">
            <v-list>
              <v-list-item :to="{ name: 'personal-account' }">
                <template v-slot:prepend>
                  <v-icon>mdi-account</v-icon>
                </template>
                <v-list-item-title>Личный кабинет</v-list-item-title>
              </v-list-item>
              
              <v-divider></v-divider>

              <v-list-item @click="logout" color="error">
                <template v-slot:prepend>
                  <v-icon color="error">mdi-logout</v-icon>
                </template>
                <v-list-item-title class="text-error">Выйти</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useAbility } from '@casl/vue'
import { usePermissionsStore } from '../stores/permissions'

const drawer = ref(true)
const rail = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const userMenu = ref(false)

const menuItems = computed(() => {
  const currentRole = authStore.isAuthenticated ? authStore.role : 'guest'
  // For admin, show all routes in the menu
  if (currentRole === 'admin') {
    return router.options.routes.filter(route => route.meta?.showInMenu)
  }
  // For others, filter by roles
  return router.options.routes.filter(route => 
    route.meta?.showInMenu && route.meta?.roles?.includes(currentRole)
  )
})

const userInitials = computed(() => {
  const name = authStore.user?.name || 'Гость'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const selectApplicationType = (type) => {
  router.push({ 
    name: 'application-create',
    query: { type }
  })
}

const logout = () => {
  authStore.logout()
  userMenu.value = false
  router.push('/login')
}
</script>

<style scoped>
.navigation-drawer {
  background-color: #1a237e !important;
  color: white !important;
}

.v-list {
  background-color: transparent !important;
  color: white !important;
}

.v-list-item {
  color: white !important;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.v-list-group__items .v-list-item {
  padding-left: 16px !important;
}

.v-divider {
  border-color: rgba(255, 255, 255, 0.12) !important;
}
</style>
