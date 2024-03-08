export const StatusValues = {
    Success: "success",
    Error: "error",
} as const;

type ObjectType<t> = t[keyof t];

type Status = ObjectType<typeof StatusValues>;

export type ActionResponse = {
    status: Status;
    message?: string | null;
    value?: any;
} | null;
