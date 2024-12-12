<script setup>
import { ref } from 'vue'
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
let email = ref("");
let password =ref("");
async function login() {
  userStore.signIn(email.value, password.value);
  if (useUserStore.user) {
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
