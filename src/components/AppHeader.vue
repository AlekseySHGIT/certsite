<template>
  <v-app-bar flat height="50" class="px-4 app-header">
    <v-app-bar-nav-icon class="d-md-none"></v-app-bar-nav-icon>
    <v-app-bar-title class="text-center text-md-left">
      <div class="d-flex align-center">
   
      </div>
    </v-app-bar-title>
    
    <v-text-field
      density="compact"
      variant="solo"
      hide-details
      placeholder="Что будем искать?"
      prepend-inner-icon="mdi-magnify"
      class="search-field mx-4"
      bg-color="#f5f5f5"
    ></v-text-field>
    
    <template v-if="authStore.isAuthenticated">
      <v-btn
        variant="text"
        class="text-none user-btn"
        prepend-icon="mdi-account"
        to="/profile"
      >
        ЛИЧНЫЙ КАБИНЕТ | {{ authStore.user.name }}
      </v-btn>
      
      <v-btn
        variant="text"
        class="text-none logout-btn"
        prepend-icon="mdi-logout"
        @click="logout"
      >
        ВЫЙТИ
      </v-btn>
    </template>
    
    <template v-else>
      <v-btn
        variant="text"
        class="text-none user-btn"
        prepend-icon="mdi-login"
        to="/login"
      >
        ВОЙТИ
      </v-btn>
      
      <v-btn
        variant="text"
        class="text-none user-btn"
        prepend-icon="mdi-account-plus"
        to="/register"
      >
        РЕГИСТРАЦИЯ
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-header {
  border-bottom: 1px solid #e0e0e0;
  background-color: white !important;
}

.app-title {
  font-size: 14px;
  font-weight: 500;
}

.search-field {
  max-width: 300px;
  font-size: 14px;
}

.search-field :deep(.v-field__input) {
  padding-top: 5px;
  min-height: 32px;
}

.user-btn, .logout-btn {
  font-size: 12px;
  letter-spacing: 0.5px;
}

.v-btn--icon.v-btn--density-default {
  width: 36px;
  height: 36px;
}
</style>
