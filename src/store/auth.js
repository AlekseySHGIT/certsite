// Authentication and user role management store
import { defineStore } from 'pinia'

// Role constants
export const USER_ROLES = {
  GUEST: 'guest',
  CLIENT: 'client',
  MANAGER: 'manager',
  ADMIN: 'admin'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    role: USER_ROLES.GUEST,
    loading: false,
    error: null
  }),
  
  getters: {
    isClient: (state) => state.role === USER_ROLES.CLIENT,
    isManager: (state) => state.role === USER_ROLES.MANAGER,
    isAdmin: (state) => state.role === USER_ROLES.ADMIN,
    
    // Check if user has specific permissions
    canViewClientInfo: (state) => [USER_ROLES.MANAGER, USER_ROLES.ADMIN].includes(state.role),
    canEditApplications: (state) => [USER_ROLES.CLIENT, USER_ROLES.MANAGER, USER_ROLES.ADMIN].includes(state.role),
    canApproveApplications: (state) => [USER_ROLES.MANAGER, USER_ROLES.ADMIN].includes(state.role),
    canManageUsers: (state) => state.role === USER_ROLES.ADMIN,
    
    // Get user display name
    userDisplayName: (state) => {
      if (!state.user) return ''
      return state.user.fullName || state.user.companyName || state.user.email || 'Пользователь'
    },
    
    // Get user profile completeness percentage
    profileCompleteness: (state) => {
      if (!state.user) return 0
      
      const requiredFields = [
        'email', 'phone', 'inn', 'ogrn', 'legalAddress', 
        'physicalAddress', 'bankDetails'
      ]
      
      let completedFields = 0
      requiredFields.forEach(field => {
        if (state.user[field]) completedFields++
      })
      
      return Math.round((completedFields / requiredFields.length) * 100)
    }
  },
  
  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      
      try {
        // Check if credentials match
        if (password !== email) {
          throw new Error('Неверные учетные данные')
        }

        return await new Promise((resolve) => {
          setTimeout(() => {
            // Log the received login value
            console.log('Login attempt with email:', email);

            // Determine user role based on email prefix
            const role = email.includes('admin') ? USER_ROLES.ADMIN :
                        email.includes('manager') ? USER_ROLES.MANAGER :
                        USER_ROLES.CLIENT
            
            // Log the determined role
            console.log('Determined role:', role);

            // Generate user name based on role
            let fullName = 'Пользователь'
            let companyName = null
            
            if (role === USER_ROLES.ADMIN) {
              fullName = 'Администратор Системы'
            } else if (role === USER_ROLES.MANAGER) {
              fullName = 'Петров Василий Иванович'
            } else {
              companyName = 'ООО "Ромашка"'
              fullName = 'Романовский-Ивановский Иван Сергеевич'
            }
            
            // Mock user data
            const userData = {
              id: Math.floor(Math.random() * 1000) + 1,
              email: email,
              fullName,
              companyName,
              role,
              phone: '+7 (111) 222-33-44',
              inn: '7777777777777778',
              ogrn: '1234567890123',
              ogrnType: 'ОГРН',
              bankDetails: 'ПАО Сбербанк, БИК 044525225, р/с 40702810038000000000',
              legalAddress: 'г. Москва, Романовско - Удельный проезд, д.34 к.7',
              physicalAddress: 'г. Москва, Романовско - Удельный проезд, д.10 офис 324',
              contractNumber: 'ДЕ 756 от 10 ноября 2019 года',
              contractDate: '10.11.2019',
              edsNumber: 'ЭЦП-123456',
              edsDate: '01.01.2024',
              advancePayment: 10000,
              directorName: 'Романовский-Ивановский Иван Сергеевич',
              directorPosition: 'Директор ООО Ромашка',
              registrationDate: '04.04.2021',
              lastLoginDate: new Date().toLocaleDateString('ru-RU')
            }
            
            this.user = userData
            this.isAuthenticated = true
            this.role = userData.role
            
            // Save to localStorage for persistence
            localStorage.setItem('user', JSON.stringify(userData))
            
            resolve(userData)
          }, 500)
        })
      } catch (error) {
        this.error = 'Ошибка при входе в систему'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.role = USER_ROLES.GUEST
      localStorage.removeItem('user')
    },
    
    checkAuth() {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          this.user = user
          this.isAuthenticated = true
          this.role = user.role
          
          // Update last login date
          this.user.lastLoginDate = new Date().toLocaleDateString('ru-RU')
          localStorage.setItem('user', JSON.stringify(this.user))
          
          return true
        } catch (error) {
          console.error('Failed to parse user data from localStorage', error)
          this.logout()
          return false
        }
      }
      return false
    },
    
    async updateUserProfile(profileData) {
      this.loading = true
      this.error = null
      
      try {
        // In a real app, this would make an API call
        return await new Promise((resolve) => {
          setTimeout(() => {
            this.user = { ...this.user, ...profileData }
            localStorage.setItem('user', JSON.stringify(this.user))
            resolve(this.user)
          }, 300)
        })
      } catch (error) {
        this.error = 'Ошибка при обновлении профиля'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
