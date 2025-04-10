<template>
  <ApplicationTypeView title="«Обоснование безопасности»">
    <div class="application-content">
      <p class="text-body-1 mb-4">
        Заявки на разработку обоснования безопасности
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
                'ТР ТС 010/2011 - О безопасности машин и оборудования',
                'ТР ТС 032/2013 - О безопасности оборудования, работающего под избыточным давлением'
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
              v-model="application.model"
              label="Модель/артикул"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              hide-details
            ></v-text-field>
            
            <v-textarea
              v-model="application.riskAssessment"
              label="Оценка рисков"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              hide-details
              rows="3"
            ></v-textarea>
            
            <v-textarea
              v-model="application.safetyMeasures"
              label="Меры по обеспечению безопасности"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              hide-details
              rows="3"
            ></v-textarea>
            
            <div class="mb-3">
              <label class="text-subtitle-2 mb-2 d-block">Техническая документация</label>
              <v-file-input
                v-model="application.documents"
                placeholder="Перетащите файлы сюда или"
                variant="outlined"
                density="comfortable"
                hide-details
                multiple
                chips
                class="mb-2"
              ></v-file-input>
            </div>
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
  model: '',
  riskAssessment: '',
  safetyMeasures: '',
  documents: []
})

const submitApplication = () => {
  // Here you would submit the application to your backend
  console.log('Submitting safety justification application:', application.value)
  
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
