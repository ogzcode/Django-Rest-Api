import type { ColumnData } from "@/components/datatable/columnCreator";
import { typeEnum } from "../types.ts";
import type { TypeEnum } from "../types.ts";
import Badge from "@/components/ui/badge/Badge.vue";
import { h } from "vue";

export const columnData: ColumnData[] = [
    {
        columnName: "name",
        columnTitle: "İsim",
        element: ({ getValue }: { getValue: () => any }) => getValue()
    },
    {
        columnName: "type",
        columnTitle: "Tip",
        element: ({ getValue }: { getValue: () => TypeEnum }) => {
            const type = getValue();
            return h(Badge, { class: typeEnum.find(t => t.value === type)?.color }, typeEnum.find(t => t.value === type)?.label);
        }
    }
];

