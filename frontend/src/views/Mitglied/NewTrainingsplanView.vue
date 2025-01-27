<script setup>
import { ref, watch, onMounted } from "vue";
import { useFormStore } from "@/stores/formStore"; 
import router from "@/router/index.js";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import BackButton from "@/components/Buttons/BackButton.vue";

const formStore = useFormStore();

const newPlan = ref({ ...formStore.newPlan });

const errors = ref({
  gender: "",
  height: "",
  weight: "",
  age: "",
  goal: "",
  level: "",
  frequency: "",
});

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

function validateForm() {
  // Extrahiere alle Felder aus `newPlan.value`
  const { gender, height, weight, age, goal, level, frequency } = newPlan.value;

  // Alle Fehlermeldungen zurücksetzen
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = "";
  });

  let isValid = true;

  // Validierungslogik
  if (!gender) {
    errors.value.gender = "Bitte wählen Sie Ihr Geschlecht aus.";
    isValid = false;
  }

  if (!goal) {
    errors.value.goal = "Bitte wählen Sie ein Ziel aus.";
    isValid = false;
  }

  if (!level) {
    errors.value.level = "Bitte wählen Sie ein Level aus.";
    isValid = false;
  }

  if (!frequency) {
    errors.value.frequency = "Bitte wählen Sie die Trainingsfrequenz aus.";
    isValid = false;
  }

  if (!height || height < 130 || height > 300) {
    errors.value.height =
      "Ungültige Größe. Die Größe muss zwischen 130 cm und 300 cm liegen.";
    isValid = false;
  }

  if (!weight || weight < 35 || weight > 300) {
    errors.value.weight =
      "Ungültiges Gewicht. Das Gewicht muss zwischen 35 kg und 300 kg liegen.";
    isValid = false;
  }

  if (!age || age < 16 || age > 100) {
    errors.value.age =
      "Ungültiges Alter. Das Alter muss zwischen 16 und 100 Jahren liegen.";
    isValid = false;
  }

  // Wenn das Formular valide ist, rufe die Funktion `createNewPlan` auf
  if (isValid) {
    createNewPlan();
  }
}

</script>

<template>
  <div class="kurs-form">
    <BackButton class="backbutton" @click="goBack"></BackButton>
    <h2>Neuen Trainingsplan erstellen</h2>
    <form @submit.prevent="validateForm">
      <!-- Geschlecht -->
      <div class="kurs-group">
        <label for="gender">Geschlecht:</label>
        <select id="gender" v-model="newPlan.gender" class="form-select">
          <option disabled value="">Geschlecht auswählen</option>
          <option value="weiblich">weiblich</option>
          <option value="männlich">männlich</option>
          <option value="divers">divers</option>
        </select>
        <p class="error-message" v-if="errors.gender">{{ errors.gender }}</p>
      </div>

      <!-- Größe -->
      <div class="kurs-group">
        <label for="height">Größe in cm:</label>
        <input
          type="number"
          id="height"
          v-model="newPlan.height"
          placeholder="Größe eingeben"
        />
        <p class="error-message" v-if="errors.height">{{ errors.height }}</p>
      </div>

      <!-- Gewicht -->
      <div class="kurs-group">
        <label for="weight">Gewicht in kg:</label>
        <input
          type="number"
          id="weight"
          v-model="newPlan.weight"
          placeholder="Gewicht eingeben"
        />
        <p class="error-message" v-if="errors.weight">{{ errors.weight }}</p>
      </div>

      <!-- Alter -->
      <div class="kurs-group">
        <label for="age">Alter:</label>
        <input
          type="number"
          id="age"
          v-model="newPlan.age"
          placeholder="Alter eingeben"
        />
        <p class="error-message" v-if="errors.age">{{ errors.age }}</p>
      </div>

      <!-- Ziel -->
      <div class="kurs-group">
        <label for="goal">Mein Ziel:</label>
        <select id="goal" v-model="newPlan.goal" class="form-select">
          <option disabled value="">Ziel auswählen</option>
          <option value="MuskelaufbauGanzkoerper">Muskelaufbau Ganzkörper</option>
          <option value="MuskelaufbauUnterkoerper">Muskelaufbau Unterkörper</option>
          <option value="MuskelaufbauOberkoerper">Muskelaufbau Oberkörper</option>
          <option value="Ausdauerverbesserung">Ausdauerverbesserung</option>
        </select>
        <p class="error-message" v-if="errors.goal">{{ errors.goal }}</p>
      </div>

      <!-- Level -->
      <div class="kurs-group">
        <label for="level">Level:</label>
        <select id="level" v-model="newPlan.level" class="form-select">
          <option disabled value="">Level auswählen</option>
          <option value="Anfänger">Anfänger</option>
          <option value="Fortgeschritten">Fortgeschritten</option>
          <option value="Experte">Experte</option>
        </select>
        <p class="error-message" v-if="errors.level">{{ errors.level }}</p>
      </div>

      <!-- Trainingsfrequenz -->
      <div class="kurs-group">
        <label for="frequency">Trainingstage pro Woche:</label>
        <select
          id="frequency"
          v-model="newPlan.frequency"
          class="form-select"
        >
          <option disabled value="">Anzahl Trainingstage auswählen</option>
          <option value="drei">Drei Mal (Für Anfänger empfohlen)</option>
          <option value="fuenf">Fünf Mal</option>
        </select>
        <p class="error-message" v-if="errors.frequency">{{ errors.frequency }}</p>
      </div>

      <PrimaryButton
        class="primarybutton"
        buttontext="Plan anzeigen"
        @click="validateForm"
      ></PrimaryButton>
    </form>
  </div>
</template>

<style scoped>

.error-message {
  color: #d9534f;
  font-size: 14px;
  margin-top: 5px;
}

.kurs-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #d3bfe3;
  border-radius: 10px;
  background-color: #f6ebf9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.kurs-group {
  margin-bottom: 15px;
}
.kurs-group .form-select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #d8b5ea  ;
  font-size: 14px;
  margin-bottom: 15px;

}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #7030a0
  ;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d8b5ea;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #7030a0;
  box-shadow: 0 0 5px rgba(106, 44, 145, 0.5);
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
