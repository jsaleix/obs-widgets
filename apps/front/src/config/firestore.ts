export const Collections = {
    widgets: "widgets",
} as const;

type ObjectType<t> = t[keyof t];

export type COLLECTIONS_TYPE = ObjectType<typeof Collections>;
