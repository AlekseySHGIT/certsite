<template>
  <v-container fluid class="pa-0">
    <v-tabs
      v-model="activeTab"
      bg-color="white"
      color="primary"
      align-tabs="start"
      height="48"
      class="application-tabs"
    >
      <v-tab value="light" class="text-none">«Легкая промышленность»</v-tab>
      <v-tab value="heavy" class="text-none">«Тяжелая промышленность»</v-tab>
      <v-tab value="rejection" class="text-none">«Отказное письмо»</v-tab>
      <v-tab value="manual" class="text-none">«Руководства по эксплуатации»</v-tab>
      <v-tab value="passport" class="text-none">«Паспорт продукции»</v-tab>
      <v-tab value="safety" class="text-none">«Обоснование безопасности»</v-tab>
      <v-tab value="tu" class="text-none">«ТУ»</v-tab>
    </v-tabs>

    <v-container fluid class="pa-4 bg-grey-lighten-4">
      <v-card class="mb-4" variant="outlined" elevation="0">
        <v-card-title class="text-h6 font-weight-bold text-center py-3 bg-primary text-white">
          Заявка на оформление Декларации соответствия ТРТС
        </v-card-title>
        <v-card-subtitle class="text-center py-1 bg-grey-lighten-3">
          *Поля, отмеченные звёздочкой, обязательны к заполнению
        </v-card-subtitle>

        <v-form ref="form" @submit.prevent="submitForm">
          <v-container>
            <!-- Applicant Section -->
            <v-row>
              <v-col cols="12">
                <div class="text-h6 font-weight-bold mb-3">Заявитель</div>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.applicant.type"
                  label="Заявитель"
                  readonly
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-text-field>
                
                <v-select
                  v-model="formData.applicant.regType"
                  :items="regTypeOptions"
                  label="Тип рег.номера"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-select>
                
                <v-text-field
                  v-model="formData.applicant.inn"
                  label="ИНН"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-text-field>
                
                <v-text-field
                  v-model="formData.applicant.name"
                  label="Индивидуальный предприниматель Чехов А.П."
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-text-field>
                
                <v-text-field
                  v-model="formData.applicant.fullName"
                  label="ФИО руководителя в именительном падеже"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-text-field>
                
                <v-text-field
                  v-model="formData.applicant.phone"
                  label="Телефон"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                </v-text-field>
                
                <v-text-field
                  v-model="formData.applicant.email"
                  label="E-mail"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                </v-text-field>
              </v-col>
              
              <v-col cols="12" md="6">
                <div class="text-subtitle-1 font-weight-bold mb-3">Юридический адрес</div>
                
                <v-select
                  v-model="formData.applicant.legalAddress.country"
                  :items="countryOptions"
                  label="Страна"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-select>
                
                <v-text-field
                  v-model="formData.applicant.legalAddress.index"
                  label="Индекс"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                </v-text-field>
                
                <v-select
                  v-model="formData.applicant.legalAddress.region"
                  :items="getRegionOptions(formData.applicant.legalAddress.country)"
                  label="Регион"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-select>
                
                <v-text-field
                  v-model="formData.applicant.legalAddress.address"
                  label="Адрес заявителя"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-text-field>
                
                <div class="text-subtitle-1 font-weight-bold mb-3 mt-4">Фактический адрес</div>
                
                <v-checkbox
                  v-model="formData.applicant.addressMatch"
                  label="Фактический адрес совпадает с юридическим?"
                  hide-details
                  class="mb-3"
                ></v-checkbox>
                
                <template v-if="!formData.applicant.addressMatch">
                  <v-select
                    v-model="formData.applicant.factAddress.country"
                    :items="countryOptions"
                    label="Страна"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="mb-3"
                  >
                    <template v-slot:prepend>
                      <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                    </template>
                  </v-select>
                  
                  <v-text-field
                    v-model="formData.applicant.factAddress.index"
                    label="Индекс"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="mb-3"
                  >
                  </v-text-field>
                  
                  <v-select
                    v-model="formData.applicant.factAddress.region"
                    :items="getRegionOptions(formData.applicant.factAddress.country)"
                    label="Регион"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="mb-3"
                  >
                    <template v-slot:prepend>
                      <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                    </template>
                  </v-select>
                  
                  <v-text-field
                    v-model="formData.applicant.factAddress.address"
                    label="Адрес заявителя"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="mb-3"
                  >
                    <template v-slot:prepend>
                      <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                    </template>
                  </v-text-field>
                </template>
              </v-col>
            </v-row>
            
            <v-divider class="my-4"></v-divider>
            
            <!-- Manufacturer Section -->
            <v-row>
              <v-col cols="12">
                <div class="text-h6 font-weight-bold mb-3">Изготовитель</div>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="formData.manufacturer.matchesApplicant"
                  label="Изготовитель совпадает с заявителем?"
                  hide-details
                  class="mb-3"
                ></v-checkbox>
                
                <v-text-field
                  v-if="!formData.manufacturer.matchesApplicant"
                  v-model="formData.manufacturer.name"
                  label="Изготовитель"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-text-field>
                
                <v-text-field
                  v-model="formData.manufacturer.contractNumber"
                  label="Реквизиты договора с изготовителем"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                </v-text-field>
              </v-col>
              
              <v-col cols="12" md="6" v-if="!formData.manufacturer.matchesApplicant">
                <div class="text-subtitle-1 font-weight-bold mb-3">Юридический адрес</div>
                
                <v-select
                  v-model="formData.manufacturer.legalAddress.country"
                  :items="countryOptions"
                  label="Страна"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-select>
                
                <v-text-field
                  v-model="formData.manufacturer.legalAddress.index"
                  label="Индекс"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                </v-text-field>
                
                <v-select
                  v-model="formData.manufacturer.legalAddress.region"
                  :items="getRegionOptions(formData.manufacturer.legalAddress.country)"
                  label="Регион"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-select>
                
                <v-text-field
                  v-model="formData.manufacturer.legalAddress.address"
                  label="Адрес изготовителя"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-text-field>
                
                <div class="text-subtitle-1 font-weight-bold mb-3 mt-4">Фактический адрес</div>
                
                <v-checkbox
                  v-model="formData.manufacturer.addressMatch"
                  label="Фактический адрес совпадает с юридическим?"
                  hide-details
                  class="mb-3"
                ></v-checkbox>
                
                <template v-if="!formData.manufacturer.addressMatch">
                  <v-select
                    v-model="formData.manufacturer.factAddress.country"
                    :items="countryOptions"
                    label="Страна"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="mb-3"
                  >
                    <template v-slot:prepend>
                      <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                    </template>
                  </v-select>
                  
                  <v-text-field
                    v-model="formData.manufacturer.factAddress.index"
                    label="Индекс"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="mb-3"
                  >
                  </v-text-field>
                  
                  <v-select
                    v-model="formData.manufacturer.factAddress.region"
                    :items="getRegionOptions(formData.manufacturer.factAddress.country)"
                    label="Регион"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="mb-3"
                  >
                    <template v-slot:prepend>
                      <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                    </template>
                  </v-select>
                  
                  <v-text-field
                    v-model="formData.manufacturer.factAddress.address"
                    label="Адрес изготовителя"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="mb-3"
                  >
                    <template v-slot:prepend>
                      <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                    </template>
                  </v-text-field>
                </template>
              </v-col>
            </v-row>
            
            <v-divider class="my-4"></v-divider>
            
            <!-- Product Section -->
            <v-row>
              <v-col cols="12">
                <div class="text-h6 font-weight-bold mb-3">Продукция</div>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.product.regulation"
                  :items="regulationOptions"
                  label="Регламент(для НВО ЕМС)"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-select>
                
                <v-select
                  v-model="formData.product.regulationDetails"
                  :items="regulationDetailsOptions"
                  label="Регламент(остальные ТР)"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-select>
                
                <v-text-field
                  v-model="formData.product.name"
                  label="Наименование продукции"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-text-field>
                
                <v-textarea
                  v-model="formData.product.storageInfo"
                  label="Информация об усл.хранения и сроках годности"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  auto-grow
                  rows="3"
                  class="mb-3"
                >
                </v-textarea>
                
                <v-textarea
                  v-model="formData.product.additionalInfo"
                  label="Дополнительная информация"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  auto-grow
                  rows="3"
                  class="mb-3"
                >
                </v-textarea>
                
                <v-text-field
                  v-model="formData.product.tnved"
                  label="Код ТН ВЭД"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-text-field>
                
                <v-text-field
                  v-model="formData.product.document"
                  label="Документ по которому выпускается продукция"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                </v-text-field>
                
                <v-text-field
                  v-model="formData.product.standards"
                  label="Стандарты, на добровольной основе обеспечивающие соблюдение требований ТР ТС"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                </v-text-field>
              </v-col>
              
              <v-col cols="12" md="6">
                <div class="text-h6 font-weight-bold mb-3">Общие сведения</div>
                
                <v-select
                  v-model="formData.general.release"
                  :items="releaseOptions"
                  label="Выпуск"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-select>
                
                <v-select
                  v-model="formData.general.declarationPeriod"
                  :items="declarationPeriodOptions"
                  label="Срок действия декларации"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-select>
                
                <div class="text-h6 font-weight-bold mb-3 mt-4">Сведения о протоколе</div>
                
                <v-select
                  v-model="formData.protocol.labType"
                  :items="labTypeOptions"
                  label="Тип лаборатории"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small">mdi-asterisk</v-icon>
                  </template>
                </v-select>
                
                <v-text-field
                  v-model="formData.protocol.piCount"
                  label="Количество ПИ на руки"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                </v-text-field>
                
                <v-text-field
                  v-model="formData.protocol.productName"
                  label="Наименование продукции для ПИ"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                </v-text-field>
                
                <v-select
                  v-model="formData.protocol.hasOwnProtocol"
                  :items="protocolOptions"
                  label="У вас свой протокол?"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  class="mb-3"
                >
                </v-select>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="12" class="d-flex justify-center gap-4 mt-4">
                <v-btn
                  color="grey-darken-1"
                  variant="text"
                  prepend-icon="mdi-arrow-left"
                  @click="goBack"
                >
                  Назад
                </v-btn>
                
                <v-btn
                  color="grey-darken-1"
                  variant="outlined"
                  prepend-icon="mdi-eye"
                >
                  Предпросмотр
                </v-btn>
                
                <v-btn
                  color="grey-darken-1"
                  variant="outlined"
                  prepend-icon="mdi-paperclip"
                >
                  Добавить приложение
                </v-btn>
                
                <v-btn
                  color="success"
                  variant="elevated"
                  type="submit"
                >
                  Отправить заявку
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref(null)
const activeTab = ref('light')

// Form data
const formData = reactive({
  applicant: {
    type: 'Заявитель',
    regType: '',
    inn: '12345678901234',
    name: 'Индивидуальный предприниматель Чехов А.П.',
    fullName: 'Чехов Антон Павлович',
    phone: '74953332211',
    email: 'test@mail.ru',
    legalAddress: {
      country: 'Выберите из списка',
      index: '101000',
      region: 'Выберите из списка',
      address: 'город Челябинск, улица Созидателей, дом 5, офис 6'
    },
    addressMatch: false,
    factAddress: {
      country: 'Выберите из списка',
      index: '101000',
      region: 'Выберите из списка',
      address: 'город Челябинск, улица Созидателей, дом 5, офис 6'
    }
  },
  manufacturer: {
    matchesApplicant: false,
    name: 'ООО "Дельта"',
    contractNumber: '№ 346 от 26.01.2017 года',
    legalAddress: {
      country: 'Выберите из списка',
      index: '101000',
      region: 'Выберите из списка',
      address: 'город Челябинск, улица Созидателей, дом 5, офис 6'
    },
    addressMatch: false,
    factAddress: {
      country: 'Выберите из списка',
      index: '101000',
      region: 'Выберите из списка',
      address: 'город Челябинск, улица Созидателей, дом 5, офис 6'
    }
  },
  product: {
    regulation: 'Выберите из списка',
    regulationDetails: 'Выберите из списка',
    name: 'Ноутбуки ASUS',
    storageInfo: 'условия хранения и срок годности указаны в прилагаемой к продукции товаросопроводительной документации и на упаковке',
    additionalInfo: '',
    tnved: '1905',
    document: '',
    standards: ''
  },
  general: {
    release: 'Выберите из списка',
    declarationPeriod: '1 год'
  },
  protocol: {
    labType: 'Выберите из списка',
    piCount: '',
    productName: 'финик, фаршированный карамелизированным арахисом (артикул ПП1152115, коричневый миндаль)',
    hasOwnProtocol: 'Нет'
  }
})

// Options for select fields
const regTypeOptions = ['Тип рег.номера']
const countryOptions = ['Выберите из списка', 'Россия', 'Беларусь', 'Казахстан', 'Армения', 'Киргизия']
const regionOptions = {
  'Россия': ['Выберите из списка', 'Москва', 'Санкт-Петербург', 'Челябинская область', 'Московская область'],
  'Беларусь': ['Выберите из списка', 'Минская область', 'Брестская область'],
  'Казахстан': ['Выберите из списка', 'Алматы', 'Астана'],
  'Армения': ['Выберите из списка', 'Ереван', 'Гюмри'],
  'Киргизия': ['Выберите из списка', 'Бишкек', 'Ош']
}
const regulationOptions = ['Выберите из списка', 'ТР ТС 004/2011', 'ТР ТС 010/2011', 'ТР ТС 020/2011']
const regulationDetailsOptions = ['Выберите из списка', 'ТР ТС 005/2011', 'ТР ТС 007/2011', 'ТР ТС 017/2011']
const releaseOptions = ['Выберите из списка', 'Серийный выпуск', 'Партия', 'Единичное изделие']
const declarationPeriodOptions = ['1 год', '3 года', '5 лет']
const labTypeOptions = ['Выберите из списка', 'Аккредитованная', 'Собственная']
const protocolOptions = ['Нет', 'Да']

// Helper function to get region options based on selected country
const getRegionOptions = (country) => {
  return regionOptions[country] || ['Выберите из списка']
}

onMounted(() => {
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
  
  // Pre-fill form with user data if available
  if (authStore.user) {
    formData.applicant.name = authStore.user.name || formData.applicant.name
    formData.applicant.inn = authStore.user.inn || formData.applicant.inn
    formData.applicant.phone = authStore.user.phone || formData.applicant.phone
    formData.applicant.email = authStore.user.email || formData.applicant.email
    
    if (authStore.user.legalAddress) {
      formData.applicant.legalAddress.address = authStore.user.legalAddress
    }
    
    if (authStore.user.physicalAddress) {
      formData.applicant.factAddress.address = authStore.user.physicalAddress
    }
  }
})

// Form submission
const submitForm = async () => {
  const { valid } = await form.value.validate()
  
  if (!valid) {
    return
  }
  
  try {
    // In a real app, this would submit the form data to an API
    console.log('Form submitted:', formData)
    
    // Generate documents based on the form data
    // ...
    
    // Redirect to the application list
    router.push('/')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

// Navigation
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.application-tabs {
  border-bottom: 1px solid #e0e0e0;
}
</style>
