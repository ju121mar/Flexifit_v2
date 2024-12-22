<script setup>
import { ref, onMounted } from 'vue';
import BackButton from "@/components/Buttons/BackButton.vue";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import NewTrainingsplanView from '@/views/NewTrainingsplanView.vue';
import MeinTrainingsplan from '@/views/Mitglied/MeinTrainingsplan.vue'
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';


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
  
      <div class="button-container">
        <PrimaryButton class="primarybutton" buttontext="Mein persönlicher Trainingsplan" @click="goToPersonalPlan"></PrimaryButton>
        <PrimaryButton class="primarybutton" buttontext="Trainingsplan erstellen" @click="createNewPlan"></PrimaryButton>
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
  }
  

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  </style>
  