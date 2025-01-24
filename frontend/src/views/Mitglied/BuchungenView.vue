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
        <h2>{{ buchung.kurs.name }}</h2>
        <div class="buchung-info">
          <p><strong>Trainer:</strong> {{ buchung.kurs.trainer.firstName }} {{buchung.kurs.trainer.lastName}}</p>
          <p><strong>Wochentag:</strong> {{ buchung.kurs.wochentag }}</p>
          <p><strong>Uhrzeit:</strong> {{ buchung.kurs.uhrzeit }}</p>
          <p><strong>Status:</strong> {{ buchung.status }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.buchungen-seite {
  padding: 20px;
  background-color: #ffffff;
}

.buchungen-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
}

.buchung-card {
  display: flex;
  flex-direction: column;
  border: 2px solid #d3bfe3;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(112, 48, 160, 0.3);
}

.buchung-info {
  display: flex;
  flex-direction: column;
}

h1 {
  color: #7030a0;
  font-weight: bold;
  text-align: center;
  margin-bottom: 80px;
}

h2 {
  color: #333;
  margin: 0 0 10px 0;
}

p {
  color: #666;
  margin: 5px 0;
  font-size: 14px;
}

strong {
  color: #7030a0;
}

@media (min-width: 992px) {
  p {
    font-size: 22px;
  }
}

@media (max-width: 768px) {
  .buchungen-container {
    grid-template-columns: 1fr;
  }
}
</style>
