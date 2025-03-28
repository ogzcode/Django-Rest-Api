<template>
  <div class="h-full w-full bg-card border-r border-border">
    <SidebarMenu :isCollapsed="isCollapsed" @update:sidebarOpen="$emit('update:sidebarOpen', $event)" />
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from '@/components/layout/SidebarMenu.vue'

const props = defineProps<{
  isCollapsed?: boolean
}>()

const emit = defineEmits(['update:sidebarOpen'])
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
