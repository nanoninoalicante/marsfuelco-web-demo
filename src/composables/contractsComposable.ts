import { ref } from "vue";
const currentSelectedContract = ref("");
export const useContracts = () => {
    return {
        currentSelectedContract
    };
};
