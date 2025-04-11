<template>
  <div>
    <h1 class="text-h4 mb-5">Паспорт продукции</h1>
    
    <v-card flat class="pa-4 bg-grey-lighten-4">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="formData.title"
            label="Название заявки"
            variant="outlined"
            bg-color="yellow-lighten-4"
            density="comfortable"
            hide-details="auto"
            class="mb-3 application-title"
            required
            persistent-placeholder
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Base Form Fields -->
      <ApplicationBaseForm
        v-model:formData="formData"
        ref="baseForm"
      />

      <!-- Product Passport Specific Fields -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.productName"
            label="Наименование продукции"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.modelSeries"
            label="Модель/Серия"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.serialNumber"
            label="Серийный номер"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.manufactureDate"
            label="Дата изготовления"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            type="date"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="formData.technicalSpecs"
            label="Технические характеристики"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
            required
          ></v-textarea>

          <v-textarea
            v-model="formData.complectation"
            label="Комплектация"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
            required
          ></v-textarea>

          <v-textarea
            v-model="formData.warrantyTerms"
            label="Гарантийные условия"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
            required
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            color="error"
            variant="outlined"
            class="mr-2"
            @click="$emit('cancel')"
            :disabled="saving"
          >
            Отмена
          </v-btn>
          <v-btn
            color="primary"
            @click="save"
            :loading="saving"
          >
            {{ isCreateMode ? 'Создать' : 'Сохранить' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ApplicationBaseForm from '@/components/shared/ApplicationBaseForm.vue'
import { api } from '@/services/api'
import { useApplicationSave } from '@/composables/useApplicationSave'

const props = defineProps({
  isCreateMode: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['cancel', 'saved'])

const router = useRouter()
const route = useRoute()
const baseForm = ref(null)

const { saving, saveApplication, cancelApplication } = useApplicationSave()

const formData = ref({
  taskType: 'passport',
  title: '',
  applicant: '',
  inn: '',
  ogrn: '',
  legalAddress: '',
  actualAddress: '',
  phone: '',
  email: '',
  manufacturerSameAsApplicant: 'Нет',
  manufacturer: '',
  productName: '',
  modelSeries: '',
  serialNumber: '',
  manufactureDate: '',
  technicalSpecs: '',
  complectation: '',
  warrantyTerms: ''
})

const save = async () => {
  try {
    // Validate base form
    const isBaseValid = await baseForm.value.validate()
    if (!isBaseValid) return

    const result = await saveApplication(formData.value, props.isCreateMode)
    emit('saved', result)
  } catch (error) {
    // Error is already handled in the composable
  }
}

// Load existing application data if editing
if (!props.isCreateMode) {
  const loadApplication = async () => {
    try {
      const data = await api.getApplication(route.params.id)
      if (data) {
        formData.value = { ...formData.value, ...data }
      }
    } catch (error) {
      console.error('Failed to load application:', error)
    }
  }
  loadApplication()
}
</script>

<style scoped>
.application-title :deep(.v-field__input) {
  background-color: rgb(255, 255, 200) !important;
}
</style>
