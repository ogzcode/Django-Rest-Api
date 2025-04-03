import { h } from 'vue';
import { columnCreator } from "../components/datatable/columnCreator";
import type { ColumnData } from "../components/datatable/columnCreator";
import ColumnHeader from "../components/datatable/ColumnHeader.vue";

export const useDataTableColumns = (
    columns: ColumnData[],
    RowActions: any,
    handleAction: (action: string, row: any) => void
) => {
    const tableColumns = columnCreator(columns);

    const actionColumn = {
        id: "actions",
        header: () => h(ColumnHeader, {
            title: "Actions",
            column: { getCanSort: () => false }  // Sıralama özelliği olmayan bir column nesnesi
        }),
        cell: ({ row }: { row: any }) => h(RowActions, {
            type: row.original,
            onUpdate: () => handleAction('update', row.original),
            onDelete: () => handleAction('delete', row.original)
        })
    };

    tableColumns.push(actionColumn);
    return tableColumns;
}; 