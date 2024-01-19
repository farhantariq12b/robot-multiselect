import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Item } from '@/types/multiSelect'

export const useMultiSelectStore = defineStore('multiSelect', () => {
  const items = ref<Item[]>([])
  const selectLimit = ref<number>(5)
  const selectedItems = ref<Item[]>([])
  const searchInput = ref<string>('')

  const availableItems = computed(() => {
    const nonSelected = items.value.filter((obj) => !selectedItems.value.includes(obj))

    if (!searchInput.value) return nonSelected
    return nonSelected.filter((obj) => {
      return JSON.stringify(obj).toLowerCase().includes(searchInput.value)
    })
  })

  const isLimitReached = computed(() => {
    return selectedItems.value.length >= selectLimit.value
  })

  const selectItem = (item: Item) => {
    if (isLimitReached.value || selectedItems.value.includes(item)) return

    selectedItems.value.push(item)
    searchInput.value = ''
  }

  const removeItem = (item: Item) => {
    selectedItems.value = selectedItems.value.filter((obj) => obj !== item)
  }

  return {
    items,
    selectLimit,
    isLimitReached,
    selectedItems,
    searchInput,
    availableItems,
    selectItem,
    removeItem
  }
})
