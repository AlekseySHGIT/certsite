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
    position: 'Генеральный директор',
    assignedClients: [] // Clients assigned to this manager
  },
  {
    email: 'expert@expert.cc',
    password: 'expert@expert.cc',
    name: 'Петр Николаевич',
    role: 'expert',
    phone: '+7 (495) 234-56-78',
    position: 'Эксперт',
    specialization: 'Легкая промышленность'
  },
  {
    email: 'admin@admin.cc',
    password: 'admin@admin.cc',
    name: 'Администратор',
    role: 'admin',
    position: 'Администратор системы'
  }
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    role: 'guest',
    isAuthenticated: false,
    userApplications: [],
    assignedClients: [] // For managers
  }),

  actions: {
    login(email, password) {
      const user = mockUsers.find(u => u.email === email && u.password === password)
      if (user) {
        this.user = { ...user }
        this.role = user.role
        this.isAuthenticated = true
        this.assignedClients = user.assignedClients || []
        return true
      }
      throw new Error('Неверный email или пароль')
    },

    logout() {
      this.user = null
      this.role = 'guest'
      this.isAuthenticated = false
      this.userApplications = []
      this.assignedClients = []
    },

    addApplication(application) {
      this.userApplications.unshift(application)
    },

    updateApplication(id, updatedApplication) {
      const index = this.userApplications.findIndex(app => app.id === id)
      if (index !== -1) {
        this.userApplications[index] = { ...this.userApplications[index], ...updatedApplication }
      }
    },

    assignClientToManager(clientId) {
      if (this.role === 'manager' && !this.assignedClients.includes(clientId)) {
        this.assignedClients.push(clientId)
      }
    },

    removeClientFromManager(clientId) {
      if (this.role === 'manager') {
        this.assignedClients = this.assignedClients.filter(id => id !== clientId)
      }
    }
  },

  getters: {
    getUserName: (state) => state.user?.name || 'Гость',
    getUserRole: (state) => state.role,
    getRecentApplications: (state) => state.userApplications.slice(0, 5),
    isAdmin: (state) => state.role === 'admin',
    isManager: (state) => state.role === 'manager',
    isExpert: (state) => state.role === 'expert',
    canAssignApplications: (state) => ['admin'].includes(state.role),
    canViewClientInfo: (state) => ['admin', 'manager'].includes(state.role),
    canSelfAssignApplications: (state) => ['expert'].includes(state.role),
    getAssignedClients: (state) => state.assignedClients
  }
})
