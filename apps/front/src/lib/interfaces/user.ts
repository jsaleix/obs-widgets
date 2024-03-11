import { ROLES_TYPE } from "../config/users";

export interface UserI {
    id: string;
    email: string;
    image: string;
    role: ROLES_TYPE;
}