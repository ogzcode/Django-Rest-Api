<template>
  <header class="bg-card border-b border-border shadow-sm">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="flex items-center">
        <button 
          class="text-muted-foreground hover:text-foreground mr-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md" 
          @click="handleToggleSidebar"
          @keydown="handleKeyDown"
          tabindex="0"
          aria-label="Toggle sidebar"
        >
          <svg 
            v-if="!sidebarOpen" 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg 
            v-else 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h1 class="text-xl font-semibold text-foreground">CRM Panel</h1>
      </div>
      <div class="flex gap-3">
        <ThemeMenu />
        <UserProfile />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeMenu from '@/components/layout/ThemeMenu.vue';
import UserProfile from '@/components/layout/UserProfile.vue';

  const props = defineProps<{
    sidebarOpen: boolean
  }>()

const emit = defineEmits(['toggle-sidebar'])

const handleToggleSidebar = () => {
  emit('toggle-sidebar')
}


const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleToggleSidebar()
  }
}
</script>
