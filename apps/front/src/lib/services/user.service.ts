import { Collections } from "../config/firestore";
import { findOne } from "../firebase";
import { updateOne } from "../firebase/data";
import { UserI } from "../interfaces/user";

class UserService {
    async getUser(id: string) {
        return await findOne(Collections.user, id) as UserI
    }

    async update(id: string, data: any) {
        return updateOne(Collections.user, id, data)
    }
}

export default new UserService();