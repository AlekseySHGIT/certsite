<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          v-model="formData.applicant"
          label="Заявитель"
          :items="applicantOptions"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3"
          required
        ></v-select>

        <v-text-field
          v-model="formData.inn"
          label="ИНН"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.ogrn"
          label="ОГРН"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.legalAddress"
          label="Юридический адрес"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.actualAddress"
          label="Фактический адрес"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3"
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
          class="mb-3"
          required
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          label="Email"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-divider class="my-3"></v-divider>

    <!-- Manufacturer Info -->
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          v-model="formData.manufacturerSameAsApplicant"
          label="Изготовитель совпадает с заявителем?"
          :items="['Да', 'Нет']"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3"
          required
        ></v-select>

        <v-text-field
          v-model="formData.manufacturer"
          label="Изготовитель"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          class="mb-3"
          :disabled="formData.manufacturerSameAsApplicant === 'Да'"
          required
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
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

// Watch for manufacturer same as applicant changes
watch(() => props.formData.manufacturerSameAsApplicant, (newVal) => {
  if (newVal === 'Да') {
    emit('update:formData', {
      ...props.formData,
      manufacturer: props.formData.applicant,
      manufacturerLegalAddress: props.formData.legalAddress,
      manufacturerActualAddress: props.formData.actualAddress
    })
  }
})

const validate = async () => {
  const { valid } = await form.value.validate()
  return valid
}

defineExpose({
  validate
})
</script>
