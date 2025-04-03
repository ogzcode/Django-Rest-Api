import { h } from 'vue';
import { Checkbox } from "../ui/checkbox";
import ColumnHeader from "./ColumnHeader.vue";

// Kullanıcı tarafından oluşturulacak olan bileşenlerin arayüzleri
export interface ColumnData {
  columnName: string;
  columnTitle: string;
  element: any;
}

export interface Column {
  id?: string;
  accessorKey?: string;
  header: any;
  cell: any;
  enableSorting?: boolean;
  enableHiding?: boolean;
  filterFn?: (row: any, id: string, value: any) => boolean;
}

export const columnCreator = (data: ColumnData[]): Column[] => {
  const newColumns: Column[] = data.map((item: ColumnData) => {
    return {
      accessorKey: item.columnName,
      header: ({ column }: { column: any }) => {
        // column objesini kontrol et
        return h(ColumnHeader, {
          column,
          title: item.columnTitle
        });
      },
      cell: item.element,
      filterFn: (row: any, id: string, value: any) => {
        return value.includes(row.getValue(id));
      },
    };
  });

  const columns: Column[] = [
    {
      id: "select",
      header: ({ table }: { table: any }) => h(Checkbox, {
        'modelValue': table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | "indeterminate") => table.toggleAllPageRowsSelected(!!value),
        'aria-label': "Tümünü Seç",
        class: "translate-y-[2px]"
      }),
      cell: ({ row }: { row: any }) => h(Checkbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | "indeterminate") => row.toggleSelected(!!value),
        'aria-label': "Satırı Seç",
        class: "translate-y-[2px]"
      }),
      enableSorting: false,
      enableHiding: false,
    }, 
    ...newColumns
  ];

  return columns;
};
