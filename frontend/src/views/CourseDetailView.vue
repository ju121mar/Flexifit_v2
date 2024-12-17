<script setup>
import { ref, onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {apiCall} from "@/utility/ApiCall.js";

const route = useRoute();
const courseId = route.params.id; // Holt die ID aus der URL


const kurs = ref(null);
const loading = ref(true);
const trainer = ref([]);
const selectTrainer = async () => {
  try {
    const response = await apiCall({
      method: 'GET',
      url: '/trainer',
    });
    trainer.value = response;
  } catch (error) {
    console.error('Fehler beim Laden der Trainer:', error);
    trainer.value = null;
  }
}

onMounted(async () => {
  try {
    const response = await apiCall({
      method: 'GET',
      url: `/kurse/${courseId}`,
    });
      kurs.value = response;
      console.log("Kursdaten geladen:", kurs.value);
  } catch (error) {
    console.error('Fehler beim Laden der Kurse:', error);
  } finally {
    loading.value = false;
  }
  await selectTrainer();
});


</script>

<template>
  <div v-if="loading">Daten werden geladen...</div>
  <section v-else class="kurs-detail">
    <div class="kurs-container" v-if="kurs">
      <!-- Zurück-Link -->
      <a href="/kursangebote/booking" class="back-link">&lt; Zurück</a>
      <div class="date-time">
        <span class="date">{{ kurs.wochentag }}</span>
        <span class="time">{{ kurs.uhrzeit }}</span>
      </div>

      <!-- Kursinformationen -->
      <div class="kurs-card">
        <h2 class="kurs-title">{{ kurs.name }}</h2>
<!--        <div class="kurs-image">-->
<!--          <img-->
<!--              v-if="kurs.image"-->
<!--              :src="kurs.image"-->
<!--              alt="Kurs Bild"-->
<!--          />-->
<!--          <div v-else class="no-image">Bild nicht verfügbar</div>-->
<!--        </div>-->

        <div class="kurs-info">
          <p><strong>Trainer:</strong> {{ kurs.trainer.firstName }} {{kurs.trainer.lastName}}</p>
          <p><strong>Wochentag:</strong> {{ kurs.wochentag }}</p>
          <p><strong>Uhrzeit:</strong> {{ kurs.uhrzeit }}</p>
          <p><strong>Beschreibung:</strong> {{ kurs.description }}</p>
          <p><strong>Equipment:</strong> {{ kurs.equipment }}</p>
        </div>

        <!-- Buchungsbutton -->
        <button class="book-button" @click="alert('Du hast den Kurs gebucht!')">
          Jetzt Buchen
        </button>
      </div>
    </div>
  </section>
</template>


<style scoped>
/* Container für Kursdetail */
.kurs-detail {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #c8b1d9;
  border-radius: 10px;
  background-color: #f6ebf9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

.kurs-container {
  text-align: left;
}

/* Zurück-Link */
.back-link {
  text-decoration: none;
  color: #6a2c91;
  font-weight: bold;
  margin-bottom: 10px;
  display: inline-block;
}

.back-link:hover {
  color: #4e216c;
}

/* Datum und Uhrzeit */
.date-time {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.date,
.time {
  background-color: #e0cff2;
  color: #7030a0;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
}

/* Kurskarte */
.kurs-card {
  border: 1px solid #d2b4e8;
  border-radius: 10px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Titel */
.kurs-title {
  font-size: 1.5rem;
  color: #7030a0;
  margin-bottom: 10px;
  text-align: left;
}

/* Kursbild */
.kurs-image {
  text-align: center;
  margin-bottom: 15px;
}

.kurs-image img {
  max-width: 100%;
  border-radius: 8px;
}

.no-image {
  width: 100%;
  height: 150px;
  background-color: #f0e6f5;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7030a0;
}

/* Kursinformationen */
.kurs-info p {
  margin: 5px 0;
  font-size: 14px;
  color:#333333;
}

.kurs-info strong {
  color: #6a2c91;
}

/* Buchungsbutton */
.book-button {
  width: 100%;
  padding: 10px;
  background-color: #6a2c91;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.book-button:hover {
  background-color: #4e216c;
}
</style>