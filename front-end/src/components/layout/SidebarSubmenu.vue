<template>
  <transition
    enter-active-class="transition-all duration-300 ease-in-out" 
    leave-active-class="transition-all duration-300 ease-in-out" 
    enter-from-class="opacity-0 max-h-0" 
    enter-to-class="opacity-100 max-h-[500px]" 
    leave-from-class="opacity-100 max-h-[500px]" 
    leave-to-class="opacity-0 max-h-0"
  >
    <div 
      v-if="isOpen && !isCollapsed" 
      :id="`${parentKey}-menu`" 
      class="pl-4 mt-1 space-y-1 overflow-hidden"
    >
      <router-link 
        v-for="child in children" 
        :key="child.key"
        :to="child.path || ''"
        class="flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-muted"
        :class="isActive(child.path) ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground'"
        @keydown="handleKeyDown"
        tabindex="0"
      >
        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-html="child.icon" />
        <span>{{ child.title }}</span>
      </router-link>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { MenuItem } from '@/composables/useMenu'

const props = defineProps<{
  children: MenuItem[]
  parentKey: string
  isCollapsed?: boolean
  isOpen: boolean
  isActive: (path?: string) => boolean
}>()

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    event.target.click()
  }
}
</script> 