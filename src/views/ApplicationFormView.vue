<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <!-- Task Type Selector - only shown in create mode -->
        <v-tabs
          v-if="isCreateMode"
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
        
        <!-- Title based on application type -->
        <h1 class="text-h4 mb-5" v-if="formData.taskType === 'light'">«Легкая промышленность»</h1>
        <h1 class="text-h4 mb-5" v-if="formData.taskType === 'heavy'">«Тяжелая промышленность»</h1>
        <h1 class="text-h4 mb-5" v-if="formData.taskType === 'rejection'">Отказное письмо</h1>
        <h1 class="text-h4 mb-5" v-if="formData.taskType === 'protocol'">Протокол испытаний</h1>
        <h1 class="text-h4 mb-5" v-if="formData.taskType === 'manual'">Техническая документация</h1>
        <h1 class="text-h4 mb-5" v-if="formData.taskType === 'passport'">Паспорт продукции</h1>
        <h1 class="text-h4 mb-5" v-if="formData.taskType === 'safety'">Обоснование безопасности</h1>
        <h1 class="text-h4 mb-5" v-if="formData.taskType === 'specs'">«ТУ»</h1>

        <!-- Page title - Remove this as we now have the industry-specific title -->
        <!-- <h1 class="text-h5 mb-4">{{ pageTitle }}</h1> -->
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
              </v-col>

              <v-col cols="12" md="6">
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

                <v-textarea
                  v-model="formData.productName"
                  label="Наименование продукции"
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

            <v-divider class="my-3"></v-divider>

            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="formData.technicalRegulation"
                  label="Технический регламент"
                  :items="getTechnicalRegulationOptions"
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
                  label="Изготовитель совпадает с заявителем?!"
                  :items="['Нет', 'Да']" 
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  required
                ></v-select>
              </v-col>

              <div v-if="formData.manufacturerSameAsApplicant === 'Нет'">
           
              <v-col cols="12" md="6">
             
                <v-text-field
                  v-if="formData.hasOwnProtocol === 'Нет'"
                  v-model="formData.manufacturer"
                  label="Изготовитель"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
              
                  required
                ></v-text-field>
           
              </v-col>
          </div>
            </v-row>

            <!-- Документы для тяжелой промышленности -->
            <div v-if="formData.taskType === 'heavy'">
              <v-row>
                <v-col cols="12" md="6">
                  <v-file-input
                    v-model="formData.egulFile"
                    label="Выписка из ЕГРЮЛ"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-file-input>
                </v-col>
                <v-col cols="12" md="6" v-if="formData.manufacturerSameAsApplicant === 'Нет'">
                  <v-file-input
                    v-model="formData.authorizedContractFile"
                    label="Договор уполномоченного лица"
                    variant="outlined"
                    density="comfortable"
                    hide-details="auto"
                    class="mb-3"
                    required
                  ></v-file-input>
                  <v-btn
                    :href="'/templates/договор_уполномоченного_лица.docx'"
                    download
                    color="primary"
                    class="mt-1"
                  >
                    Скачать шаблон договора уполномоченного лица
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <!-- Additional fields based on application type -->
            <div v-if="formData.taskType === 'light'">
              <!-- Light Industry Form -->
              
              <!-- Application Type Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Тип заявки</h2>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.declarationType"
                      label="Тип"
                      :items="['Декларирование', 'Сертификация']"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Applicant Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Заявитель</h2>
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
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Информация о заявителе">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.thirdParty"
                      label="Заявитель - 3е лицо"
                      :items="['Нет', 'Да']"
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
                      v-model="formData.inn"
                      label="ИНН"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.regType"
                      label="Тип регистрационного номера"
                      :items="['ОГРН', 'ОГРНИП']"
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
                    <v-text-field
                      v-model="formData.regNumber"
                      label="Основной государственный регистрационный номер"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.legalAddress"
                      label="Юридический адрес заявителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.actualAddress"
                      label="Фактический адрес заявителя"
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
                    <v-text-field
                      v-model="formData.phone"
                      label="Телефон"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Электронная почта">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorName"
                      label="Ф.И.О. руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorPosition"
                      label="Должность руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.onBehalf"
                      label="В лице"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Products Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Продукция</h2>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="formData.technicalRegulation"
                      label="Регламент (ТР)"
                      :items="getLightIndustryRegulations"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      multiple
                      chips
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Технический регламент">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productName"
                      label="Продукция"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.tnVedCode"
                      label="Код ТН ВД"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productDocument"
                      label="Документ, по которому выпускается продукция"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.standards"
                      label="Стандарты, обеспечивающие соблюдение требований ТР ТС"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.storageConditions"
                      label="Условия хранения и срок годности"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                    ></v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productDocument"
                      label="Документ, по которому выпускается продукция"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.standards"
                      label="Стандарты, обеспечивающие соблюдение требований ТР ТС"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.additionalInfo"
                      label="Дополнительная информация"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Manufacturer Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Изготовитель</h2>
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
                    <v-select
                      v-model="formData.foreignManufacturer"
                      label="Изготовитель иностранное лицо"
                      :items="['Нет', 'Да']"
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
                    <v-text-field
                      v-if="formData.hasOwnProtocol === 'Нет'"
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
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.authorizedContract"
                      label="Договор уполномоченного лица (Изготавливается на основании данного договора)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.manufacturerLegalAddress"
                      label="Юридический адрес изготовителя"
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
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.manufacturerActualAddress"
                      label="Фактический адрес изготовителя"
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
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.additionalFactories"
                      label="Адреса дополнительных производственных площадок"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="6"
                      class="mb-3"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </section>
              
              <!-- General Information Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Общие сведения</h2>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.productionType"
                      label="Выпуск"
                      :items="['Серийный выпуск', 'Партия', 'Единичное изделие']" 
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
                      :items="['1Д - серийный выпуск + срок действия', '2Д - партия', '3Д - единичное изделие']" 
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                      :hint="schemeHint"
                      persistent-hint
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
                </v-row>
              </section>
              
              <!-- Testing Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Испытания1</h2>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.laboratory"
                      label="Лаборатория"
                      :items="['ГК ОС «Профессиональность»', 'Другая']" 
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                      v-if="formData.hasOwnProtocol === 'Нет'"
                    ></v-select>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.hasOwnProtocol"
                      label="У вас свой протокол"
                      :items="['Нет', 'Да']" 
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                
                <v-row v-if="formData.hasOwnProtocol === 'Нет'">
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.protocolCount"
                      label="Количество протоколов"
                      :items="['1', '2', '3', '4']" 
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                
                <template v-if="formData.hasOwnProtocol === 'Нет' && formData.protocolCount">
                  <v-row v-if="parseInt(formData.protocolCount) >= 1">
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.productName1"
                        label="Наименование продукции для ПИ №1"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-row v-if="parseInt(formData.protocolCount) >= 2">
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.productName2"
                        label="Наименование продукции для ПИ №2"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-row v-if="parseInt(formData.protocolCount) >= 3">
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.productName3"
                        label="Наименование продукции для ПИ №3"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-row v-if="parseInt(formData.protocolCount) >= 4">
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.productName4"
                        label="Наименование продукции для ПИ №4"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </template>
                
                <div v-if="formData.hasOwnProtocol === 'Да'">
                  <v-row>
                    <v-col cols="12">
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
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.protocolIssuer"
                        label="Кто выдал протокол"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.protocolProducts"
                        label="Продукция в протоколе"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12">
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
                    </v-col>
                  </v-row>
                </div>
              </section>
              
              <!-- Additional Information Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Дополнительно</h2>
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
                      :items="['Заявка подана', 'В обработке', 'Завершено']" 
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
                    <v-file-input
                      v-model="formData.files"
                      label="Документы"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      multiple
                      chips
                      prepend-icon="mdi-paperclip"
                      class="mb-3"
                    >
                      <template v-slot:prepend>
                        <v-tooltip location="top" text="Прикрепите необходимые документы">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="mr-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Comments Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Комментарии</h2>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.comments"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="6"
                      class="mb-3"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </section>
            </div>
            
            <!-- Heavy Industry Form -->
            <div v-else-if="formData.taskType === 'heavy'">
              <!-- Application Type Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Тип заявки</h2>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.declarationType"
                      label="Тип"
                      :items="['Сертификация', 'Декларирование']"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Applicant Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Заявитель</h2>
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
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Информация о заявителе">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.thirdParty"
                      label="Заявитель - 3е лицо"
                      :items="['Нет', 'Да']"
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
                      v-model="formData.inn"
                      label="ИНН"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.regType"
                      label="Тип регистрационного номера"
                      :items="['ОГРН', 'ОГРНИП']"
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
                    <v-text-field
                      v-model="formData.regNumber"
                      label="Основной государственный регистрационный номер"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.legalAddress"
                      label="Юридический адрес заявителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.actualAddress"
                      label="Фактический адрес заявителя"
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
                    <v-text-field
                      v-model="formData.phone"
                      label="Телефон"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Электронная почта">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorName"
                      label="Ф.И.О. руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorPosition"
                      label="Должность руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.onBehalf"
                      label="В лице"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Products Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Продукция</h2>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="formData.technicalRegulation"
                      label="Технический регламент"
                      :items="getHeavyIndustryRegulations"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      multiple
                      chips
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                
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
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.tnVedCode"
                      label="Код ТН ВД"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productDocument"
                      label="Документ, по которому выпускается продукция"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.standards"
                      label="Стандарты, обеспечивающие соблюдение требований ТР ТС"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Manufacturer Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Изготовитель</h2>
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
                    <v-select
                      v-model="formData.foreignManufacturer"
                      label="Изготовитель иностранное лицо"
                      :items="['Нет', 'Да']"
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
                    <v-text-field
                      v-if="formData.hasOwnProtocol === 'Нет'"
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
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.authorizedContract"
                      label="Договор уполномоченного лица (Изготавливается на основании данного договора)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.manufacturerLegalAddress"
                      label="Юридический адрес изготовителя"
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
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.manufacturerActualAddress"
                      label="Фактический адрес изготовителя"
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
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.additionalFactories"
                      label="Адреса дополнительных производственных площадок"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="6"
                      class="mb-3"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </section>
              
              <!-- General Information Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Общие сведения</h2>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.productionType"
                      label="Выпуск"
                      :items="['Серийный выпуск', 'Партия', 'Единичное изделие']" 
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
                      :items="['1с', '2с', '3с', '4с', '5с']" 
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                      :hint="schemeHint"
                      persistent-hint
                    ></v-select>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Testing Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Испытания</h2>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.hasOwnProtocol"
                      label="У вас свой протокол?"
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
                      v-model="formData.laboratory"
                      label="Лаборатория"
                      :items="['ГК ОС «Профессиональность»']" 
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                      v-if="formData.hasOwnProtocol === 'Нет'"
                    ></v-select>
                  </v-col>
                  
               
                </v-row>
                
                <v-row v-if="formData.hasOwnProtocol === 'Нет'">
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.protocolCount"
                      label="Количество протоколов"
                      :items="['1', '2', '3', '4']" 
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                
                <template v-if="formData.hasOwnProtocol === 'Нет' && formData.protocolCount">
                  <v-row v-if="parseInt(formData.protocolCount) >= 1">
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.productName1"
                        label="Наименование продукции для ПИ №1"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-row v-if="parseInt(formData.protocolCount) >= 2">
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.productName2"
                        label="Наименование продукции для ПИ №2"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-row v-if="parseInt(formData.protocolCount) >= 3">
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.productName3"
                        label="Наименование продукции для ПИ №3"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-row v-if="parseInt(formData.protocolCount) >= 4">
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.productName4"
                        label="Наименование продукции для ПИ №4"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </template>
                
                <div v-if="formData.hasOwnProtocol === 'Да'">
                  <v-row>
                    <v-col cols="12">
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
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.protocolIssuer"
                        label="Кто выдал протокол"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <div v-if="formData.hasOwnProtocol != 'Да'">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.protocolProducts"
                        label="Продукция в протоколе"
                        variant="outlined"
                        density="comfortable"
                        hide-details="auto"
                        class="mb-3"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  </div>
                  <v-row>
                    <v-col cols="12">
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
                    </v-col>
                  </v-row>
                </div>
              </section>
              
              <!-- Additional Information Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Дополнительно</h2>
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
                      :items="['Заявка подана', 'В обработке', 'Завершено']" 
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
                    <v-file-input
                      v-model="formData.files"
                      label="Документы"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      multiple
                      chips
                      prepend-icon="mdi-paperclip"
                      class="mb-3"
                    >
                      <template v-slot:prepend>
                        <v-tooltip location="top" text="Прикрепите необходимые документы">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="mr-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Comments Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Комментарии</h2>
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
                    ></v-textarea>
                  </v-col>
                </v-row>
              </section>
            </div>
            
            <!-- Rejection Letter Form -->
            <div v-else-if="formData.taskType === 'rejection'">
              <!-- Applicant Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Заявитель</h2>
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
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Информация о заявителе">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.thirdParty"
                      label="Заявитель - 3е лицо"
                      :items="['Нет', 'Да']"
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
                      v-model="formData.inn"
                      label="ИНН"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.regType"
                      label="Тип регистрационного номера"
                      :items="['ОГРН', 'ОГРНИП']"
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
                    <v-text-field
                      v-model="formData.regNumber"
                      label="Основной государственный регистрационный номер"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.legalAddress"
                      label="Юридический адрес заявителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.actualAddress"
                      label="Фактический адрес заявителя"
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
                    <v-text-field
                      v-model="formData.phone"
                      label="Телефон"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Электронная почта">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorName"
                      label="Ф.И.О. руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorPosition"
                      label="Должность руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.onBehalf"
                      label="В лице"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Products Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Продукция</h2>
                
                <!-- Heavy Industry Regulations -->
                <v-row>
                  <v-col cols="12">
                    <p class="text-subtitle-1 mb-2">Регламент (ТР) тяжелой промышленности</p>
                    <v-select
                      v-model="formData.heavyIndustryRegulations"
                      label="Технический регламент тяжелой промышленности"
                      :items="getHeavyIndustryRegulations"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      multiple
                      chips
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Технический регламент тяжелой промышленности">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
                
                <!-- Light Industry Regulations -->
                <v-row>
                  <v-col cols="12">
                    <p class="text-subtitle-1 mb-2">Регламент (ТР) легкой промышленности</p>
                    <v-select
                      v-model="formData.lightIndustryRegulations"
                      label="Технический регламент легкой промышленности"
                      :items="getLightIndustryRegulations"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      multiple
                      chips
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Технический регламент легкой промышленности">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Additional Information Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Дополнительно</h2>
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
                  <v-col cols="12">
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
                </v-row>
              </section>
              
              <!-- Comments Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Комментарии</h2>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.comments"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="6"
                      class="mb-3"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </section>
            </div>

            <!-- Operation Manual Form -->
            <div v-else-if="formData.taskType === 'manual'">
              <!-- Applicant Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Заявитель</h2>
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
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Информация о заявителе">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.thirdParty"
                      label="Заявитель - 3е лицо"
                      :items="['Нет', 'Да']"
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
                      v-model="formData.inn"
                      label="ИНН"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.regType"
                      label="Тип регистрационного номера"
                      :items="['ОГРН', 'ОГРНИП']"
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
                    <v-text-field
                      v-model="formData.regNumber"
                      label="Основной государственный регистрационный номер"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.legalAddress"
                      label="Юридический адрес заявителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.actualAddress"
                      label="Фактический адрес заявителя"
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
                    <v-text-field
                      v-model="formData.phone"
                      label="Телефон"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Электронная почта">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorName"
                      label="Ф.И.О. руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorPosition"
                      label="Должность руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.onBehalf"
                      label="В лице"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Additional Information Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Дополнительно</h2>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productName"
                      label="Наименование изделия (серии изделий)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.trts"
                      label="Указать ТР ТС"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productDescription"
                      label="Описание применения, основные параметры и характеристики изделия (серии изделий)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Укажите важные технические характеристики и параметры">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.packagingInfo"
                      label="Информация об упаковке, транспортной упаковке. Пояснения к маркировке"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.transportInfo"
                      label="Информация о транспортировании"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Укажите особенности транспортировки">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.guaranteeTerms"
                      label="Желаемые гарантийные сроки (сроки годности)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.companyInfo"
                      label="Наименование, ОКПО, ФИО и «статус» руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Укажите данные компании и руководителя">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.operationRules"
                      label="Эксплуатация (услуги и требования)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.operationHazards"
                      label="Опасности при эксплуатации"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.installation"
                      label="Монтаж"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.schemesDrawings"
                      label="При необходимости схемы и рисунки(чертежи)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.technicalDocumentation"
                      label="Техническая документация, в соответствии с которой производится продукция"
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
                    <v-text-field
                      v-model="formData.nominalVoltage"
                      label="Номинальное напряжение"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.nominalPressure"
                      label="Номинальное давление"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
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
                  <v-col cols="12">
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
                </v-row>
              </section>
              
              <!-- Comments Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Комментарии</h2>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.comments"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="6"
                      class="mb-3"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </section>
            </div>

            <!-- Product Passport Form -->
            <div v-else-if="formData.taskType === 'passport'">
              <!-- Applicant Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Заявитель</h2>
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
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Информация о заявителе">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.thirdParty"
                      label="Заявитель - 3е лицо"
                      :items="['Нет', 'Да']"
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
                      v-model="formData.inn"
                      label="ИНН"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.regType"
                      label="Тип регистрационного номера"
                      :items="['ОГРН', 'ОГРНИП']"
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
                    <v-text-field
                      v-model="formData.regNumber"
                      label="Основной государственный регистрационный номер"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.legalAddress"
                      label="Юридический адрес заявителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.actualAddress"
                      label="Фактический адрес заявителя"
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
                    <v-text-field
                      v-model="formData.phone"
                      label="Телефон"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Электронная почта">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorName"
                      label="Ф.И.О. руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorPosition"
                      label="Должность руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.onBehalf"
                      label="В лице"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Additional Information Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Дополнительно</h2>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productName"
                      label="Наименование продукции"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.normativeDocs"
                      label="Нормативные документы в соответствии с которыми изготавливается продукция (ГОСТ, ТУ, ОСТ, СТО)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Укажите нормативные документы">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.technicalSpecs"
                      label="Технические характеристики продукции"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.testingProtocol"
                      label="Протокол испытания продукции"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.packagingInfo"
                      label="Информация об упаковке, транспортной упаковке. Пояснения к маркировке"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.transportInfo"
                      label="Информация о транспортировании"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Укажите особенности транспортировки">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.guaranteeTerms"
                      label="Желаемые гарантийные сроки (сроки годности)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.companyInfo"
                      label="Наименование, ОКПО, ФИО и «статус» руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Укажите данные компании и руководителя">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.operation"
                      label="Эксплуатация (кратко)"
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
                    <v-text-field
                      v-model="formData.nominalVoltage"
                      label="Номинальное напряжение"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.nominalPressure"
                      label="Номинальное давление"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
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
                  <v-col cols="12">
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
                </v-row>
              </section>
              
              <!-- Comments Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Комментарии</h2>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.comments"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="6"
                      class="mb-3"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </section>
            </div>

            <!-- Safety Justification Form -->
            <div v-else-if="formData.taskType === 'safety'">
              <!-- Applicant Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Заявитель</h2>
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
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Информация о заявителе">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.thirdParty"
                      label="Заявитель - 3е лицо"
                      :items="['Нет', 'Да']"
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
                      v-model="formData.inn"
                      label="ИНН"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.regType"
                      label="Тип регистрационного номера"
                      :items="['ОГРН', 'ОГРНИП']"
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
                    <v-text-field
                      v-model="formData.regNumber"
                      label="Основной государственный регистрационный номер"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.legalAddress"
                      label="Юридический адрес заявителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.actualAddress"
                      label="Фактический адрес заявителя"
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
                    <v-text-field
                      v-model="formData.phone"
                      label="Телефон"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Электронная почта">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorName"
                      label="Ф.И.О. руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorPosition"
                      label="Должность руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.onBehalf"
                      label="В лице"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Additional Information Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Дополнительно</h2>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productName"
                      label="Наименование изделия (серии изделий)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Укажите наименование продукции">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.trts"
                      label="Указать ТР ТС *"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productDescription"
                      label="Описание применения, основные параметры и характеристики изделия (серии изделий)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Укажите важные технические характеристики и параметры">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.technicalSpecs"
                      label="Технические характеристики (питание, мощность и т.д.)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-file-input
                      v-model="formData.drawings"
                      label="Чертежи в обязательном порядке"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                      prepend-icon="mdi-paperclip"
                      append-icon="mdi-eye"
                      show-size
                      truncate-length="15"
                    ></v-file-input>
                    <v-text-field
                      v-model="formData.drawingsDescription"
                      label="Описание"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-file-input
                      v-model="formData.testProtocols"
                      label="Протоколы или акты испытаний в обязательном порядке (для ТР ТС 032/2011 расчет на прочность)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                      prepend-icon="mdi-paperclip"
                      append-icon="mdi-eye"
                      show-size
                      truncate-length="15"
                    ></v-file-input>
                    <v-text-field
                      v-model="formData.testProtocolsDescription"
                      label="Описание"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.testProgram"
                      label="Программа и методики испытаний (или ТУ)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-file-input
                      v-model="formData.productPassport"
                      label="Паспорт или руководство(инструкция) по эксплуатации на продукцию в обязательном порядке"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                      prepend-icon="mdi-paperclip"
                      append-icon="mdi-eye"
                      show-size
                      truncate-length="15"
                    ></v-file-input>
                    <v-text-field
                      v-model="formData.productPassportDescription"
                      label="Описание"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.operationHazards"
                      label="Предполагаемые опасности в процессе эксплуатации"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Укажите возможные опасности при использовании">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.safetyFeatures"
                      label="Конструктивные особенности предотвращающие опасности ( кожухи, блокировки и т.д.)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.transportInfo"
                      label="Информация о транспортировании (чем и какие обязательные требования при этом должны соблюдаться)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.guaranteeTerms"
                      label="Желаемые гарантийные сроки (сроки годности)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.manufacturerName"
                      label="Наименование изготовителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Укажите производителя продукции">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.manufacturerWebsite"
                      label="Ссылка на информационный ресурс изготовителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.manufacturerCertificates"
                      label="Количество собственных СБ изготовителя (можно не указывать, если нет)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.nominalVoltage"
                      label="Номинальное напряжение"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.nominalPressure"
                      label="Номинальное давление"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
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
                  <v-col cols="12">
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
                </v-row>
              </section>
              
              <!-- Comments Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Комментарии</h2>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.comments"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="6"
                      class="mb-3"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </section>
            </div>

            <!-- Technical Specifications (ТУ) Form -->
            <div v-else-if="formData.taskType === 'specs'">
              <!-- Applicant Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Заявитель</h2>
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
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Информация о заявителе">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-select>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.thirdParty"
                      label="Заявитель - 3е лицо"
                      :items="['Нет', 'Да']"
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
                      v-model="formData.inn"
                      label="ИНН"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.regType"
                      label="Тип регистрационного номера"
                      :items="['ОГРН', 'ОГРНИП']"
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
                    <v-text-field
                      v-model="formData.regNumber"
                      label="Основной государственный регистрационный номер"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.legalAddress"
                      label="Юридический адрес заявителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.actualAddress"
                      label="Фактический адрес заявителя"
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
                    <v-text-field
                      v-model="formData.phone"
                      label="Телефон"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Электронная почта">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorName"
                      label="Ф.И.О. руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.directorPosition"
                      label="Должность руководителя"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.onBehalf"
                      label="В лице"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </section>
              
              <!-- Additional Information Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Дополнительно</h2>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.catalogCard"
                      label="Карточка предприятия для заполнения каталожного листа продукции"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    >
                      <template v-slot:append>
                        <v-tooltip location="top" text="Информация о карточке предприятия">
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="ml-2">mdi-information-outline</v-icon>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productName"
                      label="Наименование выпускаемой продукции (модельный ряд)"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.composition"
                      label="Состав: Перечень ВСЕХ материалов, веществ, которые применяются в производстве с указанием ГОСТ или ТУ. Краткое описание техпроцесса"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.productDescription"
                      label="Описание продукции"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.productionTechnology"
                      label="Технология производства"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.packaging"
                      label="Упаковка"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.shelfLife"
                      label="Срок годности"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.storageConditions"
                      label="Условия хранения"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.developmentDate"
                      label="Дата разработки ТУ, Дата начала выпуска продукции"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.approverPosition"
                      label="Должность, ФИО, кто утвердил"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.developerPosition"
                      label="Должность (технолог, инженер, и т.д.), ФИО разработчика"
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
                    <v-text-field
                      v-model="formData.nominalVoltage"
                      label="Номинальное напряжение"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.nominalPressure"
                      label="Номинальное давление"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      class="mb-3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.notes"
                      label="Примечания"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="4"
                      class="mb-3"
                    ></v-textarea>
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
                  <v-col cols="12">
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
                </v-row>
              </section>
              
              <!-- Comments Section -->
              <section class="form-section mb-4">
                <h2 class="text-h6 mb-3">Комментарии</h2>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.comments"
                      variant="outlined"
                      density="comfortable"
                      hide-details="auto"
                      auto-grow
                      rows="6"
                      class="mb-3"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </section>
            </div>

          

            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn
                  color="primary"
                  class="mr-2"
                  @click="saveApplication"
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
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useApplicationStore } from '@/stores/applicationStore'
import HeavyIndustryFormView from './forms/HeavyIndustryFormView.vue'
import LightIndustryFormView from './forms/LightIndustryFormView.vue'
import RejectionLetterFormView from './forms/RejectionLetterFormView.vue'
import OperationManualFormView from './forms/OperationManualFormView.vue'
import ProductPassportFormView from './forms/ProductPassportFormView.vue'
import SafetyJustificationFormView from './forms/SafetyJustificationFormView.vue'
import TechnicalSpecsFormView from './forms/TechnicalSpecsFormView.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const applicationStore = useApplicationStore()
const saving = ref(false)

// Determine if we're in create or edit mode
const isCreateMode = computed(() => !route.params.id)
const pageTitle = computed(() => isCreateMode.value ? 'Создание заявки' : 'Редактирование заявки')

// Application type definitions
const taskTypes = ref([
  { value: 'heavy', title: 'Тяжелая промышленность', icon: 'mdi-factory' },
  { value: 'light', title: 'Легкая промышленность', icon: 'mdi-tshirt-crew' },
  { value: 'rejection', title: 'Отказные письма', icon: 'mdi-file-document-outline' },
  { value: 'manual', title: 'Руководства по эксплуатации', icon: 'mdi-book-open-variant' },
  { value: 'passport', title: 'Паспорт продукции', icon: 'mdi-card-account-details' },
  { value: 'safety', title: 'Обоснование безопасности', icon: 'mdi-shield-check' },
  { value: 'specs', title: 'ТУ', icon: 'mdi-file-cog' }
])

const selectedType = ref(null)

// Form data with default values
const formData = ref({
  id: '',
  title: '',
  taskType: '',
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
  scheme: '',
  declarationValidity: '',
  laboratory: '',
  protocolNumber: '',
  protocolDate: '',
  manager: '',
  expert: 'Не закреплен',
  cost: '',
  status: 'Новая',
  additionalInfo: '',
  foreignManufacturer: '',
  authorizedContract: '',
  additionalFactories: '',
  heavyIndustryRegulations: [],
  lightIndustryRegulations: [],
  trts: '',
  packagingInfo: '',
  transportInfo: '',
  guaranteeTerms: '',
  companyInfo: '',
  operationRules: '',
  operationHazards: '',
  installation: '',
  schemesDrawings: '',
  technicalDocumentation: '',
  nominalVoltage: '',
  nominalPressure: '',
  normativeDocs: '',
  technicalSpecs: '',
  testingProtocol: '',
  operation: '',
  drawings: '',
  drawingsDescription: '',
  testProtocols: '',
  testProtocolsDescription: '',
  productPassport: '',
  productPassportDescription: '',
  catalogCard: '',
  composition: '',
  productDocument: '',
  standards: '',
  storageConditions: '',
  developmentDate: '',
  approverPosition: '',
  developerPosition: '',
  notes: '',
  comments: '',
  productName1: '',
  productName2: '',
  productName3: '',
  productName4: '',
  hasOwnProtocol: 'Нет',
  protocolCount: '1',
  validityPeriod: '',
  batchSize: '',
})

// Populate with fake data for heavy industry type if in create mode
if (isCreateMode.value) {
  watch(selectedType, (newType) => {
    if (newType && newType === 'heavy') {
      formData.value = {
        ...formData.value,
        title: 'Заявка на сертификацию промышленного оборудования',
        taskType: 'heavy',
        applicant: 'ООО "ПромТехСервис"',
        inn: '7712345678',
        ogrn: '1027700132195',
        legalAddress: 'г. Москва, ул. Промышленная, д. 42',
        actualAddress: 'г. Москва, ул. Заводская, д. 15, офис 301',
        phone: '+7 (495) 123-45-67',
        email: 'info@promtechservice.ru',
        productName: 'Промышленный станок модели ПС-2000',
        technicalRegulation: ['ТР ТС 010/2011', 'ТР ТС 020/2011'],
        manufacturerSameAsApplicant: 'Да',
        manufacturer: 'ООО "ПромТехСервис"',
        manufacturerLegalAddress: 'г. Москва, ул. Промышленная, д. 42',
        manufacturerActualAddress: 'г. Москва, ул. Заводская, д. 15, офис 301',
        productionType: 'Серийное производство',
        scheme: '1с',
        declarationValidity: '5 лет',
        laboratory: 'Испытательная лаборатория "ТехноТест"',
        protocolNumber: 'ИЛ-2023/456',
        protocolDate: '15.03.2025',
        manager: 'Иванов И.И.',
        expert: 'Петров П.П.',
        cost: '75000',
        status: 'Новая',
        additionalInfo: 'Требуется ускоренная сертификация',
        foreignManufacturer: '',
        authorizedContract: '',
        additionalFactories: 'Производственный цех в г. Тверь, ул. Индустриальная, д. 8',
        heavyIndustryRegulations: ['ТР ТС 010/2011', 'ТР ТС 020/2011', 'ТР ТС 032/2013'],
        packagingInfo: 'Упаковка в деревянную тару с амортизирующими материалами',
        transportInfo: 'Транспортировка крытым транспортом, защищенным от атмосферных осадков',
        guaranteeTerms: '24 месяца с даты ввода в эксплуатацию',
        companyInfo: 'ООО "ПромТехСервис" - ведущий производитель промышленного оборудования с 2005 года',
        operationRules: 'Согласно руководству по эксплуатации РЭ-ПС2000-2025',
        operationHazards: 'Возможны механические повреждения при нарушении правил эксплуатации',
        installation: 'Монтаж согласно инструкции ИМ-ПС2000-2025',
        schemesDrawings: 'Чертежи ЧТ-ПС2000-001 - ЧТ-ПС2000-015',
        technicalDocumentation: 'Техническое описание ТО-ПС2000-2025',
        nominalVoltage: '380В',
        nominalPressure: '16 бар',
        comments: 'Требуется консультация по вопросам сертификации для экспорта в страны ЕАЭС'
      }
    }
  })
}

// Computed properties
const applicantOptions = computed(() => {
  const options = []
  
  if (authStore.isAuthenticated && authStore.user) {
    const userName = authStore.user.companyName || authStore.user.fullName || authStore.user.email
    options.push(userName)
  }
  
  options.push('Создать нового')
  return options
})

const getTechnicalRegulationOptions = computed(() => {
  if (selectedType.value === 'heavy') {
    return [
      'ТР ТС 004/2011 О безопасности низковольтного оборудования',
      'ТР ТС 010/2011 О безопасности машин и оборудования',
      'ТР ТС 020/2011 Электромагнитная совместимость технических средств',
      'ТР ТС 032/2013 О безопасности оборудования, работающего под избыточным давлением',
      'ТР ЕАЭС 037/2016 Об ограничении применения опасных веществ в изделиях электротехники и радиоэлектроники'
    ]
  } else if (selectedType.value === 'light') {
    return [
      'ТР ТС 005/2011 О безопасности упаковки',
      'ТР ТС 007/2011 О безопасности продукции, предназначенной для детей и подростков',
      'ТР ТС 017/2011 О безопасности продукции легкой промышленности',
      'ТР ТС 021/2011 О безопасности пищевой продукции',
      'ТР ТС 022/2011 Пищевая продукция в части ее маркировки',
      'ТР ТС 023/2011 Технический регламент на соковую продукцию из фруктов и овощей',
      'ТР ТС 024/2011 Технический регламент на масложировую продукцию',
      'ТР ТС 033/2013 О безопасности молока и молочной продукции',
      'ТР ТС 034/2013 О безопасности мяса и мясной продукции',
      'ТР ЕАЭС 040/2016 О безопасности рыбы и рыбной продукции'
    ]
  }
  return []
})

const getLightIndustryRegulations = computed(() => {
  return [
    'ТР ТС 005/2011 О безопасности упаковки',
    'ТР ТС 007/2011 О безопасности продукции, предназначенной для детей и подростков',
    'ТР ТС 017/2011 О безопасности продукции легкой промышленности',
    'ТР ТС 021/2011 О безопасности пищевой продукции',
    'ТР ТС 022/2011 Пищевая продукция в части ее маркировки',
    'ТР ТС 023/2011 Технический регламент на соковую продукцию из фруктов и овощей',
    'ТР ТС 024/2011 Технический регламент на масложировую продукцию',
    'ТР ТС 033/2013 О безопасности молока и молочной продукции',
    'ТР ТС 034/2013 О безопасности мяса и мясной продукции',
    'ТР ЕАЭС 040/2016 О безопасности рыбы и рыбной продукции'
  ]
})

const getHeavyIndustryRegulations = computed(() => {
  return [
    'ТР ТС 004/2011 О безопасности низковольтного оборудования',
    'ТР ТС 010/2011 О безопасности машин и оборудования',
    'ТР ТС 020/2011 Электромагнитная совместимость технических средств',
    'ТР ТС 032/2013 О безопасности оборудования, работающего под избыточным давлением',
    'ТР ЕАЭС 037/2016 Об ограничении применения опасных веществ в изделиях электротехники и радиоэлектроники'
  ]
})

// Methods
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

const saveApplication = async () => {
  try {
    saving.value = true
    
    // Create a new application object
    const applicationData = { 
      ...formData.value,
      id: isCreateMode.value ? applicationStore.applications.length + 1 : Number(route.params.id),
      date: isCreateMode.value ? new Date().toLocaleDateString('ru-RU') : formData.value.date,
      time: isCreateMode.value ? new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : formData.value.time,
      status: formData.value.status || 'draft',
      selected: false
    }
    
    // Save the application to the store
    if (isCreateMode.value) {
      applicationStore.addApplication(applicationData)
    } else {
      applicationStore.updateApplication(applicationData)
    }
    
    // Navigate back to applications list
    router.push('/applications')
  } catch (error) {
    console.error('Error saving application:', error)
    alert('Произошла ошибка при сохранении заявки. Пожалуйста, попробуйте снова.')
  } finally {
    saving.value = false
  }
}

const cancel = () => {
  router.push('/applications')
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
  
  formData.value.taskType = newType
  formData.value.applicationType = taskTypes.value.find(t => t.value === newType)?.title || ''
})

// Watch for manufacturer same as applicant changes
watch(() => formData.value.manufacturerSameAsApplicant, (newVal) => {
  if (newVal === 'Да') {
    formData.value.manufacturer = formData.value.applicant
    formData.value.manufacturerLegalAddress = formData.value.legalAddress
    formData.value.manufacturerActualAddress = formData.value.actualAddress
  }
})

// Map task types to components
const formComponents = {
  heavy: HeavyIndustryFormView,
  light: LightIndustryFormView,
  rejection: RejectionLetterFormView,
  manual: OperationManualFormView,
  passport: ProductPassportFormView,
  safety: SafetyJustificationFormView,
  specs: TechnicalSpecsFormView
}

const currentFormComponent = computed(() => {
  return formComponents[selectedType.value] || HeavyIndustryFormView
})

// Initialize component
onMounted(async () => {
  // Fill form with user profile data
  fillFromUserProfile()
  
  // If editing an existing application, load its data
  if (!isCreateMode.value) {
    try {
      const applicationData = await applicationStore.getApplication(route.params.id)
      if (applicationData) {
        console.log('Loading application data:', applicationData)
        // Set the selected type first so the correct form component loads
        selectedType.value = applicationData.type
        
        // Then update all form fields with a slight delay to ensure form is mounted
        setTimeout(() => {
          formData.value = { 
            ...formData.value, 
            ...applicationData,
            // Preserve arrays and objects
            regulations: applicationData.regulations ? [...applicationData.regulations] : []
          }
        }, 100)
      } else {
        console.error('Application not found')
        router.push('/applications')
      }
    } catch (error) {
      console.error('Error loading application:', error)
      router.push('/applications')
    }
  }
})

const getSchemeOptions = (formData) => {
  if (formData.declarationType === 'Декларирование') {
    if (formData.validityPeriod === 'Партия') {
      // For batch, only 2д and 4д
      return ['2д', '4д']
    } else {
      // For series, only 1д and 3д
      let options = ['1д', '3д']
      // Add 5д only for heavy industry and TR TS 010 or 032
      if (
        formData.taskType === 'heavy' &&
        (formData.technicalRegulation === 'ТР ТС 010/2011' || formData.technicalRegulation === 'ТР ТС 032/2013')
      ) {
        options.push('5д')
      }
      return options
    }
  }
  return []
}

const schemeHint = computed(() => {
  if (
    formData.declarationType === 'Декларирование' &&
    formData.scheme === '5д' &&
    formData.taskType === 'heavy' &&
    (formData.technicalRegulation === 'ТР ТС 010/2011' || formData.technicalRegulation === 'ТР ТС 032/2013')
  ) {
    return 'Доступно только если изделие эксплуатируется в условиях опасного производственного объекта'
  }
  return ''
})
</script>

<style scoped>
.application-tabs {
  border-bottom: 1px solid #e0e0e0;
}

.application-title :deep(.v-field__input) {
  background-color: rgb(255, 255, 200) !important;
}
</style>
