import { ref } from "vue";
const loading = ref(true);
const slideOverOpen = ref(false);
export const useGeneral = () => {
    return {
        loading,
        slideOverOpen
    };
};
