import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
 apiKey: "AIzaSyD-ze8S1FyrqulSIw9P-LClZpIiqCWszIY",
 authDomain: "app-react-native-2025.firebaseapp.com",
 projectId: "app-react-native-2025",
 storageBucket: "app-react-native-2025.firebasestorage.app",
 messagingSenderId: "1086621941454",
 appId: "1:1086621941454:web:9a3ab6d17f57dec1b09a9f",
 measurementId: "G-NP6TELCDJX"
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)