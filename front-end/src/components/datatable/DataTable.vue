<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, SortingState } from '@tanstack/vue-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/vue-table'
import Input from '../ui/input/Input.vue'
import Pagination from './Pagination.vue'
import { ref } from 'vue';
import { valueUpdater } from './utils';

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const rowSelection = ref({})
const sorting = ref<SortingState>([])
const globalFilter = ref('')

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: updaterOrValue => valueUpdater(updaterOrValue, globalFilter),
    state: {
        get rowSelection() { return rowSelection.value },
        get sorting() { return sorting.value },
        get globalFilter() { return globalFilter.value },
    },
    globalFilterFn: (row, columnId, value) => {
        const cellValue = row.getValue(columnId) as string | number | undefined
        if (cellValue === undefined) return false
        return String(cellValue).toLowerCase().includes(value.toLowerCase())
    }
})
</script>

<template>
    <div class="flex items-center justify-between mb-4">
        <Input placeholder="Ara..." v-model="globalFilter" class="min-w-[200px] max-w-sm" />
        <slot name="actions" />
    </div>
    <div class="border rounded-md mb-4">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                            :props="header.getContext()" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                        :data-state="row.getIsSelected() ? 'selected' : undefined">
                        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableRow>
                        <TableCell :colspan="columns.length" class="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                </template>
            </TableBody>
        </Table>
    </div>
    <Pagination :table="table" />
</template>