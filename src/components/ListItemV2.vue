<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import {
    onSnapshot,
    doc,
    query,
    collection,
    where,
    getDocs
} from "firebase/firestore";
import { useFirebase } from "@/composables/firebaseComposable";
import { useContracts } from "@/composables/contractsComposable";
const { currentSelectedContract } = useContracts();
const { db } = useFirebase();
const router = useRouter();
const props = defineProps({
    item: {
        type: Object,
        required: false
    }
});
const item = computed(() => props.item || {});
const setCurrentSelected = () => {
    console.log("set item: ", {
        id: item.value?.id,
        name: item.value?.data?.name
    });
    router.push({ path: "/contracts/" + item.value?.id });
};

const contractData: any = ref(null);

const getContract = () => {
    if (!item.value) return;
    const unsub = onSnapshot(
        doc(db, "contracts", item.value?.id),
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

const recipient: any = ref(null);

const getRecipient = async () => {
    if (!item.value?.users && item.value?.users?.length < 1) return;
    console.log("recipient: ", `users/${item.value?.data?.users?.[0]}/public`);
    const q = query(
        collection(db, `users/${item.value?.data?.users?.[0]}/public`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(`recipient - ${doc.id}`, " => ", doc.data());
        recipient.value = {
            id: doc.id,
            data: doc.data()
        };
    });
};

const status = computed(() => contractData.value?.data?.status || "pending");

const statusColors: any = {
    pending: {
        dark: "bg-yellow-500/20",
        light: "bg-yellow-500"
    }
};

onMounted(async () => {
    console.log("item mounted");
    // getContract();
    await getRecipient();
});
</script>
<template>
    <div class="flex gap-x-4">
        <img
            class="h-12 w-12 flex-none rounded-full bg-gray-50"
            :src="
                item.imageUrl ||
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            "
            alt=""
        />
        <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">
                <button @click="setCurrentSelected">
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ item.data?.name || "Chris" }}
                </button>
            </p>
            <p class="mt-1 flex text-xs leading-5 text-gray-500">
                <a class="relative truncate hover:underline">{{
                    item.id || "id"
                }}</a>
            </p>
        </div>
    </div>
    <div class="flex items-center gap-x-4">
        <div
            v-if="status && contractData"
            class="hidden sm:flex sm:flex-col sm:items-end"
        >
            <div class="mt-1 flex items-center gap-x-1.5">
                <div
                    class="flex-none rounded-full p-1"
                    :class="
                        statusColors[status]
                            ? statusColors[status].dark
                            : 'bg-emerald-500/20'
                    "
                >
                    <div
                        class="h-1.5 w-1.5 rounded-full"
                        :class="
                            statusColors[status]
                                ? statusColors[status].light
                                : 'bg-emerald-500'
                        "
                    />
                </div>
                <p class="text-xs leading-5 text-gray-500">
                    {{ status }}
                </p>
            </div>
        </div>
        <ChevronRightIcon
            class="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
        />
    </div>
</template>
