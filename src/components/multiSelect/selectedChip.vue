<template>
  <span
    class="inline-flex items-center gap-2 bg-gray-500 text-white
           px-2 py-1 text-xs rounded-full"
   >
    {{ item.name }}

    <button @click="remove">
      <close />
    </button>
  </span>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

import Close from '../icons/close.vue'
import { useMultiSelectStore } from '@/stores/multiSelect'
import { Item } from '@/types/multiSelect'

interface Props {
  item: Item
}

const emit = defineEmits(['onRemove'])
const props = defineProps<Props>()
const store = useMultiSelectStore()

const remove = () => {
  const item = props.item

  store.removeItem(item)
  emit('onRemove', item)
}
</script>
