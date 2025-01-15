<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";
import {useMitgliedStore} from "@/stores/mitglied.js";

const mitgliedStore = useMitgliedStore();
let firstName = ref("");
let lastName = ref("");
let email = ref("");
let password = ref("");
let street = ref("");
let houseNumber = ref("");
let postalCode = ref("");
let city = ref("");

async function register() {
  await mitgliedStore.signUp(firstName.value, lastName.value, email.value, password.value, street.value, houseNumber.value, postalCode.value, city.value);
  if (useMitgliedStore.mitglied) {
    console.log("Logged in")
  }
}
</script>

<template>
  <form class="kurs-form" @submit.prevent="register">
    <h2>Registrieren</h2>
    <div class="kurs-group">
      <label for="firstName">Vorname:</label>
      <input id="firstName" type="firstName" v-model="firstName" placeholder="Vorname eingeben"/>
    </div>
    <div class="kurs-group">
      <label for="lastName">Nachname:</label>
      <input id="lastName" type="lastName" v-model="lastName" placeholder="Nachname eingeben"/>
    </div>
    <div class="kurs-group">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="email" placeholder="Email eingeben"/>
    </div>
    <div class="kurs-group">
      <label for="password">Passwort:</label>
      <input id="password" type="password" v-model="password" placeholder="6 Zeichen"/>
    </div>
    <div class="kurs-group">
      <label for="street">Straße:</label>
      <input id="street" type="street" v-model="street" placeholder="Straße eingeben"/>
    </div>
    <div class="kurs-group">
      <label for="houseNumber">Hausnummer:</label>
      <input id="houseNumber" type="houseNumber" v-model="houseNumber" placeholder="Hausnummer eingeben"/>
    </div>
    <div class="kurs-group">
      <label for="postalCode">Postleitzahl:</label>
      <input id="postalCode" type="postalCode" v-model="postalCode" placeholder="Postleitzahl eingeben"/>
    </div>
    <div class="kurs-group">
      <label for="city">Stadt:</label>
      <input id="city" type="city" v-model="city" placeholder="Stadt eingeben"/>
    </div>
    <button type="submit">Jetzt Registrieren</button>
    <a href="/login/mitglied" class="zurueck-button">Zurück</a>
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
.additional-links {
  margin-top: 20px;
  text-align: center;
}

.text-link {
  color: #6a2c91;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.text-link:hover {
  color: #d8b5ea;
}

/* Separator Styling */
.additional-links span {
  margin: 0 10px;
  color: #6a2c91;
}

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

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #a084ca;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #6a2c91;
  box-shadow: 0 0 5px rgba(106, 44, 145, 0.5);
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
