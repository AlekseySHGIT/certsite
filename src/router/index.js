import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import NewsView from '../views/NewsView.vue'
import SettingsView from '../views/SettingsView.vue'
import ApplicationFormView from '../views/ApplicationFormView.vue'
import { useAuthStore } from '../stores/auth'
import { usePermissionStore } from '../stores/permissionStore'
//454
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { 
      title: 'Главная',
      icon: 'mdi-home',
      showInMenu: true,
      roles: ['guest', 'client', 'manager', 'admin', 'expert']
    }
  },
  {
    path: '/applications',
    name: 'applications',
    component: () => import('../views/ApplicationListView.vue'),
    meta: { 
      title: 'Заявки',
      icon: 'mdi-file-document-multiple',
      showInMenu: true,
      roles: ['client', 'manager', 'admin', 'expert'],
      requiresAuth: true
    }
  },
  {
    path: '/application/create',
    name: 'application-create',
    component: () => import('../views/ApplicationFormView.vue'),
    meta: {
      showInMenu: false,
      roles: ['client', 'manager', 'admin'],
      requiresAuth: true,
      title: 'Создание заявки'
    }
  },
  {
    path: '/application/:id/edit',
    name: 'application-edit',
    component: () => import('../views/ApplicationFormView.vue'),
    meta: {
      showInMenu: false,
      roles: ['client', 'manager', 'admin', 'expert'],
      requiresAuth: true,
      title: 'Редактирование заявки'
    }
  },
 
  {
    path: '/personal-account',
    name: 'personal-account',
    component: () => import('../views/PersonalAccountView.vue'),
    meta: { 
      title: 'Личный кабинет',
      icon: 'mdi-account',
      showInMenu: true,
      roles: ['client', 'manager', 'admin', 'expert'],
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { 
      showInMenu: false,
      roles: ['guest']
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { 
      showInMenu: false,
      roles: ['guest']
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { 
      title: 'Профиль',
      icon: 'mdi-account',
      showInMenu: true,
      roles: ['client', 'manager', 'admin', 'expert'],
      requiresAuth: true
    }
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView,
    meta: { 
      title: 'Новости',
      icon: 'mdi-newspaper',
      showInMenu: true,
      roles: ['guest', 'client', 'manager', 'admin', 'expert']
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: { 
      title: 'Настройки',
      icon: 'mdi-cog',
      showInMenu: true,
      roles: ['admin'],
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { 
      title: 'О нас',
      icon: 'mdi-information',
      showInMenu: true,
      roles: ['guest', 'client', 'manager', 'admin', 'expert']
    }
  },
  {
    path: '/applications/create',
    redirect: '/application/create'
  },
  {
    path: '/applications/create/heavy',
    redirect: to => ({ path: '/application/create', query: { type: 'heavy' } })
  },
  {
    path: '/applications/create/light',
    redirect: to => ({ path: '/application/create', query: { type: 'light' } })
  },
  {
    path: '/applications/create/rejection',
    redirect: to => ({ path: '/application/create', query: { type: 'rejection' } })
  },
  {
    path: '/applications/create/protocol',
    redirect: to => ({ path: '/application/create', query: { type: 'protocol' } })
  },
  {
    path: '/applications/create/technical',
    redirect: to => ({ path: '/application/create', query: { type: 'technical' } })
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard to check authentication and roles
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const permissionStore = usePermissionStore()
  
  // Always allow access to login and register
  if (to.name === 'login' || to.name === 'register') {
    next()
    return
  }

  // Check if route requires auth
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
    return
  }

  // Set user role and load permissions if needed
  const userRole = authStore.isAuthenticated ? authStore.role : 'guest'
  permissionStore.setUserRole(userRole)
  
  if (!permissionStore.loaded) {
    await permissionStore.loadPermissions()
  }

  // Check if user has required role for the route
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    next({ name: 'home' })
    return
  }

  // Check if user has permission to access the route
  if (!permissionStore.canAccess(to.path)) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router
