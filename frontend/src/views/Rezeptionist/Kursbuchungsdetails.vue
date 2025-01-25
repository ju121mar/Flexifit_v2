<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {apiCall} from "@/utility/ApiCall.js";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/Buttons/SecondaryButton.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import {useRezeptionistStore} from "@/stores/rezeptionist.js";

const rezeptionistStore = useRezeptionistStore();
const route = useRoute();
const router = useRouter();
const courseId = route.params.id; // Holt die ID aus der URL

function navigateBack() {
  router.push('/kursangebote/manage');
}

const kurs = ref(null);
const loading = ref(true);
const trainer = ref([]);
const mitglied = ref([]);
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


async function updateBooking(status, buchungId) {
  try {
    await apiCall({
      url: '/updateBooking',
      method: 'PUT',
      data: {
        buchungstatus: status,
        buchungId: buchungId,
      }
    });
    await loadBuchungen();
  } catch (error) {
    console.error('Fehler beim bestätigen des Buchung')
  }
}

async function loadBuchungen() {
  try {
    buchungen.value = await apiCall({
      method: 'GET',
      url: `/getBookingsandMitglied/${courseId}`,
    });

    bestaetigteBuchung.value = buchungen.value.filter(b => b.status === 'Bestätigt');
    abgelehnteBuchung.value = buchungen.value.filter(b => b.status === 'Abgelehnt');
    buchungsanfragen.value = buchungen.value.filter(b => b.status === 'Bestätigung ausstehend');
  } catch (error) {
    console.error('Fehler beim Laden der Buchungen:', error);
  }
}

function formatGermanDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('de-DE').format(date);
}

const buchungen = ref([]);
const bestaetigteBuchung = ref([]);
const abgelehnteBuchung = ref([]);
const buchungsanfragen = ref([]);

onMounted(async () => {
  await loadBuchungen();
  try {
    // Lade Kursdaten
    const kursResponse = await apiCall({
      method: 'GET',
      url: `/kurse/${courseId}`,
    });
    kurs.value = kursResponse;

    // Lade Buchungsdaten für den spezifischen Kurs
    buchungen.value = await apiCall({
      method: 'GET',
      url: `/getBookingsandMitglied/${courseId}`,
    });

    bestaetigteBuchung.value = buchungen.value.filter(
        (buchung) => buchung.status === 'Bestätigt'
    );
    abgelehnteBuchung.value = buchungen.value.filter(
        (buchung) => buchung.status === 'Abgelehnt'
    );
    buchungsanfragen.value = buchungen.value.filter(
        (buchung) => buchung.status === 'Bestätigung ausstehend'
    );

    console.log(buchungen.value);
  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error);
  } finally {
    loading.value = false;
  }
});



</script>

<template>
  <BackButton @click="navigateBack"></BackButton>
  <h1>Kursbuchungen </h1>
  <div v-if="loading">Daten werden geladen...</div>
  <section v-else class="kurs-detail">
    <h3>{{ kurs.name }}</h3>
    <div class="kurs-info">
      <p><strong>Trainer:</strong> {{ kurs.trainer.firstName }} {{ kurs.trainer.lastName }}</p>
      <p><strong>Wochentag:</strong> {{ kurs.wochentag }}</p>
      <p><strong>Uhrzeit:</strong> {{ kurs.uhrzeit }}</p>
      <p><strong>Dauer:</strong> {{ kurs.dauer }}</p>
      <p><strong>max. Teilnehmer:</strong> {{ kurs.teilnehmer }}</p>
      <p><strong>akt. Teilnehmer:</strong> {{ kurs.aktTeilnehmer }}</p>
    </div>
  </section>
  <h1 class="headline">Buchungsanfragen:</h1>
  <section class="kurs-detail">
    <div v-if="buchungsanfragen && buchungsanfragen.length > 0">
      <div v-for="(buchung, index) in buchungsanfragen" :key="index" class="buchung-card">
        <details>
          <summary class="kurs-title">{{ buchung.mitglied.firstName }} {{ buchung.mitglied.lastName }}</summary>
          <div class="kurs-info">
          <p><strong>E-Mail:</strong> {{ buchung.mitglied.email }}</p>
          <p><strong>Adresse:</strong> {{ buchung.mitglied.street }} {{buchung.mitglied.houseNumber}} {{buchung.mitglied.postalCode}} {{buchung.mitglied.city}}</p>
          <p><strong>Geburtsdatum:</strong> {{ formatGermanDate(buchung.mitglied.dob) }}</p>
        </div>
        <PrimaryButton class="action-button" buttontext="Bestätigen" @click="updateBooking('Bestätigt', buchung.id)"></PrimaryButton>
        <SecondaryButton class="action-button" buttontext="Stornieren" @click="updateBooking('Abgelehnt', buchung.id)"></SecondaryButton>
        </details>
      </div>
    </div>
    <div v-else>
      <p>Keine Buchungsanfragen vorhanden</p>
    </div>
  </section>
  <h1 class="headline">Bestätigte Buchungen:</h1>
  <section class="kurs-detail">
    <div v-if="bestaetigteBuchung && bestaetigteBuchung.length > 0">
      <div v-for="(buchung, index) in bestaetigteBuchung" :key="index" class="buchung-card">
        <details>
        <summary class="kurs-title">{{ buchung.mitglied.firstName }} {{ buchung.mitglied.lastName }}</summary>
        <div class="kurs-info">
          <p><strong>E-Mail:</strong> {{ buchung.mitglied.email }}</p>
          <p><strong>Adresse:</strong> {{ buchung.mitglied.street }} {{buchung.mitglied.houseNumber}} {{buchung.mitglied.postalCode}} {{buchung.mitglied.city}}</p>
          <p><strong>Geburtsdatum:</strong> {{ formatGermanDate(buchung.mitglied.dob) }}</p>
      </div>
        </details>
    </div>
    </div>
    <div v-else>
      <p>Keine bestätigte Buchungen vorhanden</p>
    </div>
  </section>
  <h1 class="headline">Abgelehnte Buchungen:</h1>
  <section class="kurs-detail">
    <div v-if="abgelehnteBuchung && abgelehnteBuchung.length > 0">
      <div v-for="(buchung, index) in abgelehnteBuchung" :key="index" class="buchung-card">
        <details>
        <summary class="kurs-title">{{ buchung.mitglied.firstName }} {{ buchung.mitglied.lastName }}</summary>
        <div class="kurs-info">
          <p><strong>E-Mail:</strong> {{ buchung.mitglied.email }}</p>
          <p><strong>Adresse:</strong> {{ buchung.mitglied.street }} {{buchung.mitglied.houseNumber}} {{buchung.mitglied.postalCode}} {{buchung.mitglied.city}}</p>
          <p><strong>Geburtsdatum:</strong> {{ formatGermanDate(buchung.mitglied.dob) }}</p>
        </div>
        </details>
      </div>
    </div>
    <div v-else>
      <p>Keine abgelehnten Buchungen vorhanden</p>
    </div>
  </section>
</template>




<style scoped>

.action-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

h1{
  color: #7030a0;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
.headline{
  margin-top: 50px;
  font-size: 28px;
}

h3{
  color:#333;
  font-weight: bold;
}
p{
  font-size: 20px;
}
.modal-body p {
  margin: 0;
}

.modal-footer .btn {
  border-radius: 6px;
}

.modal.fade .modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
}

.kurs-detail {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #d8b5ea;
  border-radius: 10px;
  background-color: #f6ebf9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

.kurs-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
  text-align: left;
  font-weight: bold;
}

.kurs-image img {
  max-width: 100%;
  border-radius: 8px;
}


.kurs-info p {
  margin: 5px 0;
  font-size: 20px;
  color:#333333;
}

.kurs-info strong {
  color: #7030a0;
}


</style>