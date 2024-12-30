<script setup>
import { ref, onMounted } from 'vue';
import { useMitgliedStore } from '@/stores/mitglied.js';
import {apiCall} from "@/utility/ApiCall.js";

const mitgliedStore = useMitgliedStore();
const buchungen = ref([]);

// Buchungsdaten laden
onMounted(async () => {
  await getBooking();
  console.log(buchungen.value)
});

async function getBooking() {
  const response = await apiCall({
    url:'/getBookings',
    method: 'GET'
  });
  buchungen.value = response;
}
</script>

<template>
  <section class="buchungen-seite">
    <h1>Meine Buchungen:</h1>
    <div v-if="buchungen.length === 0">
      <p>Keine Buchungen vorhanden.</p>
    </div>
    <div v-else class="buchungen-container">
      <div v-for="buchung in buchungen" :key="buchung.id" class="buchung-card">
        <h2>{{ buchung.kurs.kursname }}</h2>
        <p><strong>Trainer:</strong> {{ buchung.kurs.trainer.firstName }} {{buchung.kurs.trainer.lastName}}</p>
        <p><strong>Wochentag:</strong> {{ buchung.kurs.wochentag }}</p>
        <p><strong>Uhrzeit:</strong> {{ buchung.kurs.uhrzeit }}</p>
        <p><strong>Status:</strong> {{ buchung.kurs.status }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.buchungen-seite {
  padding: 20px;
}

.buchungen-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Immer zwei Karten nebeneinander */
  gap: 16px; /* Abstand zwischen den Karten */
}

.buchung-card {
  border: 1px solid #d3bfe3;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(112, 48, 160, 0.3);
}


h1 {
  font-size: 24px;
  color: #4a148c;
}

h2 {
  font-size: 20px;
  color: #6a1b9a;
}

p {
  margin: 4px 0;
}
</style>
