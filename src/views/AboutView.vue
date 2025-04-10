<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4" variant="outlined">
          <v-card-title class="text-h5 font-weight-bold">
            О сертификационном центре
          </v-card-title>
          <v-card-text>
            <p class="mb-4">
              Наш сертификационный центр предоставляет полный спектр услуг по сертификации продукции и услуг в соответствии с российскими и международными стандартами.
            </p>
            <p class="mb-4">
              Мы специализируемся на следующих типах сертификации:
            </p>
            <ul class="mb-4">
              <li>Тяжелая промышленность (ТР ТС 04, 010, 020, 032, 037)</li>
              <li>Легкая промышленность (ТР ТС 05, 07, 017)</li>
              <li>Пищевая промышленность (ТР ТС 021, 022, 023, 024, 033, 034, 040)</li>
              <li>Отказные/отрицательные письма</li>
              <li>Протоколы испытаний несертификационные</li>
              <li>Разработка технической документации</li>
            </ul>
            <p class="mb-4">
              Наша команда экспертов имеет многолетний опыт работы в области сертификации и готова помочь вам на каждом этапе процесса.
            </p>
          </v-card-text>
        </v-card>

        <v-card variant="outlined">
          <v-card-title class="text-h5 font-weight-bold">
            Контактная информация
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-list>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-map-marker</v-icon>
                    </template>
                    <v-list-item-title>Адрес</v-list-item-title>
                    <v-list-item-subtitle>123456, г. Москва, ул. Примерная, д. 10</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-phone</v-icon>
                    </template>
                    <v-list-item-title>Телефон</v-list-item-title>
                    <v-list-item-subtitle>+7 (123) 456-78-90</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-email</v-icon>
                    </template>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>info@certcenter.ru</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-list>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-clock</v-icon>
                    </template>
                    <v-list-item-title>Часы работы</v-list-item-title>
                    <v-list-item-subtitle>Пн-Пт: 9:00 - 18:00</v-list-item-subtitle>
                    <v-list-item-subtitle>Сб-Вс: Выходные</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = 'О нас - Сертификационный центр';
});
</script>
