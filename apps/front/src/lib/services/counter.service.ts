"server only";
import {
    CounterI,
    CounterRowSettings,
} from "@/lib/interfaces/counter";
import { addOne, findAll, findMany, findOne } from "../firebase";
import { Collections } from "@/lib/config/firestore";
import { subscribeToRealtime, updateOne } from "../firebase/data";
import { defaultRow, defaultGeneralSettings } from "../config/counter";

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
            rows: [defaultRow],
            general: defaultGeneralSettings,
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

    async addRow(id: string, row: CounterRowSettings) {
        const counter = await this.findOne(id);
        if (!counter) return null;
        counter.rows.push(row);
        return this.update(id, counter);
    }

    async removeRow(id: string, rowId: string) {
        const counter = await this.findOne(id);
        if (!counter) return null;
        counter.rows = counter.rows.filter((r) => r.id !== rowId);
        return this.update(id, counter);
    }

    async updateRow(id: string, row: CounterRowSettings) {
        const counter = await this.findOne(id);
        if (!counter) return null;
        counter.rows = counter.rows.map((r) =>
            r.id === row.id ? { ...r, ...row } : r
        );
        return this.update(id, counter);
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
