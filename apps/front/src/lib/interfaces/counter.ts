import { ICONS_TYPE } from "../config/counter";

export interface CounterGeneralSettings {
    bgColor: string;
    iconsColor: string;
    optionalText: string;
    optionalTextColor: string;
}
export interface CounterRowSettings {
    id: string;
    icon: ICONS_TYPE;
    fontColor: string;
    label: string;
    value: number;
}

export type RowFormInputs = Omit<CounterRowSettings, "id">;
export type GeneralFormInputs = CounterGeneralSettings;

export interface CounterI {
    name: string;
    id: string;
    owner: string;
    secret: string;
    general: CounterGeneralSettings;
    rows: CounterRowSettings[];
}

export const RowMutation = {
    increment: "increment",
    decrement: "decrement",
} as const;

type ObjectValue<T> = T[keyof T];
export type ROW_MUTATION_TYPE = ObjectValue<typeof RowMutation>;
