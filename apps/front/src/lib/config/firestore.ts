export const Collections = {
    counter: "counter-widgets",
    user: "users",
} as const;

type ObjectType<t> = t[keyof t];

export type COLLECTIONS_TYPE = ObjectType<typeof Collections>;
