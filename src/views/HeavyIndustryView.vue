<template>
  <ApplicationTypeView title="«Тяжелая промышленность»">
    <div class="application-content">
      <p class="text-body-1 mb-4">
        Заявки на сертификацию продукции тяжелой промышленности (TR TS 04, 010, 020, 032, 037)
      </p>
      
      <!-- Application Form -->
      <v-form ref="form" @submit.prevent="submitApplication">
        <v-card class="mb-4" variant="outlined" elevation="0">
          <v-card-text>
            <div class="text-subtitle-1 font-weight-medium mb-3">Информация о заявке</div>
            
            <v-select
              v-model="application.regulation"
              label="Технический регламент"
              :items="[
                'ТР ТС 004/2011 - О безопасности низковольтного оборудования',
                'ТР ТС 010/2011 - О безопасности машин и оборудования',
                'ТР ТС 020/2011 - Электромагнитная совместимость технических средств',
                'ТР ТС 032/2013 - О безопасности оборудования, работающего под избыточным давлением',
                'ТР ЕАЭС 037/2016 - Об ограничении применения опасных веществ в изделиях электротехники и радиоэлектроники'
              ]"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              hide-details
            ></v-select>
            
            <v-text-field
              v-model="application.productName"
              label="Наименование продукции"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              hide-details
            ></v-text-field>
            
            <v-text-field
              v-model="application.manufacturer"
              label="Изготовитель"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              hide-details
            ></v-text-field>
            
            <v-text-field
              v-model="application.tnved"
              label="Код ТН ВЭД"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              hide-details
            ></v-text-field>
            
            <v-textarea
              v-model="application.description"
              label="Описание продукции"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              hide-details
              rows="3"
            ></v-textarea>
          </v-card-text>
        </v-card>
        
        <div class="d-flex gap-2">
          <v-btn
            type="submit"
            color="primary"
            variant="elevated"
          >
            СОЗДАТЬ ЗАЯВКУ
          </v-btn>
          <v-btn
            color="grey"
            variant="outlined"
            @click="cancel"
          >
            ОТМЕНИТЬ
          </v-btn>
        </div>
      </v-form>
    </div>
  </ApplicationTypeView>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ApplicationTypeView from '../components/ApplicationTypeView.vue'

const router = useRouter()
const form = ref(null)

const application = ref({
  regulation: '',
  productName: '',
  manufacturer: '',
  tnved: '',
  description: '',
})

const submitApplication = () => {
  // Here you would submit the application to your backend
  console.log('Submitting application:', application.value)
  
  // Navigate back to applications list
  router.push('/applications')
}

const cancel = () => {
  router.push('/applications')
}
</script>

<style scoped>
.application-content {
  max-width: 800px;
}
</style>
