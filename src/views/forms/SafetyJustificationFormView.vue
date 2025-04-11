<template>
  <div>
    <h1 class="text-h4 mb-5">Обоснование безопасности</h1>
    
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

      <!-- Safety Justification Specific Fields -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.equipmentName"
            label="Наименование оборудования"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.equipmentPurpose"
            label="Назначение оборудования"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-text-field>

          <v-select
            v-model="formData.riskLevel"
            label="Уровень риска"
            :items="riskLevelOptions"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="formData.hazardIdentification"
            label="Идентификация опасностей"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
            required
          ></v-textarea>

          <v-textarea
            v-model="formData.safetyMeasures"
            label="Меры обеспечения безопасности"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
            required
          ></v-textarea>

          <v-textarea
            v-model="formData.riskAssessment"
            label="Оценка остаточного риска"
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

const riskLevelOptions = [
  'Низкий',
  'Средний',
  'Высокий',
  'Критический'
]

// Sample data for safety justification form
const formData = ref({
  taskType: 'safety',
  title: 'Обоснование безопасности - Промышленный робот PRO-5000',
  applicant: 'АО "РобоСистемы"',
  inn: '7703456789',
  ogrn: '1027700345678',
  legalAddress: '115280, г. Москва, ул. Автозаводская, д. 25',
  actualAddress: '115280, г. Москва, ул. Автозаводская, д. 25, стр. 2',
  phone: '+7 (495) 345-67-89',
  email: 'safety@robosystems.ru',
  manufacturerSameAsApplicant: 'Да',
  manufacturer: 'АО "РобоСистемы"',
  equipmentName: 'Промышленный робот PRO-5000',
  equipmentPurpose: 'Автоматизированная сварка металлических конструкций',
  riskLevel: 'Высокий',
  hazardIdentification: '1. Механические опасности при движении робота\n2. Электрические опасности от высоковольтных компонентов\n3. Термические опасности при сварке\n4. Опасности от излучения сварочной дуги',
  safetyMeasures: '1. Защитное ограждение рабочей зоны\n2. Система аварийной остановки\n3. Датчики присутствия персонала\n4. Автоматическая система пожаротушения\n5. Защитные экраны от излучения',
  riskAssessment: 'После внедрения мер безопасности:\n1. Механические риски снижены до приемлемого уровня\n2. Электробезопасность обеспечена системой защиты\n3. Термические риски контролируются\n4. Защита от излучения соответствует нормам'
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
