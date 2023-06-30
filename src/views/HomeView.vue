<script setup lang="ts">
import { orderBy as lodashOrderBy, uniqBy } from "lodash";
import { computed, onMounted, ref, watch } from "vue";
import ListTable from "@/components/ListTable.vue";
import { useFirebase } from "@/composables/firebaseComposable";
import { useGeneral } from "@/composables/generalComposable";
const { loading } = useGeneral();
const { db, currentUser, userProfile } = useFirebase();
import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query
} from "firebase/firestore";
const list: any = ref([]);
const listFiltered = computed(() =>
    lodashOrderBy(
        uniqBy(list.value, (i: any) => i.id),
        ["data.createdAt"],
        ["desc"]
    )
);

// Initialize Realtime Database and get a reference to the service

const getProfile = async (userId = null) => {
    if (!userId) return;
    console.log("get profile docs: ", userId);
    const docRef = doc(db, "users", userId);
    const profile = await getDoc(docRef);
    console.log("completed initial docs: ", profile.data());
    userProfile.value = profile.data();
    loading.value = false;
};

const getContacts = async (userId = null) => {
    const q = query(collection(db, `users/${userId}/contracts`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            list.value.push({
                id: doc.id,
                data: doc.data()
            });
        });
    });
};
onMounted(async () => {
    loading.value = true;
    await getProfile(currentUser.value?.uid);
    await getContacts(currentUser.value?.uid);
});
</script>

<template>
    <h1 class="text-2xl font-medium tracking-tight text-gray-900">
        User profile
    </h1>
    <h1 class="text-lg tracking-tight text-gray-800">
        Username: {{ userProfile.username }}
    </h1>
    <div class="flex justify-center my-8">
        <div class="w-full">
            <ListTable :list="listFiltered" />
        </div>
    </div>
    <Teleport to="aside">
        <div><h1 class="text-lg">teleport</h1></div>
    </Teleport>
</template>
