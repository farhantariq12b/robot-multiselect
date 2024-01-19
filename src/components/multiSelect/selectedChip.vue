<template>
  <span
    class="inline-flex items-center gap-2 text-white px-2 py-1 text-xs rounded-full"
    :class="{ 'bg-gray-500': !chipColor }"
    :style="`background-color: ${chipColor}`"
  >
    {{ item.name }}

    <button @click="remove">
      <close-icon />
    </button>
  </span>
</template>

<script setup lang="ts">
import CloseIcon from '../icons/closeIcon.vue'
import { useMultiSelectStore } from '@/stores/multiSelect'
import type { Item } from '@/types/multiSelect'

type Props = {
  item: Item
  chipColor: string | null
}

const emit = defineEmits(['onRemove'])
const props = defineProps<Props>()
const store = useMultiSelectStore()

/**
 * Removes an item from the store and emits the 'onRemove' event.
 * @emits {Item} onRemove - Emitted when the item is successfully removed.
 */
const remove = () => {
  const item: Item = props.item

  store.removeItem(item)
  emit('onRemove', item)
}
</script>
