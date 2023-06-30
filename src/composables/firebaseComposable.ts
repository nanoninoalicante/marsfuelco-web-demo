import { ref } from "vue";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    browserLocalPersistence,
    onAuthStateChanged
} from "firebase/auth";
const TENANT_ID = import.meta.env.VITE_FIREBASE_TENANT_ID || "";
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || "";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: PROJECT_ID,
    authDomain: `${PROJECT_ID}.firebaseapp.com`
};

const provider = new GoogleAuthProvider();
provider.addScope("email");
provider.addScope("profile");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.tenantId = TENANT_ID;
console.log("TENANT_ID", TENANT_ID);
const db = getFirestore(app);

const currentUser: any = ref("");
const userProfile: any = ref("");

export const useFirebase = () => {
    return {
        app,
        db,
        auth,
        provider,
        browserLocalPersistence,
        currentUser,
        userProfile
    };
};
