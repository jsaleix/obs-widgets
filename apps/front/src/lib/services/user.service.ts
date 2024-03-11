import { Collections } from "../config/firestore";
import { findOne } from "../firebase";
import { findAll, updateOne } from "../firebase/data";
import { UserI } from "../interfaces/user";

class UserService {
    async getUser(id: string) {
        try {
            return (await findOne(Collections.user, id)) as UserI;
        } catch (e) {
            return null;
        }
    }

    async update(id: string, data: any) {
        try {
            return await updateOne(Collections.user, id, data);
        } catch (e) {
            return false;
        }
    }

    async findAll() {
        try {
            return (await findAll(Collections.user)) as UserI[];
        } catch (e) {
            return [];
        }
    }
}

export default new UserService();
