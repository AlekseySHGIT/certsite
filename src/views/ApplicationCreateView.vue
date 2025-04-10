<template>
  <v-container fluid class="pa-0">
    <v-container class="create-application">
      <v-row justify="center">
        <v-col cols="12" style="max-width: 600px">
          <!-- Task Type Selector -->
          <div class="task-type-selector">
            <v-card flat class="task-type-container">
              <v-row no-gutters>
                <v-col v-for="type in taskTypes" :key="type.value" cols="12" sm="6" md="3" lg="auto">
                  <v-card
                    :class="['task-type-card', { 'selected': selectedType === type.value }]"
                    flat
                    ripple
                    @click="selectType(type.value)"
                  >
                    <div class="task-type-content">
                      <v-icon size="32" :color="selectedType === type.value ? 'primary' : 'grey-darken-1'">
                        {{ type.icon }}
                      </v-icon>
                      <div class="task-type-title">{{ type.title }}</div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <v-container fluid class="pa-4 bg-grey-lighten-4" style="max-width: 600px; margin: 0 auto;">
            <h2 class="text-h5 mb-4">{{ getFormTitle }}</h2>
            
            <v-form ref="form" @submit.prevent="saveApplication">
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.applicationType"
                    label="Тип заявки"
                    :items="['Декларирование', 'Сертификация']"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>

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
                </v-col>

                <v-col cols="12" md="6">
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

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.productName"
                    label="Наименование продукции"
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

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.technicalRegulation"
                    label="Технический регламент"
                    :items="getTechnicalRegulationOptions()"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-file-input
                    v-model="formData.files"
                    label="Прикрепить файлы"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    multiple
                    chips
                    class="mb-3"
                  ></v-file-input>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.manufacturerSameAsApplicant"
                    label="Изготовитель совпадает с заявителем?"
                    :items="['Нет', 'Да']" 
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
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

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.productionType"
                    label="Выпуск"
                    :items="['Серийный выпуск']" 
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.scheme"
                    label="Схема"
                    :items="['1Д - серийный выпуск + срок действия']" 
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.declarationValidity"
                    label="Срок действия декларации"
                    :items="['1 год', '3 года', '5 лет']" 
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.laboratory"
                    label="Лаборатория"
                    :items="['ГК ОС «Профессиональность»']" 
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.hasOwnProtocol"
                    label="У вас свой протокол?"
                    :items="['Нет', 'Да']" 
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.protocolCount"
                    label="Количество протоколов"
                    :items="['0', '1', '2', '3', '4', '5']" 
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.manager"
                    label="Менеджер"
                    :items="['']" 
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.expert"
                    label="Эксперт"
                    :items="['Не закреплен']" 
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.cost"
                    label="Стоимость"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.status"
                    label="Статус"
                    :items="['Заявка подана']" 
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.comments"
                    label="Комментарии"
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

              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.taskType"
                    label="Тип задачи"
                    :items="taskTypes"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <div v-if="formData.taskType === 'heavy' || formData.taskType === 'light'">
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.productInfo"
                      label="Информация о продукции"
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

                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.standard"
                      label="Технический регламент"
                      :items="getTechnicalRegulations"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.scheme"
                      label="Схема сертификации"
                      :items="['1с', '2с', '3с', '4с', '5с']"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </div>

              <div v-else-if="formData.taskType === 'rejection'">
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.rejectionReason"
                      label="Причина отказа"
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
              </div>

              <div v-else-if="formData.taskType === 'manual'">
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.productDescription"
                      label="Описание продукции"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="3"
                      class="mb-3"
                      required
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.manualType"
                      label="Тип руководства"
                      :items="['Руководство по эксплуатации', 'Руководство пользователя', 'Техническое руководство']"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </div>

              <div v-else-if="formData.taskType === 'passport'">
                <v-row>
                  <v-col cols="12">
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
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.serialNumber"
                      label="Серийный номер"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-form>

            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn
                  type="submit"
                  color="primary"
                  :loading="saving"
                >
                  Сохранить
                </v-btn>
                <v-btn
                  variant="outlined"
                  @click="cancel"
                >
                  Отменить
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { saveAs } from 'file-saver'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const taskTypes = [
  { 
    title: 'Легкая промышленность',
    value: 'light',
    icon: 'mdi-tshirt-crew'
  },
  { 
    title: 'Тяжелая промышленность',
    value: 'heavy',
    icon: 'mdi-factory'
  },
  { 
    title: 'Отказное письмо',
    value: 'rejection',
    icon: 'mdi-file-document-outline'
  },
  { 
    title: 'Руководство по эксплуатации',
    value: 'manual',
    icon: 'mdi-book-open-variant'
  },
  { 
    title: 'Паспорт продукции',
    value: 'passport',
    icon: 'mdi-card-account-details'
  },
  { 
    title: 'Обоснование безопасности',
    value: 'safety',
    icon: 'mdi-shield-check'
  },
  { 
    title: 'ТУ',
    value: 'tu',
    icon: 'mdi-file-cog'
  }
]

const selectedType = ref(null)
const saving = ref(false)
const form = ref(null)

// Form data structure
const formData = ref({
  applicationType: '',
  applicant: '',
  inn: '',
  ogrn: '',
  legalAddress: '',
  actualAddress: '',
  phone: '',
  email: '',
  productName: '',
  technicalRegulation: '',
  files: [],
  manufacturerSameAsApplicant: 'Нет',
  manufacturer: '',
  productionType: 'Серийный выпуск',
  scheme: '',
  declarationValidity: '',
  laboratory: '',
  hasOwnProtocol: 'Нет',
  protocolCount: '0',
  manager: '',
  expert: 'Не закреплен',
  cost: '',
  status: 'Заявка подана',
  comments: '',
  productInfo: '',
  standard: '',
  rejectionReason: '',
  productDescription: '',
  manualType: '',
  technicalSpecs: '',
  serialNumber: ''
})

const applicantOptions = computed(() => {
  const options = ['Создать нового']
  if (authStore.isAuthenticated && authStore.user) {
    const userName = authStore.user.companyName || authStore.user.fullName || authStore.user.email
    if (userName) {
      options.unshift(userName)
    }
  }
  return options
})

const getTechnicalRegulationOptions = computed(() => {
  if (selectedType.value === 'heavy' || selectedType.value === 'light') {
    return [
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
  } else {
    return []
  }
})

const getTechnicalRegulations = computed(() => {
  if (formData.value.taskType === 'heavy') {
    return [
      'ТР ТС 004/2011',
      'ТР ТС 010/2011',
      'ТР ТС 020/2011',
      'ТР ТС 032/2013',
      'ТР ТС 037/2016'
    ]
  } else if (formData.value.taskType === 'light') {
    return [
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
  }
  return []
})

const getFormTitle = computed(() => {
  const type = taskTypes.find(t => t.value === selectedType.value)
  return type ? type.title : 'Новая заявка'
})

const generateDocument = async (data) => {
  try {
    // Load the template
    const response = await fetch('/templates/declaration_template.docx')
    const templateContent = await response.arrayBuffer()
    
    const zip = new PizZip(templateContent)
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    })

    // Set the template data
    doc.setData({
      applicant: data.applicant || authStore.user?.name || '',
      legalAddress: data.legalAddress || authStore.user?.legalAddress || '',
      ogrn: data.ogrn || authStore.user?.ogrn || '',
      phone: data.phone || authStore.user?.phone || '',
      email: data.email || authStore.user?.email || '',
      position: 'генерального директора',
      manufacturer: data.manufacturer || data.legalAddress || '',
      productInfo: data.productInfo || '',
      tnvedCode: data.tnvedCode || '8481 80 990 8',
      technicalRegulation: data.technicalRegulation || 'ТР ТС 010/2011',
      protocolNumber: data.protocolNumber || '282',
      protocolDate: data.protocolDate || '05.07.2019',
      laboratory: data.laboratory || 'ООО ГК ОС «ПромБезопасность»',
      scheme: data.scheme || '1д',
      additionalInfo: data.additionalInfo || 'Условия хранения продукции в соответствии с ГОСТ 15150-69'
    })

    // Generate the document
    doc.render()
    
    const blob = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })
    
    // Save the file
    saveAs(blob, `declaration_${Date.now()}.docx`)
  } catch (error) {
    console.error('Error generating document:', error)
    throw error
  }
}

const saveApplication = async () => {
  const { valid } = await form.value.validate()
  
  if (valid) {
    saving.value = true
    
    try {
      const now = new Date()
      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = now.getFullYear()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      
      const formattedDate = `${day}.${month}.${year}`
      const formattedTime = `${hours}:${minutes}`

      // Create new application object
      const newApplication = {
        type: selectedType.value?.value || selectedType.value,
        date: formattedDate,
        time: formattedTime,
        status: 'draft',
        ...formData.value,
        user: authStore.user?.name || 'Гость'
      }

      // Generate declaration document
      await generateDocument(newApplication)
      
      // Save to parent component
      const id = await router.parent?.proxy?.$refs.applicationList?.saveNewApplication(newApplication)
      
      // Redirect to applications list with success message
      router.push({ 
        path: '/applications',
        query: { newId: id, status: 'created' }
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      saving.value = false
      alert('Произошла ошибка при создании заявки. Пожалуйста, попробуйте снова.')
    } finally {
      saving.value = false
    }
  }
}

const cancel = () => {
  router.push('/applications')
}

const fillFromUserProfile = () => {
  if (authStore.isAuthenticated && authStore.user) {
    const user = authStore.user
    const userName = user.companyName || user.fullName || user.email
    if (userName) {
      formData.value.applicant = userName
    }
    
    formData.value.inn = user.inn || ''
    formData.value.ogrn = user.ogrn || ''
    formData.value.legalAddress = user.legalAddress || ''
    formData.value.actualAddress = user.physicalAddress || ''
    formData.value.phone = user.phone || ''
    formData.value.email = user.email || ''
  }
}

const handleApplicantChange = () => {
  if (authStore.isAuthenticated && authStore.user && 
      formData.value.applicant === (authStore.user.companyName || authStore.user.fullName || authStore.user.email)) {
    fillFromUserProfile()
  } else if (formData.value.applicant === 'Создать нового') {
    formData.value.inn = ''
    formData.value.ogrn = ''
    formData.value.legalAddress = ''
    formData.value.actualAddress = ''
    formData.value.phone = ''
    formData.value.email = ''
  }
}

// Watch for applicant changes
watch(() => formData.value.applicant, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    handleApplicantChange()
  }
})

// Watch for route changes to update selected type
watch(
  () => route.query.type,
  (newType) => {
    if (newType && taskTypes.some(t => t.value === newType)) {
      selectedType.value = newType
    }
  },
  { immediate: true }
)

// Watch for tab changes to update technical regulation options
watch(() => selectedType.value, () => {
  formData.value.technicalRegulation = []
})

// Watch for manufacturer same as applicant changes
watch(() => formData.value.manufacturerSameAsApplicant, (newVal) => {
  if (newVal === 'Да') {
    formData.value.manufacturer = formData.value.applicant
    formData.value.manufacturerLegalAddress = formData.value.legalAddress
    formData.value.manufacturerActualAddress = formData.value.actualAddress
  }
})

onMounted(() => {
  fillFromUserProfile()
  
  // Check if there's a type parameter in the route query
  const { type } = route.query
  if (type && ['heavy', 'light', 'rejection', 'manual', 'passport', 'safety', 'tu'].includes(type)) {
    selectedType.value = taskTypes.find(t => t.value === type)
  }
})

const selectType = (type) => {
  selectedType.value = type
}
</script>

<style scoped>
.application-tabs {
  border-bottom: 1px solid #e0e0e0;
}

.create-application {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 16px;
}

@media (max-width: 600px) {
  .create-application {
    padding: 8px;
  }
}

.task-type-selector {
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.task-type-container {
  max-width: 1400px;
  margin: 0 auto;
}

.task-type-card {
  cursor: pointer;
  padding: 16px;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  height: 100%;
}

.task-type-card:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.task-type-card.selected {
  border-bottom-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.task-type-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.task-type-title {
  font-size: 14px;
  line-height: 1.2;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
}

.selected .task-type-title {
  color: rgb(var(--v-theme-primary));
}
</style>
