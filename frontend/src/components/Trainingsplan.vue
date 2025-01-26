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
      <div class = "back-button">
      <BackButton @click="navigateBack"></BackButton>
    </div>
      <h2>Dein individueller Trainingsplan</h2>
      Halbmarathon laufen, 10 Kilo abnehmen, 100 Liegestütze schaffen: Verfolgst du auch ein bestimmtes Trainingsziel? Dann brauchst du einen Plan! Wir stellen für dich einen individuellen Trainingsplan zusammen mit Übungen zum Muskeln aufbauen, Abnehmen und für mehr Ausdauer!
      <div class="button-container">
        <PrimaryButton class="primarybutton" buttontext="Mein Trainingsplan" @click="createNewPlan"></PrimaryButton>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  
  body {
    margin: 0;
    padding: 0;
  }
  
  .container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #7030a0;
    border-radius: 12px;
    background-color: #d3bfe3;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 22px;
  }

  .container h2 {
    color: #7030a0;
    margin-bottom: 20px;
    

  }

  .button-container {
    margin-top: 20px;
  }


  @media (max-width: 768px) {
  .container {
    padding: 15px;
    font-size: 18px;
  }
}
  
  </style>
  