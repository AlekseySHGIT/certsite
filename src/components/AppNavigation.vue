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

      <!-- Applications Section - only for authenticated users -->
      <v-list-group 
        v-if="authStore.isAuthenticated"
        value="applications-group"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-file-document-multiple"
            title="Заявки"
            value="applications-menu"
          ></v-list-item>
        </template>

        <v-list-item
          prepend-icon="mdi-factory"
          title="Тяжелая промышленность"
          value="applications-heavy"
          to="/applications/create"
          :custom-value="{ type: 'heavy' }"
          @click="selectApplicationType('heavy')"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-tshirt-crew"
          title="Легкая промышленность"
          value="applications-light"
          to="/applications/create"
          :custom-value="{ type: 'light' }"
          @click="selectApplicationType('light')"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-close-circle"
          title="Отказные письма"
          value="applications-rejection"
          to="/applications/create"
          :custom-value="{ type: 'rejection' }"
          @click="selectApplicationType('rejection')"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-book-open"
          title="Руководства по эксплуатации"
          value="applications-manual"
          to="/applications/create"
          :custom-value="{ type: 'manual' }"
          @click="selectApplicationType('manual')"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-certificate"
          title="Паспорт продукции"
          value="applications-passport"
          to="/applications/create"
          :custom-value="{ type: 'passport' }"
          @click="selectApplicationType('passport')"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-shield-check"
          title="Обоснование безопасности"
          value="applications-safety"
          to="/applications/create"
          :custom-value="{ type: 'safety' }"
          @click="selectApplicationType('safety')"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-file-document"
          title="ТУ"
          value="applications-tu"
          to="/applications/create"
          :custom-value="{ type: 'tu' }"
          @click="selectApplicationType('tu')"
        ></v-list-item>
      </v-list-group>

      <!-- Additional menu items only for authenticated users -->
      <template v-if="authStore.isAuthenticated">
        <v-list-item 
          prepend-icon="mdi-bank" 
          title="Счета" 
          value="invoices" 
          to="/invoices"
          v-if="['manager', 'admin'].includes(authStore.role)"
        ></v-list-item>
        <v-list-item 
          prepend-icon="mdi-contacts" 
          title="Контакты" 
          value="contacts" 
          to="/contacts"
        ></v-list-item>
      </template>
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

const drawer = ref(true)
const rail = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const userMenu = ref(false)

const menuItems = computed(() => {
  const currentRole = authStore.isAuthenticated ? authStore.role : 'guest'
  return router.options.routes.filter(route => 
    route.meta?.roles?.includes(currentRole)
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
