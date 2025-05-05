import { defineStore } from 'pinia'

// Initial mock users data
const initialUsers = [
  // Клиент группы 1 (Прямой клиент)
  {
    email: 'client1@client.cc',
    password: 'client1@client.cc',
    name: 'ООО "Прямой Клиент"',
    role: 'client_group_1',
    companyName: 'ООО "Прямой Клиент"',
    phone: '+7 (495) 111-11-11',
    inn: '7701111111',
    ogrn: '1111111111111',
    physicalAddress: 'г.Москва, Прямая ул., д.1',
    legalAddress: 'г.Москва, Прямая ул., д.1',
    position: 'Директор',
    assignedCompanies: [],
  },
  // Клиент группы 2 (Посредник)
  {
    email: 'client2@client.cc',
    password: 'client2@client.cc',
    name: 'ООО "Посредник"',
    role: 'client_group_2',
    companyName: 'ООО "Посредник"',
    phone: '+7 (495) 222-22-22',
    inn: '7702222222',
    ogrn: '2222222222222',
    physicalAddress: 'г.Москва, Посредническая ул., д.2',
    legalAddress: 'г.Москва, Посредническая ул., д.2',
    position: 'Директор',
    assignedCompanies: [
      {
        name: 'ООО "Клиент 1"',
        inn: '7703333333',
        ogrn: '3333333333333',
      },
      {
        name: 'ООО "Клиент 2"',
        inn: '7704444444',
        ogrn: '4444444444444',
      }
    ],
  },
  // Менеджер
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
    assignedClients: [],
  },
  // Эксперт
  {
    email: 'expert@expert.cc',
    password: 'expert@expert.cc',
    name: 'Петр Николаевич',
    role: 'expert',
    phone: '+7 (495) 234-56-78',
    position: 'Эксперт',
    specialization: 'Легкая промышленность',
  },
  // Администратор
  {
    email: 'admin@admin.cc',
    password: 'admin@admin.cc',
    name: 'Администратор',
    role: 'admin',
    position: 'Администратор системы',
  }
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    role: 'guest',
    isAuthenticated: false,
    userApplications: [],
    assignedClients: [],
    users: [...initialUsers], // <-- users now in Pinia state
  }),

  actions: {
    login(email, password) {
      console.log('DEBUG users:', this.users)
      console.log('DEBUG login attempt:', email, password)
      const user = this.users.find(u => u.email === email && u.password === password)
      if (user) {
        this.user = { ...user }
        
        // Map client group roles to the base 'client' role for permissions
        if (user.role.startsWith('client_group_')) {
          this.role = 'client'
        } else {
          this.role = user.role
        }
        
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
