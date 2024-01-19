<template>
  <ul
    class="absolute w-full p-2 mt-2 bg-white rounded border border-dark max-h-72 overflow-y-auto text-dark"
  >
    <li
      v-for="item in availableItems"
      :key="`option-${item}`"
      class="p-2 hover:bg-gray-50 cursor-pointer"
      @click="() => selectItem(item)"
    >
      {{ item.name }}
    </li>

    <li v-if="!availableItems.length" class="text-center">No option</li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMultiSelectStore } from '@/stores/multiSelect'
import type { Item } from '@/types/multiSelect'

const store = useMultiSelectStore()
const emit = defineEmits(['onSelect'])

const availableItems = computed(() => store.availableItems)

/**
 * Selects an item in the store and emits the 'onSelect' event.
 * @param {Item} item - The item to be selected.
 * @emits {Item} onSelect - Emitted when an item is successfully selected.
 */
const selectItem = (item: Item) => {
  store.selectItem(item)
  emit('onSelect', item)
}
</script>
