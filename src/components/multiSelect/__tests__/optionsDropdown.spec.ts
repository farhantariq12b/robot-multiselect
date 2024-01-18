import { shallowMount } from '@vue/test-utils'
import OptionsDropdown from '../OptionsDropdown.vue'
import { useMultiSelectStore } from '@/stores/multiSelect'

describe('OptionsDropdown', () => {
  const availableItems = [{ name: 'Robot 1' }, { name: 'Robot 2' }]

  const store = useMultiSelectStore()
  store.items = availableItems

  it('renders correctly', () => {
    const wrapper = shallowMount(OptionsDropdown)

    expect(wrapper.exists()).toBe(true)
  })

  it('renders available items and triggers selectItem on click', async () => {
    const wrapper = shallowMount(OptionsDropdown)

    const renderedItems = wrapper.findAll('li')
    expect(renderedItems).toHaveLength(availableItems.length)

    await renderedItems[0].trigger('click')

    expect(wrapper.emitted().onSelect).toEqual([[availableItems[0]]])
  })

  it('renders "No option" when availableItems is empty', () => {
    store.items = []

    const wrapper = shallowMount(OptionsDropdown)

    expect(wrapper.find('.text-center').text()).toBe('No option')
  })
})
