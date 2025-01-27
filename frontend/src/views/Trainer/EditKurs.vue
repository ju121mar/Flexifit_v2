<script setup xmlns="http://www.w3.org/1999/html">
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {apiCall} from "@/utility/ApiCall.js";
import BackButton from "@/components/Buttons/BackButton.vue";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/Buttons/SecondaryButton.vue";

const route = useRoute();
const router = useRouter();
const courseId = route.params.id;
const showModal = ref(false);

const showUpdatePopup = ref(false);

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
        trainer: response.trainer.id || "",
        teilnehmer: response.teilnehmer || 0,
        dauer: response.dauer || "",
        wochentag: response.wochentag || "",
        uhrzeit: response.uhrzeit ? response.uhrzeit.slice(0, 5) : "",
      };
    }
  } catch (error) {
    console.error('Fehler beim Laden der Kurse:', error);
  } finally {
    loading.value = false;
  }
  await selectTrainer();
});


const onSubmit = async () => {
  try {
    await apiCall({
      method: 'PUT',
      url: `/kurse/${courseId}`,
      data: formData.value,
    });
    showModal.value = true;
    showUpdatePopup.value = true;
    setTimeout(() => {
      showModal.value = false;
    }, 2000);
  } catch (error) {
    console.error("Fehler beim Speichern des Kurses:", error);
    alert("Es gab einen Fehler beim Speichern.");
  }
};


const confirmUpdate = () => {
  showUpdatePopup.value = false;
  router.push('/kursangebote')
};

function navigateBack() {
  router.push('/kursangebote')
}

</script>

<template>
  <BackButton @click="navigateBack">Zurück</BackButton>

  <div v-if="loading">Daten werden geladen...</div>
  <div v-else>
    <form @submit.prevent="onSubmit">
      <!-- Previous form content remains the same -->

      <div>
        <h2>Kurs bearbeiten</h2>
        <label for="name">Kursname:</label>
        <input id="name" v-model="formData.name" type="text"/>
      </div>

      <div class="kurs-group">
        <label for="trainer">Trainername:</label>
        <select id="userDropdown" :v-model="formData.trainer" class="form-select" required>
          <option disabled value="">Bitte einen Benutzer auswählen</option>
          <option v-for="user in trainer" :key="user.id" :value="user.id">
            {{ user.firstName }} {{ user.lastName }}
          </option>
        </select>
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
      <div
          v-if="showUpdatePopup"
          class="popup-backdrop"
      >
        <div class="popup">
          <h2><strong>Bestätigung</strong></h2>
          <p>Der Kurs wurde erfolgreich aktualisiert</p>
          <div class="popup-buttons">
            <button   @click="confirmUpdate">OK</button>
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->

  </div>
</template>

<style scoped>

.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.popup h2 {
  color: #7030a0;
  margin-bottom: 10px;
}

.popup p {
  margin-bottom: 20px;
}

.popup-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}


.kurs-group .form-select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #d3bfe3;
  font-size: 14px;
  margin-bottom: 15px;
}

form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #d8b5ea;
  border-radius: 10px;
  background-color: #f6ebf9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d3bfe3;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

button {
  padding: 10px 15px;
  background-color: #7030a0;
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

button:hover {
  background-color: #d8b5ea;
  color: #7030a0;
}

label {
  display: block;
  margin-bottom: 5px;
  margin-top: 10px;
  font-weight: bold;
  color: #7030a0;
}

/* New modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal p {
  margin: 0;
  color: #7030a0;
  font-weight: bold;
}
</style>