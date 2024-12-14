<script setup>
import { ref } from 'vue'
import { useTrainerStore } from "@/stores/trainer.js";

const trainerStore = useTrainerStore();
let email = ref("");
let password = ref("");

async function login() {
  await trainerStore.signIn(email.value, password.value);
  if (useTrainerStore().trainer) {
    console.log("Logged in");
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
    <a href="/" class="zurueck-button">Zurück</a>
  </form>
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
</style>
