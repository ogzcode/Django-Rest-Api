<template>
  <li>
    <router-link v-if="item.path && !item.children" :to="item.path"
      class="flex items-center px-3 py-2 text-sm rounded-md transition-colors font-medium" :class="[
        isActive ? 'bg-primary text-primary-foreground font-medium hover:bg-primary/80' : 'text-muted-foreground hover:bg-muted',
        isCollapsed ? 'justify-center' : ''
      ]" @keydown="handleKeyDown" tabindex="0" :aria-label="item.title">
      <component :is="getIcon(item.icon)" class="w-5 h-5" :class="isCollapsed ? '' : 'mr-3'" />
      <span v-if="!isCollapsed">{{ item.title }}</span>
    </router-link>

    <button v-else-if="item.children" @click="handleToggleSubMenu"
      class="w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors font-medium" :class="[
        (isSubActive || hasActiveChild) ? 'bg-rose-50 text-primary hover:bg-rose-100' : 
        'text-muted-foreground hover:bg-muted',
        isCollapsed ? 'justify-center' : 'justify-between'
      ]" tabindex="0" @keydown="handleKeyDown" :aria-expanded="isOpen" :aria-controls="`${item.key}-menu`">
      <div class="flex items-center" :class="isCollapsed ? 'justify-center' : ''">
        <component :is="getIcon(item.icon)" class="w-5 h-5" :class="isCollapsed ? '' : 'mr-3'" />
        <span v-if="!isCollapsed">{{ item.title }}</span>
      </div>
      <ChevronDown v-if="!isCollapsed" class="w-4 h-4 transition-transform duration-200"
        :class="isOpen ? 'transform rotate-180' : ''" />
    </button>
    <div v-else-if="item.divider" class="my-2 border-t border-border"></div>
  </li>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/composables/useMenu'
import { ChevronDown } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps<{
  item: MenuItem
  isCollapsed?: boolean
  isActive?: boolean
  isSubActive?: boolean
  isOpen?: boolean
  hasActiveChild?: boolean
}>()

const emit = defineEmits(['toggle-submenu', 'click'])

const handleToggleSubMenu = () => {
  emit('toggle-submenu', props.item.key)
}

const handleClick = () => {
  emit('click', props.item.key)
}

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