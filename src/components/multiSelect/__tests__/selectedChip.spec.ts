import { shallowMount } from '@vue/test-utils'
import SelectedChip from '../selectedChip.vue'

describe('SelectedChip', () => {
  const item = { name: 'Robot 1' }
  const props = { item }

  it('renders correctly', () => {
    const wrapper = shallowMount(SelectedChip, { props })

    expect(wrapper.exists()).toBe(true)
  })

  it('renders the item name and triggers remove on button click', async () => {
    const wrapper = shallowMount(SelectedChip, { props })

    expect(wrapper.text()).toContain(item.name)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted().onRemove).toEqual([[item]])
  })
})
