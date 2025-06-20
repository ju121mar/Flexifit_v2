import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { apiCall } from "@/utility/ApiCall.js";
import { useFormStore } from "@/stores/formStore"; // FormStore importieren

export const useMitgliedStore = defineStore("mitglied", {
    state: () => ({
        mitglied: null,
        buchungen: [],
    }),
    persist: {
        storage: sessionStorage,
    },
    actions: {
        async signIn(email, password) {
            let loginInformation = { email, password };
            this.mitglied = await apiCall({
                method: 'POST',
                url: '/login/mitglied',
                data: loginInformation,
            });
            await router.push('/login/sucess/mitglied');

            // FormStore-Daten nach Login laden
            const formStore = useFormStore();
            formStore.loadFormDataFromLocalStorage();
        },
        addBuchung(buchung) {
            this.buchungen.push(buchung);
        },
        getBuchungen() {
            return this.buchungen;
        },

        async signUp(firstName, lastName, dob, email, password, street, houseNumber, postalCode, city) {
            let registerInformation = {
                firstName: firstName, 
                lastName: lastName, 
                dob: dob,
                email: email, 
                password: password, 
                street: street, 
                houseNumber: houseNumber, 
                postalCode: postalCode, 
                city: city,
             
            };

            this.mitglied = await apiCall({
                method: 'POST',
                url: '/register',
                data: registerInformation,
            });
            await router.push('/login/sucess/mitglied');
          },

        async logout() {
            await apiCall({
                method: 'GET',
                url: '/logout'
            });

            // FormStore-Daten zurücksetzen
            const formStore = useFormStore();
            formStore.resetForm();
            if (this.mitglied?.id) {
                localStorage.removeItem(`formStore_${this.mitglied.id}`);
            }

            this.$reset(); // Mitgliedsdaten zurücksetzen
        },
    }
});
