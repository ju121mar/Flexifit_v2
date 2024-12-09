<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'
const newKurs = ref({
  name: "",
  trainer:"",
  uhrzeit:"",
  wochentag:"",
  dauer:"",
  teilnehmer:"",
  description: "",
});

// State to show success message
const kursAdded = ref(false);

// Function to handle form submission
const submitForm = () => {
  axios.post('/kurse', newKurs.value)
    .then((response) => {
      console.log("Neuer Kurs hinzugefügt:", newKurs.value);

      // Reset the form
      newKurs.value = {
        name: "",
        trainer:"",
        uhrzeit:"",
        wochentag:"",
        dauer:"",
        teilnehmer:"",
        description: "",
    };

      // Show success message
      kursAdded.value = true;

      // Hide the success message after 3 seconds
      setTimeout(() => {
        kursAdded.value = false;
      }, 3000);
    })
};
</script>
<template>
  <div class="kurs-form">
    <h2>Neuen Kurs erstellen</h2>
    <form @submit.prevent="submitForm">
      <div class="kurs-group">
        <label for="kursName">Kursname:</label>
        <input type="text" id="kursName" v-model="newKurs.name" placeholder="Kursname eingeben" required />
      </div>
      <div class="kurs-group">
        <label for="kursTrainer">Trainername:</label>
        <input type="text" id="kursTrainer" v-model="newKurs.trainer" placeholder="Name des Trainers eingeben" required />
      </div>
      <div class="kurs-group">
        <label for="kursUhrzeit">Uhrzeit:</label>
        <input type="text" id="kursUhrzeit" v-model="newKurs.uhrzeit" placeholder="Uhrzeit eingeben" required />
      </div>
      <div class="kurs-group">
        <label for="kursDauer">Dauer:</label>
        <input type="text" id="kursDauer" v-model="newKurs.dauer" placeholder="Kursdauer eingeben" required />
      </div>
      <div class="kurs-group">
        <label for="kursTag">Wochentag:</label>
        <input type="text" id="kursTag" v-model="newKurs.wochentag" placeholder="Wochentag eingeben" required />
      </div>
      <div class="kurs-group">
        <label for="kursTeilnehmer">max. Teilnehmer:</label>
        <input type="text" id="kursTeilnehmer" v-model="newKurs.teilnehmer" placeholder="Maximale Anzahl der Teilnehmer eingeben" required />
      </div>
      <div class="kurs-group">
        <label for="kursDescription">Beschreibung:</label>
        <textarea id="kursDescription" v-model="newKurs.description" placeholder="Kursbeschreibung eingeben" required></textarea>
      </div>
      <button type="submit">Kurs erstellen</button>
    </form>
    <div v-if="kursAdded" class="success-message">
      <p>Kurs erfolgreich hinzugefügt!!</p>
    </div>
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

button {
  padding: 10px 15px;
  background-color: #6a2c91; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4e216c; 
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
</style>
