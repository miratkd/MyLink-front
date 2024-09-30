import { defineStore } from "pinia";

export const useUserStore = defineStore('user', ()=>{
    const savedEmail = ref('')
    const savedPassword = ref('')
    const token = ref('')

    return {savedEmail, savedPassword, token}
})