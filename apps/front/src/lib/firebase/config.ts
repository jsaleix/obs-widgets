"server only";
import { credential } from "firebase-admin";
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
    credential: credential.cert({
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        projectId: process.env.FIREBASE_PROJECT_ID,
    }),
};

// Initialize Firebase
export let firebase_app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export let firestore_db =
    process.env.NODE_ENV == "test" || process.env.FIRESTORE_EMULATOR_HOST
        ? getFirestore()
        : getFirestore(firebase_app);

// export const FIRESTORE_EMULATOR_HOST =
//     process.env.NODE_ENV === "test" ? "localhost:8200" : null;
