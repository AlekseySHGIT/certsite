// Mock data for applications
const mockApplications = [
  {
    id: 'ЛП 569',
    date: '26.07.2024',
    time: '15:22',
    title: 'Подтверждение соответствия продукции согласно дог №470 от 04 апреля 2021 / АЕ 756 от 10 ноября 2019 года по заявке',
    client: 'ООО "Ромашка" ИНН 77777777777778 Тел:+71112223344 Email:client@client.ru',
    manager: '',
    expert: 'Не закреплен',
    type: '9',
    amount: 1120,
    status: 'Array ( [0] -> )'
  },
  {
    id: 'ЛП 568',
    date: '26.07.2024',
    time: '15:22',
    title: 'Подтверждение соответствия продукции согласно дог №470 от 04 апреля 2021 / АЕ 756 от 10 ноября 2019 года по заявке',
    client: 'ООО "Ромашка" ИНН 77777777777778 Тел:+71112223344 Email:client@client.ru',
    manager: '',
    expert: 'Не закреплен',
    type: '9',
    amount: 1120,
    status: 'Array ( [0] -> )'
  },
  {
    id: 'ЛП 566',
    date: '02.06.2024',
    time: '23:15',
    title: 'Подтверждение соответствия продукции согласно дог №470 от 03 апреля 2021 / АЕ 756 от 10 ноября 2019 года по заявке',
    client: 'ООО "Ромашка" ИНН 77777777777778 Тел:+71112223344 Email:client@client.ru',
    manager: '',
    expert: 'Не закреплен',
    type: '9',
    amount: 1120,
    status: 'Array ( [0] -> )'
  }
]

// External API endpoint (fake)
const EXTERNAL_API_ENDPOINT = 'https://api.example.com/applications';

// Mock API functions
export const api = {
  // Get list of applications
  async getApplications() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockApplications)
      }, 500)
    })
  },

  // Get single application by ID
  async getApplication(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const application = mockApplications.find(app => app.id === id)
        if (application) {
          resolve(application)
        } else {
          reject(new Error('Application not found'))
        }
      }, 500)
    })
  },

  // Submit application to external system
  async submitApplication(data) {
    console.log('Preparing to submit application to external system:', data);
    
    try {
      // In a real implementation, this would be a fetch or axios call
      // to the external API endpoint
      console.log(`Sending POST request to ${EXTERNAL_API_ENDPOINT}`);
      
      // Simulate API call with timeout
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulate successful response
          console.log('Application submitted successfully to external system');
          
          const response = {
            success: true,
            id: data.id || `ЛП-${Math.floor(Math.random() * 1000)}`,
            timestamp: new Date().toISOString(),
            message: 'Application processed successfully'
          };
          
          console.log('Response from external system:', response);
          resolve(response);
        }, 1500);
      });
    } catch (error) {
      console.error('Error submitting application to external system:', error);
      throw new Error('Failed to submit application to external system');
    }
  },
  
  // Generate certificate
  async generateCertificate(applicationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Generating certificate for application ${applicationId}`);
        resolve({
          success: true,
          certificateUrl: `/certificates/certificate-${applicationId}.pdf`,
          message: 'Certificate generated successfully'
        });
      }, 1000);
    });
  },

  // Create new application
  async createApplication(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Creating new application:', data);
        
        // Generate a new ID for the application
        const newId = `ЛП-${Math.floor(Math.random() * 1000)}`;
        
        // Create new application object
        const newApplication = {
          id: newId,
          date: new Date().toLocaleDateString('ru-RU'),
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          title: data.title,
          client: data.applicant,
          manager: data.manager || '',
          expert: data.expert || 'Не закреплен',
          type: data.taskType,
          amount: data.cost || 0,
          status: data.status || 'Новая',
          ...data
        };
        
        // Add to mock applications array
        mockApplications.unshift(newApplication);
        
        resolve({
          success: true,
          data: newApplication,
          message: 'Application created successfully'
        });
      }, 500);
    });
  },
  
  // Update existing application
  async updateApplication(id, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Updating application ${id}:`, data);
        
        // Find the application to update
        const index = mockApplications.findIndex(app => app.id === id);
        
        if (index !== -1) {
          // Update the application
          mockApplications[index] = {
            ...mockApplications[index],
            ...data,
            title: data.title,
            client: data.applicant,
            manager: data.manager || '',
            expert: data.expert || 'Не закреплен',
            type: data.taskType,
            amount: data.cost || 0,
            status: data.status || mockApplications[index].status
          };
          
          resolve({
            success: true,
            data: mockApplications[index],
            message: 'Application updated successfully'
          });
        } else {
          reject(new Error('Application not found'));
        }
      }, 500);
    });
  }
}
