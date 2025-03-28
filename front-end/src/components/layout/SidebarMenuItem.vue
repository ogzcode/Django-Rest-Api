<template>
  <li>
    <router-link 
      v-if="item.path && !item.children"
      :to="item.path"
      class="flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-muted"
      :class="[
        isActive ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground',
        isCollapsed ? 'justify-center': ''
      ]"
      @keydown="handleKeyDown"
      tabindex="0"
      :aria-label="item.title"
    >
      <svg class="w-5 h-5" :class="isCollapsed ? '' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-html="item.icon" />
      <span v-if="!isCollapsed">{{ item.title }}</span>
    </router-link>

    <button 
      v-else-if="item.children"
      @click="handleToggleSubMenu"
      class="w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-muted"
      :class="[
        isSubActive ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground',
        isCollapsed ? 'justify-center': 'justify-between'
      ]"
      tabindex="0"
      @keydown="handleKeyDown"
      :aria-expanded="isOpen"
      :aria-controls="`${item.key}-menu`"
    >
      <div class="flex items-center" :class="isCollapsed ? 'justify-center' : ''">
        <svg class="w-5 h-5" :class="isCollapsed ? '' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-html="item.icon" />
        <span v-if="!isCollapsed">{{ item.title }}</span>
      </div>
      <svg 
        v-if="!isCollapsed"
        class="w-4 h-4 transition-transform duration-200" 
        :class="isOpen ? 'transform rotate-180' : ''"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <button 
      v-else-if="item.danger"
      @click="handleClick"
      class="w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-destructive hover:text-destructive-foreground"
      :class="[
        'text-muted-foreground',
        isCollapsed ? 'justify-center': ''
      ]"
      @keydown="handleKeyDown"
      tabindex="0"
      :aria-label="item.title"
    >
      <svg class="w-5 h-5" :class="isCollapsed ? '' : 'mr-3'" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-html="item.icon" />
      <span v-if="!isCollapsed">{{ item.title }}</span>
    </button>

    <div v-else-if="item.divider" class="my-2 border-t border-border"></div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MenuItem } from '@/composables/useMenu'

const props = defineProps<{
  item: MenuItem
  isCollapsed?: boolean
  isActive?: boolean
  isSubActive?: boolean
  isOpen?: boolean
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
    event.target.click()
  }
}
</script> 