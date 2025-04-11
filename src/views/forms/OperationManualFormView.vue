<template>
  <div>
    <h1 class="text-h4 mb-5">Руководство по эксплуатации</h1>
    
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

      <!-- Operation Manual Specific Fields -->
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
            v-model="formData.modelNumber"
            label="Номер модели"
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
            v-model="formData.powerRequirements"
            label="Требования к питанию"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
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
            v-model="formData.operationProcedures"
            label="Процедуры эксплуатации"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
            required
          ></v-textarea>

          <v-textarea
            v-model="formData.maintenanceSchedule"
            label="График обслуживания"
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

// Sample data for operation manual form
const formData = ref({
  taskType: 'manual',
  title: 'Руководство по эксплуатации - Станок токарный СТ-2000',
  applicant: 'ООО "СтанкоСервис"',
  inn: '7707890123',
  ogrn: '1027700789012',
  legalAddress: '125047, г. Москва, ул. 2-я Тверская-Ямская, д. 28',
  actualAddress: '125047, г. Москва, ул. 2-я Тверская-Ямская, д. 28, корп. 2',
  phone: '+7 (495) 789-01-23',
  email: 'info@stankoservice.ru',
  manufacturerSameAsApplicant: 'Да',
  manufacturer: 'ООО "СтанкоСервис"',
  equipmentName: 'Станок токарный СТ-2000',
  modelNumber: 'СТ-2000.01.00',
  serialNumber: '2025/03-0789',
  powerRequirements: '380В, 50Гц, 7.5кВт',
  technicalSpecs: '1. Максимальный диаметр обработки: 500 мм\n2. Максимальная длина обработки: 2000 мм\n3. Частота вращения шпинделя: 20-2000 об/мин\n4. Точность позиционирования: 0.01 мм\n5. Габаритные размеры: 3500х1800х1900 мм',
  operationProcedures: '1. Подготовка к работе\n   - Проверка уровня масла\n   - Проверка систем безопасности\n   - Включение и прогрев\n2. Основные операции\n   - Установка заготовки\n   - Настройка режимов резания\n   - Процесс обработки\n3. Завершение работы\n   - Очистка рабочей зоны\n   - Проверка состояния инструмента\n   - Отключение станка',
  maintenanceSchedule: '1. Ежедневное обслуживание\n   - Очистка рабочей зоны\n   - Проверка уровня СОЖ\n2. Еженедельное обслуживание\n   - Смазка направляющих\n   - Проверка затяжки креплений\n3. Ежемесячное обслуживание\n   - Замена фильтров\n   - Проверка электрических соединений\n4. Полугодовое обслуживание\n   - Замена масла\n   - Калибровка'
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
