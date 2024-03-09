import { getFirestore } from "firebase/firestore";
import { firebase_app } from "../firebase";
import { CounterPublicI } from "../interfaces/counter";
import CounterService from "./counter.service";

const COUNTER_ID = "09ee2ffd-4012-4b22-93c2-d2551fac26d3";
  
describe("CounterService", () => {
    describe("findOne", () => {
        it("works", async () => {
            const counter = await CounterService.findOne(COUNTER_ID);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
        });
    });

    describe("findOnePublic", () => {
        it("returns an Object", async () => {
            const counter = await CounterService.findOnePublic(COUNTER_ID);
            expect(counter).toBeDefined();
            expect(counter).not.toBeNull();
            expect(counter).toBeInstanceOf(Object);
        });

        it("does not contain a secret", async () => {
            const counter = await CounterService.findOnePublic(COUNTER_ID) as any;
            expect(counter).toBeDefined();
            expect(counter?.secret).toBeUndefined();
        });
    });
});
