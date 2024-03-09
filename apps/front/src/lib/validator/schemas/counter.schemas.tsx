import { COUNTER_MAX_ROWS, IconsValuesArray } from "@/lib/config/counter";
import { z } from "zod";

const hexColorRegex = /^#([A-Fa-f0-9]{6})$/;

export const CounterGeneralSettingsSchema = z.object({
    bgColor: z.string().length(7).regex(hexColorRegex),
    iconsColor: z.string().length(7).regex(hexColorRegex, "Invalid color"),
    optionalText: z.string().max(20),
    optionalTextColor: z
        .string()
        .length(7)
        .regex(hexColorRegex, "Invalid color")
        .default("#000000"),
});

export const CounterRowSettingsSchema = z.object({
    id: z.string(),
    icon: z.enum(IconsValuesArray),
    fontColor: z
        .string()
        .length(7)
        .min(7)
        .regex(hexColorRegex, "Invalid color"),
    label: z.string().max(15),
    value: z.number().default(0),
});

// Root schemas

export const RootSchema = z.object({
    id: z.string(),
    name: z.string().max(15),
    owner: z.string(),
    secret: z.string(),
});

export const PublicRootSchema = z.object({
    id: z.string(),
    name: z.string().max(15),
    owner: z.string(),
});

// Full schemas

export const FullCounterSchema = z.object({
    ...RootSchema.shape,
    general: CounterGeneralSettingsSchema,
    rows: z.array(CounterRowSettingsSchema).max(COUNTER_MAX_ROWS),
});

export const PublicCounterSchema = z.object({
    ...PublicRootSchema.shape,
    general: CounterGeneralSettingsSchema,
    rows: z.array(CounterRowSettingsSchema).max(COUNTER_MAX_ROWS),
});

// Request schemas

// export const UpdateCounterGeneralSettingsSchema = z.object({
//     id: z.string(),
//     ...CounterGeneralSettingsSchema.shape,
// });

// export const UpdateCounterRowSettingsSchema = z.object({
//     ...CounterRowSettingsSchema.shape,
// });

export const UpdateCounterNameRequestSchema = RootSchema.pick({ name: true, id: true });
