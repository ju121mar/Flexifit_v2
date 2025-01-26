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
const showDetails = ref({});
const level = ref(route.query.level || "Anfänger"); // Standardlevel
const frequency = ref(route.query.frequency);
const goal = ref(route.query.goal);
const weekdays = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6", "Tag 7"];
const activeDay = ref("Tag 1"); // Standartag


function setActiveDay(day) {
  activeDay.value = day;
}

// Navigation zurück
function navigateBack() {
  router.push("/trainingsplan/new");
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


function toggleDetails(day, id) {
  const key = `${day}-${id}`; // Eindeutige Kennung basierend auf Tag und ID
  showDetails.value[key] = !showDetails.value[key];
}
</script>

<template>
  <div class="heading">
   <h2 v-if="mitgliedStore.mitglied">
        {{ mitgliedStore.mitglied.firstName}}s Trainingsplan
   </h2>
    </div>
  <div v-if="loading">Daten werden geladen...</div>
  <div v-else-if="error">{{ error }}</div>
  <section v-else class="exercise-container">
    <div class="header-controls">
      <button class="editbutton" @click="navigateBack">← Plan bearbeiten</button>
    </div>
    <div class="weekdays">
      <button
        v-for="day in weekdays"
        :key="day"
        class="day-button"
       :class="{ 'current-day': day === activeDay }"
        @click="setActiveDay(day)"
      >
        {{ day }}
      </button>
    </div>
    <div class="exercises">
      <div v-if="exercises.filter((exercise) => exercise.weekday === activeDay).length === 0">
    <h2>RESTDAY</h2>
    </div>
    <div
  v-for="(exercise, index) in exercises.filter((exercise) => exercise.weekday === activeDay)"
  :key="exercise.id"
  class="exercise-card"
  :class="{ expanded: showDetails[`${activeDay}-${exercise.id}`] }"
>
  <h2>{{ exercise.exercisename }}</h2>
  <p><strong>Gerätename:</strong> {{ exercise.equipmentname }}</p>
  <p><strong>Sätze:</strong> {{ exercise.set }}</p>
  <p><strong>Wiederholungen:</strong> {{ exercise.rep }}</p>
  <div v-if="showDetails[`${activeDay}-${exercise.id}`]">
    <p><strong>Setup:</strong> {{ exercise.setup }}</p>
    <p><strong>Ausführung:</strong> {{ exercise.execution }}</p>
  </div>
  <button
    class="detail-button"
    @click="toggleDetails(activeDay, exercise.id)"
  >
    {{ showDetails[`${activeDay}-${exercise.id}`] ? 'Details verbergen' : 'Details anzeigen' }}
  </button>
</div>

    </div>
  </section>
</template>


<style scoped>
/* Zentrieren der Überschrift */
.heading {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7030a0;
  margin-top: 20px;
  text-align: center;
}

.exercise-card h2 {
  margin-bottom: 15px;
  color: #7030a0 !important;
}

.exercises h2 {
  color:#d8b5ea;
}
/* Responsive Header für Datum und Uhrzeit */
.header-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

@media (min-width: 768px) {
  .header-controls {
    flex-direction: row;
    justify-content: space-between;
  }
}

/* Wochen-Tage */
.weekdays {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.day-button {
  padding: 10px 20px;
  border: 2px solid #7030a0;
  border-radius: 5px;
  background-color: #ffffff;
  color: #7030a0;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.day-button:hover,
.day-button.current-day {
  background-color: #7030a0;
  color: #ffffff;
}

/* Responsive Karten */
.exercises {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
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
  font-size: 22px;
  line-height: 1.5;
  max-height: 400px; 
  color:#666;
}

.exercise-card.expanded {
  max-height: 1000px; 
}

.exercise-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .exercise-card {
    width: 100%;
    padding: 10px;
    font-size: 18px;
  }
  .day-button {
    font-size: 16px;
  }
}

.detail-button {
  color: #ffffff;
  background-color: #7030a0;
  border: 2px solid #7030a0;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 22px;
}

.detail-button:hover {
  background-color: #ffffff;
  color: #7030a0;
  border: 2px solid #7030a0;
}


.editbutton {
  text-decoration: none;
  color: #7030a0;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 20px;
  margin-left: 220px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.editbutton:hover {
  background-color:#7030a0;
  color: #ffffff;
}
</style>


  