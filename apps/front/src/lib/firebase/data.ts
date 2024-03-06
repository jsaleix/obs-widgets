"server only";

import {
    QueryFieldFilterConstraint,
    WhereFilterOp,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { firebase_app } from ".";
import { COLLECTIONS_TYPE } from "@/lib/config/firestore";

const db = getFirestore(firebase_app);

export async function addOne(
    collectionName: COLLECTIONS_TYPE,
    id: string,
    data: any
) {
    try {
        await setDoc(doc(db, collectionName, id), data, {
            merge: true,
        });
        return true;
    } catch (e: any) {
        if (e instanceof Error) throw e;
        else throw new Error("Error while creating data");
    }
}

export async function findOne(collectionName: COLLECTIONS_TYPE, id: string) {
    let docRef = doc(db, collectionName, id);
    try {
        let result = await getDoc(docRef);
        if (result.exists()) return { id: result.id, ...result.data() };
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
    const col = collection(db, collectionName);
    try {
        const q = query(col, where(cond.field, cond.op, cond.value));
        let result = await getDocs(q);
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
    const col = collection(db, collectionName);
    try {
        const result = await getDocs(col);
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
    const docRef = doc(db, collectionName, id);
    try {
        await updateDoc(docRef, data);
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
    const docRef = doc(db, collectionName, id);
    const unsubscribe = onSnapshot(docRef, (doc) => {
        cb({ ...doc.data(), id: doc.id });
    });
    return unsubscribe;
}
