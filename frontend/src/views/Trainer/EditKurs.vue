<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {apiCall} from "@/utility/ApiCall.js";

const route = useRoute();
const router = useRouter();
const courseId = route.params.id;
const kurse = ref([]);


const course = ref(null);

const formData = ref({
  name: "",
  description: "",
  trainer: "",
  teilnehmer: null,
  dauer: "",
  wochentag: "",
  uhrzeit: "",
});

const loading = ref(true);
const trainer = ref([]);
const selectTrainer = async () => {
  try {
    const response = await apiCall({
      method: 'GET',
      url: '/trainer',
    });
    trainer.value = response;
  } catch (error) {
    console.error('Fehler beim Laden der Trainer:', error);
    trainer.value = null;
  }
}

onMounted(async () => {
  try {
    const response = await apiCall({
      method: 'GET',
      url: `/kurse/${courseId}`,
    });
    if (response) {
      formData.value = {
        name: response.name || "",
        description: response.description || "",
        trainer: response.trainer || "",
        teilnehmer: response.teilnehmer || 0,
        dauer: response.dauer || "",
        wochentag: response.wochentag || "",
        uhrzeit: response.uhrzeit ? response.uhrzeit.slice(0, 5) : "",
      };
      console.log("Kursdaten geladen:", formData.value.teilnehmer);
    }
    console.log('Kurse geladen:', kurse.value);
  } catch (error) {
    console.error('Fehler beim Laden der Kurse:', error);
  } finally {
    loading.value = false;
  }
  await selectTrainer();
});

const onSubmit = async () => {
  console.log("Formular abgesendet:", formData.value);
  try {
    await apiCall({
      method: "PUT",
      url: `/kurse/${courseId}`,
      data: formData.value,
    });
    alert("Kurs erfolgreich aktualisiert!");
    router.push("/kursangebote");
  } catch (error) {
    console.error("Fehler beim Speichern des Kurses:", error);
    alert("Es gab einen Fehler beim Speichern.");
  }
};

</script>

<template>
  <div v-if="loading">Daten werden geladen...</div>
  <div v-else>
    <form @submit.prevent="onSubmit">
      <div>
        <h2>Kurs bearbeiten</h2>
        <label for="name">Kursname:</label>
        <input id="name" v-model="formData.name" type="text"/>
      </div>

      <div class="kurs-group">
        <label for="trainer">Trainername:</label>
        <select id="userDropdown" :v-model="formData.trainer"  class ="form-select" required>
          <option disabled value="">Bitte einen Benutzer auswählen</option>
          <option v-for="user in trainer" :key="user.id" :value="user.id">
            {{ user.firstName }} {{ user.lastName }}
          </option>
        </select>
        <!--      <input id="trainer" v-model="formData.trainer" type="text" />-->
      </div>

      <div>
        <label for="time">Uhrzeit:</label>
        <input id="time" v-model="formData.uhrzeit" type="time"/>
      </div>

      <div>
        <label for="duration">Dauer:</label>
        <input id="duration" v-model="formData.dauer" type="text"/>
      </div>

      <div class="kurs-group">
        <label for="weekday" class="form-label">Wochentag:</label>
        <div>
          <select id="weekday" v-model="formData.wochentag" class="form-select" required>
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
      </div>

      <div>
        <label for="participants">Teilnehmer:</label>
        <input id="participants" v-model.number="formData.teilnehmer" type="number"/>
      </div>

      <div>
        <label for="description">Beschreibung:</label>
        <textarea type="text" id="description" v-model="formData.description"></textarea>
      </div>

      <button type="submit">Kurs aktualisieren</button>
      <RouterLink to="/kursangebote" class="button zurueck-button">Zurück</RouterLink>
    </form>
  </div>
</template>

<style scoped>
.edit-course {
  padding: 20px;
}

.kurs-group .form-select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #a084ca;
  font-size: 14px;
  margin-bottom: 15px;

}

form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #c8b1d9;
  border-radius: 10px;
  background-color: #f6ebf9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #a084ca;
  border-radius: 4px;
  background-color: #fff;
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
  margin-right: 60px;
  margin-top: 40px;
}

button:hover,
.zurueck-button {
  background-color: #4e216c;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #6a2c91;
}

</style>
