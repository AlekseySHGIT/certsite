<template>
  <div>
    <h1 class="text-h4 mb-5">«Легкая промышленность»</h1>
    
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

      <!-- Action Buttons -->
      <v-row class="mb-4">
        <v-col cols="12" class="d-flex justify-end">
          <v-btn 
            color="primary" 
            variant="tonal"
            prepend-icon="mdi-file-pdf-box"
            @click="downloadInvoice"
            class="mr-2"
            :disabled="!formData.title"
          >
            Скачать счет
          </v-btn>
        </v-col>
      </v-row>

      <!-- Light Industry Specific Fields -->
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="formData.lightIndustryRegulations"
            label="Технические регламенты"
            :items="lightIndustryRegulationOptions"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            multiple
            chips
            class="mb-3"
            required
          ></v-select>

          <v-text-field
            v-model="formData.productCategory"
            label="Категория продукции"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.materialComposition"
            label="Состав материалов"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="formData.productionMethod"
            label="Метод производства"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
          ></v-textarea>

          <v-textarea
            v-model="formData.qualityStandards"
            label="Стандарты качества"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
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
import { downloadInvoice as generateAndDownloadInvoice } from '@/utils/invoiceGenerator'

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

const lightIndustryRegulationOptions = [
  'ТР ТС 005/2011',
  'ТР ТС 007/2011',
  'ТР ТС 017/2011',
  'ТР ТС 021/2011',
  'ТР ТС 022/2011',
  'ТР ТС 023/2011',
  'ТР ТС 024/2011',
  'ТР ТС 033/2013',
  'ТР ТС 034/2013',
  'ТР ЕАЭС 040/2016'
]

const formData = ref({
  taskType: 'light',
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
  lightIndustryRegulations: [],
  productCategory: '',
  materialComposition: '',
  productionMethod: '',
  qualityStandards: ''
})

const save = async () => {
  try {
    // Validate base form
    const isBaseValid = await baseForm.value.validate()
    if (!isBaseValid) return

    const result = await saveApplication(formData.value, props.isCreateMode)
    emit('saved', result)
    router.push('/applications')
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

const downloadInvoice = () => {
  if (!formData.value.title) return
  
  // Use the dynamic invoice generator
  generateAndDownloadInvoice(formData.value)
}
</script>

<style scoped>
.application-title :deep(.v-field__input) {
  background-color: rgb(255, 255, 200) !important;
}
</style>
