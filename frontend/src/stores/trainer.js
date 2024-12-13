import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router"; // Import the router
export const useTrainerStore = defineStore("trainer", {
    state: () => ({
        trainer: null,
    }),
    actions: {
        async signIn(email, password) {
            let loginInformation = {email: email, password: password};
            axios
                .post("/login", loginInformation)
                .then((response) => {
                    this.trainer = response;
                    router.push("/");
                })
                .catch((error) => {
                    console.error("Login failed:", error);
                });
        },
    }
    });