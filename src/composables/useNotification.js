import { ref } from 'vue'

// Global state for notifications
const notifications = ref([])
let notificationId = 0

export function useNotification() {
  /**
   * Show a notification
   * @param {Object} options - Notification options
   * @param {string} options.message - The message to display
   * @param {string} options.type - Type of notification: 'success', 'error', 'warning', 'info'
   * @param {number} options.timeout - Duration in ms (default: 3000)
   */
  const showNotification = ({ message, type = 'info', timeout = 3000 }) => {
    const id = notificationId++

    notifications.value.push({
      id,
      message,
      type,
      timeout,
      show: true
    })
  }

  const showSuccess = (message, timeout = 3000) => {
    showNotification({ message, type: 'success', timeout })
  }

  const showError = (message, timeout = 5000) => {
    showNotification({ message, type: 'error', timeout })
  }

  const showWarning = (message, timeout = 4000) => {
    showNotification({ message, type: 'warning', timeout })
  }

  const showInfo = (message, timeout = 3000) => {
    showNotification({ message, type: 'info', timeout })
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    notifications,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification
  }
}
