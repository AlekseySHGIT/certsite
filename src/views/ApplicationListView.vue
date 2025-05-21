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
        <!-- Search and Sort -->
        <div class="d-flex align-center flex-grow-1 mr-4">
         
          
          <v-btn
            variant="outlined"
            :prepend-icon="sortOrder === 'desc' ? 'mdi-sort-clock-descending' : 'mdi-sort-clock-ascending'"
            @click="toggleSortOrder"
            class="mr-4"
          >
            {{ sortOrder === 'desc' ? 'Сначала новые' : 'Сначала старые' }}
          </v-btn>
          <v-text-field
            v-model="searchQuery"
            prepend-icon="mdi-magnify"
            label="Поиск по заявкам"
            variant="outlined"
            density="comfortable"
            hide-details
            class="mr-4"
            style="max-width: 300px;"
          ></v-text-field>
        </div>

        <!-- Export Button -->
        <v-btn
          color="success"
          prepend-icon="mdi-file-export"
          @click="exportSelected"
          variant="elevated"
          :disabled="!selectedApplications.length"
          rounded
          class="mr-6"
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
          class="mr-6"
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
                  <div 
                    class="text-body-1 font-weight-medium text-primary cursor-pointer"
                    @click="editApplication(application.id)"
                  >
                    {{ getDisplayTitle(application) }}
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
                <div class="d-flex">
                  <div class="text-body-2" style="width: 70%;">
                    <div class="d-flex">
                      <div class="font-weight-medium" style="width: 100px;">Эксперт:</div>
                      <div>{{ application.expert || 'Не закреплен' }}</div>
                    </div>
                  </div>
                </div>
                
                <!-- Attachments Upload -->
                <div class="mt-2">
                  <label class="font-weight-medium">Прикрепить файл счета  (.docx, .pdf):</label>
                  <input
                    type="file"
                    :id="`attachment-input-${application.id}`"
                    accept=".docx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    @change="onAttachmentChange($event, application)"
                  />
                  <div v-if="application.attachments && application.attachments.length" class="mt-1">
                    <div v-for="(file, i) in application.attachments" :key="i" class="text-caption">
                      <v-icon small color="primary">mdi-file</v-icon>
                      {{ file.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-card-item>
          
          <v-card-actions class="pa-4 pt-0">
            <!-- Edit button - available to all authenticated users except for completed applications -->
            <v-btn
              v-if="application.status !== 'completed'"
              prepend-icon="mdi-pencil"
              variant="outlined"
              color="primary"
              size="small"
              class="text-uppercase"
              density="comfortable"
              @click="editApplication(application.id)"
            >
              Редактировать
            </v-btn>

            <!-- Expert self-assignment button -->
            <v-btn
              v-if="authStore.canSelfAssignApplications && !application.expertId"
              prepend-icon="mdi-account-check"
              variant="outlined"
              color="primary"
              size="small"
              class="ml-2 text-uppercase"
              density="comfortable"
              @click="selfAssignApplication(application)"
            >
              Взять в работу
            </v-btn>

            <!-- Admin expert assignment button -->
            <v-btn
              v-if="authStore.canAssignApplications && !application.expertId"
              prepend-icon="mdi-account-plus"
              variant="outlined"
              color="info"
              size="small"
              class="ml-2 text-uppercase"
              density="comfortable"
              @click="showAssignExpertDialog(application)"
            >
              Назначить эксперта
            </v-btn>

            <!-- Approve/Reject buttons - only for experts with assigned applications -->
            <template v-if="authStore.isExpert && application.expertId === authStore.user?.id">
              <v-btn
                prepend-icon="mdi-check"
                variant="outlined"
                color="success"
                size="small"
                class="ml-2 text-uppercase"
                density="comfortable"
                @click="approveApplication(application)"
              >
                Утвердить
              </v-btn>
              
              <v-btn
                prepend-icon="mdi-close"
                variant="outlined"
                color="error"
                size="small"
                class="ml-2 text-uppercase"
                density="comfortable"
                @click="rejectApplication(application)"
              >
                Отклонить
              </v-btn>
            </template>
            
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
              Взять в работу
            </v-btn>
            
            <!-- Download invoice button -->
            <v-btn
              prepend-icon="mdi-microsoft-word"
              variant="outlined"
              color="blue-darken-3"
              size="small"
              class="ml-2 text-uppercase"
              density="comfortable"
              @click="() => downloadInvoice(application, 'docx')"
            >
              Счет
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
import { downloadInvoice } from '@/utils/invoiceGenerator'
import { useAuthStore } from '../stores/auth'
import { useApplicationStore } from '@/stores/applicationStore'
import { Document, Paragraph, TextRun, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'

const router = useRouter()
const authStore = useAuthStore()
const applicationStore = useApplicationStore()

// Reactive state
const activeTab = ref('all')
const selectedApplications = ref([])
const applications = computed(() => applicationStore.applications)
const searchQuery = ref('')
const sortOrder = ref('desc')

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
  '1': 'Легкая промышленность',
  '2': 'Тяжелая промышленность',
  '3': 'Отказное письмо',
  '4': 'Руководства по эксплуатации',
  '5': 'Паспорт продукции',
  '6': 'Обоснование безопасности',
  '7': 'ТУ',
  '8': 'Декларация соответствия',
  '9': 'Сертификация'
}

// Helper function to recursively search through objects
const searchInValue = (obj, query) => {
  // Handle null/undefined
  if (obj === null || obj === undefined) return false

  // Convert to string if it's a primitive
  if (typeof obj !== 'object') {
    return String(obj).toLowerCase().includes(query)
  }

  // If it's an array, search through each element
  if (Array.isArray(obj)) {
    return obj.some(item => searchInValue(item, query))
  }

  // For objects, search through all values
  return Object.values(obj).some(value => {
    if (typeof value === 'string' || typeof value === 'number') {
      const match = String(value).toLowerCase().includes(query)
      if (match) {
        console.log('Found match:', value)
      }
      return match
    }
    return searchInValue(value, query)
  })
}

const filteredApplications = computed(() => {
  let filtered = applications.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim()
    console.log('Searching for:', query)
    
    filtered = filtered.filter(app => {
      // Explicitly check each important field
      const fieldsToSearch = {
        inn: app.inn,
        email: app.email,
        title: app.title,
        applicant: app.applicant,
        phone: app.phone,
        appNumber: app.appNumber,
        manager: app.manager,
        status: app.status,
        regNumber: app.regNumber,
        legalAddress: app.legalAddress,
        actualAddress: app.actualAddress,
        directorName: app.directorName,
        productName: app.productName,
        manufacturerName: app.manufacturerName
      }

      // Log the application's searchable fields
      console.log('Application fields:', app.id, fieldsToSearch)

      // Check each field
      for (const [field, value] of Object.entries(fieldsToSearch)) {
        if (value && String(value).toLowerCase().includes(query)) {
          console.log(`Found match in ${field}:`, value)
          return true
        }
      }

      // Check regulations
      if (app.regulations?.some(reg => reg.name.toLowerCase().includes(query))) {
        console.log('Found match in regulations')
        return true
      }

      return false
    })
  }

  // Filter by active tab
  if (activeTab.value !== 'all') {
    // Map tab values to numeric type codes
    const typeCodeMap = {
      'light': '1',
      'heavy': '2',
      'rejection': '3',
      'manual': '4',
      'passport': '5',
      'safety': '6',
      'tu': '7'
    };
    
    const typeCode = typeCodeMap[activeTab.value];
    filtered = filtered.filter(app => app.type === typeCode);
  }

  // Sort by date
  filtered = [...filtered].sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-') + ' ' + a.time)
    const dateB = new Date(b.date.split('.').reverse().join('-') + ' ' + b.time)
    return sortOrder.value === 'desc' ? dateB - dateA : dateA - dateB
  })

  return filtered
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
}

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
  selectedApplications.value = applicationStore.applications.filter(app => app.selected)
}

const createApplication = () => {
  router.push('/application/create')
}

const editApplication = (id) => {
  // Get the application by ID
  console.log('Attempting to edit application with ID:', id)
  
  // Try different ways to find the application
  let application = applicationStore.getApplication(id)
  
  if (!application) {
    // If not found by the getter, try direct search
    application = applicationStore.applications.find(app => 
      app.id === id || 
      (typeof app.id === 'number' && app.id === parseInt(id)) ||
      app.uuid === id
    )
  }
  
  if (application) {
    console.log('Found application to edit:', application)
    // Always use ID for consistency
    router.push(`/application/${id}/edit`)
  } else {
    console.error('Application not found with ID:', id)
    alert('Не удалось найти заявку для редактирования')
  }
}

const selfAssignApplication = (application) => {
  applicationStore.selfAssignApplication(application.id)
}

const showAssignExpertDialog = (application) => {
  currentApplication.value = application
  showAssignDialog.value = true
}

const assignExpert = () => {
  if (currentApplication.value && selectedExpert.value) {
    applicationStore.adminAssignApplication(
      currentApplication.value.id,
      selectedExpert.value.id,
      selectedExpert.value.name
    )
    showAssignDialog.value = false
    currentApplication.value = null
    selectedExpert.value = null
  }
}

const approveApplication = (application) => {
  const updatedApp = { ...application, status: ApplicationStatus.APPROVED }
  applicationStore.updateApplication(updatedApp)
  alert(`Заявка №${application.appNumber} успешно утверждена.`)
}

const rejectApplication = (application) => {
  const updatedApp = { ...application, status: ApplicationStatus.REJECTED }
  applicationStore.updateApplication(updatedApp)
  alert(`Заявка №${application.appNumber} отклонена.`)
}

const assignToMe = (application) => {
  const updatedApp = {
    ...application,
    manager: authStore.user?.name || 'Текущий пользователь',
    status: ApplicationStatus.IN_PROGRESS
  }
  applicationStore.updateApplication(updatedApp)
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

// --- Attachments logic ---
const onAttachmentChange = (event, application) => {
  const files = event.target.files;
  if (!files.length) return;

  // Only allow .docx and .pdf
  const validFiles = Array.from(files).filter(f =>
    f.type === 'application/pdf' ||
    f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    f.name.endsWith('.pdf') ||
    f.name.endsWith('.docx')
  );

  if (!application.attachments) application.attachments = [];
  for (const file of validFiles) {
    // Prevent duplicates by name
    if (!application.attachments.find(f => f.name === file.name)) {
      application.attachments.push(file);
    }
  }
};

// Utility to get display title with type
function getDisplayTitle(application) {
  // Map numeric type codes to descriptive names
  const typeMap = {
    '1': 'Легкая промышленность',
    '2': 'Тяжелая промышленность',
    '3': 'Отказное письмо',
    '4': 'Руководство по эксплуатации',
    '5': 'Паспорт продукции',
    '6': 'Обоснование безопасности',
    '7': 'ТУ',
    '8': 'Декларация соответствия',
    '9': 'Сертификация'
  };
  
  // Get the descriptive type name
  const typeName = typeMap[application.type] || '';
  
  // If we have a type name and the title doesn't already include it
  if (typeName && application.title && !application.title.includes(typeName)) {
    return `${application.title} (${typeName})`;
  }
  
  // If we have a type name but no title
  if (typeName && !application.title) {
    return `Заявка на сертификацию (${typeName})`;
  }
  
  // Fallback to original title or default
  return application.title || `Заявка на сертификацию ${application.appNumber || ''}`;
}

// Initialize component
// The downloadInvoice function is now imported from invoiceGenerator.js

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
