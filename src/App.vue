<template>
  <v-app>
    <AppNavigation />
    <v-main>
      <AppHeader />
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>

    <!-- Global notification snackbars -->
    <v-snackbar
      v-for="notification in notifications"
      :key="notification.id"
      v-model="notification.show"
      :timeout="notification.timeout"
      :color="getNotificationColor(notification.type)"
      location="top right"
      @update:model-value="(val) => !val && removeNotification(notification.id)"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">{{ getNotificationIcon(notification.type) }}</v-icon>
        {{ notification.message }}
      </div>
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="notification.show = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import AppNavigation from './components/AppNavigation.vue'
import AppHeader from './components/AppHeader.vue'
import { useNotification } from './composables/useNotification'

const { notifications, removeNotification } = useNotification()

const getNotificationColor = (type) => {
  switch (type) {
    case 'success': return 'success'
    case 'error': return 'error'
    case 'warning': return 'warning'
    case 'info': return 'info'
    default: return 'info'
  }
}

const getNotificationIcon = (type) => {
  switch (type) {
    case 'success': return 'mdi-check-circle'
    case 'error': return 'mdi-alert-circle'
    case 'warning': return 'mdi-alert'
    case 'info': return 'mdi-information'
    default: return 'mdi-information'
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}

.v-application {
  background-color: #f5f5f5 !important;
}
</style>
