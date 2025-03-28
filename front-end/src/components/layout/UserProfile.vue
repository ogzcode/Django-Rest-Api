<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant="outline" class="w-9 h-9">
                <User />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>
                <User />
                Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Settings />
                Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="text-red-500 cursor-pointer focus:bg-red-500 focus:text-white">
                <LogOut />
                <span class="ml-2">Logout</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>