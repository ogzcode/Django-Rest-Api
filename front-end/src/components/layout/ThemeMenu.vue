<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-vue-next'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline" class="w-9 h-9">
                <Moon v-if="mode === 'dark'"
                    class="transition-all " />
                <Sun v-else
                    class="transition-all" />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem @click="mode = 'light'">
                <Sun class="transition-all" />
                Light
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'dark'">
                <Moon class="transition-all" />
                Dark
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>