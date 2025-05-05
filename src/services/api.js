// Mock data for applications
const mockApplications = [
  {
    id: 'app-569',
    uuid: 'f8c3de3d-1d35-4e99-9c5c-bbc88a2bc568',
    date: '26.07.2024',
    time: '15:22',
    title: 'Подтверждение соответствия продукции согласно дог №470 от 04 апреля 2021 / АЕ 756 от 10 ноября 2019 года по заявке',
    client: 'ООО "Ромашка" ИНН 77777777777778 Тел:+71112223344 Email:client@client.ru',
    manager: '',
    expert: 'Не закреплен',
    type: '9',
    amount: 1120,
    status: 'in_progress',
    appNumber: '569'
  },
  {
    id: 'app-568',
    uuid: 'a7b22e5c-6d89-4f12-b4a1-3c9e45d7f901',
    date: '26.07.2024',
    time: '15:22',
    title: 'Подтверждение соответствия продукции согласно дог №470 от 04 апреля 2021 / АЕ 756 от 10 ноября 2019 года по заявке',
    client: 'ООО "Ромашка" ИНН 77777777777778 Тел:+71112223344 Email:client@client.ru',
    manager: '',
    expert: 'Не закреплен',
    type: '9',
    amount: 1120,
    status: 'draft',
    appNumber: '568'
  },
  {
    id: 'app-567',
    uuid: 'd9e8f7c6-5b4a-3c2d-1e0f-9a8b7c6d5e4f',
    date: '25.07.2024',
    time: '10:15',
    title: 'Сертификация оборудования согласно дог №471 от 05 апреля 2021',
    client: 'ИП Иванов А.А. ИНН 123456789012 Тел:+79991234567 Email:ivanov@example.com',
    manager: 'Петров И.С.',
    expert: 'Не закреплен',
    type: '5',
    amount: 2350,
    status: 'draft',
    appNumber: '567'
  },
  {
    id: 'app-566',
    uuid: 'c5d1f8e6-3b7a-42c9-9e2d-5f8a61d7e234',
    date: '02.06.2024',
    time: '23:15',
    title: 'Подтверждение соответствия продукции согласно дог №470 от 03 апреля 2021 / АЕ 756 от 10 ноября 2019 года по заявке',
    client: 'ООО "Ромашка" ИНН 77777777777778 Тел:+71112223344 Email:client@client.ru',
    manager: '',
    expert: 'Не закреплен',
    type: '9',
    amount: 1120,
    status: 'completed',
    appNumber: '566'
  },
  {
    id: 'app-565',
    uuid: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    date: '01.06.2024',
    time: '14:30',
    title: 'Декларация соответствия на пищевую продукцию согласно дог №472',
    client: 'ООО "Продукт-Плюс" ИНН 9876543210 Тел:+74959876543 Email:info@productplus.ru',
    manager: 'Сидоров В.М.',
    expert: 'Иван Сергеевич',
    type: '3',
    amount: 1850,
    status: 'in_progress',
    appNumber: '565'
  },
  {
    id: 'app-564',
    uuid: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    date: '30.05.2024',
    time: '09:45',
    title: 'Сертификация электрооборудования согласно дог №473 от 07 апреля 2021',
    client: 'ЗАО "ТехноСвет" ИНН 1234567890 Тел:+74951234567 Email:info@technolight.ru',
    manager: 'Петров И.С.',
    expert: 'Петр Николаевич',
    type: '7',
    amount: 3200,
    status: 'completed',
    appNumber: '564'
  },
  {
    id: 'app-563',
    uuid: 'q1w2e3r4-t5y6-u7i8-o9p0-a1s2d3f4g5h6',
    date: '28.05.2024',
    time: '16:20',
    title: 'Декларирование соответствия мебельной продукции согласно дог №474',
    client: 'ООО "МебельСтиль" ИНН 5678901234 Тел:+79261234567 Email:contact@mebelstyle.ru',
    manager: 'Сидоров В.М.',
    expert: 'Не закреплен',
    type: '4',
    amount: 1750,
    status: 'draft',
    appNumber: '563'
  },
  {
    id: 'app-562',
    uuid: 'z1x2c3v4-b5n6-m7a8-s9d0-f1g2h3j4k5l6',
    date: '25.05.2024',
    time: '11:10',
    title: 'Сертификация детских игрушек согласно дог №475 от 10 апреля 2021',
    client: 'ИП Смирнова Е.В. ИНН 987654321098 Тел:+79161234567 Email:smirnova@kidtoys.ru',
    manager: 'Петров И.С.',
    expert: 'Петр Николаевич',
    type: '2',
    amount: 2100,
    status: 'in_progress',
    appNumber: '562'
  },
  {
    id: 'app-561',
    uuid: 'p0o9i8u7-y6t5-r4e3-w2q1-m1n2b3v4c5x6',
    date: '22.05.2024',
    time: '13:25',
    title: 'Декларирование соответствия косметической продукции согласно дог №476',
    client: 'ООО "БьютиЛайн" ИНН 1357924680 Тел:+74957654321 Email:info@beautyline.ru',
    manager: 'Сидоров В.М.',
    expert: 'Иван Сергеевич',
    type: '1',
    amount: 1950,
    status: 'completed',
    appNumber: '561'
  },
  {
    id: 'app-560',
    uuid: 'l6k5j4h3-g2f1-d0s9-a8p7-o6i5u4y3t2r1',
    date: '20.05.2024',
    time: '10:05',
    title: 'Сертификация строительных материалов согласно дог №477 от 12 апреля 2021',
    client: 'ООО "СтройМастер" ИНН 2468013579 Тел:+74952468013 Email:info@stroymaster.ru',
    manager: 'Петров И.С.',
    expert: 'Не закреплен',
    type: '8',
    amount: 2800,
    status: 'draft',
    appNumber: '560'
  },
  {
    id: 'app-559',
    uuid: 'e1r2t3y4-u5i6-o7p8-a9s0-d1f2g3h4j5k6',
    date: '18.05.2024',
    time: '15:40',
    title: 'Декларирование соответствия электроприборов согласно дог №478',
    client: 'ЗАО "ЭлектроТех" ИНН 9876123450 Тел:+74959876123 Email:info@electrotech.ru',
    manager: 'Сидоров В.М.',
    expert: 'Иван Сергеевич',
    type: '6',
    amount: 2450,
    status: 'in_progress',
    appNumber: '559'
  },
  {
    id: 'app-558',
    uuid: 'v1b2n3m4-a5s6-d7f8-g9h0-j1k2l3p4o5i6',
    date: '15.05.2024',
    time: '09:30',
    title: 'Сертификация пищевой продукции согласно дог №479 от 15 апреля 2021',
    client: 'ООО "ВкусноЕда" ИНН 1234098765 Тел:+74951234098 Email:info@tasty-food.ru',
    manager: 'Петров И.С.',
    expert: 'Петр Николаевич',
    type: '3',
    amount: 1900,
    status: 'completed',
    appNumber: '558'
  },
  {
    id: 'app-557',
    uuid: 'q9w8e7r6-t5y4-u3i2-o1p0-a9s8d7f6g5h4',
    date: '12.05.2024',
    time: '14:15',
    title: 'Декларирование соответствия текстильной продукции согласно дог №480',
    client: 'ИП Козлов Д.А. ИНН 567890123456 Тел:+79265678901 Email:kozlov@textilpro.ru',
    manager: 'Сидоров В.М.',
    expert: 'Не закреплен',
    type: '9',
    amount: 1650,
    status: 'draft',
    appNumber: '557'
  },
  {
    id: 'app-556',
    uuid: 'z9x8c7v6-b5n4-m3a2-s1d0-f9g8h7j6k5l4',
    date: '10.05.2024',
    time: '11:50',
    title: 'Сертификация автомобильных запчастей согласно дог №481 от 18 апреля 2021',
    client: 'ООО "АвтоДеталь" ИНН 9081726354 Тел:+74959081726 Email:info@autoparts.ru',
    manager: 'Петров И.С.',
    expert: 'Петр Николаевич',
    type: '7',
    amount: 2700,
    status: 'in_progress',
    appNumber: '556'
  }
]

// External API endpoint (fake)
const EXTERNAL_API_ENDPOINT = 'https://api.example.com/applications';

// Generate UUID function
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

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
        console.log('Searching for application with ID:', id)
        console.log('Available applications:', mockApplications.map(app => `${app.id} (${app.uuid})`))
        
        // Try to find by id, uuid, or appNumber
        let application = mockApplications.find(app => 
          app.id === id || 
          app.uuid === id || 
          (app.appNumber && id.includes(app.appNumber))
        );
        
        if (application) {
          console.log('Found application:', application)
          resolve(application)
        } else {
          console.error('Application not found with ID:', id)
          console.log('Available IDs:', mockApplications.map(app => app.id))
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
        
        // Generate a new ID and UUID for the application
        const appNumber = Math.floor(Math.random() * 1000);
        const uuid = generateUUID();
        const id = `app-${appNumber}`;
        
        // Map numeric type codes to descriptive names
        const typeMap = {
          '1': 'Легкая промышленность',
          '2': 'Тяжелая промышленность',
          '3': 'Отказное письмо',
          '4': 'Руководство по эксплуатации',
          '5': 'Паспорт продукции',
          '6': 'Обоснование безопасности',
          '7': 'ТУ',
          '8': 'Декларация соответствия',
          '9': 'Сертификация'
        };
        
        // Get the descriptive type name
        const typeName = typeMap[data.type] || '';
        
        // Create title with type if not already included
        let title = data.title || '';
        if (typeName && !title.includes(typeName)) {
          title = title ? `${title} (${typeName})` : `Заявка на сертификацию промышленного оборудования (${typeName})`;
        }
        
        // Create new application object
        const newApplication = {
          id: id,
          uuid: uuid,
          appNumber: appNumber.toString(),
          date: new Date().toLocaleDateString('ru-RU'),
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          title: title,
          client: data.applicant || '',
          manager: data.manager || '',
          expert: data.expert || 'Не закреплен',
          type: data.type || '',
          amount: data.cost || 0,
          status: data.status || 'draft',
          // Store all original data too
          ...data
        };
        
        console.log('New application created:', newApplication);
        
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
          // Map numeric type codes to descriptive names
          const typeMap = {
            '1': 'Легкая промышленность',
            '2': 'Тяжелая промышленность',
            '3': 'Отказное письмо',
            '4': 'Руководство по эксплуатации',
            '5': 'Паспорт продукции',
            '6': 'Обоснование безопасности',
            '7': 'ТУ',
            '8': 'Декларация соответствия',
            '9': 'Сертификация'
          };
          
          // Get the descriptive type name
          const typeName = typeMap[data.type] || '';
          
          // Create title with type if not already included
          let title = data.title || '';
          if (typeName && !title.includes(typeName)) {
            title = title ? `${title} (${typeName})` : `Заявка на сертификацию промышленного оборудования (${typeName})`;
          }
          
          // Update the application with all fields
          mockApplications[index] = {
            ...mockApplications[index],
            title: title,
            client: data.applicant || mockApplications[index].client,
            manager: data.manager || mockApplications[index].manager || '',
            expert: data.expert || mockApplications[index].expert || 'Не закреплен',
            type: data.type || mockApplications[index].type,
            amount: data.cost || mockApplications[index].amount || 0,
            status: data.status || mockApplications[index].status,
            // Store all form fields for proper editing later
            applicant: data.applicant,
            applicationType: data.applicationType,
            inn: data.inn,
            ogrn: data.ogrn,
            regType: data.regType,
            regNumber: data.regNumber,
            legalAddress: data.legalAddress,
            actualAddress: data.actualAddress,
            phone: data.phone,
            email: data.email,
            directorName: data.directorName,
            directorPosition: data.directorPosition,
            representative: data.representative,
            product: data.product,
            tnved: data.tnved,
            regulations: data.regulations,
            manufacturerSame: data.manufacturerSame,
            manufacturerName: data.manufacturerName,
            manufacturerLegalAddress: data.manufacturerLegalAddress,
            manufacturerActualAddress: data.manufacturerActualAddress,
            productionType: data.productionType,
            validityPeriod: data.validityPeriod,
            hasProtocol: data.hasProtocol,
            protocolCount: data.protocolCount,
            comments: data.comments,
            // Keep original data too
            ...data
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
