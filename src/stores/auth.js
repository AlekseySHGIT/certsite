import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    role: 'guest',
    token: null,
    isAuthenticated: false
  }),

  getters: {
    canApproveApplications: (state) => ['admin', 'manager'].includes(state.role),
    canEditApplications: (state) => ['admin', 'manager', 'client'].includes(state.role),
    canViewApplications: (state) => ['admin', 'manager', 'client'].includes(state.role)
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
        this.setToken('mock_token_456')
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
        this.setToken('mock_token_789')
        return true
      }

      return false
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
        return true
      }

      if (token === 'mock_token_456') {
        this.setUser({
          id: 2,
          name: 'Client User',
          email: 'client@client.cc',
          role: 'client'
        })
        return true
      }

      if (token === 'mock_token_789') {
        this.setUser({
          id: 3,
          name: 'Admin User',
          email: 'admin@admin.cc',
          role: 'admin'
        })
        return true
      }

      this.logout()
      return false
    }
  }
})
