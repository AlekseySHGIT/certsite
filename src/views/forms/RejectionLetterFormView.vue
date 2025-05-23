<template>
  <div>
    <h1 class="text-h4 mb-5">Отказное письмо</h1>
    
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

      <!-- Common Fields -->
      <CommonFieldsHighlighted
        v-model:formData="formData"
        ref="commonFields"
      />

      <!-- Rejection Letter Specific Fields -->
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="formData.rejectionReason"
            label="Причина отказа"
            :items="rejectionReasonOptions"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-select>

          <v-text-field
            v-model="formData.productName"
            label="Наименование продукции"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3 common-field"
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.productCode"
            label="Код ТН ВЭД"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            class="mb-3"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="formData.additionalInfo"
            label="Дополнительная информация"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            auto-grow
            rows="3"
            class="mb-3"
          ></v-textarea>

          <v-textarea
            v-model="formData.recommendations"
            label="Рекомендации"
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
import CommonFieldsHighlighted from '@/components/shared/CommonFieldsHighlighted.vue'
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

const rejectionReasonOptions = [
  'Не подлежит обязательной сертификации',
  'Недостаточно документов',
  'Несоответствие требованиям ТР ТС',
  'Отсутствие аккредитации',
  'Другое'
]

// Sample data for rejection letter form
const formData = ref({
  taskType: 'rejection',
  title: 'Отказное письмо - Станок фрезерный XYZ-1000',
  applicant: 'ООО "МашСтанок"',
  inn: '7705678901',
  ogrn: '1027700567890',
  legalAddress: '115054, г. Москва, ул. Дубининская, д. 33',
  actualAddress: '115054, г. Москва, ул. Дубининская, д. 33, стр. 2',
  phone: '+7 (495) 567-89-01',
  email: 'info@mashstanok.ru',
  manufacturerSameAsApplicant: 'Да',
  manufacturer: 'ООО "МашСтанок"',
  productName: 'Станок фрезерный XYZ-1000',
  rejectionReason: 'Не подлежит обязательной сертификации',
  additionalInfo: 'На основании анализа представленных документов и технической документации установлено:\n1. Продукция не включена в единый перечень продукции, подлежащей обязательной сертификации\n2. Продукция не подпадает под действие технических регламентов ТР ТС\n3. Продукция предназначена для промышленного использования'
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

.common-fields-section {
  margin-bottom: 24px;
}
</style>
