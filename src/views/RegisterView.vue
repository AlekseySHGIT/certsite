<template>
  <v-container fluid class="fill-height bg-grey-lighten-4">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="pa-4" variant="outlined" elevation="0">
          <v-card-title class="text-h5 text-center mb-4">Регистрация</v-card-title>
          
          <v-form @submit.prevent="register" ref="form">
            <v-card-text>
              <v-alert
                v-if="error"
                type="error"
                variant="tonal"
                class="mb-4"
                density="compact"
              >
                {{ error }}
              </v-alert>
              
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.name"
                    label="Ф.И.О. / Название компании"
                    required
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Это поле обязательно']"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.email"
                    label="Email"
                    type="email"
                    required
                    variant="outlined"
                    density="comfortable"
                    :rules="[
                      v => !!v || 'Email обязателен', 
                      v => /.+@.+\..+/.test(v) || 'Email должен быть валидным'
                    ]"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.phone"
                    label="Контактный телефон"
                    required
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Телефон обязателен']"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.inn"
                    label="ИНН"
                    required
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'ИНН обязателен']"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.ogrn"
                    label="ОГРН"
                    required
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'ОГРН обязателен']"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.bankDetails"
                    label="Банковские реквизиты"
                    required
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Банковские реквизиты обязательны']"
                    rows="2"
                    auto-grow
                  ></v-textarea>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.legalAddress"
                    label="Юридический адрес"
                    required
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Юридический адрес обязателен']"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.physicalAddress"
                    label="Фактический адрес"
                    required
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Фактический адрес обязателен']"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.contractNumber"
                    label="Номер договора"
                    variant="outlined"
                    density="comfortable"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.contractDate"
                    label="Дата договора"
                    variant="outlined"
                    density="comfortable"
                    type="date"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.edsNumber"
                    label="Номер ЭЦП"
                    variant="outlined"
                    density="comfortable"
                    hint="Необязательное поле"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.edsDate"
                    label="Дата ЭЦП"
                    variant="outlined"
                    density="comfortable"
                    type="date"
                    hint="Необязательное поле"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.password"
                    label="Пароль"
                    type="password"
                    required
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Пароль обязателен', v => v.length >= 6 || 'Пароль должен содержать не менее 6 символов']"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.passwordConfirm"
                    label="Подтверждение пароля"
                    type="password"
                    required
                    variant="outlined"
                    density="comfortable"
                    :rules="[
                      v => !!v || 'Подтверждение пароля обязательно',
                      v => v === formData.password || 'Пароли не совпадают'
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row>
              
              <v-checkbox
                v-model="formData.agreeTerms"
                label="Я согласен с условиями использования и политикой конфиденциальности"
                required
                :rules="[v => !!v || 'Вы должны согласиться с условиями']"
              ></v-checkbox>
            </v-card-text>
            
            <v-card-actions class="px-4 pb-4">
              <v-btn
                type="submit"
                color="primary"
                variant="elevated"
                block
                :loading="loading"
                :disabled="loading"
              >
                Зарегистрироваться
              </v-btn>
            </v-card-actions>
          </v-form>
          
          <v-divider class="mb-4"></v-divider>
          
          <div class="text-center">
            <span class="text-body-2">Уже есть аккаунт?</span>
            <router-link to="/login" class="text-decoration-none text-primary ml-2">
              Войти
            </router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref(null)
const loading = ref(false)
const error = ref('')

const formData = ref({
  name: '',
  email: '',
  phone: '',
  inn: '',
  ogrn: '',
  bankDetails: '',
  legalAddress: '',
  physicalAddress: '',
  contractNumber: '',
  contractDate: '',
  edsNumber: '',
  edsDate: '',
  password: '',
  passwordConfirm: '',
  agreeTerms: false
})

const register = async () => {
  const { valid } = await form.value.validate()
  
  if (!valid) return
  
  loading.value = true
  error.value = ''
  
  try {
    // In a real app, this would make an API call to register
    // For demo purposes, we'll simulate a successful registration and login
    await authStore.login({
      email: formData.value.email,
      password: formData.value.password
    })
    
    // Update the user profile with the registration data
    await authStore.updateUserProfile({
      name: formData.value.name,
      phone: formData.value.phone,
      inn: formData.value.inn,
      ogrn: formData.value.ogrn,
      bankDetails: formData.value.bankDetails,
      legalAddress: formData.value.legalAddress,
      physicalAddress: formData.value.physicalAddress,
      contractNumber: formData.value.contractNumber,
      contractDate: formData.value.contractDate,
      edsNumber: formData.value.edsNumber,
      edsDate: formData.value.edsDate
    })
    
    router.push('/profile')
  } catch (err) {
    error.value = 'Ошибка при регистрации. Пожалуйста, попробуйте еще раз.'
  } finally {
    loading.value = false
  }
}
</script>
