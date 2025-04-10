<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-4">
          <v-card-title class="text-h5 text-center pa-4">
            Вход в систему
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
             
                required
                prepend-icon="mdi-email"
                variant="outlined"
                density="comfortable"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Пароль"
                :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules"
                required
                prepend-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                density="comfortable"
                class="mb-6"
              ></v-text-field>

              <v-btn
                block
                color="primary"
                size="large"
                type="submit"
                :loading="loading"
                :disabled="!valid || loading"
              >
                Войти
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center pb-4">
            <v-btn
              variant="text"
              color="primary"
              :to="{ name: 'register' }"
              :disabled="loading"
            >
              Зарегистрироваться
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Error Alert -->
    <v-snackbar
      v-model="showError"
      color="error"
      timeout="3000"
      location="top"
    >
      {{ errorMessage }}
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="showError = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref(null)
const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// Pre-fill admin credentials
const email = ref('admin')
const password = ref('admin')

const emailRules = [
  v => !!v || 'Email обязателен',
  v => /.+@.+\..+/.test(v) || 'Email должен быть валидным',
]

const passwordRules = [
  v => !!v || 'Пароль обязателен',
  v => v.length >= 4 || 'Пароль должен быть не менее 4 символов',
]

const handleSubmit = async () => {
  if (!valid.value) return

  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push({ name: 'home' })
  } catch (error) {
    errorMessage.value = error.message || 'Ошибка при входе'
    showError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Reset any previous auth errors
  authStore.$reset()
})
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}

.v-card-title {
  background-color: #f5f5f5;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>
