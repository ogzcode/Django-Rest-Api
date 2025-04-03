<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ref, watch } from 'vue'
import { AlertCircle } from 'lucide-vue-next'

interface Props {
  title?: string
  description?: string
  cancelText?: string
  confirmText?: string
  showTrigger?: boolean
  triggerText?: string
  isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Onay',
  description: 'Bu işlemi yapmak istediğinize emin misiniz?',
  cancelText: 'İptal',
  confirmText: 'Onayla',
  showTrigger: true,
  triggerText: 'Dialog Aç',
  isOpen: false
})

const emit = defineEmits<{
  'confirm': []
  'cancel': []
  'update:isOpen': [value: boolean]
}>()

const isDialogOpen = ref(props.isOpen)

const handleConfirm = () => {
  isDialogOpen.value = false
  emit('update:isOpen', false)
  emit('confirm')
}

const handleCancel = () => {
  isDialogOpen.value = false
  emit('update:isOpen', false)
  emit('cancel')
}

const handleOpenChange = (open: boolean) => {
  isDialogOpen.value = open
  emit('update:isOpen', open)
}

// İzle prop değişimini
watch(() => props.isOpen, (newValue: boolean) => {
  isDialogOpen.value = newValue
})
</script>

<template>
  <AlertDialog :open="isDialogOpen" @update:open="handleOpenChange">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="flex items-center">
          <AlertCircle class="h-6 w-6 inline-block mr-2 text-red-500" />
          <span>{{ title }}</span>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <span>{{ description }}</span>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancel">{{ cancelText }}</AlertDialogCancel>
        <AlertDialogAction @click="handleConfirm">{{ confirmText }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
