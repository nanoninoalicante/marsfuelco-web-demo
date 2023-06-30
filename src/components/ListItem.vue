<script setup lang="ts">
import { ref } from "vue";
import { useFirebase } from "../composables/firebaseComposable";
import { useGeneral } from "../composables/generalComposable";
import { doc, onSnapshot } from "firebase/firestore";
const { db, currentUser } = useFirebase();
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
const item = ref(props.item);
const unsub = onSnapshot(
    doc(db, `contracts`, item.value?.data?.contractId),
    (doc) => {
        const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data());
        item.value = {
            id: doc.id,
            data: doc.data()
        };
    }
);
</script>
<template>
    <div class="flex gap-x-4">
        <img
            class="h-12 w-12 flex-none rounded-full bg-gray-50"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
        />
        <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">
                {{ item.data?.name }}
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                {{ item.id }}
            </p>
        </div>
    </div>
    <div class="hidden sm:flex sm:flex-col sm:items-end">
        <p class="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
            Last seen
            <time datetime="2023-01-23T13:23Z">3h ago</time>
        </p>
    </div>
</template>
