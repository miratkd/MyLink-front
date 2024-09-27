import { defineStore } from "pinia";
import RequestService from "~/services/RequestService";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: 'asdasdawdasdawd',
        request: new RequestService(),
        savedEmail: '',
        savedPassword: ''
    }),
    actions: {
        setToken(newToken) {
            this.token = newToken
        }
    }
})