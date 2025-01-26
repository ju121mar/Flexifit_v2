<script setup>
import {useRezeptionistStore} from "@/stores/rezeptionist.js";

const rezeptionistStore =useRezeptionistStore();
import {useRouter} from "vue-router";
const router = useRouter();

function navigateToTrainerView() {
  router.push("/kursangebote/manage");
}
</script>

<template>
  <form class="kurs-form">
    <div class="kurs-group">
      Rezeptionistlogin erfolgreich.
      <p v-if="rezeptionistStore.rezeptionist">
        Hallo, {{ rezeptionistStore.rezeptionist.firstName}} {{ rezeptionistStore.rezeptionist.lasttName}}! Stay Flexi!
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
  border: 1px solid #d8b5ea;
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
  color: #7030a0;

  .nav-button {
    padding: 10px 20px;
    background-color: #7030a0;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .nav-button:hover {
    background-color: #d8b5ea;
    color: #7030a0;
  }
}

</style>