import { IconsValuesArray } from "@/lib/config/counter";
import { z } from "zod";

export const CounterGeneralSettingsSchema = z.object({
    bgColor: z.string().length(7),
    iconsColor: z.string().length(7),
    optionalText: z.string().max(15),
    optionalTextColor: z.string().length(7).default("#000000"),
});

export const CounterRowSettingsSchema = z.object({
    id: z.string(),
    icon: z.enum(IconsValuesArray),
    fontColor: z.string().length(7).min(7),
    label: z.string().max(10),
    value: z.number().default(0),
});

// Root schemas

export const RootSchema = z.object({
    id: z.string(),
    name: z.string().max(10),
    owner: z.string(),
    secret: z.string(),
});

export const PublicRootSchema = z.object({
    id: z.string(),
    name: z.string().max(10),
    owner: z.string(),
});

// Full schemas

export const FullCounterSchema = z.object({
    ...RootSchema.shape,
    general: CounterGeneralSettingsSchema,
    rows: z.array(CounterRowSettingsSchema),
});

export const PublicCounterSchema = z.object({
    ...PublicRootSchema.shape,
    general: CounterGeneralSettingsSchema,
    rows: z.array(CounterRowSettingsSchema),
});

// Request schemas

export const UpdateCounterGeneralSettingsSchema = z.object({
    id: z.string(),
    ...CounterGeneralSettingsSchema.shape,
});

export const UpdateCounterRowSettingsSchema = z.object({
    ...CounterRowSettingsSchema.shape,
});
