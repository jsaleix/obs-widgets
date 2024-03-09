import { genRandomString } from "../utils";
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
        it("works", async () => {
            const counter = await CounterService.findOne(COUNTER_ID);
            expect(counter).not.toBeNull();
            expect(counter).toBeDefined();
            expect(counter).toBeInstanceOf(Object);
        });
    });

    describe("findOnePublic", () => {
        it("returns an Object", async () => {
            console.log("#####");
            console.log("#####");
            console.log("counterId", COUNTER_ID);
            console.log("#####");
            console.log("#####");
            console.log("#####");
            const counter = await CounterService.findOnePublic(COUNTER_ID);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
        });

        it("does not contain a secret", async () => {
            const counter = (await CounterService.findOnePublic(
                COUNTER_ID
            )) as any;
            expect(counter).toBeDefined();
            expect(counter?.secret).toBeUndefined();
        });
    });

    describe("findAll", () => {});

    describe("findAllByOwner", () => {});

    describe("create", () => {});

    describe("changeSecret", () => {});

    describe("update", () => {});

    describe("delete", () => {});

    describe("addRow", () => {});

    describe("removeRow", () => {});

    describe("reorderRows", () => {});

    describe("updateGeneral", () => {});

    describe("updateRoot", () => {});

    describe("isAllowedtoEdit", () => {});

    describe("isAllowedToEditLocal", () => {});

    describe("getRealtimeCounter", () => {});
});
