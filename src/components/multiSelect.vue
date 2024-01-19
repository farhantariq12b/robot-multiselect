<template>
  <div class="relative" v-click-outside="() => toggleDropDown(false)">
    <section
      class="flex gap-1 flex-wrap p-2 pr-8 min-h-12 bg-white rounded border border-dark text-dark items-center"
      @click="() => toggleDropDown(true)"
    >
      <SelectedChip
        v-for="item in selectedItems"
        :key="`selected-chip-${item}`"
        :item="item"
        :chipColor="chipColor"
        @onRemove="onRemove"
      />

      <input
        v-if="searchable && !isLimitReached"
        v-model="searchInput"
        :placeholder="inputPlaceHolder"
        class="outline-none max-w-full"
      />
      <span v-if="!searchable && !isLimitReached" class="text-dark">{{ inputPlaceHolder }}</span>
      <div class="absolute top-0 right-0 bottom-0 m-2 flex items-center">
        <arrow-icon :open="isDropDownOpen" />
      </div>
    </section>

    <multi-select-items v-if="isDropDownOpen" @onSelect="onSelect" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMultiSelectStore } from '@/stores/multiSelect'
import type { Item } from '@/types/multiSelect'

import SelectedChip from './multiSelect/selectedChip.vue'
import ArrowIcon from './icons/arrowIcon.vue'
import MultiSelectItems from './multiSelect/optionsDropdown.vue'

type Props = {
  items: Item[]
  selected?: Item[]
  selectLimit?: number
  searchable?: boolean
  chipColor?: string | undefined
}

const store = useMultiSelectStore()
const {
  items,
  selectLimit = 5,
  selected = [],
  searchable = false,
  chipColor = undefined
} = defineProps<Props>()

store.items = items
store.selectLimit = selectLimit
store.selectedItems = selected

const emit = defineEmits(['onOpen', 'onClose', 'onSelect', 'onRemove'])

let isDropDownOpen = ref<boolean>(false)

/**
 * Toggles the visibility of a dropdown and emits corresponding events.
 * @param {boolean} value - The new visibility state of the dropdown.
 * @emits {} onOpen - Emitted when the dropdown is opened.
 * @emits {} onClose - Emitted when the dropdown is closed.
 */
const toggleDropDown = (value: boolean) => {
  if (isDropDownOpen.value === value) return

  isDropDownOpen.value = value
  emit(value ? 'onOpen' : 'onClose')
}

const searchInput = computed({
  get: () => store.searchInput,
  set: (newValue: string) => {
    store.searchInput = newValue
  }
})

const selectedItems = computed(() => store.selectedItems)
const isLimitReached = computed(() => store.isLimitReached)
const inputPlaceHolder = computed(() => `Add up to ${store.selectLimit} Robots`)

/**
 * Event handler triggered when selecting an item.
 * @param {Item} item - The item to be selected.
 * @emits {Item, Item[]} onSelect - Emitted when an item is selected.
 */
const onSelect = (item: Item) => {
  emit('onSelect', item, selectedItems.value)
}

/**
 * Event handler triggered when removing an item.
 * @param {Item} item - The item to be removed.
 * @emits {Item, Item[]} onRemove - Emitted when an item is removed.
 */
const onRemove = (item: Item) => {
  emit('onRemove', item, selectedItems.value)
}
</script>
