import { mount } from '@vue/test-utils'
import MultiSelect from '../multiSelect.vue'

describe('MultiSelect', () => {
  const props = {
    items: [
      { id: 'robot_1', name: 'Robot 1' },
      { id: 'robot_2', name: 'Robot 2' }
    ],
    selectLimit: 1
  }

  it('renders correctly', () => {
    const wrapper = mount(MultiSelect, { props })

    expect(wrapper.exists()).toBe(true)
  })

  it('toggles dropdown on click', async () => {
    const wrapper = mount(MultiSelect, { props })

    expect(wrapper.vm.isDropDownOpen).toBe(false)

    await wrapper.find('.flex').trigger('click')

    expect(wrapper.vm.isDropDownOpen).toBe(true)
    expect(wrapper.find('ul').exists()).toBe(true)
  })

  it('filter options on base of search', async () => {
    const wrapper = mount(MultiSelect, { props })
    await wrapper.find('.flex').trigger('click')

    expect(wrapper.findAll('li')).toHaveLength(props.items.length)

    await wrapper.find('input').setValue('2')

    expect(wrapper.findAll('li')).toHaveLength(1)
  })

  it('hides input when limit reach', async () => {
    const wrapper = mount(MultiSelect, { props })
    await wrapper.find('.flex').trigger('click')

    expect(wrapper.find('input').exists()).toBe(true)

    await wrapper.find('li').trigger('click')

    expect(wrapper.find('input').exists()).toBe(false)
  })
})
