import { z } from "zod";
import {
    CounterGeneralSettings,
    CounterRowSettings,
} from "../interfaces/counter";

export const IconsValuesArray = [
    "crown",
    "heart",
    "controller",
    "star",
    "skull",
    "cross",
    "target",
] as const;

type IconsValuesType<T extends readonly string[]> = {
    [K in T[number]]: K;
};

export const IconsValues: IconsValuesType<typeof IconsValuesArray> =
    IconsValuesArray.reduce((acc, curr) => {
        return { ...acc, [curr]: curr };
    }, {} as IconsValuesType<typeof IconsValuesArray>);

type ObjectType<t> = t[keyof t];

export type ICONS_TYPE = ObjectType<typeof IconsValues>;

export const defaultGeneralSettings: CounterGeneralSettings = {
    bgColor: "#FFFFFF",
    bgImage: "",
    bgOpacity: 100,
    bgImageOpacity: 85,
    iconsColor: "#000000",
    optionalText: "",
    optionalTextColor: "#000000",
};

export const defaultRow: () => CounterRowSettings = () => {
    return {
        id: crypto.randomUUID(),
        icon: IconsValues.crown,
        fontColor: "#000000",
        label: "",
        value: 0,
    };
};

export const COUNTER_MAX_QUANTITY = 5;
export const COUNTER_MAX_ROWS = 5;
