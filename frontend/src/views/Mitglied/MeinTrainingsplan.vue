<script setup>
const mitgliedStore = useMitgliedStore();
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { apiCall } from "@/utility/ApiCall.js";
import BackButton from "@/components/Buttons/BackButton.vue";
import {useMitgliedStore} from "@/stores/mitglied.js";

const exercises = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const router = useRouter();
const showDetails = ref([]);
const level = ref(route.query.level || "Anfänger"); // Standardlevel
const frequency = ref(route.query.frequency);
const goal = ref(route.query.goal);
const weekdays = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6", "Tag 7"];
const activeDay = ref("Tag 1"); // Standartag


const currentDate = ref({
  date: new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }),
  time: new Date().toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }),
});



// Navigation zurück
function navigateBack() {
  router.push("/trainingsplan");
}

// Anpassung basierend auf Formulareingabe
function adjustForLevel(exercises, level, frequency, goal) {
  return exercises.map((exercise) => {
    let adjustedExercise = { ...exercise }; 
    // Frequenz-Anpassung: Trainingstage filtern
    if (
      (frequency === "drei" && ["Tag 2", "Tag 4", "Tag 7"].includes(exercise.weekday)) ||
      (frequency === "fuenf" && exercise.weekday === "Tag 3")
    ) {
      adjustedExercise.weekday = null; 
    }

    //Ziel Anpassung
    if (
      (goal === "MuskelaufbauOberkoerper") && ["Muskelaufbau Unterkörper", "Muskelaufbau Ganzkörper", "Ausdauerverbesserung"].includes(exercise.goal) ||
      (goal === "MuskelaufbauUnterkoerper") && ["Muskelaufbau Oberkörper", "Muskelaufbau Ganzkörper", "Ausdauerverbesserung"].includes(exercise.goal) ||
      (goal === "MuskelaufbauGanzkoerper") && ["Muskelaufbau Oberkörper", "Muskelaufbau Unterkörper", "Ausdauerverbesserung"].includes(exercise.goal) ||
      (goal === "Ausdauerverbesserung") && ["Muskelaufbau Oberkörper", "Muskelaufbau Ganzkörper", "Muskelaufbau Unterkörper"].includes(exercise.goal)

    ) {
      adjustedExercise.weekday = null;
    }

    // Level-Anpassung: Wiederholungen und Sätze
    if (level === "Anfänger") {
      adjustedExercise.rep = "12"; 
      adjustedExercise.set = "3"; 
    } else if (level === "Fortgeschritten") {
      adjustedExercise.rep = "10"; 
      adjustedExercise.set = "4";  
    } else if (level === "Experte") {
      adjustedExercise.rep = "8";  
      adjustedExercise.set = "5";  
    }

    return adjustedExercise;
  });
}


onMounted(async () => {
  try {
    const response = await apiCall({
      method: "GET",
      url: "/exercises", // Backend-Route, die alle Übungen liefert
    });
    const allExercises = response;
    exercises.value = adjustForLevel(allExercises, level.value, frequency.value, goal.value);
    console.log("Übungen geladen:", exercises.value);
    showDetails.value = exercises.value.map(() => false);
  } catch (err) {
    console.error("Fehler beim Laden der Übungen:", err);
    error.value = "Fehler beim Laden der Übungen.";
  } finally {
    loading.value = false;
  }
});

function setActiveDay(day) {
  activeDay.value = day;
}

function toggleDetails(index) {
  showDetails.value[index] = !showDetails.value[index]; // Umschalten des Detailzustands
}
</script>

<template>
   <p v-if="mitgliedStore.mitglied">
        Hallo, {{ mitgliedStore.mitglied.firstName}} {{ mitgliedStore.mitglied.lastName}}! Stay Flexi!
      </p>
  <div v-if="loading">Daten werden geladen...</div>
  <div v-else-if="error">{{ error }}</div>
  <section v-else class="exercise-container">
    <div class="header-controls">
      <BackButton @click="navigateBack"></BackButton>
      <span class="current-date">{{ currentDate.date }}</span>
      <span class="current-time">{{ currentDate.time }}</span>
    </div>
    <div class="weekdays">
      <button
        v-for="day in weekdays"
        :key="day"
        class="day-button"
        @click="setActiveDay(day)"
      >
        {{ day }}
      </button>
    </div>
    <div class="exercises">
      <div
        v-for="(exercise, index) in exercises.filter((exercise) => exercise.weekday === activeDay)"
        :key="exercise.id"
        class="exercise-card"
      >
      <h2>{{ exercise.exercisename }}</h2>
      <p><strong>Gerätename:</strong> {{ exercise.equipmentname }}</p>
      <p><strong>Sätze:</strong> {{ exercise.set }}</p>
      <p><strong>Wiederholungen:</strong> {{ exercise.rep }}</p>
      <div v-if="showDetails[index]">
        <p><strong>Setup:</strong> {{ exercise.setup }}</p>
        <p><strong>Ausführung:</strong> {{ exercise.execution }}</p>
      </div>
      <button class="detail-button" @click="toggleDetails(index)">
        {{ showDetails[index] ? 'Details verbergen' : 'Details anzeigen' }}
      </button>
    </div>
    </div>
  </section>
</template>


  <style scoped>
.exercise-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #7030a0;
}

.create-plan-button {
  padding: 10px 15px;
  background-color: #7030a0;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-plan-button:hover {
  background-color: #4e216c;
}

.weekdays {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.day-button {
  padding: 10px 20px;
  border: 2px solid #7030a0;
  border-radius: 5px;
  background-color: #ffffff;
  color: #7030a0;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.day-button:hover {
  background-color: #f3e7fc;
}

.current-day {
  background-color: #7030a0;
  color: #ffffff;
}

.exercises {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.exercise-card {
  border: 1px solid #d2b4e8;
  border-radius: 10px;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.exercise-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.exercise-card h2 {
  color: #7030a0;
  margin-bottom: 10px;
}

.exercise-card p {
  margin: 5px 0;
  font-size: 16px;
  color: #333333;
}

.detail-button {
  color: #ffffff;
  background-color: #7030a0;
  border: 2px solid #7030a0;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

.detail-button:hover {
  background-color: #ffffff;
  color: #7030a0;
  border: 2px solid #7030a0;
}

.current-date, .current-time {
  color: #d8b5ea;
  font-weight: bold;
  display: block;
  font-size: 18px;
  text-align: center;
}
</style>




  