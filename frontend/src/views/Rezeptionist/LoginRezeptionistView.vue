<script setup>
import { ref } from 'vue'
import {useRouter} from "vue-router";
import {useRezeptionistStore} from "@/stores/rezeptionist.js";

const rezeptionistStore = useRezeptionistStore();
const router = useRouter()
let email = ref("");
let password = ref("");
let loginError = ref(false);

async function login() {
  try {
    await rezeptionistStore.signIn(email.value, password.value);
    if (useRezeptionistStore().rezeptionist) {
      console.log("Logged in");
      // router.push ('/kursangebote')
    }
  } catch (error) {
    loginError.value = true;
    console.error("Login failed:", error);
  }
}
</script>

<template>
  <form class="kurs-form" @submit.prevent="login">
    <div class="kurs-group">
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="email" placeholder="Email eingeben" />
    </div>
    <div class="kurs-group">
      <label for="password">Passwort:</label>
      <input id="password" type="password" v-model="password" placeholder="Passwort eingeben" />
    </div>
    <button type="submit">Login</button>
    <RouterLink to="/login/success/rezeptionist" class="zurueck-button">Zurück</RouterLink>
  </form>
  <div v-if="loginError" class="popup">
    <div class="popup-content">
      <p><strong>Ungültige Anmeldedaten</strong></p>
      <p>Versuchen Sie es nochmal.</p>
      <button @click="loginError = false">OK</button>
    </div>
  </div>
  <div class="additional-links">
    <RouterLink to="/login" class="text-link">Trainer Login</RouterLink>
    <span>|</span>
    <RouterLink to="/login/mitglied" class="text-link">Mitglied Login</RouterLink>
  </div>
</template>

<style scoped>
.additional-links {
  margin-top: 20px;
  text-align: center;
}

.text-link {
  color: #7030a0;
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
  color: #7030a0;
}

.kurs-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #d8b5ea;
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
  color: #7030a0;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d8b5ea;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #7030a0;
  box-shadow: 0 0 5px rgba(106, 44, 145, 0.5);
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
