import { db, rtdb } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ref, set, onValue } from "firebase/database";

// Firestore
export const saveUserProfile = async (uid: string, data: any) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
};

// Update user language in Firestore
export const saveUserLanguage = async (uid: string, language: string) => {
  await setDoc(doc(db, "users", uid), { language }, { merge: true });
};

// Realtime Database
export const saveUserProfileRealtime = async (uid: string, data: any) => {
  const userRef = ref(rtdb, `users/${uid}`);
  await set(userRef, data);
};

// Update user language in Realtime Database
export const saveUserLanguageRealtime = async (uid: string, language: string) => {
  const userRef = ref(rtdb, `users/${uid}/language`);
  await set(userRef, language);
};

export const getUserProfileRealtime = (uid: string, callback: (profile: any) => void) => {
  const userRef = ref(rtdb, `users/${uid}`);
  onValue(userRef, (snapshot) => {
    callback(snapshot.val());
  });
};