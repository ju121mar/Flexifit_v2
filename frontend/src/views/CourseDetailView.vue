<script setup>
import {onMounted, ref} from 'vue';
import {apiCall} from "@/utility/ApiCall.js";

// Dummy-Daten für Kursinformationen (zum Testen)
const kurs = ref({
  name: 'Yoga Class',
  trainer: 'Lara Stein',
  datum: '10. Juni 2024',
  uhrzeit: '09:41 Uhr',
  beschreibung: 'Ein entspannter Yoga-Kurs zur Förderung der Flexibilität.',
  equipment: 'Yoga-Matte',
  image: '', // Hier könntest du ein Bild-URL einfügen
});
const loading = ref(true);
const trainer = ref([]);
const formData = ref({
  name: "",
  description: "",
  trainer: "",
  teilnehmer: null,
  dauer: "",
  wochentag: "",
  uhrzeit: "",
});

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
    if (response) {
      formData.value = {
        name: response.name || "",
        description: response.description || "",
        trainer: response.trainer || "",
        teilnehmer: parseInt(response.teilnehmer, 10) || 0,
        dauer: response.dauer || "",
        wochentag: response.wochentag || "",
        uhrzeit: response.uhrzeit || "",
      };
      console.log("Kursdaten geladen:", formData.value);
    }
    console.log('Kurse geladen:', kurse.value);
  } catch (error) {
    console.error('Fehler beim Laden der Kurse:', error);
  } finally {
    loading.value = false;
  }
  await selectTrainer();
});

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

// Buchungsfunktion (optional)
const buchen = () => {
  alert('Du hast den Kurs gebucht!');
};
function getFullName(trainer){
  return (trainer.firstName + " " + trainer.lastName)
}
</script>

<template>
  <div v-if="loading">Daten werden geladen...</div>
  <section v-else class="kurs-detail">
    <div class="kurs-container">
      <!-- Zurück-Link -->
      <a href="#" class="back-link">&lt; Zurück</a>

      <!-- Datum und Uhrzeit -->
      <div class="date-time">
        <span class="date">{{ currentDate.date }}</span>
        <span class="time">{{ currentDate.time }}</span>
      </div>

      <!-- Kursinformationen -->
      <div class="kurs-card">
        <h2 class="kurs-title">{{ formData.name }}</h2>
        <div class="kurs-image"></div>
        <div class="kurs-info">
          <p><strong>Trainer:</strong> {{getFullName(formData.trainer)}} </p>
          <p><strong>Datum:</strong> {{ formData.datum }}</p>
          <p><strong>Uhrzeit:</strong> {{ formData.uhrzeit }}</p>
          <p><strong>Beschreibung:</strong> {{ formData.beschreibung }}</p>
<!--          <p><strong>Equipment:</strong> {{ formData.equipment }}</p>-->
        </div>

        <!-- Buchungsbutton -->
        <button class="book-button" @click="buchen">Jetzt Buchen</button>
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