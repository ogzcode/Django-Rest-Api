<template>
  <div class="h-screen flex flex-col">
    <!-- Topbar -->
    <Topbar @toggle-sidebar="handleToggleSidebar" :sidebarOpen="sidebarOpen" />
    
    <!-- Main Content Area with Sidebar -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar - fixed on mobile, static on desktop -->
      <aside 
        class="bg-card transition-all duration-300 ease-in-out h-full overflow-hidden z-40"
        :class="{
          'fixed md:static left-0 top-0 bottom-0': true,
          'w-64': sidebarOpen,
          'w-0 md:w-16': !sidebarOpen,
          'translate-x-0': sidebarOpen,
          '-translate-x-full md:translate-x-0': !sidebarOpen,
        }"
      >
        <Sidebar 
          :is-collapsed="!sidebarOpen && !isMobile"
          @update:sidebarOpen="sidebarOpen = $event"
        />
      </aside>
      
      <!-- Overlay -->
      <div 
        v-if="sidebarOpen && isMobile" 
        class="fixed inset-0 bg-foreground/20 z-30"
        @click="sidebarOpen = false"
      ></div>
      
      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Topbar from './Topbar.vue';
import Sidebar from './Sidebar.vue';
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const sidebarOpen = ref(true);
const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value < 768);

// Ekran boyutunu kontrol et
const checkScreenSize = () => {
  windowWidth.value = window.innerWidth;
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
};

// Route değişince mobilde sidebar'ı kapat
watch(() => route.path, () => {
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
});

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const handleToggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>
