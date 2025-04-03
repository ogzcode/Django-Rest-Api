<template>
    <div>
        <DataTable :columns="columns" :data="types">
            <template #actions>
                <Button class="p-2">
                    <PlusIcon class="w-4 h-4" />
                    Yeni Tip Ekle
                </Button>
            </template>
        </DataTable>
        <AlertDialog :open="deleteDialog" @update:open="deleteDialog = $event" title="Emin misiniz?"
            description="Bu tipi silmek istediğinize emin misiniz?" confirmText="Evet" cancelText="İptal"
            @confirm="handleDelete" @cancel="deleteDialog = false" />
    </div>
</template>

<script setup lang="ts">
import { getAllTypes } from '@/services/request/types';
import { onMounted, ref } from 'vue';
import type { Type } from './types.d.ts';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTableAction from './components/DataTableAction.vue';
import { useDataTableColumns } from '@/composables/useDataTableColumns';
import { columnData } from './components/column';
import { PlusIcon } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import AlertDialog from '@/components/AlertDialog.vue';

const types = ref<Type[]>([]);
const deleteDialog = ref<boolean>(false);
const selectedType = ref<Type | null>(null);

// Action işleyicileri
const handleAction = (action: string, row: Type) => {
    selectedType.value = row;
    if (action === 'update') {
        console.log('Update type with id:', row.id);
        // Güncelleme işlemi için gerekli kodlar buraya gelecek
    } else if (action === 'delete') {
        deleteDialog.value = true;
    }
}

// useDataTableColumns composable'ını kullanarak sütunları oluştur
const columns = useDataTableColumns(columnData, DataTableAction, handleAction);

onMounted(async () => {
    const typeResponse = await getAllTypes();
    types.value = typeResponse.data;
})

const handleDelete = () => {
    console.log('Delete type with id:', selectedType.value?.id);
    // Silme işlemi için gerekli kodlar buraya gelecek
}
</script>
