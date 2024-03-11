export const Roles = {
    admin: "admin",
    user: "user",
} as const;

type ObjectType<T> = T[keyof T];

export type ROLES_TYPE = ObjectType<typeof Roles>;
