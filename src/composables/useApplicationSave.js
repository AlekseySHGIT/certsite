import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'

export function useApplicationSave() {
  const router = useRouter()
  const saving = ref(false)

  const saveApplication = async (formData, isCreateMode) => {
    try {
      saving.value = true
      
      // Create a new application object
      const applicationData = { ...formData }
      
      // Add creation date and time if it's a new application
      if (isCreateMode) {
        applicationData.date = new Date().toLocaleDateString('ru-RU')
        applicationData.time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }
      
      // Save the application
      const result = isCreateMode 
        ? await api.createApplication(applicationData)
        : await api.updateApplication(applicationData.id, applicationData)
      
      console.log('Application saved:', result)
      
      // Navigate back to applications list
      router.push('/applications')

      return result
    } catch (error) {
      console.error('Error saving application:', error)
      alert('Произошла ошибка при сохранении заявки. Пожалуйста, попробуйте снова.')
      throw error
    } finally {
      saving.value = false
    }
  }

  const cancelApplication = () => {
    router.push('/applications')
  }

  return {
    saving,
    saveApplication,
    cancelApplication
  }
}
