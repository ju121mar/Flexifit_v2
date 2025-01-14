<script setup>
const mitgliedStore =useMitgliedStore();
import {useRouter} from "vue-router";
import {useMitgliedStore} from "@/stores/mitglied.js";
const router = useRouter();

function navigateToTrainerView() {
  router.push("/kursangebote/booking");
}
</script>

<template>
  <form class="kurs-form">
    <div class="kurs-group">
      Mitgliedlogin erfolgreich.
      <p v-if="mitgliedStore.mitglied">
        Hallo, {{ mitgliedStore.mitglied.firstName}} {{ mitgliedStore.mitglied.lastName}}! Stay Flexi!
      </p>
      <button type="button" @click="navigateToTrainerView" class="nav-button">
        Zu den Kursangeboten
      </button>
    </div>
  </form>
</template>

<style>
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
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #6a2c91;

  .nav-button {
    padding: 10px 20px;
    background-color: #6a2c91;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .nav-button:hover {
    background-color: #4e216c;
  }
}

</style>