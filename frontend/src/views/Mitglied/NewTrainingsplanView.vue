<script setup>
import { ref, watch, onMounted } from "vue";
import { useFormStore } from "@/stores/formStore"; // Store importieren
import axios from 'axios'
import {apiCall} from "@/utility/ApiCall.js";
import router from "@/router/index.js";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import MeinTrainingsplan from '@/views/Mitglied/MeinTrainingsplan.vue'
//import { useRouter } from "vue-router";

// Store initialisieren
const formStore = useFormStore();

// Verbindung zum Store herstellen (reactive Daten)
const newPlan = ref({ ...formStore.newPlan });

// Speichern der Daten beim Ändern
watch(newPlan, (newValue) => {
  formStore.setFormData(newValue);
}, { deep: true });
function createNewPlan() {
  router.push({
    path: '/trainingsplan/exercise/:id',
    query: { level: newPlan.value.level,
             frequency: newPlan.value.frequency,
             goal: newPlan.value.goal
          }
  });
}

function goBack() {
  router.push('/trainingsplan')
}


</script>

<template>
  <div class="kurs-form">
    <h2>Neuen Trainingsplan erstellen</h2>
    <form @submit.prevent="createNewPlan">
      <div class="kurs-group">
        <label for="gender">Geschlecht:</label>
        <select id="gender" v-model="newPlan.gender" class="form-select" required>
          <option disabled value="">Geschlecht auswählen</option>
          <option value="weiblich">weiblich</option>
          <option value="männlich">männlich</option>
          <option value="divers">divers</option>
          </select>
      </div>
      <div class="kurs-group">
        <label for="height">Größe in cm:</label>
        <input
          type="number"
          id="height"
          v-model="newPlan.height"
          placeholder="Größe eingeben"
          required
        />
      </div>
      <div class="kurs-group">
        <label for="weight">Gewicht in kg:</label>
        <input
          type="number"
          id="weight"
          v-model="newPlan.weight"
          placeholder="Gewicht eingeben"
          required
        />
      </div>
      <div class="kurs-group">
        <label for="age">Alter:</label>
        <input
          type="number"
          id="age"
          v-model="newPlan.age"
          placeholder="Alter eingeben"
          required
        />
      </div>
      <div class="kurs-group">
        <label for="goal">Mein Ziel:</label>
        <select id="goal" v-model="newPlan.goal" class="form-select" required>
          <option disabled value="">Ziel auswählen</option>
          <option value="MuskelaufbauGanzkoerper">Muskelaufbau Ganzkörper</option>
          <option value="MuskelaufbauUnterkoerper">Muskelaufbau Unterkörper</option>
          <option value="MuskelaufbauOberkoerper">Muskelaufbau Oberkörper</option>
          <option value="Ausdauerverbesserung">Ausdauerverbesserung</option>
        </select>
      </div>
      <div class="kurs-group">
        <label for="level">Level:</label>
        <select id="level" v-model="newPlan.level" class="form-select" required>
          <option disabled value="">Level auswählen</option>
          <option value="Anfänger">Anfänger</option>
          <option value="Fortgeschritten">Fortgeschritten</option>
          <option value="Experte">Experte</option>
        </select>
      </div>
      <div class="kurs-group">
        <label for="frequency">Trainingstage pro Woche:</label>
        <select id="frequency" v-model="newPlan.frequency" class="form-select" required>
          <option disabled value="">Anzahl Trainingstage auswählen</option>
          <option value="drei">Drei Mal (Für Anfänger empfohlen)</option>
          <option value="fuenf">Fünf Mal</option>
        </select>
      </div>
      <PrimaryButton class="primarybutton" buttontext="Plan anzeigen" @click="createNewPlan"></PrimaryButton>
      <BackButton class="backbutton" @click="goBack"></BackButton>
    </form>
  </div>
</template>

<style scoped>

.kurs-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #c8b1d9;
  border-radius: 10px;
  background-color: #f6ebf9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

.kurs-group {
  margin-bottom: 15px;
}
.kurs-group .form-select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #a084ca;
  font-size: 14px;
  margin-bottom: 15px;

}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #6a2c91;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #a084ca;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #6a2c91;
  box-shadow: 0 0 5px rgba(106, 44, 145, 0.5);
}

.success-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
  font-size: 14px;
}

.modal-backdrop {
  z-index: 1040; /* Bootstrap Modal-Z-Index */
}

.modal.show {
  display: block;
}
.img-thumbnail {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.img-thumbnail:hover {
  transform: scale(1.05);
}

.modal-header {
  background-color: #6a2c91;
  color: white;
}

.kurs-group .checkbox-group {
  margin: 5px 0;
}
.checkbox-group input[type="checkbox"] {
  margin-right: 10px;
}


</style>
