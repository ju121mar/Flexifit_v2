<script setup>
import {ref} from 'vue';
import {useMitgliedStore} from "@/stores/mitglied.js";
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import BackButton from '@/components/Buttons/BackButton.vue';


const mitgliedStore = useMitgliedStore();
let firstName = ref("");
let lastName = ref("");
let dob = ref("");
let email = ref("");
let password = ref("");
let street = ref("");
let houseNumber = ref("");
let postalCode = ref("");
let city = ref("");

let errors = ref({
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  password: "",
  street: "",
  houseNumber: "",
  postalCode: "",
  city: ""
});

function validateForm() {
  // Alle Fehlermeldungen zurücksetzen
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = "";
  });

  let isValid = true;

  // Validierungslogik
  if (!firstName.value || firstName.value.length < 2 || firstName.value.length > 20) {
    errors.value.firstName = "Vorname muss zwischen 2 und 20 Zeichen liegen.";
    isValid = false;
  }

  if (!lastName.value || lastName.value.length < 2 || lastName.value.length > 20) {
    errors.value.lastName = "Nachname muss zwischen 2 und 20 Zeichen liegen.";
    isValid = false;
  }

  if (!dob.value) {
    errors.value.dob = "Geburtsdatum ist erforderlich.";
    isValid = false;
  }

  if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = "Bitte geben Sie eine gültige Email-Adresse ein.";
    isValid = false;
  }

  if (!password.value || password.value.length !== 6) {
    errors.value.password = "Passwort muss genau 6 Zeichen lang sein.";
    isValid = false;
  }

  if (!street.value || street.value.length < 5 || street.value.length > 30) {
    errors.value.street = "Straße muss zwischen 5 und 30 Zeichen liegen.";
    isValid = false;
  }

  if (!houseNumber.value || houseNumber.value < 1) {
    errors.value.houseNumber = "Hausnummer ist erforderlich.";
    isValid = false;
  }

  if (!postalCode.value || postalCode.value < 10000 || postalCode.value > 99999) {
    errors.value.postalCode = "Postleitzahl muss eine gültige Zahl sein.";
    isValid = false;
  }

  if (!city.value || city.value.length < 5 || city.value.length > 30) {
    errors.value.city = "Stadt muss zwischen 5 und 30 Zeichen liegen.";
    isValid = false;
  }

  // Wenn alles valide ist, führe die Registrierung aus
  if (isValid) {
    register();
  }
}

async function register() {
  await mitgliedStore.signUp(firstName.value, lastName.value, dob.value, email.value, password.value, street.value, houseNumber.value, postalCode.value, city.value);
  if (useMitgliedStore.mitglied) {
    console.log("Logged in")
  }
}
</script>

<template>
  <form class="kurs-form" @submit.prevent="validateForm">
    <RouterLink to="/login/mitglied">
      <BackButton class="backbutton" buttontext="Zurück"></BackButton>
    </RouterLink>
    <h2>Registrieren</h2>

    <!-- Vorname -->
    <div class="kurs-group">
      <label for="firstName">Vorname:</label>
      <input id="firstName" type="text" v-model="firstName" placeholder="Vorname eingeben"/>
      <p class="error-message" v-if="errors.firstName">{{ errors.firstName }}</p>
    </div>

    <!-- Nachname -->
    <div class="kurs-group">
      <label for="lastName">Nachname:</label>
      <input id="lastName" type="text" v-model="lastName" placeholder="Nachname eingeben"/>
      <p class="error-message" v-if="errors.lastName">{{ errors.lastName }}</p>
    </div>

    <!-- Geburtsdatum -->
    <div class="kurs-group">
      <label for="dob">Geburtsdatum:</label>
      <input id="dob" type="date" v-model="dob" />
      <p class="error-message" v-if="errors.dob">{{ errors.dob }}</p>
    </div>

    <!-- Email -->
    <div class="kurs-group">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="email" placeholder="Email eingeben"/>
      <p class="error-message" v-if="errors.email">{{ errors.email }}</p>
    </div>

    <!-- Passwort -->
    <div class="kurs-group">
      <label for="password">Passwort:</label>
      <input id="password" type="password" v-model="password" placeholder="6 Zeichen"/>
      <p class="error-message" v-if="errors.password">{{ errors.password }}</p>
    </div>

    <!-- Straße -->
    <div class="kurs-group">
      <label for="street">Straße:</label>
      <input id="street" type="text" v-model="street" placeholder="Straße eingeben"/>
      <p class="error-message" v-if="errors.street">{{ errors.street }}</p>
    </div>

    <!-- Hausnummer -->
    <div class="kurs-group">
      <label for="houseNumber">Hausnummer:</label>
      <input id="houseNumber" type="number" v-model="houseNumber" placeholder="Hausnummer eingeben"/>
      <p class="error-message" v-if="errors.houseNumber">{{ errors.houseNumber }}</p>
    </div>

    <!-- Postleitzahl -->
    <div class="kurs-group">
      <label for="postalCode">Postleitzahl:</label>
      <input id="postalCode" type="number" v-model="postalCode" placeholder="Postleitzahl eingeben"/>
      <p class="error-message" v-if="errors.postalCode">{{ errors.postalCode }}</p>
    </div>

    <!-- Stadt -->
    <div class="kurs-group">
      <label for="city">Stadt:</label>
      <input id="city" type="text" v-model="city" placeholder="Stadt eingeben"/>
      <p class="error-message" v-if="errors.city">{{ errors.city }}</p>
    </div>

    <PrimaryButton @click="register" buttontext="Jetzt registrieren!"></PrimaryButton>
  </form>
  <div v-if="loginError" class="popup">
    <div class="popup-content">
      <p><strong>Ungültige Anmeldedaten</strong></p>
      <p>Versuchen Sie es nochmal.</p>
      <button @click="loginError = false">OK</button>
    </div>
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
  font-family: 'Inter', sans-serif;
}

.kurs-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #7030a0
  ;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d8b5ea;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}


button,
.zurueck-button {
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
  margin-right: 10px;
}

button:hover,
.zurueck-button:hover {
  background-color: #4e216c;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.popup-content p {
  margin: 10px 0;
  color: #333;
}

.popup-content button {
  background-color: #7030a0;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.popup-content button:hover {
  background-color: #5e258f;
}

</style>
