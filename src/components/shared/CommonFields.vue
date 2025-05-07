<template>
  <div class="common-fields-wrapper">
    <h3 style="margin-bottom: 16px; color: #0066cc; font-weight: 500;">Общие поля для всех типов заявок</h3>
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          v-model="formData.applicant"
          label="Заявитель"
          :items="applicantOptions"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 common-field"
          required
        ></v-select>

        <v-text-field
          v-model="formData.inn"
          label="ИНН"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 common-field"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.ogrn"
          label="ОГРН"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 common-field"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.legalAddress"
          label="Юридический адрес"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 common-field"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.actualAddress"
          label="Фактический адрес"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 common-field"
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
          class="mb-3 common-field"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          label="Email"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3 common-field"
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
/* Using direct selectors to override Vuetify styles */
.common-fields-wrapper .v-field__field,
.common-fields-wrapper .v-field__input {
  background-color: #e6f2ff !important;
}

.common-fields-wrapper .v-field {
  background-color: #e6f2ff !important;
  border: 1px solid #add8e6 !important;
}

.common-fields-wrapper {
  background-color: #f0f8ff !important;
  padding: 16px !important;
  border-radius: 8px !important;
  border: 2px solid #add8e6 !important;
  margin-bottom: 16px !important;
}
</style>
