import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { api } from '@/services/api'

export const useApplicationStore = defineStore('application', {
  state: () => ({
    applications: [
      {
        id: 1,
        title: 'Подтверждение соответствия продукции согласно дог',
        docNumber: '470',
        docDate: '04 апреля 2021',
        appNumber: '569',
        date: '26.07.2024',
        time: '16:22',
        status: 'completed',
        statusDetails: '1',
        cost: '5100.00',
        manager: 'Петров И.С.',
        expert: 'Петр Николаевич',
        expertId: 4,
        clientId: 'client1',
        type: 'light',
        selected: false,
        declarationType: 'Декларирование',
        applicant: 'ООО Тестовая Компания',
        thirdParty: 'Нет',
        inn: '7712345678',
        regType: 'ОГРН',
        regNumber: '1234567890123',
        legalAddress: 'г. Москва, ул. Тестовая, д. 1',
        actualAddress: 'г. Москва, ул. Тестовая, д. 1',
        phone: '+7 (495) 123-45-67',
        email: 'test@company.ru',
        directorName: 'Иванов Иван Иванович',
        directorPosition: 'Генеральный директор',
        onBehalf: 'Генерального директора',
        productName: 'Одежда текстильная: футболки, майки',
        tnVedCode: '6109100000',
        storageConditions: 'Хранить в сухом помещении при температуре от +5 до +25°C',
        productDocument: 'ГОСТ 31408-2009',
        standards: 'ГОСТ 31408-2009, ГОСТ Р ИСО 3758-2007',
        manufacturerSameAsApplicant: 'Да',
        foreignManufacturer: 'Нет',
        manufacturerName: 'ООО Тестовая Компания',
        manufacturerLegalAddress: 'г. Москва, ул. Тестовая, д. 1',
        manufacturerActualAddress: 'г. Москва, ул. Тестовая, д. 1',
        additionalFactories: '',
        productionType: 'Серийный выпуск',
        scheme: '1Д - серийный выпуск + срок действия',
        validityPeriod: '3 года',
        laboratory: 'ГК ОС «Промбезопасность»',
        ownProtocol: 'Нет',
        protocolCount: '1',
        comments: '',
        regulations: [
          { name: 'ТР ТС 005 2011 "О безопасности упаковки"', selected: false },
          { name: 'ТР ТС 009 2011 "О безопасности парфюмерно-косметической продукции"', selected: false },
          { name: 'ТР ТС 007 2011 "О безопасности продукции, предназначенной для детей и подростков"', selected: false },
          { name: 'ТР ТС 017/2011 "О безопасности продукции легкой промышленности"', selected: true },
          { name: 'ТР ТС 025/2012 «О безопасности мебельной продукции»', selected: false },
          { name: 'ПИЩА', selected: false }
        ]
      },
      {
        id: 2,
        title: 'Подтверждение соответствия продукции согласно дог',
        docNumber: '470',
        docDate: '04 апреля 2021',
        appNumber: '568',
        date: '26.07.2024',
        time: '16:20',
        status: 'in_progress',
        statusDetails: '1',
        cost: '5100.00',
        manager: 'Сидоров В.М.',
        expert: 'Иван Сергеевич',
        expertId: 5,
        clientId: 'client2',
        type: 'heavy',
        selected: false,
        declarationType: 'Сертификация'
      },
      {
        id: 3,
        title: 'Руководство по эксплуатации согласно дог',
        docNumber: '471',
        docDate: '05 апреля 2021',
        appNumber: '570',
        date: '27.07.2024',
        time: '10:15',
        status: 'draft',
        statusDetails: '1',
        cost: '1300.00',
        manager: 'Не закреплен',
        expert: 'Не закреплен',
        expertId: null,
        clientId: null,
        type: 'manual',
        selected: false,
        additionalInfo: '484'
      },
      {
        id: 4,
        title: 'Руководство по эксплуатации согласно дог',
        docNumber: '472',
        docDate: '06 апреля 2021',
        appNumber: '571',
        date: '28.07.2024',
        time: '14:30',
        status: 'draft',
        statusDetails: '1',
        cost: '1300.00',
        manager: 'Не закреплен',
        expert: 'Не закреплен',
        expertId: null,
        clientId: null,
        type: 'manual',
        selected: false,
        additionalInfo: '485'
      },
      {
        id: 5,
        title: 'Обоснование безопасности согласно дог',
        docNumber: '474',
        docDate: '08 апреля 2021',
        appNumber: '573',
        date: '30.07.2024',
        time: '11:20',
        status: 'draft',
        statusDetails: '1',
        cost: '1450.00',
        manager: 'Не закреплен',
        expert: 'Не закреплен',
        expertId: null,
        clientId: null,
        type: 'safety',
        selected: false,
        additionalInfo: '486'
      },
      {
        id: 6,
        title: 'ТУ согласно дог',
        docNumber: '475',
        docDate: '09 апреля 2021',
        appNumber: '574',
        date: '31.07.2024',
        time: '16:40',
        status: 'draft',
        statusDetails: '1',
        cost: '1200.00',
        manager: 'Не закреплен',
        expert: 'Не закреплен',
        expertId: null,
        clientId: null,
        type: 'tu',
        selected: false,
        additionalInfo: '487'
      },
      {
        id: 7,
        title: 'Подтверждение соответствия продукции согласно дог',
        docNumber: '476',
        docDate: '10 апреля 2021',
        appNumber: '575',
        date: '01.08.2024',
        time: '13:10',
        status: 'in_progress',
        statusDetails: '1',
        cost: '1650.00',
        manager: 'Петров И.С.',
        expert: 'Петр Николаевич',
        expertId: 4,
        clientId: null,
        type: 'light',
        selected: false,
        additionalInfo: '488'
      }
    ]
  }),

  getters: {
    getApplication: (state) => (id) => {
      console.log('ApplicationStore: Looking for application with ID:', id, 'Type:', typeof id)
      
      // Try to find by exact ID match (string or number)
      let application = state.applications.find(app => 
        app.id === id || 
        app.id === parseInt(id) ||
        app.uuid === id
      )
      
      // If not found, try to find by appNumber
      if (!application && typeof id === 'string') {
        // Extract appNumber from string IDs like 'ЛП 569' or 'ЛП-569' or 'app-569'
        const match = id.match(/(\d+)/)
        if (match && match[1]) {
          const appNumber = match[1]
          console.log('ApplicationStore: Trying to find by appNumber:', appNumber)
          application = state.applications.find(app => 
            app.appNumber === appNumber || 
            (app.id && app.id.toString().includes(appNumber))
          )
        }
      }
      
      console.log('ApplicationStore: Found application:', application)
      return application
    },
    
    getFilteredApplications: (state) => {
      const authStore = useAuthStore()
      if (authStore.isAdmin) {
        return state.applications
      }
      if (authStore.isManager) {
        return state.applications.filter(app => authStore.getAssignedClients.includes(app.clientId))
      }
      if (authStore.isExpert) {
        return state.applications.filter(app => {
          // For experts, show only:
          // 1. Draft or in_progress applications that are assigned to them
          if (app.expertId === authStore.user?.id) {
            return ['draft', 'in_progress'].includes(app.status)
          }
          // 2. Draft applications with no expert assigned
          if (!app.expertId && app.status === 'draft') {
            return true
          }
          return false
        })
      }
      if (authStore.user?.role === 'client') {
        return state.applications.filter(app => app.clientId === authStore.user?.id)
      }
      return []
    }
  },

  actions: {
    setApplications(applications) {
      this.applications = applications
    },

    addApplication(application) {
      this.applications.push(application)
    },

    updateApplication(updatedApplication) {
      const index = this.applications.findIndex(app => app.id === updatedApplication.id)
      if (index !== -1) {
        this.applications[index] = updatedApplication
      }
    },

    deleteApplication(applicationId) {
      this.applications = this.applications.filter(app => app.id !== applicationId)
    },

    assignExpert(applicationId, expertId, expertName) {
      const application = this.applications.find(app => app.id === applicationId)
      if (application) {
        application.expertId = expertId
        application.expert = expertName
        application.status = 'in_progress'
      }
    },

    selfAssignApplication(applicationId) {
      const authStore = useAuthStore()
      if (authStore.isExpert && authStore.user) {
        this.assignExpert(applicationId, authStore.user.id, authStore.user.name)
      }
    },

    adminAssignApplication(applicationId, expertId, expertName) {
      const authStore = useAuthStore()
      if (authStore.isAdmin) {
        this.assignExpert(applicationId, expertId, expertName)
      }
    },
    
    // Load applications from API
    async loadApplicationsFromApi() {
      try {
        console.log('Loading applications from API')
        const applications = await api.getApplications()
        console.log('Loaded applications from API:', applications)
        this.setApplications(applications)
        return applications
      } catch (error) {
        console.error('Failed to load applications from API:', error)
        return []
      }
    },
    
    // Create a new application
    async createApplication(applicationData) {
      try {
        console.log('Creating application with data:', applicationData)
        const result = await api.createApplication(applicationData)
        
        if (result.success && result.data) {
          this.addApplication(result.data)
          console.log('Application created successfully:', result.data)
        }
        
        return result
      } catch (error) {
        console.error('Failed to create application:', error)
        throw error
      }
    },
    
    // Update an existing application
    async saveApplication(applicationId, applicationData) {
      try {
        console.log('Saving application with ID:', applicationId, 'Data:', applicationData)
        const result = await api.updateApplication(applicationId, applicationData)
        
        if (result.success && result.data) {
          this.updateApplication(result.data)
          console.log('Application updated successfully:', result.data)
        }
        
        return result
      } catch (error) {
        console.error('Failed to update application:', error)
        throw error
      }
    },
    
    // Submit application to external system
    async submitApplication(applicationId) {
      try {
        const application = this.getApplication(applicationId)
        if (!application) {
          throw new Error('Application not found')
        }
        
        console.log('Submitting application to external system:', applicationId)
        const result = await api.submitApplication(application)
        
        if (result.success) {
          // Update application status
          application.status = 'pending'
          this.updateApplication(application)
        }
        
        return result
      } catch (error) {
        console.error('Failed to submit application:', error)
        throw error
      }
    },
    
    // Generate certificate for application
    async generateCertificate(applicationId) {
      try {
        console.log('Generating certificate for application:', applicationId)
        const result = await api.generateCertificate(applicationId)
        
        if (result.success) {
          const application = this.getApplication(applicationId)
          if (application) {
            application.certificateUrl = result.certificateUrl
            application.status = 'completed'
            this.updateApplication(application)
          }
        }
        
        return result
      } catch (error) {
        console.error('Failed to generate certificate:', error)
        throw error
      }
    }
  }
})
