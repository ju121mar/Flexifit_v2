import { defineStore } from 'pinia';
import { useMitgliedStore } from '@/stores/mitglied.js'; 

export const useFormStore = defineStore('formStore', {
  // Der initiale Zustand des Stores
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
    // Aktion zum Setzen der Formulardaten
    setFormData(data) {
      this.newPlan = { ...data };
    }
  },
  // Persistenz aktivieren
  persist: {
    key: 'formStore', // Key im LocalStorage
    storage: window.localStorage // Speicherort
  }
});

