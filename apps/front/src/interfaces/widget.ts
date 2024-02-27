export interface WidgetGeneralSettings {
    bgColor: string;
    iconsColor: string;
    optionalText: string;
    optionalTextColor: string;
}

export interface WidgetRowSettings {
    id: string;
    icon: string;
    fontColor: string;
    label: string;
    value: number;
}

export interface Widget {
    name: string;
    id: string;
    owner: string;
    secret: string;
    general: WidgetGeneralSettings;
    rows: WidgetRowSettings[];
}

export const RowMutation = {
    increment: "increment",
    decrement: "decrement",
} as const;

type ObjectValue<T> = T[keyof T];
export type ROW_MUTATION_TYPE = ObjectValue<typeof RowMutation>;
