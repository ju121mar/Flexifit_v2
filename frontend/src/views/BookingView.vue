<script setup>
import { ref, onMounted } from 'vue';
import { useRoute} from 'vue-router'

const route = useRoute();
const kurs = ref(null);

// Beispiel-Kursdaten (ersetze mit API-Aufruf, falls nötig)
const kurse = [
  {
    id: "001",
    name: "Yoga Flow",
    trainer: "Emma Schill",
    uhrzeit: "8:00 Uhr",
    description: "Ein Kurs, der Körper und Geist durch fließende Bewegungen und gezielte Atemübungen stärkt und entspannt.",
  },
  {
    id: "002",
    name: "Balance Pilates",
    trainer: "Caro Klirr",
    uhrzeit: "17:00 Uhr",
    description: "Ein Kurs, der die Tiefenmuskulatur stärkt, die Körperhaltung verbessert und für mehr Flexibilität und Balance sorgt.",
  },
];

onMounted(() => {
  const kursId = route.params.id;
  kurs.value = kurse.find(k => k.id === kursId);
});
</script>

<template>
<section class="booking-section"></section>
  <div v-if="kurs">
    <h1>{{ kurs.name }}</h1>
    <p><strong>Trainer:</strong> {{ kurs.trainer }}</p>
      <p><strong>Uhrzeit:</strong> {{ kurs.uhrzeit }}</p>
      <p><strong>Beschreibung:</strong> {{ kurs.description }}</p>
  </div>
  <div v-else>
    <p>Kurs wird geladen...</p>
  </div>
</template>


<style scoped>
/* Gesamtseite */
.booking-page {
  font-family: Arial, sans-serif;
  padding: 20px;
}

/* Zurück-Link */
.back-link {
  margin-bottom: 20px;
}
.back-link a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
}

/* Datum und Uhrzeit */
.date-time {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.date,
.time {
  font-size: 14px;
  color: #777;
}

/* Kurskarte */
.course-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.course-card h2 {
  font-size: 20px;
  margin-bottom: 15px;
}
.course-image-placeholder img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin: 10px 0;
}
.course-details p {
  font-size: 14px;
  margin: 5px 0;
  color: #333;
}

/* Buchungsbutton */
.book-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}
.book-button:hover {
  background-color: #0056b3;
}
</style>