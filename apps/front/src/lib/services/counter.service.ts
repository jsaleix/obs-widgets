"server only";
import {
    CounterI,
    CounterPublicI,
    CounterRowSettings,
    GeneralFormInputs,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import { addOne, findAll, findMany, findOne } from "../firebase";
import { Collections } from "@/lib/config/firestore";
import { subscribeToRealtime, updateOne } from "../firebase/data";
import {
    defaultRow,
    defaultGeneralSettings,
    COUNTER_MAX_ROWS,
} from "../config/counter";
import { PublicCounterSchema } from "../validator/schemas/counter.schemas";

class CounterService {
    async findOne(id: string): Promise<CounterI | null> {
        try {
            return (await findOne(Collections.counter, id)) as CounterI;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async findOnePublic(id: string): Promise<CounterPublicI | null> {
        try {
            const counter = await findOne(Collections.counter, id);
            if (!counter) throw new Error("Counter not found");
            const parsed = PublicCounterSchema.parse(counter);
            return parsed;
        } catch (e) {
            return null;
        }
    }

    async findAll() {
        return await findAll(Collections.counter);
    }

    async findAllByOwner(owner: string) {
        try {
            const counters = (await findMany(Collections.counter, {
                field: "owner",
                op: "==",
                value: owner,
            })) as CounterI[];
            const parsed = counters.map((c) => {
                const p = PublicCounterSchema.safeParse(c);
                if (p.success) return p.data;
                return null;
            });
            const filtered = parsed.filter(
                (c) => c != null
            ) as CounterPublicI[];
            return filtered;
        } catch (e) {
            return [];
        }
    }

    async create(name: string, owner: string) {
        try {
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
        } catch (e) {
            return false;
        }
    }

    async update(id: string, data: Partial<CounterI>) {
        try {
            return updateOne(Collections.counter, id, data);
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async delete(id: string) {
        throw new Error("Not implemented yet");
        return null;
    }

    async addRow(id: string, row: CounterRowSettings) {
        const counter = await this.findOne(id);
        if (!counter) return null;
        if (counter.rows.length >= COUNTER_MAX_ROWS) return false;
        counter.rows.push(row);
        return this.update(id, counter);
    }

    async removeRow(id: string, rowId: string) {
        const counter = await this.findOne(id);
        if (!counter) return null;
        counter.rows = counter.rows.filter((r) => r.id !== rowId);
        return this.update(id, counter);
    }

    async updateRow(counterId: string, rowId: string, row: RowFormInputs) {
        const counter = await this.findOne(counterId);
        if (!counter) return null;
        counter.rows = counter.rows.map((r) =>
            r.id === rowId ? { ...r, ...row } : r
        );
        return this.update(counterId, counter);
    }

    async updateGeneral(id: string, general: GeneralFormInputs) {
        const counter = await this.findOne(id);
        if (!counter) return null;
        counter.general = { ...counter.general, ...general };
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
        cb: (counter: CounterPublicI) => void
    ) {
        const counter = await this.findOne(counterId);
        if (!counter) throw new Error("Counter not found");
        const cbWrapper = (data: any) => {
            const parsed = PublicCounterSchema.safeParse(data);
            if (parsed.success) cb(parsed.data);
        };
        const unsub = subscribeToRealtime(
            Collections.counter,
            counterId,
            cbWrapper
        );
        return unsub;
    }
}

export default new CounterService();
