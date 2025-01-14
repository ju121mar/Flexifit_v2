import { defineStore } from "pinia";
import { useMitgliedStore } from "@/stores/mitglied.js";

export const useFormStore = defineStore("formStore", {
  state: () => ({
    newPlan: {
      gender: "",
      height: "",
      weight: "",
      age: "",
      goal: "",
      level: "",
      frequency: ""
    }
  }),
  actions: {
    setFormData(data) {
      this.newPlan = { ...data };
    },
    resetForm() {
      this.newPlan = {
        gender: "",
        height: "",
        weight: "",
        age: "",
        goal: "",
        level: "",
        frequency: ""
      };
    },
    loadFormDataFromLocalStorage() {
      const mitgliedStore = useMitgliedStore();
      const storedData = localStorage.getItem(`formStore_${mitgliedStore.mitglied?.id}`);
      if (storedData) {
        this.setFormData(JSON.parse(storedData));
      }
    }
  },
  persist: {
    key: () => {
      const mitgliedStore = useMitgliedStore();
      return mitgliedStore.mitglied ? `formStore_${mitgliedStore.mitglied.id}` : null; 
    },
    storage: window.localStorage, // Daten im lokalen Speicher behalten
    paths: ["newPlan"], // Nur die Formulardaten persistieren
    beforeRestore: (context) => {
      const mitgliedStore = useMitgliedStore();
      if (!mitgliedStore.mitglied) {
        context.store.resetForm(); // Wenn kein Mitglied eingeloggt ist, Formulardaten zurücksetzen
      }
    }
  }
});
