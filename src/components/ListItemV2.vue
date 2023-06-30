<script setup lang="ts">
import { computed } from "vue";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import { useGeneral } from "@/composables/generalComposable";
const { slideOverOpen } = useGeneral();
const props = defineProps({
    item: {
        type: Object,
        required: false
    }
});
const item = computed(() => props.item || {});
console.log("item: ", item);
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
                <a @click="slideOverOpen = true">
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ item.data?.name || "Chris" }}
                </a>
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
            v-if="item.role && item.lastSeen && item.lastSeenDateTime"
            class="hidden sm:flex sm:flex-col sm:items-end"
        >
            <p class="text-sm leading-6 text-gray-900">
                {{ item.role }}
            </p>
            <p
                v-if="item.lastSeen"
                class="mt-1 text-xs leading-5 text-gray-500"
            >
                Last seen
                <time :datetime="item.lastSeenDateTime">{{
                    item.lastSeen
                }}</time>
            </p>
            <div v-else class="mt-1 flex items-center gap-x-1.5">
                <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p class="text-xs leading-5 text-gray-500">Online</p>
            </div>
        </div>
        <ChevronRightIcon
            class="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
        />
    </div>
</template>
