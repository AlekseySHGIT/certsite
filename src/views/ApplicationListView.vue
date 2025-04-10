<template>
  <v-container fluid class="pa-0 application-list-view">
    <v-tabs
      v-model="activeTab"
      bg-color="white"
      color="primary"
      align-tabs="start"
      height="48"
      class="application-tabs"
    >
      <v-tab value="all" class="text-none">«Все»</v-tab>
      <v-tab value="light" class="text-none">«Легкая промышленность»</v-tab>
      <v-tab value="heavy" class="text-none">«Тяжелая промышленность»</v-tab>
      <v-tab value="rejection" class="text-none">«Отказное письмо»</v-tab>
      <v-tab value="manual" class="text-none">«Руководства по эксплуатации»</v-tab>
      <v-tab value="passport" class="text-none">«Паспорт продукции»</v-tab>
      <v-tab value="safety" class="text-none">«Обоснование безопасности»</v-tab>
      <v-tab value="tu" class="text-none">«ТУ»</v-tab>
    </v-tabs>

    <v-container fluid class="pa-4">
      <!-- Actions Bar -->
      <div class="d-flex justify-space-between align-center mb-4">
        <!-- Export Button -->
        <v-btn
          color="success"
          prepend-icon="mdi-file-export"
          @click="exportSelected"
          variant="elevated"
          :disabled="!selectedApplications.length"
          rounded
          class="mr-2"
        >
          ЭКСПОРТ ВЫБРАННЫХ ({{ selectedApplications.length }})
        </v-btn>
        
        <!-- Send to FSA Button - only for managers and admins -->
        <v-btn
          v-if="authStore.canApproveApplications"
          color="info"
          prepend-icon="mdi-send"
          @click="sendToFSA"
          variant="elevated"
          :disabled="!selectedApplications.length"
          rounded
          class="mr-auto"
        >
          ОТПРАВИТЬ В FSA
        </v-btn>
        
        <!-- Create Application Button -->
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="createApplication"
          variant="elevated"
          rounded
        >
          СОЗДАТЬ ЗАЯВКУ
        </v-btn>
      </div>

      <!-- Application Cards -->
      <div class="application-list">
        <v-card
          v-for="(application, index) in filteredApplications"
          :key="application.id"
          class="mb-4"
          variant="outlined"
          elevation="0"
        >
          <v-card-item class="pa-0">
            <div class="d-flex">
              <!-- Checkbox column -->
              <div class="checkbox-column d-flex align-center justify-center">
                <v-checkbox
                  v-model="application.selected"
                  @change="updateSelectedApplications"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </div>
              
              <!-- Left date column -->
              <div class="date-column pa-4">
                <div class="text-caption">
                  {{ application.date }}<br>
                  {{ application.time }}<br>
                  {{ application.user || 'ООО "Ромашка"' }}
                </div>
              </div>
              
              <!-- Main content -->
              <div class="flex-grow-1 pa-4">
                <!-- Title and status row -->
                <div class="d-flex justify-space-between align-center mb-3">
                  <div class="text-body-1 font-weight-medium">
                    <router-link 
                      :to="`/application/${application.id}/view`" 
                      class="text-decoration-none text-primary"
                    >
                      {{ application.title || `Заявка на сертификацию ${application.appNumber || index + 1}` }}
                    </router-link>
                  </div>
                  <div>
                    <v-chip
                      :color="getStatusColor(application.status)"
                      size="medium"
                      variant="elevated"
                      style="padding: 4px 12px; min-width: 100px; text-align: center;"
                    >
                      {{ getStatusText(application.status) }}
                    </v-chip>
                  </div>
                </div>
                
                <!-- Status details -->
                <div v-if="application.status" class="mb-3">
                  <div class="d-flex align-center">
                    <div>ООО "Ромашка"</div>
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    Array ( [0] -> ) --- Array ( [0] => {{ application.statusDetails || '1' }} )<br>
                    {{ application.additionalInfo || '482' }}
                  </div>
                </div>
                
                <v-divider class="mb-3"></v-divider>
                
                <!-- Customer and application details -->
                <div class="d-flex mb-2">
                  <div class="text-body-2" style="width: 30%;">
                    <div class="d-flex">
                      <div class="font-weight-medium" style="width: 100px;">Заказчик:</div>
                      <div>ООО "Ромашка"</div>
                    </div>
                  </div>
                  <div class="text-body-2" style="width: 40%;">
                    <div class="d-flex">
                      <div class="font-weight-medium" style="width: 100px;">ИНН:</div>
                      <div>{{ application.inn || '77777777777778' }}</div>
                    </div>
                  </div>
                  <div class="text-body-2" style="width: 30%;">
                    <div class="d-flex">
                      <div class="font-weight-medium" style="width: 100px;">Стоимость:</div>
                      <div>{{ application.cost || '1120.00' }} ₽</div>
                    </div>
                  </div>
                </div>
                
                <div class="d-flex mb-2">
                  <div class="text-body-2" style="width: 30%;">
                    <div class="d-flex">
                      <div class="font-weight-medium" style="width: 100px;">Тел.:</div>
                      <div>{{ application.phone || '+71112223544' }}</div>
                    </div>
                  </div>
                  <div class="text-body-2" style="width: 40%;">
                    <div class="d-flex">
                      <div class="font-weight-medium" style="width: 100px;">Email:</div>
                      <div>{{ application.email || 'client@client.cc' }}</div>
                    </div>
                  </div>
                  <div class="text-body-2" style="width: 30%;">
                    <div class="d-flex">
                      <div class="font-weight-medium" style="width: 100px;">Тип заявки:</div>
                      <div>{{ getApplicationTypeName(application.type) }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="d-flex">
                  <div class="text-body-2" style="width: 70%;">
                    <div class="d-flex">
                      <div class="font-weight-medium" style="width: 100px;">Менеджер:</div>
                      <div>{{ application.manager || 'Не закреплен' }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-card-item>
          
          <v-card-actions class="pa-4 pt-0">
            <!-- Edit button - available to all authenticated users -->
            <v-btn
              prepend-icon="mdi-pencil"
              variant="outlined"
              color="grey-darken-1"
              size="small"
              class="text-uppercase"
              density="comfortable"
              @click="editApplication(application.id)"
            >
              ВНЕСТИ ПРАВКИ
            </v-btn>
            
            <!-- Approve button - only for managers and admins -->
            <v-btn
              v-if="authStore.canApproveApplications && application.status === ApplicationStatus.PENDING"
              prepend-icon="mdi-check"
              variant="outlined"
              color="success"
              size="small"
              class="ml-2 text-uppercase"
              density="comfortable"
              @click="approveApplication(application)"
            >
              УТВЕРДИТЬ
            </v-btn>
            
            <!-- Reject button - only for managers and admins -->
            <v-btn
              v-if="authStore.canApproveApplications && application.status === ApplicationStatus.PENDING"
              prepend-icon="mdi-close"
              variant="outlined"
              color="error"
              size="small"
              class="ml-2 text-uppercase"
              density="comfortable"
              @click="rejectApplication(application)"
            >
              ОТКЛОНИТЬ
            </v-btn>
            
            <!-- Assign to me button - only for managers -->
            <v-btn
              v-if="authStore.role === 'manager' && application.manager === 'Не закреплен'"
              prepend-icon="mdi-account-check"
              variant="outlined"
              color="info"
              size="small"
              class="ml-2 text-uppercase"
              density="comfortable"
              @click="assignToMe(application)"
            >
              ВЗЯТЬ В РАБОТУ
            </v-btn>
            
            <!-- Certificate button - for all authenticated users -->
            <v-btn
              prepend-icon="mdi-certificate"
              variant="outlined"
              color="grey-darken-1"
              size="small"
              class="ml-2 text-uppercase"
              density="comfortable"
              @click="generateCertificate(application)"
            >
              СЕРТИФИКАТ ЕАС
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Document, Paragraph, TextRun, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'

const router = useRouter()
const authStore = useAuthStore()

// Reactive state
const activeTab = ref('all')
const selectedApplications = ref([])
const applications = ref([
  {
    id: 1,
    title: 'Подтверждение соответствия продукции согласно дог',
    docNumber: '470',
    docDate: '04 апреля 2021',
    appNumber: '569',
    date: '26.07.2024',
    time: '16:22',
    status: 'completed',
    statusDetails: '1',
    cost: '1120.00',
    manager: 'Не закреплен',
    type: 'light',
    selected: false,
    additionalInfo: '482'
  },
  {
    id: 2,
    title: 'Подтверждение соответствия продукции согласно дог',
    docNumber: '470',
    docDate: '04 апреля 2021',
    appNumber: '568',
    date: '26.07.2024',
    time: '16:20',
    status: 'pending',
    statusDetails: '1',
    cost: '1120.00',
    manager: 'Не закреплен',
    type: 'light',
    selected: false,
    additionalInfo: '482'
  },
  {
    id: 3,
    title: 'Подтверждение соответствия продукции согласно дог',
    docNumber: '470',
    docDate: '03 апреля 2021',
    appNumber: '566',
    date: '02.08.2024',
    time: '13:15',
    status: 'draft',
    statusDetails: '1',
    cost: '1500.00',
    manager: 'Не закреплен',
    type: 'light',
    selected: false,
    additionalInfo: '482'
  },
  {
    id: 4,
    title: 'Паспорт продукции согласно дог',
    docNumber: '471',
    docDate: '05 апреля 2021',
    appNumber: '570',
    date: '27.07.2024',
    time: '10:30',
    status: 'completed',
    statusDetails: '1',
    cost: '980.00',
    manager: 'Петров И.С.',
    type: 'passport',
    selected: false,
    additionalInfo: '483'
  },
  {
    id: 5,
    title: 'Отказное письмо согласно дог',
    docNumber: '472',
    docDate: '06 апреля 2021',
    appNumber: '571',
    date: '28.07.2024',
    time: '14:45',
    status: 'in_progress',
    statusDetails: '1',
    cost: '750.00',
    manager: 'Иванов А.П.',
    type: 'rejection',
    selected: false,
    additionalInfo: '484'
  },
  {
    id: 6,
    title: 'Руководство по эксплуатации согласно дог',
    docNumber: '473',
    docDate: '07 апреля 2021',
    appNumber: '572',
    date: '29.07.2024',
    time: '09:15',
    status: 'completed',
    statusDetails: '1',
    cost: '1300.00',
    manager: 'Сидоров В.М.',
    type: 'manual',
    selected: false,
    additionalInfo: '485'
  },
  {
    id: 7,
    title: 'Обоснование безопасности согласно дог',
    docNumber: '474',
    docDate: '08 апреля 2021',
    appNumber: '573',
    date: '30.07.2024',
    time: '11:20',
    status: 'pending',
    statusDetails: '1',
    cost: '1450.00',
    manager: 'Не закреплен',
    type: 'safety',
    selected: false,
    additionalInfo: '486'
  },
  {
    id: 8,
    title: 'ТУ согласно дог',
    docNumber: '475',
    docDate: '09 апреля 2021',
    appNumber: '574',
    date: '31.07.2024',
    time: '16:40',
    status: 'draft',
    statusDetails: '1',
    cost: '1200.00',
    manager: 'Не закреплен',
    type: 'tu',
    selected: false,
    additionalInfo: '487'
  },
  {
    id: 9,
    title: 'Подтверждение соответствия продукции согласно дог',
    docNumber: '476',
    docDate: '10 апреля 2021',
    appNumber: '575',
    date: '01.08.2024',
    time: '13:10',
    status: 'in_progress',
    statusDetails: '1',
    cost: '1650.00',
    manager: 'Петров И.С.',
    type: 'heavy',
    selected: false,
    additionalInfo: '488'
  }
])

// Application statuses
const ApplicationStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  DRAFT: 'draft',
  IN_PROGRESS: 'in_progress'
}

// Application type names
const applicationTypeMap = {
  'light': 'Легкая промышленность',
  'heavy': 'Тяжелая промышленность',
  'rejection': 'Отказное письмо',
  'manual': 'Руководства по эксплуатации',
  'passport': 'Паспорт продукции',
  'safety': 'Обоснование безопасности',
  'tu': 'ТУ'
}

// Computed properties
const filteredApplications = computed(() => {
  return applications.value.filter(app => {
    if (activeTab.value === 'all') return true
    return app.type === activeTab.value
  }).sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Methods
const getApplicationTypeName = (typeCode) => {
  return applicationTypeMap[typeCode] || `Тип ${typeCode}`
}

const getStatusColor = (status) => {
  switch (status) {
    case ApplicationStatus.PENDING: return 'warning'
    case ApplicationStatus.APPROVED: return 'success'
    case ApplicationStatus.REJECTED: return 'error'
    case ApplicationStatus.COMPLETED: return 'success'
    case ApplicationStatus.DRAFT: return 'grey'
    case ApplicationStatus.IN_PROGRESS: return 'info'
    default: return 'grey'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case ApplicationStatus.PENDING: return 'На утверждении'
    case ApplicationStatus.APPROVED: return 'Подтверждена'
    case ApplicationStatus.REJECTED: return 'Отклонена'
    case ApplicationStatus.COMPLETED: return 'Выполнена'
    case ApplicationStatus.DRAFT: return 'Черновик'
    case ApplicationStatus.IN_PROGRESS: return 'В работе'
    default: return 'Статус не определен'
  }
}

const updateSelectedApplications = () => {
  selectedApplications.value = applications.value.filter(app => app.selected)
}

const createApplication = () => {
  router.push('/application/create')
}

const editApplication = (id) => {
  router.push(`/application/${id}`)
}

const approveApplication = (application) => {
  application.status = ApplicationStatus.APPROVED
  alert(`Заявка №${application.appNumber} успешно утверждена.`)
}

const rejectApplication = (application) => {
  application.status = ApplicationStatus.REJECTED
  alert(`Заявка №${application.appNumber} отклонена.`)
}

const assignToMe = (application) => {
  application.manager = authStore.user?.name || 'Текущий пользователь'
  application.status = ApplicationStatus.IN_PROGRESS
  alert(`Заявка №${application.appNumber} взята в работу.`)
}

const generateCertificate = (application) => {
  alert(`Сертификат ЕАС для заявки №${application.appNumber} успешно сгенерирован.`)
}

const sendToFSA = () => {
  if (!selectedApplications.value.length) {
    alert('Пожалуйста, выберите хотя бы одну заявку для отправки.')
    return
  }

  selectedApplications.value.forEach(app => {
    app.status = ApplicationStatus.PENDING
  })
  
  alert(`${selectedApplications.value.length} заявок успешно отправлены в FSA.`)
}

const exportSelected = async () => {
  if (!selectedApplications.value.length) {
    alert('Пожалуйста, выберите хотя бы одну заявку для экспорта.')
    return
  }

  try {
    console.log('Starting export for', selectedApplications.value.length, 'applications')
    
    for (const application of selectedApplications.value) {
      console.log('Processing application:', application.id)
      
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
              children: [
                new TextRun({
                  text: "ЕВРАЗИЙСКИЙ ЭКОНОМИЧЕСКИЙ СОЮЗ",
                  bold: true,
                  size: 32
                })
              ]
            })
          ]
        }]
      })

      console.log('Document created, saving...')
      
      const buffer = await doc.save()
      console.log('Document saved to buffer')
      
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      console.log('Blob created')
      
      const fileName = `declaration_${application.id || Date.now()}.docx`
      console.log('Saving file:', fileName)
      
      await saveAs(blob, fileName)
      console.log('File saved successfully')
    }
  } catch (error) {
    console.error('Error in export process:', error)
    alert('Ошибка при экспорте документов: ' + error.message)
  }
}

// Initialize component
onMounted(() => {
  // Set initial selected applications array
  selectedApplications.value = []
})
</script>

<style scoped>
.application-tabs {
  border-bottom: 1px solid #e0e0e0;
}

.application-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.date-column {
  width: 110px;
  min-width: 110px;
  border-right: 1px solid #e0e0e0;
}

.checkbox-column {
  width: 48px;
  min-width: 48px;
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
}
</style>
