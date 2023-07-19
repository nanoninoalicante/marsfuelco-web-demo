<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <div>
        <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900"
            >username</label
        >
        <div class="mt-2 w-full">
            <input
                type="text"
                name="username"
                v-model="username"
                id="username"
                class="block w-56 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :class="[
                    {
                        'bg-gray-100': loading
                    },
                    available
                        ? 'ring-green-400 focus:ring-green-500'
                        : 'ring-red-400 focus:ring-red-500'
                ]"
                placeholder="elonmusk"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["modelValue", "loading", "available"]);
const emit = defineEmits(["update:modelValue"]);

const loading = computed(() => props.loading);
const available = computed(() => props.available);

const username = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    }
});
</script>
