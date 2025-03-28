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
        class="flex items-center px-3 py-2 text-sm rounded-md transition-colors"
        :class="isActive(child.path) ? 'bg-primary text-primary-foreground font-medium hover:bg-primary/80' : 'text-muted-foreground hover:bg-muted'"
        @keydown="handleKeyDown"
        tabindex="0"
      >
        <component :is="getIcon(child.icon)" class="w-4 h-4 mr-3" />
        <span>{{ child.title }}</span>
      </router-link>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/composables/useMenu'
import * as LucideIcons from 'lucide-vue-next'
import { computed, watch } from 'vue'

const props = defineProps<{
  children: MenuItem[]
  parentKey: string
  isCollapsed?: boolean
  isOpen: boolean
  isActive: (path?: string) => boolean
}>()

const emit = defineEmits(['update:hasActiveChild'])

const hasActiveChild = computed(() => {
  return props.children.some(child => props.isActive(child.path))
})

watch(hasActiveChild, (newValue) => {
  emit('update:hasActiveChild', newValue)
}, { immediate: true })

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    const target = event.target as HTMLElement
    target.click()
  }
}

const getIcon = (iconName: string) => {
  return (LucideIcons as Record<string, any>)[iconName]
}
</script> 