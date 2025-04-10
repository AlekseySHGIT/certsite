<template>
  <v-container fluid class="pa-0">
    <div class="profile-header">
      <h1>Личный кабинет {{ user.fullName }}</h1>
      
      <div class="profile-actions">
        <v-btn color="primary" variant="outlined" size="small">ИЗМЕНИТЬ ДАННЫЕ</v-btn>
        <v-btn color="error" variant="outlined" size="small">ВЫЙТИ</v-btn>
      </div>
    </div>

    <div class="profile-content">
      <div class="profile-sidebar">
        <div class="profile-avatar">
          <v-img src="/avatar.jpg" height="180" width="180" cover></v-img>
        </div>
      </div>
      
      <div class="profile-details">
        <div class="profile-section">
          <h2 class="section-title">Регистрационные данные</h2>
          
          <div class="detail-row">
            <div class="detail-label">Логин/Email:</div>
            <div class="detail-value">{{ user.email }}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Дата регистрации:</div>
            <div class="detail-value">{{ user.registrationDate }}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Дата последнего входа:</div>
            <div class="detail-value">{{ user.lastLoginDate }}</div>
          </div>
        </div>
        
        <div class="profile-section">
          <h2 class="section-title">Контактные данные</h2>
          
          <div class="detail-row">
            <div class="detail-label">Телефон:</div>
            <div class="detail-value" v-if="user.phone">{{ user.phone }}</div>
            <div class="detail-value no-data" v-else>
              <v-icon color="error" size="small">mdi-alert-circle</v-icon>
              Нет информации
            </div>
          </div>
          
          <!-- Add more contact details as needed -->
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// Mock user data
const user = ref({
  fullName: 'Петров Василий Иванович',
  email: 'manager@manager.cc',
  registrationDate: '15.04.2022',
  lastLoginDate: '03.04.2015',
  phone: null, // Example of missing data
  role: 'Менеджер'
})
</script>

<style scoped>
.profile-header {
  background-color: #fff;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-header h1 {
  font-size: 24px;
  margin: 0;
  color: #333;
}

.profile-actions {
  display: flex;
  gap: 10px;
}

.profile-content {
  background-color: #f5f7fa;
  padding: 20px;
  min-height: calc(100vh - 120px);
  display: flex;
  gap: 20px;
}

.profile-sidebar {
  width: 200px;
  flex-shrink: 0;
}

.profile-avatar {
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.profile-details {
  flex-grow: 1;
}

.profile-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.section-title {
  font-size: 18px;
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
}

.detail-row {
  display: flex;
  margin-bottom: 15px;
}

.detail-label {
  width: 180px;
  font-weight: bold;
  color: #666;
}

.detail-value {
  flex-grow: 1;
}

.no-data {
  color: #f44336;
  display: flex;
  align-items: center;
  gap: 5px;
}

@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
  }
  
  .profile-sidebar {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .profile-avatar {
    width: 180px;
    margin: 0 auto;
  }
}
</style>
