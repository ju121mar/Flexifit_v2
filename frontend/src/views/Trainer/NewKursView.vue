<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'
import {apiCall} from "@/utility/ApiCall.js";
import router from "@/router/index.js";
import BackButton from "@/components/Buttons/BackButton.vue";
import SecondaryButton from "@/components/Buttons/SecondaryButton.vue";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
const selectedImage = ref("");
const newKurs = ref({
  name: "",
  trainer:"",
  uhrzeit:"",
  wochentag:"",
  dauer:"",
  teilnehmer:"",
  description: "",
  image: "",
});

//vordefinierteAuswahl an Bildern
const imagePath = ref([
  { title: "HIIT", path: "/src/assets/pictures/HIIT.jpg" },
  { title: "Pilates", path: "/src/assets/pictures/Pilates.jpg" },
  { title: "Yoga", path: "/src/assets/pictures/Yoga.jpg" },
]);

//Neuen Kurs anlegen
const kursAdded = ref(false);
const submitForm = async () => {
  console.log("Formular abgesendet:", newKurs.value);
  newKurs.value.image = selectedImage.value
  console.log(newKurs.value)
  await apiCall({
    method: 'POST',
    url: '/kurs/erstellen',
    data: newKurs.value,
  }).then(() => {
    newKurs.value = {
      name: "",
      trainer: null,
      uhrzeit: "",
      wochentag: "",
      dauer: "",
      maxTeilnehmer: "",
      description: "",
      image:"",
    };
    router.push('/kursangebote');
  });
  kursAdded.value = true;
};

const trainer = ref([]);

onMounted(async ()=>{
  await selectTrainer();
    });

//Trainerdaten laden
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

const showImageDialog = ref(false)

function handleImageDialog(){
  showImageDialog.value = !showImageDialog.value;
}
//zur vorherigen Seite navigieren
function navigateBack() {
  router.push('/kursangebote');
}



</script>
<template>
  <BackButton @click="navigateBack" class="button zurueck-button">Zurück</BackButton>
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
      <div class="kurs-group">
        <label for="kursDescription">Bild: {{selectedImage}}</label>
        <PrimaryButton buttontext="Bild auswählen" id="kursImage" type="button" @click="handleImageDialog" ></PrimaryButton>
      </div>
      <SecondaryButton buttontext="Kurs erstellen" type="submit"></SecondaryButton>

    </form>
    <div v-if="kursAdded" class="success-message">
      <p>Kurs erfolgreich hinzugefügt!!</p>
    </div>
  </div>

  <div
      class="modal fade"
      :class="{ 'show d-block': showImageDialog }"
      tabindex="-1"
      role="dialog"
      aria-labelledby="imageModalLabel"
      aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="imageModalLabel">Bildanzeige</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="handleImageDialog"></button>
        </div>
        <div class="modal-body text-center">
          <div class="modal-body">
            <form @submit.prevent="saveSelectedImage">
              <div class="row">
                <div
                    v-for="(image, index) in imagePath"
                    :key="index"
                    class="col-6 col-md-4 mb-4 text-center"
                >
                  <img
                      :src="image.path"
                      :alt="image.title"
                      class="img-thumbnail"
                      style="max-width: 100%; height: auto;"
                  />
                  <div class="form-check mt-2">
                    <input
                        type="radio"
                        name="imageSelect"
                        :value="image.path"
                        v-model="selectedImage"
                        required
                    />
                    <label class="form-check-label">{{ image.title }}</label>
                  </div>
                </div>
              </div>
              <div class="text-end mt-3">
                <PrimaryButton buttontext="Speichern" type="button" @click="handleImageDialog" >Speichern</PrimaryButton>
                <SecondaryButton buttontext="Schließen" type="submit" @click="handleImageDialog" >Schließen</SecondaryButton>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div v-if="showImageDialog" class="modal-backdrop fade show"></div>


</template>

<style scoped>

.kurs-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #d3bfe3;
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
  border: 1px solid #d3bfe3;
  font-size: 14px;
  margin-bottom: 15px;

}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #7030a0;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d3bfe3;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #7030a0;
  box-shadow: 0 0 5px rgba(112, 48, 160, 0.5);
}

.success-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #d3bfe3;
  border: 1px solid #d8b5ea;
  border-radius: 4px;
  color: #155724;
  font-size: 14px;
}

button{
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
  margin-right: 70px;
}

button:hover{
  background-color: #d8b5ea;
  color: #7030a0;
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
  background-color: #7030a0;
  color: white;
}

</style>
