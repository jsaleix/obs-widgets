import {
    CounterGeneralSettings,
    CounterRowSettings,
} from "../interfaces/counter";

export const IconsValues = {
    crown: "crown",
    heart: "heart",
} as const;

type ObjectType<t> = t[keyof t];

export type ICONS_TYPE = ObjectType<typeof IconsValues>;

export const defaultGeneralSettings: CounterGeneralSettings = {
    bgColor: "#000000",
    iconsColor: "#FFFFFF",
    optionalText: "",
    optionalTextColor: "",
};

export const defaultRow: CounterRowSettings = {
    id: crypto.randomUUID(),
    icon: IconsValues.crown,
    fontColor: "#000000",
    label: "",
    value: 0,
};
