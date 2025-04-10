<template>
  <v-app>
    <AppNavigation />
    <v-main>
      <AppHeader />
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AppNavigation from './components/AppNavigation.vue'
import AppHeader from './components/AppHeader.vue'
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
