import { z } from "zod";
import {
    CounterGeneralSettingsSchema,
    CounterRowSettingsSchema,
    FullCounterSchema,
    PublicCounterSchema,
} from "../validator/schemas/counter.schemas";

export type CounterRowSettings = z.infer<typeof CounterRowSettingsSchema>;
export type CounterGeneralSettings = z.infer<
    typeof CounterGeneralSettingsSchema
>;

export type RowFormInputs = Omit<CounterRowSettings, "id">;
export type GeneralFormInputs = CounterGeneralSettings;

export type CounterI = z.infer<typeof FullCounterSchema>;
export type CounterPublicI = z.infer<typeof PublicCounterSchema>;

export const RowMutation = {
    increment: "increment",
    decrement: "decrement",
} as const;

type ObjectValue<T> = T[keyof T];
export type ROW_MUTATION_TYPE = ObjectValue<typeof RowMutation>;
