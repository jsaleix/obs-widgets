import { ROLES_TYPE } from "../config/users";

export interface UserI {
    id: string;
    name: string;
    email: string;
    image: string;
    role: ROLES_TYPE;
}