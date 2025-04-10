import { defineStore } from 'pinia'

// Mock users data
const mockUsers = [
  {
    email: 'manager@manager.cc',
    password: 'manager@manager.cc',
    name: 'Иван Сергеевич',
    role: 'manager',
    companyName: 'ООО "ПромБезопасность"',
    phone: '+7 (495) 123-45-67',
    inn: '7701234567',
    ogrn: '1234567890123',
    physicalAddress: 'г.Москва, Романшково - Уделеный проезд, д.10 офис 324',
    legalAddress: 'г.Москва, Романшково - Уделеный проезд, д.10 офис 324',
    position: 'Генеральный директор'
  }
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    role: 'guest',
    isAuthenticated: false,
    userApplications: []
  }),

  actions: {
    login(credentials) {
      const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password)
      if (user) {
        this.user = { ...user }
        this.role = user.role
        this.isAuthenticated = true
        return true
      }
      return false
    },

    logout() {
      this.user = null
      this.role = 'guest'
      this.isAuthenticated = false
      this.userApplications = []
    },

    addApplication(application) {
      this.userApplications.unshift(application)
    },

    updateApplication(id, updatedApplication) {
      const index = this.userApplications.findIndex(app => app.id === id)
      if (index !== -1) {
        this.userApplications[index] = { ...this.userApplications[index], ...updatedApplication }
      }
    }
  },

  getters: {
    getUserName: (state) => state.user?.name || 'Гость',
    getUserRole: (state) => state.role,
    getRecentApplications: (state) => state.userApplications.slice(0, 5)
  }
})
