<script setup>
import { ref, onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {apiCall} from "@/utility/ApiCall.js";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/Buttons/SecondaryButton.vue";
import BackButton from "@/components/Buttons/BackButton.vue";

const route = useRoute();
const router = useRouter();

function navigateBack() {
  router.push('/'); 
}

const exercise = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await apiCall({
      method: 'GET',
      url: `/exercises/${exerciseId}`,
    });
      exercise.value = response;
      console.log("Übungsdaten geladen:", exercise.value);
  } catch (error) {
    console.error('Fehler beim Laden der Übungen:', error);
  } finally {
    loading.value = false;
  }
});
const showConfirmationModal = ref(false);

</script>

<template>
  <div v-if="loading">Daten werden geladen...</div>
  <section v-else class="kurs-detail">
    <div class="kurs-container" v-if="kurs">
      <!-- Zurück-Link -->
      <BackButton @click="navigateBack"></BackButton>

      <!-- Kursinformationen -->
      <div class="kurs-card">
        <h2 class="kurs-title">{{ exercise.name }}</h2>

        <div class="kurs-info">
          <p><strong>Übung:</strong> {{ exercise.exercisename}}</p>
          <p><strong>Gerätename:</strong> {{exercise.equipmentname }}</p>
          <p><strong>Sätze:</strong> {{ exercise.set }}</p>
          <p><strong>Wiederholung:</strong> {{ exercise.rep }}</p>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.modal-content {
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  max-width: 500px;
}

.modal-header {
  background-color: #6c2a9f; /* Lila Hintergrundfarbe */
  color: #fff;
}

.modal-body p {
  margin: 0;
}

.modal-footer .btn {
  border-radius: 6px;
}


.btn-close {
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1.5rem;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5); /* Halbtransparenter schwarzer Hintergrund */
  backdrop-filter: blur(20
  px); /* Unschärfe hinzufügen */
}

.modal.fade .modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Zentriert das Modal */
  max-width: 600px;
}

.modal-backdrop {
  z-index: 1040;
}

.modal-dialog {
  z-index: 1050; /* Modal Dialog muss vor dem Hintergrund angezeigt werden */
}
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