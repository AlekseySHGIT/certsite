<template>
  <div>
    <h1 class="text-h4 mb-5">«Тяжелая промышленность»</h1>
    
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

      <!-- Heavy Industry Specific Fields -->
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="formData.heavyIndustryRegulations"
            label="Технические регламенты"
            :items="heavyIndustryRegulationOptions"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            multiple
            chips
            class="mb-3"
            required
          ></v-select>

          <v-text-field
            v-model="formData.nominalVoltage"
            label="Номинальное напряжение"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="formData.nominalPressure"
            label="Номинальное давление"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="formData.operationRules"
            label="Правила эксплуатации"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
          ></v-textarea>

          <v-textarea
            v-model="formData.operationHazards"
            label="Возможные опасности при эксплуатации"
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
            @click="cancelApplication"
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

const heavyIndustryRegulationOptions = [
  'ТР ТС 004/2011',
  'ТР ТС 010/2011',
  'ТР ТС 020/2011',
  'ТР ТС 032/2013',
  'ТР ЕАЭС 037/2016'
]

const formData = ref({
  taskType: 'heavy',
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
  heavyIndustryRegulations: [],
  nominalVoltage: '',
  nominalPressure: '',
  operationRules: '',
  operationHazards: ''
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
</script>

<style scoped>
.application-title :deep(.v-field__input) {
  background-color: rgb(255, 255, 200) !important;
}
</style>
