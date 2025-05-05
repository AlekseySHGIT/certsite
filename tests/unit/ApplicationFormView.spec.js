import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, createWebHistory } from 'vue-router'
import ApplicationFormView from '../../src/views/ApplicationFormView.vue'

// Create a Vuetify instance
const vuetify = createVuetify({
  components,
  directives
})

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: { template: '<div>Home</div>' }
    },
    {
      path: '/application/create',
      name: 'application-create',
      component: { template: '<div>Create</div>' }
    },
    {
      path: '/application/:id/edit',
      name: 'application-edit',
      component: { template: '<div>Edit</div>' }
    }
  ]
})

describe('ApplicationFormView', () => {
  let wrapper

  beforeEach(() => {
    // Create a fresh pinia instance for each test
    const pinia = createPinia()
    
    // Set the initial route
    router.push('/application/create')
    
    // Mount the component with all necessary plugins
    wrapper = mount(ApplicationFormView, {
      global: {
        plugins: [pinia, vuetify, router],
        stubs: {
          'v-icon': true,
          'router-link': true,
          'router-view': true
        }
      }
    })
  })

  it('renders the form with all basic fields', () => {
    // Check that the form exists
    expect(wrapper.find('form').exists()).toBe(true)
    
    // Check for basic fields
    expect(wrapper.find('[label="Тип заявки"]').exists()).toBe(true)
    expect(wrapper.find('[label="Заявитель"]').exists()).toBe(true)
    expect(wrapper.find('[label="ИНН"]').exists()).toBe(true)
  })

  it('shows protocol fields when "У вас свой протокол" is set to "Да"', async () => {
    // Find the protocol selection dropdown
    const protocolSelect = wrapper.findAll('v-select').find(select => 
      select.attributes('label') === 'У вас свой протокол'
    )
    
    // Set the value to "Да"
    await wrapper.setData({
      formData: {
        ...wrapper.vm.formData,
        hasOwnProtocol: 'Да'
      }
    })
    
    // Wait for the DOM to update
    await wrapper.vm.$nextTick()
    
    // Check that the protocol fields are visible
    expect(wrapper.find('[label="Дата выдачи протокола"]').exists()).toBe(true)
    expect(wrapper.find('[label="Кто выдал протокол"]').exists()).toBe(true)
    expect(wrapper.find('[label="Продукция в протоколе"]').exists()).toBe(true)
    expect(wrapper.find('[label="Файлы протокола"]').exists()).toBe(true)
    
    // Check that the protocol count field is not visible
    expect(wrapper.find('[label="Количество протоколов"]').exists()).toBe(false)
  })

  it('shows product name fields based on protocol count when "У вас свой протокол" is "Нет"', async () => {
    // Set the protocol selection to "Нет" and protocol count to 3
    await wrapper.setData({
      formData: {
        ...wrapper.vm.formData,
        hasOwnProtocol: 'Нет',
        protocolCount: '3'
      }
    })
    
    // Wait for the DOM to update
    await wrapper.vm.$nextTick()
    
    // Check that the protocol count field is visible
    expect(wrapper.find('[label="Количество протоколов"]').exists()).toBe(true)
    
    // Check that the correct number of product name fields are visible
    expect(wrapper.find('[label="Наименование продукции для ПИ №1"]').exists()).toBe(true)
    expect(wrapper.find('[label="Наименование продукции для ПИ №2"]').exists()).toBe(true)
    expect(wrapper.find('[label="Наименование продукции для ПИ №3"]').exists()).toBe(true)
    expect(wrapper.find('[label="Наименование продукции для ПИ №4"]').exists()).toBe(false)
    
    // Check that the protocol fields are not visible
    expect(wrapper.find('[label="Дата выдачи протокола"]').exists()).toBe(false)
  })

  it('shows all product name fields when protocol count is 4', async () => {
    // Set the protocol selection to "Нет" and protocol count to 4
    await wrapper.setData({
      formData: {
        ...wrapper.vm.formData,
        hasOwnProtocol: 'Нет',
        protocolCount: '4'
      }
    })
    
    // Wait for the DOM to update
    await wrapper.vm.$nextTick()
    
    // Check that all product name fields are visible
    expect(wrapper.find('[label="Наименование продукции для ПИ №1"]').exists()).toBe(true)
    expect(wrapper.find('[label="Наименование продукции для ПИ №2"]').exists()).toBe(true)
    expect(wrapper.find('[label="Наименование продукции для ПИ №3"]').exists()).toBe(true)
    expect(wrapper.find('[label="Наименование продукции для ПИ №4"]').exists()).toBe(true)
  })

  it('shows laboratory field in the testing section', () => {
    // Check that the laboratory field exists
    expect(wrapper.find('[label="Лаборатория"]').exists()).toBe(true)
  })

  it('shows product identification fields', () => {
    // Check that the product identification fields exist
    expect(wrapper.find('[label="Название изделия"]').exists()).toBe(true)
    expect(wrapper.find('[label="Дата выпуска (как на шильдике)"]').exists()).toBe(true)
    expect(wrapper.find('[label="Фотография изделия"]').exists()).toBe(true)
    expect(wrapper.find('[label="Фотография шильдика (при наличии)"]').exists()).toBe(true)
  })

  it('shows additional fields section', () => {
    // Check that the additional fields exist
    expect(wrapper.find('[label="Менеджер"]').exists()).toBe(true)
    expect(wrapper.find('[label="Эксперт"]').exists()).toBe(true)
    expect(wrapper.find('[label="Стоимость"]').exists()).toBe(true)
    expect(wrapper.find('[label="Статус"]').exists()).toBe(true)
    expect(wrapper.find('[label="Документы"]').exists()).toBe(true)
  })

  it('shows comments section', () => {
    // Check that the comments field exists
    expect(wrapper.find('[label="Комментарии"]').exists()).toBe(true)
  })
})
