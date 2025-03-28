<template>
  <nav class="pt-2 h-[calc(100%-2rem)] overflow-y-auto">
    <ul class="px-2 space-y-1">
      <template v-for="item in menuItems" :key="item.key">
        <SidebarMenuItem
          :item="item"
          :isCollapsed="isCollapsed"
          :isActive="item.path ? isActive(item.path) : false"
          :isSubActive="isSubActive(item)"
          :isOpen="!!openSubMenus[item.key]"
          @toggle-submenu="(key) => toggleSubMenu(key, isCollapsed, updateSidebarOpen)"
          @click="handleItemClick(item)"
        />
        
        <SidebarSubmenu
          v-if="item.children"
          :children="item.children"
          :parentKey="item.key"
          :isCollapsed="isCollapsed"
          :isOpen="!!openSubMenus[item.key]"
          :isActive="isActive"
        />
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useMenu } from '@/composables/useMenu'
import SidebarMenuItem from './SidebarMenuItem.vue'
import SidebarSubmenu from './SidebarSubmenu.vue'
import { removeCRMToken } from '@/config/tokenConfig'
import { useRouter } from 'vue-router'
import { watch } from 'vue'

const props = defineProps<{
  isCollapsed?: boolean
}>()

const emit = defineEmits(['update:sidebarOpen'])

const router = useRouter()
const { menuItems, openSubMenus, toggleSubMenu, isActive, isSubActive, isSmallScreen, checkScreenSize } = useMenu()

// Route değiştiğinde mobil görünümde sidebar'ı kapat
watch(() => router.currentRoute.value.path, (newPath) => {
  if (isSmallScreen.value) {
    emit('update:sidebarOpen', false)
  }
})

// Sidebar open durumunu güncelleme fonksiyonu
const updateSidebarOpen = (value: boolean) => {
  emit('update:sidebarOpen', value)
}

// Öğeye tıklandığında işlenecek fonksiyon
const handleItemClick = async (item: any) => {
  if (item.key === 'logout') {
    await removeCRMToken()
    router.push('/login')
  }
}
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