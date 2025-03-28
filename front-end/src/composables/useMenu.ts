import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

export interface MenuItem {
  key: string
  title: string
  icon: string
  path?: string
  children?: MenuItem[]
  divider?: boolean
  danger?: boolean
}

export function useMenu() {
  const router = useRouter()
  
  // Açık olan alt menülerin durumunu tutan ref
  const openSubMenus = ref<Record<string, boolean>>({})
  
  // Ekran küçük mü kontrolü
  const isSmallScreen = ref(false)
  
  // Menü öğelerini içeren array
  const menuItems = ref<MenuItem[]>([
    {
      key: 'dashboard',
      title: 'Dashboard',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>',
      path: '/'
    },
    {
      key: 'management',
      title: 'Yönetim',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>',
      children: [
        {
          key: 'users',
          title: 'Kullanıcılar',
          icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>',
          path: '/users'
        },
        {
          key: 'roles',
          title: 'Roller',
          icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>',
          path: '/roles'
        },
        {
          key: 'permissions',
          title: 'İzinler',
          icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>',
          path: '/permissions'
        }
      ]
    },
    {
      key: 'reports',
      title: 'Raporlar',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>',
      children: [
        {
          key: 'daily',
          title: 'Günlük Rapor',
          icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>',
          path: '/reports/daily'
        },
        {
          key: 'weekly',
          title: 'Haftalık Rapor',
          icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
          path: '/reports/weekly'
        },
        {
          key: 'monthly',
          title: 'Aylık Rapor',
          icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>',
          path: '/reports/monthly'
        }
      ]
    },
    {
      key: 'settings',
      title: 'Ayarlar',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>',
      path: '/settings'
    },
    {
      key: 'divider',
      title: '',
      icon: '',
      divider: true
    },
    {
      key: 'logout',
      title: 'Çıkış',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>',
      danger: true
    }
  ])

  // Ekran boyutunu izleme
  const checkScreenSize = () => {
    isSmallScreen.value = window.innerWidth < 768
    return isSmallScreen.value
  }

  // Ekran boyutunu izlemek için event listener ekle/kaldır
  onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize)
  })

  // Alt menüyü açıp/kapatma
  const toggleSubMenu = (key: string, isCollapsed?: boolean, emitUpdate?: (val: boolean) => void) => {
    if (!isCollapsed) {
      openSubMenus.value[key] = !openSubMenus.value[key]
    } else if (emitUpdate) {
      // Eğer sidebar kapalıysa, açılmasını sağla
      emitUpdate(true)
      // Sonra alt menüyü aç
      setTimeout(() => {
        openSubMenus.value[key] = true
      }, 300)
    }
  }

  // Aktif link kontrolü
  const isActive = (path?: string) => {
    if (!path) return false
    return router.currentRoute.value.path === path
  }

  // Alt menülerden herhangi birinin aktif olup olmadığını kontrol etme
  const isSubActive = (item: MenuItem) => {
    if (!item.children) return false
    return item.children.some(child => {
      if (child.path) {
        return router.currentRoute.value.path.startsWith(child.path)
      }
      return false
    })
  }

  // Alt menülerin tümünü kapatma
  const closeAllSubMenus = () => {
    Object.keys(openSubMenus.value).forEach(key => {
      openSubMenus.value[key] = false
    })
  }

  return {
    menuItems,
    openSubMenus,
    toggleSubMenu,
    isActive,
    isSubActive,
    closeAllSubMenus,
    isSmallScreen,
    checkScreenSize
  }
} 