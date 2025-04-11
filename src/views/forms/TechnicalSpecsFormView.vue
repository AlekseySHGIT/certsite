<template>
  <div>
    <h1 class="text-h4 mb-5">Технические условия</h1>
    
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

      <!-- Technical Specs Specific Fields -->
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
            v-model="formData.standardNumber"
            label="Номер стандарта"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-text-field>

          <v-select
            v-model="formData.category"
            label="Категория продукции"
            :items="categoryOptions"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="formData.technicalRequirements"
            label="Технические требования"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
            required
          ></v-textarea>

          <v-textarea
            v-model="formData.testingMethods"
            label="Методы испытаний"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
            required
          ></v-textarea>

          <v-textarea
            v-model="formData.qualityControl"
            label="Контроль качества"
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

const categoryOptions = [
  'Машиностроение',
  'Электротехника',
  'Химическая промышленность',
  'Пищевая промышленность',
  'Строительные материалы',
  'Легкая промышленность'
]

// Sample data for technical specs form
const formData = ref({
  taskType: 'specs',
  title: 'Технические условия - Кабель КВВГ',
  applicant: 'ООО "КабельТех"',
  inn: '7704567890',
  ogrn: '1027700456789',
  legalAddress: '107023, г. Москва, ул. Электрозаводская, д. 21',
  actualAddress: '107023, г. Москва, ул. Электрозаводская, д. 21, корп. 41',
  phone: '+7 (495) 456-78-90',
  email: 'info@cabletech.ru',
  manufacturerSameAsApplicant: 'Да',
  manufacturer: 'ООО "КабельТех"',
  productName: 'Кабель КВВГ',
  standardNumber: 'ТУ 3500-001-12345678-2025',
  category: 'Электротехника',
  technicalRequirements: '1. Конструкция: многожильный медный проводник\n2. Изоляция: ПВХ пластикат\n3. Рабочее напряжение: до 660В\n4. Температурный диапазон: -50°C до +70°C\n5. Срок службы: не менее 15 лет',
  testingMethods: '1. Проверка электрического сопротивления токопроводящих жил\n2. Испытание напряжением\n3. Проверка механических характеристик\n4. Испытание на нераспространение горения\n5. Проверка маркировки и упаковки',
  qualityControl: '1. Входной контроль материалов\n2. Операционный контроль в процессе производства\n3. Приемо-сдаточные испытания каждой партии\n4. Периодические испытания\n5. Типовые испытания при изменении конструкции или технологии'
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
