<template>
  <v-container fluid class="pa-0">
    <v-card flat>
      <v-card-text class="pa-0">
        <!-- Application Type Header -->
        <div class="d-flex align-center pa-4 bg-primary text-white">
          <h2 class="text-h5 font-weight-medium">{{ title }}</h2>
        </div>

        <!-- Application Content -->
        <div class="pa-4">
          <slot></slot>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.bg-primary {
  background-color: #1a237e !important;
}
</style>
