<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash } from 'lucide-vue-next'

const props = defineProps<{
    type: any,
    onUpdate: () => void,
    onDelete: () => void
}>()
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="w-8 h-8 p-0">
                <span class="sr-only">Open menu</span>
                <MoreHorizontal class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem @click="onUpdate">
                <Pencil class="w-4 h-4 mr-2" />
                Update
            </DropdownMenuItem>
            <DropdownMenuItem class="text-red-500 focus:bg-red-500 focus:text-white"
                @click="onDelete">
                <Trash class="w-4 h-4 mr-2" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>