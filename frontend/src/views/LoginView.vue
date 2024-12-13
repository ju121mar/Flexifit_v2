<script setup>
import { ref } from 'vue'
import {useTrainerStore} from "@/stores/trainer.js";
const trainerStore = useTrainerStore();
let email = ref("");
let password =ref("");
async function login() {
  await trainerStore.signIn(email.value, password.value);
  if (useTrainerStore().trainer) {
    console.log("Logged in")
  }
}
</script>
<template>
  <form @submit.prevent="login">
    <div>
      <label>Email: </label>
      <input type="email" v-model="email" />
    </div>
    <div>
      <label>Password: </label>
      <input type="password" v-model="password" />
    </div>
    <button type="submit">Login</button>
  </form>
</template>
<style>
form {
  margin-top:2rem;
}
</style>
