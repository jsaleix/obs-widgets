"server only";
import {
    CounterI,
    CounterGeneralSettings,
    CounterRowSettings,
} from "@/lib/interfaces/counter";
import { addOne, findAll, findMany, findOne } from "../firebase";
import { Collections } from "@/lib/config/firestore";
import { subscribeToRealtime, updateOne } from "../firebase/data";

const MOCK_WIDGET: CounterI = {
    name: "My widget",
    id: "WIDGET_1",
    owner: "noOne",
    secret: "1234",
    general: {
        bgColor: "#123456",
        iconsColor: "#000000",
        optionalText: "",
        optionalTextColor: "",
    },
    rows: [],
};

const DefaultGeneralSettings: CounterGeneralSettings = {
    bgColor: "#000000",
    iconsColor: "#FFFFFF",
    optionalText: "",
    optionalTextColor: "",
};

const DefaultRow: CounterRowSettings = {
    id: crypto.randomUUID(),
    icon: "icon",
    fontColor: "#000000",
    label: "",
    value: 0,
};

class CounterService {
    async findOne(id: string): Promise<CounterI | null> {
        try {
            console.log("findOne", id);
            return (await findOne(Collections.counter, id)) as CounterI;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async findAll() {
        return await findAll(Collections.counter);
    }

    async findAllByOwner(owner: string) {
        return (await findMany(Collections.counter, {
            field: "owner",
            op: "==",
            value: owner,
        })) as CounterI[];
    }

    async create(name: string, owner: string) {
        const id = crypto.randomUUID();
        const data = {
            name: name,
            owner: owner,
            secret: crypto.randomUUID(),
            rows: [DefaultRow],
            general: DefaultGeneralSettings,
        };
        const res = await addOne(Collections.counter, id, data);
        return res;
    }

    async update(id: string, data: CounterI) {
        try {
            return updateOne(Collections.counter, id, data);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async isAllowedToEdit(counterId: string, user: string) {
        const counter = await this.findOne(counterId);
        return counter?.owner === user;
    }

    async isAllowedToEditLocal(counter: CounterI, user: string) {
        if (!counter) return false;
        return counter.owner === user;
    }

    async getRealtimeCounter(
        counterId: string,
        cb: (counter: CounterI) => void
    ) {
        const counter = await this.findOne(counterId);
        if (!counter) throw new Error("Counter not found");
        const unsub = subscribeToRealtime(Collections.counter, counterId, cb);
        return unsub;
    }
}

export default new CounterService();
