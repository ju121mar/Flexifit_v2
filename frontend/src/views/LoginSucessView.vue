<script setup>
import { useTrainerStore } from "@/stores/trainer.js";
const trainerStore = useTrainerStore();
</script>

<template>
    <form class="kurs-form">
      <div class="kurs-group">
        Trainerlogin erfolgreich.
        <p v-if="trainerStore.trainer">
      Hallo, {{ trainerStore.trainer.firstName}} {{ trainerStore.trainer.lastName}}! Stay Flexi!
    </p>
    
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
  }

</style>