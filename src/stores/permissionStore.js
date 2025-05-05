import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permissions', {
  state: () => ({
    userRole: 'guest',
    permissions: {},
    loaded: false
  }),

  actions: {
    setUserRole(role) {
      this.userRole = role
    },

    async loadPermissions() {
      try {
        // Mock permissions for development
        this.permissions = {
          'guest': {
            paths: ['/', '/login', '/register', '/news', '/about'],
            actions: ['view']
          },
          'client': {
            paths: ['/', '/applications', '/personal-account', '/profile', '/news', '/about', '/application/create', '/application/:id/edit'],
            actions: ['view', 'create', 'edit']
          },
          'expert': {
            paths: ['/', '/applications', '/personal-account', '/profile', '/news', '/about'],
            actions: ['view', 'edit', 'approve', 'reject', 'self-assign']
          },
          'manager': {
            paths: ['/', '/applications', '/personal-account', '/profile', '/news', '/about', '/application/create', '/application/:id/edit'],
            actions: ['view', 'create', 'edit', 'approve', 'reject']
          },
          'admin': {
            paths: ['*'],
            actions: ['*']
          }
        }
        this.loaded = true
      } catch (error) {
        console.error('Failed to load permissions:', error)
        throw error
      }
    },

    canAccess(path) {
      if (!this.loaded || !this.permissions[this.userRole]) {
        return false
      }

      const userPerms = this.permissions[this.userRole]
      
      // Admin has access to everything
      if (this.userRole === 'admin' || userPerms.paths.includes('*')) {
        return true
      }

      // Check if the exact path is allowed
      if (userPerms.paths.includes(path)) {
        return true
      }

      // Check for dynamic route patterns (e.g., /application/:id/edit)
      for (const permPath of userPerms.paths) {
        // Convert /application/:id/edit to regex
        const regex = new RegExp('^' + permPath.replace(/:[^/]+/g, '[^/]+') + '$')
        if (regex.test(path)) {
          return true
        }
      }

      // Check if any parent path is allowed
      const pathParts = path.split('/')
      while (pathParts.length > 1) {
        pathParts.pop()
        const parentPath = pathParts.join('/')
        if (userPerms.paths.includes(parentPath)) {
          return true
        }
      }

      return false
    },

    canPerformAction(action) {
      if (!this.loaded || !this.permissions[this.userRole]) {
        return false
      }

      const userPerms = this.permissions[this.userRole]
      return userPerms.actions.includes('*') || userPerms.actions.includes(action)
    }
  }
})
