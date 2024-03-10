import { COUNTER_MAX_ROWS, defaultRow } from "../config/counter";
import { genRandomString } from "../utils";
import {
    FullCounterSchema,
    PublicCounterSchema,
} from "../validator/schemas/counter.schemas";
import CounterService from "./counter.service";

const user = genRandomString(10);

describe("CounterService", () => {
    let COUNTER_ID: string;

    beforeAll(async () => {
        // Create a new counter
        const createdCounter = await CounterService.create(
            "TEST_COUNTER",
            user
        );
        expect(createdCounter).toBeDefined();
        expect(createdCounter).toBe(true);

        // Find the newly created counter
        const newCounter = await CounterService.findAllByOwner(user);
        expect(newCounter).toBeDefined();
        expect(newCounter).not.toBeNull();
        expect(newCounter).toBeInstanceOf(Array);
        expect(newCounter).toHaveLength(1);
        COUNTER_ID = newCounter[0].id;
    });

    describe("findOne", () => {
        it("return an Object", async () => {
            const counter = await CounterService.findOne(COUNTER_ID);
            expect(counter).not.toBeNull();
            expect(counter).toBeDefined();
            expect(counter).toBeInstanceOf(Object);
        });

        it("it returns a full Counter", async () => {
            const counter = (await CounterService.findOne(COUNTER_ID)) as any;
            const parsed = FullCounterSchema.safeParse(counter);
            expect(parsed.success).toBe(true);
        });
    });

    describe("findOnePublic", () => {
        it("returns an Object", async () => {
            const counter = await CounterService.findOnePublic(COUNTER_ID);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
        });

        it("it returns a full Counter", async () => {
            const counter = (await CounterService.findOnePublic(
                COUNTER_ID
            )) as any;
            expect(counter.secret).toBeUndefined();
            const parsed = PublicCounterSchema.safeParse(counter);
            expect(parsed.success).toBe(true);
        });
    });

    describe("findAll", () => {
        it("returns an Array", async () => {
            const counters = await CounterService.findAll();
            expect(counters).toBeDefined();
            expect(counters).not.toBeNull();
            expect(counters).toBeInstanceOf(Array);
        });
    });

    describe("findAllByOwner", () => {
        it("returns an Array of one", async () => {
            const counters = await CounterService.findAllByOwner(user);
            expect(counters).toBeDefined();
            expect(counters).not.toBeNull();
            expect(counters).toBeInstanceOf(Array);
            expect(counters).toHaveLength(1);
        });

        it("returns an Array of two", async () => {
            const createdCounter = await CounterService.create(
                "TEST_COUNTER",
                user
            );
            expect(createdCounter).toBeDefined();
            expect(createdCounter).toBe(true);

            const counters = await CounterService.findAllByOwner(user);
            expect(counters).toBeDefined();
            expect(counters).not.toBeNull();
            expect(counters).toBeInstanceOf(Array);
            expect(counters).toHaveLength(2);
        });

        it("returns an empty Array", async () => {
            const counters = await CounterService.findAllByOwner(
                genRandomString(10)
            );
            expect(counters).toBeDefined();
            expect(counters).not.toBeNull();
            expect(counters).toBeInstanceOf(Array);
            expect(counters).toHaveLength(0);
        });
    });

    describe("create", () => {
        it("creates a new counter", async () => {
            const createdCounter = await CounterService.create(
                "TEST_COUNTER",
                user
            );
            expect(createdCounter).toBeDefined();
            expect(createdCounter).toBe(true);
        });

        it("fails to create a new counter: wrong owner", async () => {
            const createdCounter = await CounterService.create(
                "TEST_COUNTER",
                ""
            );
            expect(createdCounter).toBeDefined();
            expect(createdCounter).toBe(false);
        });

        //  I'm not sure the service should be responsible for this
        // it("fails, user has reached the limit", async () => {
        //     const tmpUser = genRandomString(10);
        //     for (let i = 0; i < COUNTER_MAX_QUANTITY; i++) {
        //         const createdCounter = await CounterService.create(
        //             "TEST_COUNTER",
        //             tmpUser
        //         );
        //         expect(createdCounter).toBeDefined();
        //         expect(createdCounter).toBe(true);
        //     }
        //     const createdCounter = await CounterService.create(
        //         "TEST_COUNTER",
        //         tmpUser
        //     );
        //     expect(createdCounter).toBeDefined();
        //     expect(createdCounter).toBe(false);

        // });
    });

    describe("changeSecret", () => {
        it("changes the secret", async () => {
            const counterId = (await CounterService.findAllByOwner(user))[0].id;
            const oldSecret = (await CounterService.findOne(counterId))?.id;
            const changed = await CounterService.changeSecret(counterId);

            expect(changed).toBeDefined();
            expect(changed).not.toBeNull();
            expect(changed).not.toBe(oldSecret);
            expect(changed).not.toBe(false);
        });
    });

    describe("updateRoot", () => {
        it("update the counter name", async () => {
            let counterId = (await CounterService.findAllByOwner(user))[0].id;
            const updated = await CounterService.updateRoot(counterId, {
                name: "UPDATED_NAME",
            });

            expect(updated).toBeDefined();
            expect(updated).not.toBeNull();
            expect(updated).toBe(true);

            const counter = await CounterService.findOne(counterId);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
            expect(counter!.name).toBe("UPDATED_NAME");
        });

        it("fails cause the name is empty", async () => {
            let counterId = (await CounterService.findAllByOwner(user))[0].id;
            const updated = await CounterService.updateRoot(counterId, {
                name: "",
            });

            expect(updated).toBeDefined();
            expect(updated).toBe(false);

            const counter = await CounterService.findOne(counterId);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
            expect(counter!.name).not.toBe("");
        });
    });

    describe("updateGeneral", () => {
        it("update the text and its color", async () => {
            let counterId = (await CounterService.findAllByOwner(user))[0].id;
            const updated = await CounterService.updateGeneral(counterId, {
                bgColor: "#000000",
                iconsColor: "#000000",
                optionalText: "UPDATED_TEXT",
                optionalTextColor: "#000000",
            });

            expect(updated).toBeDefined();
            expect(updated).not.toBeNull();
            expect(updated).toBe(true);

            const counter = await CounterService.findOne(counterId);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
            expect(counter!.general.optionalText).toBe("UPDATED_TEXT");
        });

        it("fails cause the text is too long", async () => {
            let counterId = (await CounterService.findAllByOwner(user))[0].id;
            const updated = await CounterService.updateGeneral(counterId, {
                bgColor: "#000000",
                iconsColor: "#000000",
                optionalText: "THIS_TEXT_IS_TOO_LONG",
                optionalTextColor: "#000000",
            });

            expect(updated).toBeDefined();
            expect(updated).not.toBeNull();
            expect(updated).toBe(false);

            const counter = await CounterService.findOne(counterId);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
            expect(counter!.general.optionalText).not.toBe(
                "THIS_TEXT_IS_TOO_LONG"
            );
        });

        it("fails cause the text color is invalid", async () => {
            let counterId = (await CounterService.findAllByOwner(user))[0].id;
            const updated = await CounterService.updateGeneral(counterId, {
                bgColor: "blue",
                iconsColor: "yellow",
                optionalText: "UPDATED_TEXT_2",
                optionalTextColor: "INVALID_COLOR",
            });

            expect(updated).toBeDefined();
            expect(updated).not.toBeNull();
            expect(updated).toBe(false);

            const counter = await CounterService.findOne(counterId);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
            expect(counter!.general.optionalText).not.toBe("UPDATED_TEXT_2");
        });
    });

    describe("addRow", () => {
        it("adds a new row", async () => {
            let counterId = (await CounterService.findAllByOwner(user))[0].id;
            const added = await CounterService.addRow(counterId, defaultRow());

            expect(added).toBeDefined();
            expect(added).not.toBeNull();
            expect(added).toBe(true);

            const counter = await CounterService.findOne(counterId);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
            expect(counter!.rows).toHaveLength(2);
        });

        it("should add another row", async () => {
            let counterId = (await CounterService.findAllByOwner(user))[0].id;
            const added = await CounterService.addRow(counterId, defaultRow());

            expect(added).toBeDefined();
            expect(added).not.toBeNull();
            expect(added).toBe(true);

            const counter = await CounterService.findOne(counterId);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
            expect(counter!.rows).toHaveLength(3);
        });

        it("should fail cause the user has reached the limit", async () => {
            const newUser = genRandomString(10);
            await CounterService.create("TEST_COUNTER", newUser);
            const newCounter = (
                await CounterService.findAllByOwner(newUser)
            )[0];

            for (let i = 0; i < COUNTER_MAX_ROWS - 1; i++) {
                const added = await CounterService.addRow(
                    newCounter.id,
                    defaultRow()
                );
                expect(added).toBeDefined();
                expect(added).not.toBeNull();
                expect(added).toBe(true);
            }

            const added = await CounterService.addRow(
                newCounter.id,
                defaultRow()
            );
            expect(added).toBeDefined();
            expect(added).not.toBeNull();
            expect(added).toBe(false);
        });
    });

    describe("removeRow", () => {
        it("removes a row", async () => {
            let newUser = genRandomString(10);
            await CounterService.create("TEST_COUNTER", newUser);

            let counterId = (await CounterService.findAllByOwner(newUser))[0]
                .id;
            const counter = await CounterService.findOne(counterId);
            const removed = await CounterService.removeRow(
                counterId,
                counter!.rows[0].id
            );

            expect(removed).toBeDefined();
            expect(removed).not.toBeNull();
            expect(removed).toBe(true);

            const newCounter = await CounterService.findOne(counterId);
            expect(newCounter).toBeDefined();
            expect(newCounter).not.toBeNull();
            expect(newCounter).toBeInstanceOf(Object);
            expect(newCounter!.rows).toHaveLength(0);
        });
    });

    describe("reorderRows", () => {
        it("reorders the rows", async () => {
            let newUser = genRandomString(10);
            await CounterService.create("TEST_COUNTER", newUser);

            let counterId = (await CounterService.findAllByOwner(newUser))[0]
                .id;
            await CounterService.addRow(counterId, defaultRow());
            const counter = await CounterService.findOne(counterId);
            const rows = counter!.rows.map((r) => r.id);
            const reordered = await CounterService.reorderRows(counterId, [
                rows[1],
                rows[0],
            ]);

            expect(reordered).toBeDefined();
            expect(reordered).not.toBeNull();
            expect(reordered).toBe(true);

            const newCounter = await CounterService.findOne(counterId);
            expect(newCounter).toBeDefined();
            expect(newCounter).not.toBeNull();
            expect(newCounter).toBeInstanceOf(Object);
            expect(newCounter!.rows[0].id).toBe(rows[1]);
        });

        it("fails cause there is a missing row", async () => {
            let newUser = genRandomString(10);
            await CounterService.create("TEST_COUNTER", newUser);

            let counterId = (await CounterService.findAllByOwner(newUser))[0]
                .id;
            await CounterService.addRow(counterId, defaultRow());
            await CounterService.addRow(counterId, defaultRow());
            const counter = await CounterService.findOne(counterId);
            const rows = counter!.rows.map((r) => r.id);
            const reordered = await CounterService.reorderRows(counterId, [
                rows[1],
                rows[0],
            ]);

            expect(reordered).toBeDefined();
            expect(reordered).not.toBeNull();
            expect(reordered).toBe(false);
        });
    });

    describe("delete", () => {});

    describe("isAllowedtoEdit", () => {});

    describe("isAllowedToEditLocal", () => {});

    describe("getRealtimeCounter", () => {
        it("returns an observer", async () => {
            const observer = await CounterService.getRealtimeCounter(
                COUNTER_ID,
                () => {}
            );
            expect(observer).toBeDefined();
            expect(observer).not.toBeNull();
            expect(observer).toBeInstanceOf(Object);
            observer() // It unsubscribes the observer
        });

        it("should call the callback", async () => {
            expect(true).toBe(false);
            const cb = jest.fn(() => null);
            const unsub = await CounterService.getRealtimeCounter(COUNTER_ID, cb);
            await CounterService.updateRoot(COUNTER_ID, {
                name: "UPDATED_NAME",
            });
            await new Promise((r) => setTimeout(r, 1000));
            expect(cb.mock.calls.length).toBeGreaterThan(0);
            unsub()
        });
    });
});
