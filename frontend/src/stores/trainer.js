import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import {apiCall} from "@/utility/ApiCall.js"; // Import the router
export const useTrainerStore = defineStore("trainer", {
    state: () => ({
        trainer: null,
    }),
    actions: {
        async signIn(email, password) {
            let loginInformation = {email: email, password: password};
            this.trainer = await apiCall({
                method: 'POST',
                url: '/login',
                data: loginInformation,
            });
            await router.push('/');
        },
    }
});