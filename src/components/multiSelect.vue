<template>
  <div class="relative" v-click-outside="() => toggleDropDown(false)">
    <section
      class="flex gap-1 flex-wrap p-2 pr-8 bg-white rounded border border-gray-600"
      @click="() => toggleDropDown(true)"
    >
      <SelectedChip
        v-for="item in selectedItems"
        :key="`selected-chip-${item}`"
        :item="item"
        @onRemove="onRemove"
      />

      <input
        v-if="!isLimitReached"
        v-model="searchInput"
        placeholder="Add up to 5 Robots"
        class="outline-none"
      />
      <arrow-icon :open="isDropDownOpen" class="absolute top-0 right-0 m-2 mt-3" />
    </section>

    <multi-select-items v-if="isDropDownOpen" @onSelect="onSelect" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'
import { useMultiSelectStore } from '@/stores/multiSelect'
import { Item } from '@/types/multiSelect'

import SelectedChip from './multiSelect/selectedChip.vue'
import ArrowIcon from './icons/arrowIcon.vue'
import MultiSelectItems from './multiSelect/optionsDropdown.vue'

export interface Props {
  items: Item[]
  selectLimit?: Number
}

const store = useMultiSelectStore()
const props = defineProps<Props>()

store.items = props.items
if (props.selectLimit) store.selectLimit = props.selectLimit

let isDropDownOpen = ref<boolean>(false)
const toggleDropDown = (value: Boolean) => {
  isDropDownOpen.value = value
}

const searchInput = computed({
  get: () => store.searchInput,
  set: (newValue) => {
    store.searchInput = newValue
  }
})

const selectedItems = computed(() => store.selectedItems)
const isLimitReached = computed(() => store.isLimitReached)

const emit = defineEmits(['onSelect', 'onRemove'])

const onSelect = (item: Item) => {
  emit('onSelect', item, selectedItems.value)
}

const onRemove = (item: Item) => {
  emit('onRemove', item, selectedItems.value)
}
</script>
