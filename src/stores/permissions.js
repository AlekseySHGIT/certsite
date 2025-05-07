import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { ability } from '../casl-setup'

export const usePermissionsStore = defineStore('permissions', {
  state: () => ({
    // This will be replaced with server data in the future
    permissions: {
      admin: {
        // Admin can do everything
        canManageAll: true
      },
      client: {
        // Client can only create applications
        canCreateApplication: true,
        canViewApplications: true,
        canViewProfile: true,
        canUpdateProfile: true,
        canViewNews: true,
        canViewAbout: true,
        canViewHome: true
      },
      manager: {
        // Manager has access to most things
        canViewAll: true,
        canUpdateApplication: true,
        canApproveApplication: true,
        canRejectApplication: true,
        canAssignApplication: true,
        canViewProfile: true,
        canUpdateProfile: true,
        canViewNews: true,
        canCreateNews: true,
        canUpdateNews: true,
        canDeleteNews: true
      },
      expert: {
        canViewApplication: true,
        canUpdateApplication: true,
        canReviewApplication: true,
        canViewProfile: true,
        canUpdateProfile: true,
        canViewNews: true,
        canViewAbout: true,
        canViewHome: true
      },
      guest: {
        canViewNews: true,
        canViewAbout: true,
        canViewHome: true
      }
    }
  }),

  getters: {
    currentPermissions: (state) => {
      const authStore = useAuthStore()
      return state.permissions[authStore.role] || state.permissions.guest
    },
    
    // Helper methods to check specific permissions
    canCreateApplication: (state) => {
      const authStore = useAuthStore()
      return ability.can('create', 'Application')
    },
    
    canViewApplications: (state) => {
      const authStore = useAuthStore()
      return ability.can('read', 'Application')
    },
    
    canManageAll: (state) => {
      const authStore = useAuthStore()
      return ability.can('manage', 'all')
    }
  },

  actions: {
    // This will be used in the future to update permissions from the server
    updatePermissions(newPermissions) {
      this.permissions = { ...this.permissions, ...newPermissions }
    }
  }
})
