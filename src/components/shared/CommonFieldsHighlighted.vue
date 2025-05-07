<template>
  <div class="common-fields-highlighted">
    <div class="common-fields-header">
      <v-icon color="primary" class="mr-2">mdi-checkbox-multiple-marked-circle-outline</v-icon>
      <span>Общие поля для всех типов заявок</span>
    </div>
    
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          v-model="formData.applicant"
          label="Заявитель"
          :items="applicantOptions"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 blue-field"
          bg-color="blue-lighten-5"
          required
        ></v-select>

        <v-text-field
          v-model="formData.inn"
          label="ИНН"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 blue-field"
          bg-color="blue-lighten-5"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.ogrn"
          label="ОГРН"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 blue-field"
          bg-color="blue-lighten-5"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.legalAddress"
          label="Юридический адрес"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 blue-field"
          bg-color="blue-lighten-5"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.actualAddress"
          label="Фактический адрес"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 blue-field"
          bg-color="blue-lighten-5"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.phone"
          label="Телефон"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 blue-field"
          bg-color="blue-lighten-5"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          label="Email"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 blue-field"
          bg-color="blue-lighten-5"
          required
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:formData'])

const authStore = useAuthStore()
const form = ref(null)

const applicantOptions = ref([
  'Создать нового',
  ...(authStore.isAuthenticated ? [authStore.user?.companyName || authStore.user?.fullName || authStore.user?.email] : [])
].filter(Boolean))

// Watch for changes to update parent
watch(() => props.formData, (newVal) => {
  emit('update:formData', newVal)
}, { deep: true })

const validate = async () => {
  return true // Validation will be handled at the form level
}

defineExpose({
  validate
})
</script>

<style>
.common-fields-highlighted {
  background-color: rgba(173, 216, 230, 0.2);
  border: 2px solid #add8e6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  position: relative;
}

.common-fields-header {
  background-color: #add8e6;
  color: #0066cc;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

/* This uses Vuetify's built-in bg-color property which should work reliably */
</style>
