<script setup>
import { ref, onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {apiCall} from "@/utility/ApiCall.js";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/Buttons/SecondaryButton.vue";
import BackButton from "@/components/Buttons/BackButton.vue";


const exercises = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const router = useRouter();
const exerciseId = route.params.id;
const showDetails = ref([]);

function navigateBack() {
  router.push('/trainingsplan'); 
}

onMounted(async () => {
  try {
    const response = await apiCall({
      method: 'GET',
      url: '/exercises', // Backend-Route, die alle Übungen liefert
    });
    exercises.value = response;
    console.log("Übungen geladen:", exercises.value);
    showDetails.value = exercises.value.map(() => false);
  } catch (err) {
    console.error('Fehler beim Laden der Übungen:', err);
    error.value = 'Fehler beim Laden der Übungen.';
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
    <section v-else class = "exercise-container">
            <BackButton @click="navigateBack"></BackButton> 
      <div v-for="exercise in exercises" :key="exercise.id" class="exercise-card">
        <h2>{{ exercise.exercisename }}</h2>
        <p><strong>Gerätename:</strong> {{ exercise.equipmentname }}</p>
        <p><strong>Sätze:</strong> {{ exercise.set }}</p>
        <p><strong>Wiederholungen:</strong> {{ exercise.rep }}</p>
        <!-- Detailinformationen -->
      <div v-if="showDetails[index]">
        <p><strong>Setup:</strong> {{ exercise.setup }}</p>
        <p><strong>Ausführung:</strong> {{ exercise.execution }}</p>
      </div>

      <!-- Button zum Anzeigen/Verbergen der Details -->
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
  </style>
  