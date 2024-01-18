import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRobotsStore = defineStore('robots', () => {
  const robots = ref([
    { id: 'robot_1', name: 'Robot 1' },
    { id: 'robot_2', name: 'Robot 2' },
    { id: 'robot_3', name: 'Robot 3' },
    { id: 'robot_4', name: 'Robot 4' },
    { id: 'robot_5', name: 'Robot 5' },
    { id: 'robot_6', name: 'Robot 6' },
    { id: 'robot_7', name: 'Robot 7' }
  ])

  return { robots }
})
