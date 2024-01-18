<template>
  <main class="flex items-center justify-center w-screen h-screen bg-gray-200">
    <section class="w-1/3">
      <MultiSelect
        :items="robots"
        @onSelect="onSelect"
        @onRemove="onRemove"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRobotsStore } from '@/stores/robots'

import MultiSelect from '@/components/multiSelect.vue'

const { robots } = useRobotsStore()

const onSelect = (item, selectedItems) => {
  console.log('SelectedItem:', item, '--- SelectedItems:', selectedItems)
}

const onRemove = (item, selectedItems) => {
  console.log('RemovedItem:', item, '--- SelectedItems:', selectedItems)
}
</script>
