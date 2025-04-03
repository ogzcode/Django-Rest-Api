interface Type {
    id: number;
    name: string;
    type: TypeEnum;
}

enum TypeEnum {
    PRODUCT = "product",
    SERVICE = "service",
}


export const typeEnum = [
    {
        value: TypeEnum.PRODUCT,
        label: "Ürün",
        color: "bg-blue-500",
    },
    {
        value: TypeEnum.SERVICE,
        label: "Hizmet",
        color: "bg-green-500",
    },
]
export type { Type, TypeEnum };
