<template>
  <v-card class="application-detail" flat>
    <!-- Application Header with ID and Title -->
    <div class="application-header d-flex align-center justify-space-between pa-4">
      <div class="d-flex align-center">
        <div class="application-icon mr-3">
          <v-avatar color="grey-lighten-2" size="48">
            <v-icon size="32" color="grey-darken-1">mdi-file-document-outline</v-icon>
          </v-avatar>
        </div>
        <div>
          <h1 class="text-h5 font-weight-medium">Заявка #{{ applicationId }}</h1>
          <div class="text-subtitle-1">{{ application.title }}</div>
        </div>
      </div>
      <div class="action-buttons">
        <v-btn variant="text" color="primary" prepend-icon="mdi-pencil" class="mr-2">
          Редактировать
        </v-btn>
        <v-btn variant="text" color="primary" prepend-icon="mdi-clock" class="mr-2">
          Добавить трудозатраты
        </v-btn>
        <v-btn variant="text" color="primary" prepend-icon="mdi-eye" class="mr-2">
          Следить
        </v-btn>
        <v-btn variant="text" color="primary" prepend-icon="mdi-content-copy" class="mr-2">
          Копировать
        </v-btn>
        <v-btn variant="text" color="primary" prepend-icon="mdi-delete">
          Удалить
        </v-btn>
      </div>
    </div>

    <!-- Application Content -->
    <div class="application-content pa-4">
      <!-- Navigation -->
      <div class="navigation-links mb-4">
        <v-btn variant="text" color="primary" prepend-icon="mdi-chevron-left" size="small">
          Предыдущее
        </v-btn>
        <span class="mx-2">|</span>
        <span class="text-body-2">{{ currentPage }} / {{ totalPages }}</span>
        <span class="mx-2">|</span>
        <v-btn variant="text" color="primary" append-icon="mdi-chevron-right" size="small">
          Следующее
        </v-btn>
      </div>

      <!-- Main Content -->
      <div class="d-flex">
        <!-- Left Column - Details -->
        <div class="flex-grow-1 pr-4" style="width: 60%;">
          <div class="application-meta mb-4">
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Статус:</div>
              <div>
                <v-chip color="success" size="small" class="text-white">{{ application.status }}</v-chip>
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Приоритет:</div>
              <div>{{ application.priority }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Назначена:</div>
              <div>{{ application.assignee }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Открыта:</div>
              <div>{{ formatDate(application.createdAt) }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">ФИО инициатора:</div>
              <div>{{ application.initiator }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Дежурный:</div>
              <div>{{ application.dutyManager }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">ФИО принявшего:</div>
              <div>{{ application.acceptedBy }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Координатор:</div>
              <div>{{ application.coordinator }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Список исполнителей:</div>
              <div>{{ application.executors }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">ФИО закрывшего:</div>
              <div>{{ application.closedBy }}</div>
            </div>
          </div>
        </div>

        <!-- Right Column - Additional Info -->
        <div style="width: 40%;">
          <div class="application-meta mb-4">
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Готовность:</div>
              <div class="d-flex align-center">
                <v-progress-linear
                  model-value="100"
                  color="light-green"
                  height="20"
                  class="rounded-lg mr-2"
                  style="width: 150px;"
                ></v-progress-linear>
                <span>100%</span>
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Дата и время закрытия:</div>
              <div>{{ formatDate(application.closedAt) }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Выполнить до:</div>
              <div>{{ formatDate(application.dueDate) }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Вид услуги:</div>
              <div>{{ application.serviceType }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Вендор:</div>
              <div>{{ application.vendor }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Номер кейса:</div>
              <div>{{ application.caseNumber }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Согласовано продление:</div>
              <div>{{ application.extensionApproved ? 'Да' : 'Нет' }}</div>
            </div>
            <div class="d-flex mb-2">
              <div class="text-subtitle-1 font-weight-bold" style="width: 200px;">Продлена до:</div>
              <div>{{ formatDate(application.extendedTo) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Attached Files -->
      <div class="files-section mt-6">
        <h3 class="text-h6 mb-3">Файлы</h3>
        <v-table density="compact">
          <tbody>
            <tr v-for="(file, index) in application.files" :key="index">
              <td>
                <v-icon size="small" color="primary" class="mr-2">mdi-file-document-outline</v-icon>
                <a href="#" class="text-decoration-none">{{ file.name }}</a>
                <span class="text-caption ml-2">({{ file.size }})</span>
              </td>
              <td class="text-right">{{ file.uploadedBy }}, {{ formatDate(file.uploadedAt) }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  applicationId: {
    type: [String, Number],
    required: true
  },
  applicationData: {
    type: Object,
    default: () => ({})
  }
});

// Default application data with sample values matching the screenshot
const defaultApplication = {
  title: 'Провести работы по обновлению Secret Net Studio на версию 8.10',
  status: 'Закрыта',
  priority: 'Низкий',
  assignee: 'Алексеев Д.О.',
  createdAt: '2025-01-27T12:56:00',
  initiator: 'Нефедов А.Г.',
  dutyManager: '',
  acceptedBy: 'Куртепова С.А.',
  coordinator: 'Куртепова С.А.',
  executors: 'Алексеев Д.О.',
  closedBy: 'Нефедов А.Г.',
  closedAt: '2025-02-20T13:17:00',
  dueDate: '2025-02-17T12:55:00',
  serviceType: 'Обновление ПО или АПК',
  vendor: 'Код Безопасности',
  caseNumber: 'INC0000197987',
  extensionApproved: true,
  extendedTo: '2025-02-21T09:21:00',
  files: [
    { name: '8711.docx', size: '39,3 КБ', uploadedBy: 'Redmine Admin', uploadedAt: '2025-01-27T12:56:00' },
    { name: '8711.docx', size: '39,3 КБ', uploadedBy: 'Redmine Admin', uploadedAt: '2025-02-07T11:15:00' },
    { name: '8711.docx', size: '39,5 КБ', uploadedBy: 'Redmine Admin', uploadedAt: '2025-02-07T15:26:00' }
  ]
};

// Merge provided data with defaults
const application = computed(() => {
  return { ...defaultApplication, ...props.applicationData };
});

// Pagination info
const currentPage = ref('2');
const totalPages = ref('24');

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
</script>

<style scoped>
.application-header {
  border-bottom: 1px solid #e0e0e0;
}

.application-detail {
  border: 1px solid #e0e0e0;
}

.files-section {
  border-top: 1px solid #e0e0e0;
  padding-top: 16px;
}
</style>
