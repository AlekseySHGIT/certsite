<template>
  <ApplicationTypeView title="«Легкая промышленность»">
    <div class="application-content">
      <p class="text-body-1 mb-4">
        Заявки на сертификацию продукции легкой промышленности (TR TS 05, 07, 017, пищевая промышленность: 021, 022, 023, 024, 033, 034, 040)
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
                'ТР ТС 005/2011 - О безопасности упаковки',
                'ТР ТС 007/2011 - О безопасности продукции, предназначенной для детей и подростков',
                'ТР ТС 017/2011 - О безопасности продукции легкой промышленности',
                'ТР ТС 021/2011 - О безопасности пищевой продукции',
                'ТР ТС 022/2011 - Пищевая продукция в части ее маркировки',
                'ТР ТС 023/2011 - Технический регламент на соковую продукцию из фруктов и овощей',
                'ТР ТС 024/2011 - Технический регламент на масложировую продукцию',
                'ТР ТС 033/2013 - О безопасности молока и молочной продукции',
                'ТР ТС 034/2013 - О безопасности мяса и мясной продукции',
                'ТР ЕАЭС 040/2016 - О безопасности рыбы и рыбной продукции'
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
