<template>
  <div class="relative" v-click-outside="() => toggleDropDown(false)">
    <section
      class="flex gap-1 flex-wrap p-2 pr-8 min-h-12 bg-white rounded border border-dark text-dark"
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
        :placeholder="inputPlaceHolder"
        class="outline-none max-w-full"
      />
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
  selectLimit?: number
}

const store = useMultiSelectStore()
const props = defineProps<Props>()

store.items = props.items
if (props.selectLimit) store.selectLimit = props.selectLimit

const emit = defineEmits(['onOpen', 'onClose', 'onSelect', 'onRemove'])

let isDropDownOpen = ref<boolean>(false)
const toggleDropDown = (value: boolean) => {
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

const onSelect = (item: Item) => {
  emit('onSelect', item, selectedItems.value)
}

const onRemove = (item: Item) => {
  emit('onRemove', item, selectedItems.value)
}
</script>
