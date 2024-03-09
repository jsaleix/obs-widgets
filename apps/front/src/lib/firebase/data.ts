"server only";

import {
    WhereFilterOp,
    getFirestore,
    Timestamp,
    FieldValue,
    Filter,
} from "firebase-admin/firestore";
import { firebase_app } from ".";
import { COLLECTIONS_TYPE } from "@/lib/config/firestore";

const db = getFirestore(firebase_app);

export async function addOne(
    collectionName: COLLECTIONS_TYPE,
    id: string,
    data: any
) {
    try {
        // await setDoc(doc(db, collectionName, id), data, {
        //     merge: true,
        // });
        await db.collection(collectionName).doc(id).set(data);
        return true;
    } catch (e: any) {
        if (e instanceof Error) throw e;
        else throw new Error("Error while creating data");
    }
}

export async function findOne(collectionName: COLLECTIONS_TYPE, id: string) {
    let docRef = db.collection(collectionName).doc(id);
    try {
        let result = await docRef.get();
        if (result.exists) return { id: id, ...result.data() };
        throw new Error("Document not found");
    } catch (e: any) {
        if (e instanceof Error) throw e;
        else throw new Error("Error while fetching data");
    }
}

interface FindManyParams {
    field: string;
    op: WhereFilterOp;
    value: string;
}

export async function findMany(
    collectionName: COLLECTIONS_TYPE,
    cond: FindManyParams
) {
    const ref = db.collection(collectionName);
    try {
        const result = await ref.where(cond.field, cond.op, cond.value).get();
        if (result.empty) throw new Error("No document found");
        return result.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as any[];
    } catch (e: any) {
        if (e instanceof Error) throw e;
        else throw new Error("Error while fetching data");
    }
}

export async function findAll(collectionName: COLLECTIONS_TYPE) {
    const ref = db.collection(collectionName);
    try {
        const result = await ref.get();
        return result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (e: any) {
        if (e instanceof Error) throw e;
        else throw new Error("Error while fetching data");
    }
}

export async function updateOne(
    collectionName: COLLECTIONS_TYPE,
    id: string,
    data: any
) {
    const ref = db.collection(collectionName).doc(id);
    try {
        await ref.update(data);
        return true;
    } catch (e: any) {
        if (e instanceof Error) throw e;
        else throw new Error("Error while updating data");
    }
}

export async function subscribeToRealtime(
    collectionName: COLLECTIONS_TYPE,
    id: string,
    cb: (data: any) => void
) {
    const doc = db.collection(collectionName).doc(id);

    const observer = doc.onSnapshot((docSnap) => {
        cb({ ...docSnap.data(), id: docSnap.id });
    });
    // const docRef = doc(db, collectionName, id);
    // const unsubscribe = onSnapshot(docRef, (doc) => {
    //     cb({ ...doc.data(), id: doc.id });
    // });
    return observer;
}
