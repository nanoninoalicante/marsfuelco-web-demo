import { ref } from "vue";
const currentSelectedContract = ref(null);
export const useContracts = () => {
    return {
        currentSelectedContract
    };
};
