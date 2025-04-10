<template>
  <div class="application-detail-page">
    <ApplicationDetailView :applicationId="applicationId" :applicationData="applicationData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApplicationDetailView from '../components/ApplicationDetailView.vue';

const route = useRoute();
const applicationId = ref(route.params.id || '8711');
const applicationData = ref({});

// In a real application, this would fetch data from an API
// For now, we're using the default data provided in the component
onMounted(async () => {
  // Mock API call to get application data
  // In a real app, you would fetch this from your backend
  // const response = await fetch(`/api/applications/${applicationId.value}`);
  // applicationData.value = await response.json();
  
  // For demo purposes, we'll use the default data in the component
  // You can override specific fields here if needed
  applicationData.value = {
    title: 'Провести работы по обновлению Secret Net Studio на версию 8.10'
    // Other fields will use defaults from the component
  };
});
</script>

<style scoped>
.application-detail-page {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
