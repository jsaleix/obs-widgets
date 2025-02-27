"server only";

import { DocumentData, Query, WhereFilterOp } from "firebase-admin/firestore";
import { COLLECTIONS_TYPE } from "@/lib/config/firestore";
import { firestore_db } from "./config";

export async function addOne(
    collectionName: COLLECTIONS_TYPE,
    id: string,
    data: any
) {
    try {
        await firestore_db.collection(collectionName).doc(id).set(data);
        return true;
    } catch (e: any) {
        if (e instanceof Error) throw e;
        else throw new Error("Error while creating data");
    }
}

export async function findOne(collectionName: COLLECTIONS_TYPE, id: string) {
    let docRef = firestore_db.collection(collectionName).doc(id);
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
    const ref = firestore_db.collection(collectionName);
    try {
        const result = await ref.where(cond.field, cond.op, cond.value).get();
        if (result.empty) throw new Error("No document found");
        const data = result.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as any[];
        return data;
    } catch (e: any) {
        // console.error(e);
        if (e instanceof Error) throw e;
        else throw new Error("Error while fetching data");
    }
}

interface FindAllConfig {
    limit?: number;
    orderBy?: Record<string, "asc" | "desc">;
}

export async function findAll(
    collectionName: COLLECTIONS_TYPE,
    config?: FindAllConfig
) {
    let ref: Query<DocumentData> = firestore_db.collection(collectionName);
    try {
        if (config?.orderBy) {
            for (const [field, order] of Object.entries(config.orderBy)) {
                ref = ref.orderBy(field, order);
            }
        }
        if (config?.limit) {
            ref = ref.limit(config.limit);
        }
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
    const ref = firestore_db.collection(collectionName).doc(id);
    try {
        await ref.update(data);
        return true;
    } catch (e: any) {
        if (e instanceof Error) throw e;
        else throw new Error("Error while updating data");
    }
}

export async function deleteOne(collectionName: COLLECTIONS_TYPE, id: string) {
    const ref = firestore_db.collection(collectionName).doc(id);
    try {
        await ref.delete();
        return true;
    } catch (e: any) {
        if (e instanceof Error) throw e;
        else throw new Error("Error while deleting data");
    }
}

export async function subscribeToRealtime(
    collectionName: COLLECTIONS_TYPE,
    id: string,
    cb: (data: any) => void
) {
    const doc = firestore_db.collection(collectionName).doc(id);

    const observer = doc.onSnapshot((docSnap) => {
        cb({ ...docSnap.data(), id: docSnap.id });
    });
    // const docRef = doc(db, collectionName, id);
    // const unsubscribe = onSnapshot(docRef, (doc) => {
    //     cb({ ...doc.data(), id: doc.id });
    // });
    return observer;
}
