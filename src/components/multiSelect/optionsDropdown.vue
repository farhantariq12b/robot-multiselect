<template>
  <ul
    class="absolute w-full p-2 mt-2 bg-white rounded border border-gray-600 max-h-72 overflow-y-auto"
  >
    <li
      v-for="item in availableItems"
      :key="`option-${item}`"
      class="p-2 hover:bg-gray-200 cursor-pointer"
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
import { Item } from '@/types/multiSelect'

const store = useMultiSelectStore()
const emit = defineEmits(['onSelect'])

const availableItems = computed(() => store.availableItems)

const selectItem = (item: Item) => {
  store.selectItem(item)
  emit('onSelect', item)
}
</script>
