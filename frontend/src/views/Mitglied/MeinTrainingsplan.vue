<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { apiCall } from "@/utility/ApiCall.js";
import BackButton from "@/components/Buttons/BackButton.vue";

const exercises = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const router = useRouter();
const showDetails = ref([]);
const level = ref(route.query.level || "Anfänger"); // Standardlevel
const frequency = ref(route.query.frequency);

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

// Wochentage und Logik
const weekdays = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6", "Tag 7"];


// Navigation zurück
function navigateBack() {
  router.push("/trainingsplan");
}

// Anpassung der Wiederholungen basierend auf dem Level
function adjustForLevel(exercises, level, frequency) {
  return exercises.map((exercise) => {
    let adjustedExercise = { ...exercise }; // Kopieren der Übung
    if (frequency === "drei" && exercise.weekday === "Tag 2" || frequency === "drei" && exercise.weekday === "Tag 4" || frequency === "drei" && exercise.weekday === "Tag 7" ) {
      adjustedExercise.weekday = null;
    } else if (frequency === "fuenf" && exercise.weekday === "Tag 3" ) {
      adjustedExercise.weekday = null;
    }
    if (level === "Anfänger") {
      adjustedExercise.rep = "12"; // Anfänger: 12 Wiederholungen
      adjustedExercise.set = "3";
    } else if (level === "Fortgeschritten") {
      adjustedExercise.rep = "10"; // Fortgeschritten: 10 Wiederholungen
      adjustedExercise.set = "4";
    } else if (level === "Experte") {
      adjustedExercise.rep = "8"; // Experte: 8 Wiederholungen
      adjustedExercise.set = "5";
    }
    return adjustedExercise;
  });
}

// Anpassung Übungen basierend auf Trainingstagen
/*function adjustForWeekdays(exercises, weekday) {
  return exercises.map((exercise) => {
    let adjustedDay = { ...exercise};
    if (frequency === "drei") {
      adjustedDay.equipmentname = "Körpergewicht";
    }
    return adjustedDay

  });
}*/

onMounted(async () => {
  try {
    const response = await apiCall({
      method: "GET",
      url: "/exercises", // Backend-Route, die alle Übungen liefert
    });
    const allExercises = response;
    exercises.value = adjustForLevel(allExercises, level.value, frequency.value);
    console.log("Übungen geladen:", exercises.value);
    showDetails.value = exercises.value.map(() => false);
  } catch (err) {
    console.error("Fehler beim Laden der Übungen:", err);
    error.value = "Fehler beim Laden der Übungen.";
  } finally {
    loading.value = false;
  }
});

function toggleDetails(index) {
  showDetails.value[index] = !showDetails.value[index]; // Umschalten des Detailzustands
}
</script>

<template>
  <div v-if="loading">Daten werden geladen...</div>
  <div v-else-if="error">{{ error }}</div>
  <section v-else class="exercise-container">
    <div class="header-controls">
      <BackButton @click="navigateBack"></BackButton>
      <span class="current-date">{{ currentDate.date }}</span>
      <span class="current-time">{{ currentDate.time }}</span>
    </div>
    <div v-for="(exercise, index) in exercises" :key="exercise.id" class="exercise-card">
      <h2>{{ exercise.exercisename }}</h2>
      <p><strong>Gerätename:</strong> {{ exercise.equipmentname }}</p>
      <p><strong>Sätze:</strong> {{ exercise.set }}</p>
      <p><strong>Wiederholungen:</strong> {{ exercise.rep }}</p>
      <p><strong></strong> {{ exercise.weekday }}</p>
      <div v-if="showDetails[index]">
        <p><strong>Setup:</strong> {{ exercise.setup }}</p>
        <p><strong>Ausführung:</strong> {{ exercise.execution }}</p>
      </div>
      <button class="detail-button" @click="toggleDetails(index)">
        {{ showDetails[index] ? 'Details verbergen' : 'Details anzeigen' }}
      </button>
    </div>
  </section>
</template>


  <style scoped>
  .exercise-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* Abstand zwischen den Karten */
    justify-content: center;
    padding: 20px;
  }
  
  .exercise-card {
    border: 1px solid #d2b4e8; /* Leichtes Lila für die Umrandung */
    border-radius: 10px;
    padding: 15px;
    background-color: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Weicher Schatten */
    width: 300px;
    text-align: left;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .exercise-card:hover {
    transform: translateY(-5px); /* Leichter Schwebeeffekt */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Stärkerer Schatten beim Hover */
  }
  
  .exercise-card h2 {
    color: #7030a0; /* Lila für Titel */
    margin-bottom: 10px;
  }
  
  .exercise-card p {
    margin: 5px 0;
    font-size: 16px;
    color: #333333;
  }
  
  .exercise-card strong {
    color: #6a2c91; /* Lila Akzente für Labels */
  }
  
  .exercise-card .book-button {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 10px;
    padding: 10px;
    background-color: #6a2c91;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .exercise-card .book-button:hover {
    background-color: #4e216c; /* Dunkleres Lila beim Hover */
  }

  .detail-button {
  color: #ffffff; /* Weiße Schrift */
  background-color: #7030a0; /* Lila Hintergrund */
  border: 2px solid #7030a0; /* Lila Umrandung */
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease; /* Weicher Übergang */
  font-size: 22px;
}

.detail-button:hover {
  background-color: #ffffff; /* Weißer Hintergrund */
  color: #7030a0; /* Lila Schrift */
  border: 2px solid #7030a0; /* Lila Umrandung */
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.current-date, .current-time {
  color: #d8b5ea;
  font-weight: bold;
  display: block;
  font-size: 18px;
  text-align: center;
}

.weekdays {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.day-button {
  padding: 10px 15px;
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

.active-day {
  border: 2px solid #4e216c;
  background-color: #d8b5ea;
}


  </style>
  