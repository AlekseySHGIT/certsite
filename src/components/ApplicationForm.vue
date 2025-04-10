<template>
  <v-form ref="form" @submit.prevent="saveApplication">
    <!-- Тип заявки -->
    <v-card class="mb-4" variant="outlined" elevation="0">
      <v-card-text>
        <div class="text-subtitle-1 font-weight-medium mb-3">Тип заявки</div>
        <v-select
          v-model="application.type"
          label="Тип"
          :items="['Декларирование']"
          variant="outlined"
          density="comfortable"
          hide-details
          class="mb-3"
        ></v-select>
      </v-card-text>
    </v-card>

    <!-- Заявитель -->
    <v-card class="mb-4" variant="outlined" elevation="0">
      <v-card-text>
        <div class="text-subtitle-1 font-weight-medium mb-3">Заявитель</div>
        
        <v-select
          v-model="application.applicant"
          label="Заявитель"
          :items="['ООО Ромашка ИНН 77777777777778 Тел:+71112223544 Email:client@client.cc']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        >
          <template v-slot:prepend-inner>
            <v-icon color="primary" class="mr-2">mdi-information</v-icon>
          </template>
        </v-select>

        <v-select
          v-model="application.applicantType"
          label="Заявитель - 3е лицо"
          :items="['Нет']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <v-text-field
          v-model="application.inn"
          label="ИНН"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
          disabled
        ></v-text-field>

        <v-select
          v-model="application.regType"
          label="Тип регистрационного номера"
          :items="['ОГРН']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <v-text-field
          v-model="application.regNumber"
          label="Основной государственный регистрационный номер"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="application.legalAddress"
          label="Юридический адрес заявителя"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="application.actualAddress"
          label="Фактический адрес заявителя"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="application.phone"
          label="Телефон"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="application.email"
          label="Email"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        >
          <template v-slot:prepend-inner>
            <v-icon color="primary" class="mr-2">mdi-information</v-icon>
          </template>
        </v-text-field>

        <v-text-field
          v-model="application.directorName"
          label="Ф.И.О. руководителя"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="application.directorPosition"
          label="Должность руководителя"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="application.representative"
          label="В лице"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>
      </v-card-text>
    </v-card>

    <!-- Продукция -->
    <v-card class="mb-4" variant="outlined" elevation="0">
      <v-card-text>
        <div class="text-subtitle-1 font-weight-medium mb-3">Продукция</div>
        
        <v-select
          v-model="application.regulations"
          label="Регламент (ТР)"
          :items="[
            'ТР ТС 005 2011 О безопасности упаковки',
            'ТР ТС 009 2011 О безопасности парфюмерно-косметической продукции',
            'ТР ТС 007 2011 О безопасности продукции, предназначенной для детей и подростков',
            'ТР ТС 017/2011 О безопасности продукции легкой промышленности',
            'ТР ТС 025/2012 О безопасности мебельной продукции',
            'ПИЩА'
          ]"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        >
          <template v-slot:prepend-inner>
            <v-icon color="primary" class="mr-2">mdi-information</v-icon>
          </template>
        </v-select>

        <v-text-field
          v-model="application.product"
          label="Продукция"
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
          v-model="application.storageConditions"
          label="Условия хранения и срок годности"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
          rows="3"
        ></v-textarea>

        <v-text-field
          v-model="application.productionDoc"
          label="Документ, по которому выпускается продукция"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="application.standards"
          label="Стандарты, обеспечивающие соблюдение требований ТР ТС"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-textarea
          v-model="application.additionalInfo"
          label="Дополнительная информация"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
          rows="3"
        ></v-textarea>
      </v-card-text>
    </v-card>

    <!-- Изготовитель -->
    <v-card class="mb-4" variant="outlined" elevation="0">
      <v-card-text>
        <div class="text-subtitle-1 font-weight-medium mb-3">Изготовитель</div>
        
        <v-select
          v-model="application.manufacturerSame"
          label="Изготовитель совпадает с заявителем?"
          :items="['Нет']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <v-select
          v-model="application.manufacturerForeign"
          label="Изготовитель иностранное лицо"
          :items="['Нет']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <v-text-field
          v-model="application.manufacturer"
          label="Изготовитель"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="application.manufacturerContract"
          label="Договор уполномоченного лица (Изготавливается на основании данного договора)"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="application.manufacturerLegalAddress"
          label="Юридический адрес изготовителя"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-text-field
          v-model="application.manufacturerActualAddress"
          label="Фактический адрес изготовителя"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-text-field>

        <v-textarea
          v-model="application.manufacturerSites"
          label="Адреса дополнительных производственных площадок"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
          rows="3"
        ></v-textarea>
      </v-card-text>
    </v-card>

    <!-- Общие сведения -->
    <v-card class="mb-4" variant="outlined" elevation="0">
      <v-card-text>
        <div class="text-subtitle-1 font-weight-medium mb-3">Общие сведения</div>
        
        <v-select
          v-model="application.release"
          label="Выпуск"
          :items="['Серийный выпуск']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <v-select
          v-model="application.scheme"
          label="Схема"
          :items="['1Д - серийный выпуск + срок действия']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <v-select
          v-model="application.validity"
          label="Срок действия декларации"
          :items="['5 год']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>
      </v-card-text>
    </v-card>

    <!-- Испытания -->
    <v-card class="mb-4" variant="outlined" elevation="0">
      <v-card-text>
        <div class="text-subtitle-1 font-weight-medium mb-3">Испытания</div>
        
        <v-select
          v-model="application.laboratory"
          label="Лаборатория"
          :items="['НОКУ ДПО «РТА»']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <v-select
          v-model="application.hasProtocol"
          label="У вас свой протокол"
          :items="['Нет']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <v-select
          v-model="application.protocolCount"
          label="Количество протоколов"
          :items="['0']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>
      </v-card-text>
    </v-card>

    <!-- Дополнительно -->
    <v-card class="mb-4" variant="outlined" elevation="0">
      <v-card-text>
        <div class="text-subtitle-1 font-weight-medium mb-3">Дополнительно</div>
        
        <v-select
          v-model="application.manager"
          label="Менеджер"
          :items="['Петров Василий Иванович Tel:Email: manager@manager.cc']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <v-select
          v-model="application.expert"
          label="Эксперт"
          :items="['Не закреплен']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <v-text-field
          v-model="application.cost"
          label="Стоимость"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
          type="number"
        ></v-text-field>

        <v-select
          v-model="application.status"
          label="Статус"
          :items="['Заявка подана']"
          variant="outlined"
          density="comfortable"
          class="mb-3"
          hide-details
        ></v-select>

        <div class="mb-3">
          <label class="text-subtitle-2 mb-2 d-block">Документы</label>
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

        <v-textarea
          v-model="application.comments"
          label="Комментарии"
          variant="outlined"
          density="comfortable"
          hide-details
          rows="3"
        ></v-textarea>
      </v-card-text>
    </v-card>

    <!-- Action Buttons -->
    <div class="d-flex gap-2">
      <v-btn
        type="submit"
        color="primary"
        variant="outlined"
      >
        СОХРАНИТЬ
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref(null)

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const application = ref({
  type: 'Декларирование',
  applicant: 'ООО Ромашка ИНН 77777777777778 Тел:+71112223544 Email:client@client.cc',
  applicantType: 'Нет',
  inn: '77777777777778',
  regType: 'ОГРН',
  regNumber: '1234567890123',
  legalAddress: 'г.Москва, Романовско - Удельный проезд, д.34 к.7',
  actualAddress: 'г.Москва, Романовско - Удельный проезд, д.10 офис 324',
  phone: '+71112223544',
  email: 'client@client.cc',
  directorName: 'Романовский - Ивановский Иван Сергеевич',
  directorPosition: 'Директор ООО Ромашка',
  representative: 'генерального директора Романовски - Ивановского Ивана Сергеевича',
  ...props.initialData
})

const emit = defineEmits(['save', 'cancel'])

const saveApplication = async () => {
  emit('save', application.value)
}

const cancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.v-card-text {
  padding: 20px;
}
</style>
