<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
    
        <!-- Task Type Selector -->
        <v-tabs
          v-model="selectedType"
          bg-color="white"
          color="primary"
          align-tabs="start"
          height="48"
          class="application-tabs mb-4"
        >
          <v-tab 
            v-for="type in taskTypes" 
            :key="type.value" 
            :value="type.value"
            class="text-none"
          >
            <v-icon start :icon="type.icon" class="mr-2"></v-icon>
            {{ type.title }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card flat class="pa-4 bg-grey-lighten-4">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.title"
                label="Название заявки"
                variant="outlined"
                bg-color="yellow-lighten-4"
                density="comfortable"
                hide-details="auto"
                class="mb-3 application-title"
                required
                persistent-placeholder
              ></v-text-field>
            </v-col>
          </v-row>

          <v-form ref="form" @submit.prevent="saveApplication">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.applicationType"
                  label="Тип заявки"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.applicant"
                  label="Заявитель"
                  :items="applicantOptions"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>

                <v-select
                  v-model="formData.inn"
                  label="ИНН"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>

                <v-text-field
                  v-model="formData.ogrn"
                  label="ОГРН"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="formData.legalAddress"
                  label="Юридический адрес"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="formData.actualAddress"
                  label="Фактический адрес"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="formData.phone"
                  label="Телефон"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="formData.email"
                  label="Email"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.productName"
                  label="Наименование продукции"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  auto-grow
                  rows="3"
                  class="mb-3"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-divider class="my-3"></v-divider>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.technicalRegulation"
                  label="Технический регламент"
                  :items="getTechnicalRegulationOptions()"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-file-input
                  v-model="formData.files"
                  label="Прикрепить файлы"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  multiple
                  chips
                  class="mb-3"
                ></v-file-input>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.manufacturerSameAsApplicant"
                  label="Изготовитель совпадает с заявителем?"
                  :items="['Нет', 'Да']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.manufacturer"
                  label="Изготовитель"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  :disabled="formData.manufacturerSameAsApplicant === 'Да'"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.productionType"
                  label="Выпуск"
                  :items="['Серийный выпуск']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.scheme"
                  label="Схема"
                  :items="['1Д - серийный выпуск + срок действия']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.declarationValidity"
                  label="Срок действия декларации"
                  :items="['1 год', '3 года', '5 лет']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.laboratory"
                  label="Лаборатория"
                  :items="['ГК ОС «Профессиональность»']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.hasOwnProtocol"
                  label="У вас свой протокол?11"
                  :items="['Нет', 'Да']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.protocolCount"
                  label="Количество протоколов"
                  :items="['0', '1', '2', '3', '4', '5']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.manager"
                  label="Менеджер"
                  :items="['']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.expert"
                  label="Эксперт"
                  :items="['Не закреплен']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.cost"
                  label="Стоимость"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.status"
                  label="Статус"
                  :items="['Заявка подана']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="formData.comments"
                  label="Комментарии"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  auto-grow
                  rows="3"
                  class="mb-3"
                  required
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.taskType"
                  label="Тип задачи"
                  :items="taskTypes"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <div v-if="formData.taskType === 'heavy' || formData.taskType === 'light'">
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.productInfo"
                    label="Информация о продукции"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    auto-grow
                    rows="3"
                    class="mb-3"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>

              <!-- Испытания - Testing section -->
              <v-card class="mb-4" variant="outlined" elevation="0">
                <v-card-text>
                  <div class="text-subtitle-1 font-weight-medium mb-3">Испытания</div>
                  
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="formData.laboratoryName"
                        label="Лаборатория"
                        :items="['ЦС ОС «Промтехностандарт»']"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="formData.hasOwnProtocol"
                        label="У вас свой протокол?!!"
                        :items="['Нет', 'Да']"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-select>
                    </v-col>
                  
                    <v-col cols="12" md="6" v-if="formData.hasOwnProtocol === 'Нет'">
                      <v-select
                        v-model="formData.protocolCount"
                        label="Количество протоколов"
                        :items="['1', '2', '3', '4', '5']"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      >
                        <template v-slot:append>
                          <v-tooltip
                            location="bottom"
                            max-width="300"
                          >
                            <template v-slot:activator="{ props }">
                              <v-icon
                                v-bind="props"
                                color="primary"
                                icon="mdi-information-outline"
                              ></v-icon>
                            </template>
                            <span>Если продукция конструктивно отличается, необходимо оформить протокол на каждое изделие имеющее конструктивное или функциональное отличие</span>
                          </v-tooltip>
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                  
                  <!-- If user has their own protocol -->
                  <div v-if="formData.hasOwnProtocol === 'Да'">
                    <v-text-field
                      v-model="formData.protocolIssueDate"
                      label="Дата выдачи протокола"
                      type="date"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                    
                    <v-text-field
                      v-model="formData.protocolIssuer"
                      label="Кто выдал протокол"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                    
                    <v-text-field
                      v-model="formData.protocolProducts"
                      label="Продукция в протоколе"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                    
                    <v-file-input
                      v-model="formData.protocolFile"
                      label="Файлы протокола"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      accept=".pdf,.doc,.docx"
                      required
                      prepend-icon="mdi-paperclip"
                      :show-size="true"
                      chips
                      multiple
                    ></v-file-input>
                  </div>
                </v-card-text>
              </v-card>
              
              <!-- Идентификация изделия - Product Identification -->
              <v-card class="mb-4" variant="outlined" elevation="0">
                <v-card-text>
                  <div class="text-subtitle-1 font-weight-medium mb-3">Идентификация изделия</div>
                  
                  <v-text-field
                    v-model="formData.productName"
                    label="Название изделия"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-text-field>
                  
                  <v-text-field
                    v-model="formData.productionDate"
                    label="Дата выпуска (как на шильдике)"
                    type="date"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-text-field>
                  
                  <v-file-input
                    v-model="formData.productPhoto"
                    label="Фотография изделия"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    accept="image/*"
                    required
                    prepend-icon="mdi-camera"
                    :show-size="true"
                    chips
                    multiple
                  ></v-file-input>
                  
                  <v-file-input
                    v-model="formData.nameplatePoto"
                    label="Фотография шильдика (при наличии)"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    :show-size="true"
                    chips
                    multiple
                  ></v-file-input>
                </v-card-text>
              </v-card>

              <!-- Дополнительно - Additional section -->
              <v-card class="mb-4" variant="outlined" elevation="0">
                <v-card-text>
                  <div class="text-subtitle-1 font-weight-medium mb-3">Дополнительно</div>
                  
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="formData.manager"
                        label="Менеджер"
                        :items="['']" 
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-select
                        v-model="formData.expert"
                        label="Эксперт"
                        :items="['Не закреплен']" 
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                      ></v-select>
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.cost"
                        label="Стоимость"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-select
                        v-model="formData.status"
                        label="Статус"
                        :items="['Заявка подана']" 
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                      ></v-select>
                    </v-col>
                  </v-row>
                  
                  <v-file-input
                    v-model="formData.additionalDocuments"
                    label="Документы"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    prepend-icon="mdi-paperclip"
                    :show-size="true"
                    chips
                    multiple
                  ></v-file-input>
                </v-card-text>
              </v-card>

              <!-- Комментарии - Comments section -->
              <v-card class="mb-4" variant="outlined" elevation="0">
                <v-card-text>
                  <div class="text-subtitle-1 font-weight-medium mb-3">Комментарии</div>
                  <v-textarea
                    v-model="formData.comments"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    auto-grow
                    rows="3"
                    class="mb-3"
                  ></v-textarea>
                </v-card-text>
              </v-card>
            </div>

            <div v-else-if="formData.taskType === 'rejection'">
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.rejectionReason"
                    label="Причина отказа"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    auto-grow
                    rows="3"
                    class="mb-3"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>

            <div v-else-if="formData.taskType === 'manual'">
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.productDescription"
                    label="Описание продукции"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    auto-grow
                    rows="3"
                    class="mb-3"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.manualType"
                    label="Тип руководства"
                    :items="['Руководство по эксплуатации', 'Руководство пользователя', 'Техническое руководство']"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </div>

            <div v-else-if="formData.taskType === 'passport'">
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.technicalSpecs"
                    label="Технические характеристики"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    auto-grow
                    rows="3"
                    class="mb-3"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.serialNumber"
                    label="Серийный номер"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div v-else-if="formData.taskType === 'safety'">
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.safetyDescription"
                    label="Описание безопасности"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    auto-grow
                    rows="3"
                    class="mb-3"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>

            <div v-else-if="formData.taskType === 'specs'">
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.specsDescription"
                    label="Описание ТУ"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    auto-grow
                    rows="3"
                    class="mb-3"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>
          </v-form>

          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                type="submit"
                color="primary"
                :loading="saving"
              >
                Сохранить
              </v-btn>
              <v-btn
                variant="outlined"
                @click="cancel"
              >
                Отменить
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useApplicationStore } from '../stores/applicationStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const applicationStore = useApplicationStore()

const taskTypes = ref([
  {
    value: 'heavy',
    title: 'Тяжелая промышленность',
    icon: 'mdi-factory',
    description: 'TR TS 04, 010, 020, 032, 037'
  },
  {
    value: 'light',
    title: 'Легкая промышленность',
    icon: 'mdi-tshirt-crew',
    description: 'TR TS 05, 07, 017, пищевая: 021, 022, 023, 024, 033, 034, 040'
  },
  {
    value: 'rejection',
    title: 'Отказное письмо',
    icon: 'mdi-file-document-outline'
  },
  {
    value: 'passport',
    title: 'Паспорт продукции',
    icon: 'mdi-card-account-details-outline'
  },
  {
    value: 'manual',
    title: 'Руководство по эксплуатации',
    icon: 'mdi-book-open-variant'
  },
  {
    value: 'safety',
    title: 'Обоснование безопасности',
    icon: 'mdi-shield-check-outline'
  },
  {
    value: 'specs',
    title: 'ТУ',
    icon: 'mdi-clipboard-list-outline'
  },
  {
    value: 'protocol',
    title: 'Протоколы испытаний',
    icon: 'mdi-clipboard-text-outline'
  },
  {
    value: 'technical',
    title: 'Разработка тех. документации',
    icon: 'mdi-file-cog-outline'
  }
])

const selectedType = ref(null)
const saving = ref(false)
const form = ref(null)

// Form data structure
const formData = ref({
  title: '',
  applicationType: '',
  applicant: '',
  inn: '',
  ogrn: '',
  legalAddress: '',
  actualAddress: '',
  phone: '',
  email: '',
  productName: '',
  technicalRegulation: [],
  manufacturerSameAsApplicant: 'Нет',
  manufacturer: '',
  manufacturerLegalAddress: '',
  manufacturerActualAddress: '',
  productionType: '',
  declarationValidity: '',
  hasOwnProtocol: 'Нет',
  protocolCount: '',
  protocolIssueDate: '',
  protocolIssuer: '',
  protocolProducts: '',
  protocolFile: '',
  productPhoto: '',
  nameplatePoto: '',
  productionDate: '',
  laboratoryName: '',
  additionalDocuments: '',
  comments: ''
})

const applicantOptions = computed(() => {
  const options = ['Создать нового']
  if (authStore.isAuthenticated && authStore.user) {
    const userName = authStore.user.companyName || authStore.user.fullName || authStore.user.email
    if (userName) {
      options.unshift(userName)
    }
  }
  return options
})

const getTechnicalRegulationOptions = computed(() => {
  if (selectedType.value === 'heavy' || selectedType.value === 'light') {
    return [
      'ТР ТС 005/2011',
      'ТР ТС 007/2011',
      'ТР ТС 017/2011',
      'ТР ТС 021/2011',
      'ТР ТС 022/2011',
      'ТР ТС 023/2011',
      'ТР ТС 024/2011',
      'ТР ТС 033/2013',
      'ТР ТС 034/2013',
      'ТР ЕАЭС 040/2016'
    ]
  } else {
    return []
  }
})

const getTechnicalRegulations = computed(() => {
  if (formData.value.taskType === 'heavy') {
    return [
      'ТР ТС 004/2011',
      'ТР ТС 010/2011',
      'ТР ТС 020/2011',
      'ТР ТС 032/2013',
      'ТР ТС 037/2016'
    ]
  } else if (formData.value.taskType === 'light') {
    return [
      'ТР ТС 005/2011',
      'ТР ТС 007/2011',
      'ТР ТС 017/2011',
      'ТР ТС 021/2011',
      'ТР ТС 022/2011',
      'ТР ТС 023/2011',
      'ТР ТС 024/2011',
      'ТР ТС 033/2013',
      'ТР ТС 034/2013',
      'ТР ЕАЭС 040/2016'
    ]
  }
  return []
})

const getFormTitle = computed(() => {
  const type = taskTypes.value.find(t => t.value === selectedType.value)
  return type ? type.title : 'Новая заявка'
})

const saveApplication = async () => {
  if (!form.value.validate()) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }

  saving.value = true
  try {
    console.log('Submitting form data:', formData.value)
    
    // Use the applicationStore to create the application
    const result = await applicationStore.createApplication({
      title: formData.value.title,
      type: selectedType.value,
      applicationType: formData.value.applicationType,
      applicant: formData.value.applicant,
      inn: formData.value.inn,
      ogrn: formData.value.ogrn,
      legalAddress: formData.value.legalAddress,
      actualAddress: formData.value.actualAddress,
      phone: formData.value.phone,
      email: formData.value.email,
      productName: formData.value.productName,
      technicalRegulation: formData.value.technicalRegulation,
      manufacturerSameAsApplicant: formData.value.manufacturerSameAsApplicant,
      manufacturerName: formData.value.manufacturerName,
      manufacturerAddress: formData.value.manufacturerAddress,
      productionType: formData.value.productionType,
      declarationScheme: formData.value.declarationScheme,
      declarationValidity: formData.value.declarationValidity,
      laboratory: formData.value.laboratory,
      hasOwnProtocol: formData.value.hasOwnProtocol,
      protocolCount: formData.value.protocolCount,
      manager: formData.value.manager,
      expert: formData.value.expert,
      cost: formData.value.cost,
      status: 'draft',
      comments: formData.value.comments
    })
    
    console.log('Application created:', result)
    
    if (result.success) {
      alert('Заявка успешно создана!')
      router.push('/applications')
    } else {
      alert('Произошла ошибка при создании заявки. Пожалуйста, попробуйте снова.')
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    saving.value = false
    alert('Произошла ошибка при создании заявки. Пожалуйста, попробуйте снова.')
  } finally {
    saving.value = false
  }
}

const cancel = () => {
  router.push('/applications')
}

const fillFromUserProfile = () => {
  if (authStore.isAuthenticated && authStore.user) {
    const user = authStore.user
    const userName = user.companyName || user.fullName || user.email
    if (userName) {
      formData.value.applicant = userName
    }
    
    formData.value.inn = user.inn || ''
    formData.value.ogrn = user.ogrn || ''
    formData.value.legalAddress = user.legalAddress || ''
    formData.value.actualAddress = user.physicalAddress || ''
    formData.value.phone = user.phone || ''
    formData.value.email = user.email || ''
  }
}

const handleApplicantChange = () => {
  if (authStore.isAuthenticated && authStore.user && 
      formData.value.applicant === (authStore.user.companyName || authStore.user.fullName || authStore.user.email)) {
    fillFromUserProfile()
  } else if (formData.value.applicant === 'Создать нового') {
    formData.value.inn = ''
    formData.value.ogrn = ''
    formData.value.legalAddress = ''
    formData.value.actualAddress = ''
    formData.value.phone = ''
    formData.value.email = ''
  }
}

// Watch for applicant changes
watch(() => formData.value.applicant, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    handleApplicantChange()
  }
})

// Watch for tab changes to update route and form data
watch(selectedType, (newType) => {
  if (!newType) return
  const selectedTask = taskTypes.value.find(t => t.value === newType)
  formData.value.applicationType = selectedTask?.title || ''
  
  // Always update the title when the type changes
  formData.value.title = selectedTask ? `Заявка на сертификацию (${selectedTask.title})` : ''
  
  // Set taskType to match the selected tab
  formData.value.taskType = newType
  
  if (newType === 'heavy') {
    router.push({ name: 'application-create-heavy' })
  } else if (newType === 'light') {
    router.push({ name: 'application-create-light' })
  }
})

// Initialize selectedType from route
onMounted(() => {
  fillFromUserProfile()
  
  const { type } = route.query
  if (type && taskTypes.value.find(t => t.value === type)) {
    selectedType.value = type
  } else {
    selectedType.value = 'heavy' // Default selection
  }
})

const selectType = (type) => {
  selectedType.value = type
  // Navigate to specific view if type is heavy or light
  if (type === 'heavy') {
    router.push({ name: 'application-create-heavy' })
  } else if (type === 'light') {
    router.push({ name: 'application-create-light' })
  } // Add else-if for other types if they get dedicated views
}
</script>

<style scoped>
.application-tabs {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
}

.application-title :deep(.v-field__input) {
  background-color: rgb(255, 255, 200) !important;
}

.create-application {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 16px;
}

@media (max-width: 600px) {
  .create-application {
    padding: 8px;
  }
}

.task-type-selector {
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.task-type-container {
  max-width: 1400px;
  margin: 0 auto;
}

.task-type-btn {
  cursor: pointer;
  padding: 16px;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  height: 100%;
}

.task-type-btn:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.task-type-btn.selected {
  border-bottom-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.task-type-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.task-type-title {
  font-size: 14px;
  line-height: 1.2;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
}

.selected .task-type-title {
  color: rgb(var(--v-theme-primary));
}
</style>
