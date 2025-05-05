import { defineStore } from 'pinia'
import { ability } from '../casl-setup';
import { defineAbilitiesFor } from '../services/ability';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    role: 'guest',
    token: null,
    isAuthenticated: false
  }),

  getters: {
    canApproveApplications: (state) => ['admin', 'manager', 'expert'].includes(state.role),
    canEditApplications: (state) => ['admin', 'manager', 'client', 'expert'].includes(state.role),
    canViewApplications: (state) => ['admin', 'manager', 'client', 'expert'].includes(state.role),
    canSelfAssignApplications: (state) => ['expert'].includes(state.role),
    canAssignApplications: (state) => ['admin'].includes(state.role),
    isAdmin: (state) => state.role === 'admin',
    isManager: (state) => state.role === 'manager',
    isExpert: (state) => state.role === 'expert'
  },

  actions: {
    setUser(user) {
      this.user = user
      this.role = user?.role || 'guest'
      this.isAuthenticated = !!user
    },

    setToken(token) {
      this.token = token
      localStorage.setItem('auth_token', token)
    },

    logout() {
      this.user = null
      this.role = 'guest'
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('auth_token')
    },

    async login(email, password) {
      // Mock login for development
      if (email === 'manager@manager.cc' && password === 'manager@manager.cc') {
        const user = {
          id: 1,
          name: 'Manager User',
          email: 'manager@manager.cc',
          role: 'manager'
        }
        this.setUser(user)
        ability.update(defineAbilitiesFor(user.role).rules);
        this.setToken('mock_token_123')
        return true
      }
      
      if (email === 'client@client.cc' && password === 'client@client.cc') {
        const user = {
          id: 2,
          name: 'Client User',
          email: 'client@client.cc',
          role: 'client'
        }
        this.setUser(user)
        ability.update(defineAbilitiesFor(user.role).rules);
        this.setToken('mock_token_456')
        return true
      }

      if (email === 'client1@client.cc' && password === 'client1@client.cc') {
        const user = {
          id: 6,
          name: 'ООО "Прямой Клиент"',
          email: 'client1@client.cc',
          role: 'client',
          companyName: 'ООО "Прямой Клиент"',
          phone: '+7 (495) 111-11-11',
          inn: '7701111111',
          ogrn: '1111111111111',
          physicalAddress: 'г.Москва, Прямая ул., д.1',
          legalAddress: 'г.Москва, Прямая ул., д.1',
          position: 'Директор'
        }
        this.setUser(user)
        ability.update(defineAbilitiesFor(user.role).rules);
        this.setToken('mock_token_client1')
        return true
      }

      if (email === 'client2@client.cc' && password === 'client2@client.cc') {
        const user = {
          id: 7,
          name: 'ООО "Посредник"',
          email: 'client2@client.cc',
          role: 'client',
          companyName: 'ООО "Посредник"',
          phone: '+7 (495) 222-22-22',
          inn: '7702222222',
          ogrn: '2222222222222',
          physicalAddress: 'г.Москва, Посредническая ул., д.2',
          legalAddress: 'г.Москва, Посредническая ул., д.2',
          position: 'Директор'
        }
        this.setUser(user)
        ability.update(defineAbilitiesFor(user.role).rules);
        this.setToken('mock_token_client2')
        return true
      }

      if (email === 'admin@admin.cc' && password === 'admin@admin.cc') {
        const user = {
          id: 3,
          name: 'Admin User',
          email: 'admin@admin.cc',
          role: 'admin'
        }
        this.setUser(user)
        ability.update(defineAbilitiesFor(user.role).rules);
        this.setToken('mock_token_789')
        return true
      }

      if (email === 'expert@expert.cc' && password === 'expert@expert.cc') {
        const user = {
          id: 4,
          name: 'Петр Николаевич',
          email: 'expert@expert.cc',
          role: 'expert',
          specialization: 'Легкая промышленность'
        }
        this.setUser(user)
        ability.update(defineAbilitiesFor(user.role).rules);
        this.setToken('mock_token_101')
        return true
      }

      if (email === 'expert2@expert.cc' && password === 'expert2@expert.cc') {
        const user = {
          id: 5,
          name: 'Иван Сергеевич',
          email: 'expert2@expert.cc',
          role: 'expert',
          specialization: 'Тяжелая промышленность'
        }
        this.setUser(user)
        ability.update(defineAbilitiesFor(user.role).rules);
        this.setToken('mock_token_102')
        return true
      }

      throw new Error('Неверный email или пароль')
    },

    async checkAuth() {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        this.logout()
        return false
      }

      // Mock token validation
      if (token === 'mock_token_123') {
        this.setUser({
          id: 1,
          name: 'Manager User',
          email: 'manager@manager.cc',
          role: 'manager'
        })
        ability.update(defineAbilitiesFor('manager').rules);
        return true
      }

      if (token === 'mock_token_456') {
        this.setUser({
          id: 2,
          name: 'Client User',
          email: 'client@client.cc',
          role: 'client'
        })
        ability.update(defineAbilitiesFor('client').rules);
        return true
      }

      if (token === 'mock_token_client1') {
        this.setUser({
          id: 6,
          name: 'ООО "Прямой Клиент"',
          email: 'client1@client.cc',
          role: 'client',
          companyName: 'ООО "Прямой Клиент"',
          phone: '+7 (495) 111-11-11',
          inn: '7701111111',
          ogrn: '1111111111111',
          physicalAddress: 'г.Москва, Прямая ул., д.1',
          legalAddress: 'г.Москва, Прямая ул., д.1',
          position: 'Директор'
        })
        ability.update(defineAbilitiesFor('client').rules);
        return true
      }

      if (token === 'mock_token_client2') {
        this.setUser({
          id: 7,
          name: 'ООО "Посредник"',
          email: 'client2@client.cc',
          role: 'client',
          companyName: 'ООО "Посредник"',
          phone: '+7 (495) 222-22-22',
          inn: '7702222222',
          ogrn: '2222222222222',
          physicalAddress: 'г.Москва, Посредническая ул., д.2',
          legalAddress: 'г.Москва, Посредническая ул., д.2',
          position: 'Директор'
        })
        ability.update(defineAbilitiesFor('client').rules);
        return true
      }

      if (token === 'mock_token_789') {
        this.setUser({
          id: 3,
          name: 'Admin User',
          email: 'admin@admin.cc',
          role: 'admin'
        })
        ability.update(defineAbilitiesFor('admin').rules);
        return true
      }

      if (token === 'mock_token_101') {
        this.setUser({
          id: 4,
          name: 'Петр Николаевич',
          email: 'expert@expert.cc',
          role: 'expert',
          specialization: 'Легкая промышленность'
        })
        ability.update(defineAbilitiesFor('expert').rules);
        return true
      }

      if (token === 'mock_token_102') {
        this.setUser({
          id: 5,
          name: 'Иван Сергеевич',
          email: 'expert2@expert.cc',
          role: 'expert',
          specialization: 'Тяжелая промышленность'
        })
        ability.update(defineAbilitiesFor('expert').rules);
        return true
      }

      this.logout()
      return false
    }
  }
})
