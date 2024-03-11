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
import { deleteOne, subscribeToRealtime, updateOne } from "../firebase/data";
import {
    defaultRow,
    defaultGeneralSettings,
    COUNTER_MAX_ROWS,
    COUNTER_MAX_QUANTITY,
} from "../config/counter";
import {
    CreateCounterRequestSchema,
    FullCounterSchema,
    PublicCounterSchema,
    RootSchema,
} from "../validator/schemas/counter.schemas";

class CounterService {
    async findOne(id: string): Promise<CounterI | null> {
        try {
            return (await findOne(Collections.counter, id)) as CounterI;
        } catch (e) {
            // console.error(e);
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
            // console.error(e);
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
                rows: [defaultRow()],
                general: defaultGeneralSettings,
            };
            const parsed = CreateCounterRequestSchema.parse(data);
            // const alreadyCreated = await this.findAllByOwner(owner);
            // if (alreadyCreated.length >= COUNTER_MAX_QUANTITY)
            //     throw new Error("Max counters reached");
            const res = await addOne(Collections.counter, id, parsed);
            return res;
        } catch (e) {
            // console.log(e);
            return false;
        }
    }

    async changeSecret(id: string) {
        const secret = crypto.randomUUID();
        const res = await this.update(id, { secret });
        if (res) return secret;
        return false;
    }

    private async update(id: string, data: Partial<CounterI>) {
        try {
            return updateOne(Collections.counter, id, data);
        } catch (e) {
            // console.error(e);
            return false;
        }
    }

    async delete(id: string) {
        try {
            return await deleteOne(Collections.counter, id);
        } catch (e) {
            return false;
        }
    }

    async addRow(id: string, row: CounterRowSettings) {
        try {
            const counter = await this.findOne(id);
            if (!counter) throw new Error("Counter not found");
            if (counter.rows.length >= COUNTER_MAX_ROWS)
                throw new Error("Max rows reached");
            counter.rows.push(row);
            const parsed = FullCounterSchema.parse(counter);
            return this.update(id, parsed);
        } catch (e) {
            // console.error(e);
            return false;
        }
    }

    async removeRow(id: string, rowId: string) {
        try {
            const counter = await this.findOne(id);
            if (!counter) throw new Error("Counter not found");
            counter.rows = counter.rows.filter((r) => r.id !== rowId);
            return this.update(id, counter);
        } catch (e) {
            return false;
        }
    }

    async updateRow(counterId: string, rowId: string, row: RowFormInputs) {
        try {
            const counter = await this.findOne(counterId);
            if (!counter) throw new Error("Counter not found");
            counter.rows = counter.rows.map((r) =>
                r.id === rowId ? { ...r, ...row } : r
            );
            const parsed = FullCounterSchema.parse(counter);
            return this.update(counterId, parsed);
        } catch (e) {
            // console.error(e);
            return false;
        }
    }

    async reorderRows(counterId: string, rowIds: string[]) {
        try {
            const counter = await this.findOne(counterId);
            if (!counter) throw new Error("Counter not found");
            if (counter.rows.length !== rowIds.length)
                throw new Error("Invalid row id");

            //Checks if all ids are valid and that there are no missing or extra ids
            const allIds = counter.rows.map((r) => r.id);
            const allValid = rowIds.every((id) => allIds.includes(id));
            if (!allValid) throw new Error("Invalid row id");

            const newRows = counter.rows.sort((a, b) => {
                const aIdx = rowIds.indexOf(a.id);
                const bIdx = rowIds.indexOf(b.id);
                return aIdx - bIdx;
            });
            counter.rows = newRows;
            const parsed = FullCounterSchema.parse(counter);
            return this.update(counterId, parsed);
        } catch (e) {
            // console.error(e);
            return false;
        }
    }

    async updateGeneral(id: string, general: GeneralFormInputs) {
        try {
            const counter = await this.findOne(id);
            if (!counter) throw new Error("Counter not found");
            counter.general = { ...counter.general, ...general };
            const parsed = FullCounterSchema.parse(counter);
            return this.update(id, parsed);
        } catch (e) {
            // console.error(e);
            return false;
        }
    }

    async updateRoot(id: string, data: Partial<CounterI>) {
        try {
            const root = await this.findOne(id);
            if (!root) throw new Error("Counter not found");
            const parsed = RootSchema.parse({ ...root, ...data });
            return this.update(id, parsed);
        } catch (e) {
            // console.error(e);
            return false;
        }
    }

    async isAllowedToEdit(counterId: string, user: string) {
        const counter = await this.findOne(counterId);
        return counter?.owner === user;
    }

    async isAllowedToEditLocal(
        counter: CounterPublicI | CounterI,
        user: string
    ) {
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
