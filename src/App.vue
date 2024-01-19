<template>
  <main class="flex items-center justify-center w-screen h-screen bg-gray-200">
    <!-- Just to test click outside -->
    <div class="outside fixed top-0">MultiSelect</div>

    <section class="w-10/12 md:w-5/12">
      <MultiSelect
        :items="robots"
        searchable
        @onOpen="onOpen"
        @onClose="onClose"
        @onSelect="onSelect"
        @onRemove="onRemove"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRobotsStore } from '@/stores/robots'
import { type Item } from '@/types/multiSelect'

import MultiSelect from '@/components/multiSelect.vue'

const { robots } = useRobotsStore()

const onSelect = (item: Item, selectedItems: Item[]) => {
  console.log('SelectedItem:', item, '--- SelectedItems:', selectedItems)
}

const onRemove = (item: Item, selectedItems: Item[]) => {
  console.log('RemovedItem:', item, '--- SelectedItems:', selectedItems)
}

const onOpen = () => {
  console.log('MultiSelect Dropdown Open')
}

const onClose = () => {
  console.log('MultiSelect Dropdown Close')
}
</script>
