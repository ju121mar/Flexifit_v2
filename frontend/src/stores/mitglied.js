import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import {apiCall} from "@/utility/ApiCall.js"; // Import the router
export const useMitgliedStore = defineStore("mitglied", {
    state: () => ({
        mitglied: null,
    }),
    actions: {
        async signIn(email, password) {
            let loginInformation = {email: email, password: password};
            this.mitglied = await apiCall({
                method: 'POST',
                url: '/login/mitglied',
                data: loginInformation,
            });
            await router.push('/login/sucess/mitglied');
        },
    }
});