<script setup lang="ts">
import { onSnapshot, doc } from "firebase/firestore";
import { onMounted, computed, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useFirebase } from "@/composables/firebaseComposable";
const { db } = useFirebase();
const route = useRoute();

const contract: any = computed(() => route.params?.id);

const contractData: any = ref(null);

const getContract = () => {
    if (!contract.value) return;
    const unsub = onSnapshot(
        doc(db, "contracts", contract.value),
        (doc) => {
            console.log("Current data: ", doc.data());
            contractData.value = {
                id: doc.id,
                data: doc.data()
            };
        },
        (error) => {
            console.log("Error getting document:", error);
            contractData.value = { error };
        }
    );
};

watch(contract, (newVal, oldVal) => {
    console.log("contract changed: ", newVal, oldVal);
    console.log("contract: ", contract.value);
    getContract();
});

onMounted(() => {
    console.log("selected mounted");
    getContract();
});
</script>
<template>
    <div v-if="contract" class="py-4">
        {{ contract }}
        <pre>{{ contractData }}</pre>
    </div>
</template>
