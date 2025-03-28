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
      icon: 'LayoutDashboard',
      path: '/'
    },
    {
      key: 'management',
      title: 'Yönetim',
      icon: 'Users',
      children: [
        {
          key: 'users',
          title: 'Kullanıcılar',
          icon: 'User',
          path: '/users'
        },
        {
          key: 'roles',
          title: 'Roller',
          icon: 'UserCog',
          path: '/roles'
        },
        {
          key: 'permissions',
          title: 'İzinler',
          icon: 'Lock',
          path: '/permissions'
        }
      ]
    },
    {
      key: 'reports',
      title: 'Raporlar',
      icon: 'BarChart',
      children: [
        {
          key: 'daily',
          title: 'Günlük Rapor',
          icon: 'Calendar',
          path: '/reports/daily'
        },
        {
          key: 'weekly',
          title: 'Haftalık Rapor',
          icon: 'Clock',
          path: '/reports/weekly'
        },
        {
          key: 'monthly',
          title: 'Aylık Rapor',
          icon: 'CalendarDays',
          path: '/reports/monthly'
        }
      ]
    },
    {
      key: 'settings',
      title: 'Ayarlar',
      icon: 'Settings',
      children: [
        {
          key: 'types',
          title: 'Türler',
          icon: 'List',
          path: '/settings/types'
        },
      ]
    },
/*     {
      key: 'divider',
      title: '',
      icon: '',
      divider: true
    } */
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