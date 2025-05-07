<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="text-h5 font-weight-bold">
            Добро пожаловать в Центр сертификации
          </v-card-title>
          <v-card-text>
            <p>Наш центр предоставляет полный спектр услуг по сертификации продукции и оформлению документов.</p>
            <p>Выберите нужный раздел в меню слева или воспользуйтесь быстрыми ссылками ниже.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row>
      <!-- Applications Card - Only visible if user has permission to read Applications -->
      <Can I="read" a="Application">
        <v-col cols="12" md="4">
          <v-card height="100%" class="d-flex flex-column" variant="outlined">
            <v-card-title class="text-h6 font-weight-bold">
              <v-icon color="primary" class="mr-2">mdi-file-document-multiple</v-icon>
              Заявки
            </v-card-title>
            <v-card-text>
              Создавайте и управляйте заявками на сертификацию продукции. Отслеживайте статус обработки и получайте уведомления.
            </v-card-text>
            <v-card-actions class="mt-auto">
              <!-- View applications button - Available for all authenticated users -->
              <Can I="read" a="Application" passThrough v-slot="{ allowed }">
                <v-btn color="primary" variant="text" to="/applications" :disabled="!allowed">
                  Перейти к заявкам
                </v-btn>
              </Can>
              
              <!-- Create application button - Only available for client role -->
              <Can I="create" a="Application">
                <v-btn color="success" variant="text" to="/applications/new">
                  Создать заявку
                </v-btn>
              </Can>
            </v-card-actions>
          </v-card>
        </v-col>
      </Can>
      
      <!-- News Card - Visible to all users -->
      <Can I="read" a="News">
        <v-col cols="12" md="4">
          <v-card height="100%" class="d-flex flex-column" variant="outlined">
            <v-card-title class="text-h6 font-weight-bold">
              <v-icon color="primary" class="mr-2">mdi-newspaper</v-icon>
              Новости
            </v-card-title>
            <v-card-text>
              Будьте в курсе последних изменений в законодательстве, новых требований к сертификации и важных событий.
            </v-card-text>
            <v-card-actions class="mt-auto">
              <v-btn color="primary" variant="text" to="/news">
                Читать новости
              </v-btn>
              
              <!-- Admin-only button to manage news -->
              <Can I="create" a="News">
                <v-btn color="success" variant="text" to="/news/manage">
                  Управление новостями
                </v-btn>
              </Can>
            </v-card-actions>
          </v-card>
        </v-col>
      </Can>
      
      <!-- Profile Card - Only visible for authenticated users -->
      <Can I="read" a="Profile">
        <v-col cols="12" md="4">
          <v-card height="100%" class="d-flex flex-column" variant="outlined">
            <v-card-title class="text-h6 font-weight-bold">
              <v-icon color="primary" class="mr-2">mdi-account</v-icon>
              Личный кабинет
            </v-card-title>
            <v-card-text>
              Управляйте своим профилем, просматривайте историю заявок и документов, обновляйте контактную информацию.
            </v-card-text>
            <v-card-actions class="mt-auto">
              <v-btn color="primary" variant="text" to="/profile">
                Перейти в личный кабинет
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </Can>
      
      <!-- Admin Dashboard - Only visible for admin users -->
      <Can I="manage" a="all">
        <v-col cols="12" md="4">
          <v-card height="100%" class="d-flex flex-column" variant="outlined" color="info">
            <v-card-title class="text-h6 font-weight-bold">
              <v-icon color="white" class="mr-2">mdi-view-dashboard</v-icon>
              Панель администратора
            </v-card-title>
            <v-card-text class="text-white">
              Доступ к административным функциям системы, управление пользователями, настройка параметров.
            </v-card-text>
            <v-card-actions class="mt-auto">
              <v-btn color="white" variant="text" to="/admin">
                Перейти в панель администратора
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </Can>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAbility } from '@casl/vue'
import { useAuthStore } from '../stores/auth'
import { usePermissionsStore } from '../stores/permissions'

// Get the ability instance and auth store
const { can } = useAbility()
const authStore = useAuthStore()
const permissionsStore = usePermissionsStore()
</script>
