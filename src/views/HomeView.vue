<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4" variant="outlined">
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
            <v-btn color="primary" variant="text" to="/applications">
              Перейти к заявкам
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
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
          </v-card-actions>
        </v-card>
      </v-col>
      
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
    </v-row>
  </v-container>
</template>

<script setup>
// Home view component
</script>
