<script setup lang="ts">
import { onMounted } from "vue";
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
const { loading } = useGeneral();
const { auth, provider } = useFirebase();

const signInWithGoogle = () => {
    setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("result from signInWithGoogle: ", result);
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
onMounted(() => {
    loading.value = false;
});
</script>

<template>
    <main>
        <h1 class="text-3xl font-medium tracking-tight text-gray-400 mb-4">
            Login
        </h1>
        <button
            class="px-4 py-2 rounded-2xl bg-blue-700 text-white hover:bg-blue-800 my-4"
            @click="signInWithGoogle"
        >
            Sign in with Google
        </button>
    </main>
</template>
