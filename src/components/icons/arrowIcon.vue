<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline v-if="open" points="6 15 12 9 18 15"></polyline>
    <polyline v-else points="6 9 12 15 18 9"></polyline>
  </svg>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  open: Boolean
}

const { open = false } = defineProps<Props>()
</script>
