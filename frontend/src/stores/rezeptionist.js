import {defineStore} from "pinia";
import axios from "axios";
import router from "@/router";
import {apiCall} from "@/utility/ApiCall.js"; // Import the router
export const useRezeptionistStore = defineStore("rezeptionist", {
    state: () => ({
        rezeptionist: null,
    }),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        async signIn(email, password) {
            let loginInformation = {email: email, password: password};
            this.rezeptionist = await apiCall({
                method: 'POST',
                url: '/login/rezeptionist',
                data: loginInformation,
            });
            await router.push('/login/sucess/rezeptionist');
        },
        async logout() {
            await apiCall({
                method: 'GET',
                url: '/logout'
            })
            this.$reset()
        },
    }
});