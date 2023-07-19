<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
    signInWithPopup,
    GoogleAuthProvider,
    OAuthCredential,
    setPersistence,
    browserLocalPersistence,
    getAuth
} from "firebase/auth";
import { useFirebase } from "@/composables/firebaseComposable";
import { useGeneral } from "@/composables/generalComposable";
import CheckUsername from "@/components/CheckUsername.vue";
import { doc, getDoc } from "firebase/firestore";
const { loading } = useGeneral();
const { auth, provider, db } = useFirebase();

const signInWithGoogle = () => {
    setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(
                    "result from signInWithGoogle: ",
                    JSON.stringify(result)
                );
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential: OAuthCredential | null =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                console.log("error from signInWithGoogle: ", error);
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    });
};

const username = ref("");
const usernameLoading = ref(false);
const usernameAvailable = ref(false);
const checkUsername = async (username: string = "") => {
    console.log("checkUsername: ", username);
    usernameLoading.value = true;
    try {
        const docRef = doc(db, "usernames", username || "");
        const docSnap = await getDoc(docRef).catch((error) => {
            console.log("error from getDoc: ", error);

            usernameAvailable.value = false;
            usernameLoading.value = false;
            return null;
        });
        if (docSnap === null) return;
        console.log("docSnap: ", docSnap);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            usernameAvailable.value = false;

            usernameLoading.value = false;
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");

            usernameAvailable.value = true;
            usernameLoading.value = false;
        }
    } catch (error) {
        console.log("error from checkUsername: ", error);

        usernameLoading.value = false;
    }
};

watch(username, () => {
    console.log("username changed: ", username.value);
    checkUsername(username.value);
});

onMounted(() => {
    loading.value = false;
});
</script>

<template>
    <main class="w-full">
        <h1 class="text-3xl font-medium tracking-tight text-gray-400 mb-4">
            Login
        </h1>
        <button
            class="px-4 py-2 rounded-2xl bg-blue-700 text-white hover:bg-blue-800 my-4"
            @click="signInWithGoogle"
        >
            Sign in with Google
        </button>
        <pre>loading: {{ usernameLoading }}</pre>
        <pre>is available: {{ usernameAvailable }}</pre>
        <CheckUsername
            v-model="username"
            :loading="usernameLoading"
            :available="usernameAvailable"
        ></CheckUsername>
    </main>
</template>
