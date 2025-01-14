<script setup>
import BackButton from "@/components/Buttons/BackButton.vue";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import {useRoute, useRouter} from 'vue-router';


const router = useRouter();
function navigateBack() {
  router.push('/'); 
}

function createNewPlan() {
  router.push('/trainingsplan/new'); 
}

function goToPersonalPlan() {
  router.push('/trainingsplan/exercise/:id'); 
}

</script>

<template>
    <div class="container">
      <BackButton @click="navigateBack"></BackButton>
      <h2>Dein individueller Trainingsplan</h2>
      Halbmarathon laufen, 10 Kilo abnehmen, 100 Liegestütze schaffen: Verfolgst du auch ein bestimmtes Trainingsziel? Dann brauchst du einen Plan! Wir stellen für dich einen individuellen Trainingsplan zusammen mit Übungen zum Muskeln aufbauen, Abnehmen und für mehr Ausdauer!
      <div class="button-container">
        <PrimaryButton class="primarybutton" buttontext="Mein persönlicher Trainingsplan" @click="createNewPlan"></PrimaryButton>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f6ebf9;
    margin: 0;
    padding: 0;
  }
  
  .container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #d2b4e8;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 20px;
  }

  .container h2 {
    color: #7030a0;
    margin-bottom: 20px;

  }
  

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
  </style>
  