<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'
import {apiCall} from "@/utility/ApiCall.js";
import router from "@/router/index.js";
const newKurs = ref({
  name: "",
  trainer:"",
  uhrzeit:"",
  wochentag:"",
  dauer:"",
  teilnehmer:"",
  description: "",
  image:"",
});


// State to show success message
const kursAdded = ref(false);

// Function to handle form submission
const submitForm = async () => {
  console.log("Formular abgesendet:", newKurs.value);
  await apiCall({
    method: 'POST',
    url: '/kurs/erstellen',
    data: newKurs.value,
  }).then(() => {
    // Reset the form
    newKurs.value = {
      name: "",
      trainer: null,
      uhrzeit: "",
      wochentag: "",
      dauer: "",
      teilnehmer: "",
      description: "",
      image:"",
    };
    router.push('/kursangebote');
  });

  // Show success message
  kursAdded.value = true;
};

const FlexiImages = [
  {
    path: "@/assets/pictures/Yoga.jpg",
    alt: "Yoga"
  },
  {
    path: "frontend/src/assets/pictures/Pilates.jpg",
    alt: "Pilates"
  },
  {
    path: "frontend/src/assets/pictures/Zumba.jpg",
    alt: "Zumba"
  },
  {
    path: "frontend/src/assets/pictures/Boxing.jpg",
    alt: "Boxing"
  },
  {
    path: "frontend/src/assets/pictures/Dance.jpg",
    alt: "Dance"
  }
];



const trainer = ref([]);

onMounted(async ()=>{
  await selectTrainer();
    });

const selectTrainer = async () =>{
  try{
    const response = await apiCall({
      method: 'GET',
      url: '/trainer',
    });
    trainer.value = response;
  } catch(error){
    console.error('Fehler beim Laden der Trainer:', error);
    trainer.value = null;
  }
}


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
        <select id="userDropdown" v-model="newKurs.trainer" class ="form-select"required>
          <option disabled value="">Bitte einen Benutzer auswählen</option>
          <option v-for="user in trainer" :key="user.id" :value="user.id">
            {{ user.firstName }} {{ user.lastName }}
          </option>
        </select>
<!--        <input type="text" id="kursTrainer" v-model="newKurs.trainer" placeholder="Name des Trainers eingeben" required />-->
      </div>
      <div class="kurs-group">
        <label for="kursUhrzeit">Uhrzeit:</label>
        <input type="time" id="kursUhrzeit" v-model="newKurs.uhrzeit" placeholder="Uhrzeit eingeben" required />
      </div>
      <div class="kurs-group">
        <label for="kursDauer">Dauer:</label>
        <input type="number" id="kursDauer" v-model="newKurs.dauer" placeholder="Kursdauer eingeben" required min="0" max="90"/>
      </div>
      <div class="kurs-group">
        <label for="kursTag">Wochentag:</label>
        <select id="kursTag" v-model="newKurs.wochentag" class ="form-select"required>
          <option disabled value="">Wochentag auswählen</option>
          <option value="Montag">Montag</option>
          <option value="Dienstag">Dienstag</option>
          <option value="Mittwoch">Mittwoch</option>
          <option value="Donnerstag">Donnerstag</option>
          <option value="Freitag">Freitag</option>
          <option value="Samstag">Samstag</option>
          <option value="Sonntag">Sonntag</option>
        </select>
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
      <router-link to="/kursangebote" class="button zurueck-button">Zurück</router-link>
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

button,
.zurueck-button {
  padding: 10px 15px;
  background-color: #6a2c91;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  display: inline-block; 
  text-align: center; 
  text-decoration: none; 
  margin-right: 70px;
}

button:hover,
.zurueck-button:hover {
  background-color: #4e216c;
}
</style>
