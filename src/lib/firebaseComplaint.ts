import { db, rtdb } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ref, push, set, onValue } from "firebase/database";

// Firestore
export const submitComplaint = async (data: any) => {
  await addDoc(collection(db, "complaints"), data);
};

// Realtime Database
export const submitComplaintRealtime = async (data: any) => {
  const complaintsRef = ref(rtdb, "complaints");
  const newComplaintRef = push(complaintsRef);
  await set(newComplaintRef, data);
};

// Firestore
export const getUserComplaints = async (uid: string) => {
  const q = query(collection(db, "complaints"), where("userId", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Realtime Database
export const getUserComplaintsRealtime = (uid: string, callback: (complaints: any[]) => void) => {
  const complaintsRef = ref(rtdb, "complaints");
  onValue(complaintsRef, (snapshot) => {
    const data = snapshot.val();
    const complaints = data ? Object.entries(data).map(([id, value]: any) => ({ id, ...value })).filter((c: any) => c.userId === uid) : [];
    callback(complaints);
  });
};