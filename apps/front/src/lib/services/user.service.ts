import { Collections } from "../config/firestore";
import { findOne } from "../firebase";
import { updateOne } from "../firebase/data";

class UserService {
    async getUser(id: string) {
        return findOne(Collections.user, id)
    }

    async update(id: string, data: any) {
        return updateOne(Collections.user, id, data)
    }
}

export default new UserService();