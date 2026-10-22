import {
    collection,
    addDoc,
    onSnapshot,
    serverTimestamp
} from "firebase/firestore";

import { db } from "./firebase";

const satellitesCollection = collection(db, "satellites");

// Add a satellite to Firestore
export async function launchSatellite(name, type) {
    const docRef = await addDoc(satellitesCollection, {
        name,
        type,
        status: "Active",
    });

    return docRef.id;
}

// Subscribe to live satellite updates
export function subscribeToSatellites(callback, onError) {
    return onSnapshot(
        satellitesCollection,
        (snapshot) => {
            const satellites = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            callback(satellites);
        },
        onError
    );
}
