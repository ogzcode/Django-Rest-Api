import type { ColumnData } from "@/components/datatable/columnCreator";

export const columnData: ColumnData[] = [
    {
        columnName: "id",
        columnTitle: "ID",
        element: ({ getValue }: { getValue: () => any }) => getValue()
    },
    {
        columnName: "name",
        columnTitle: "Name",
        element: ({ getValue }: { getValue: () => any }) => getValue()
    },
    {
        columnName: "type",
        columnTitle: "Type",
        element: ({ getValue }: { getValue: () => any }) => getValue()
    }
];

