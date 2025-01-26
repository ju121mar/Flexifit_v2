<script setup>
import { ref, onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {apiCall} from "@/utility/ApiCall.js";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/Buttons/SecondaryButton.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import { useMitgliedStore } from "@/stores/mitglied.js";

const mitgliedStore = useMitgliedStore();
const route = useRoute();
const router = useRouter();
const courseId = route.params.id; // Holt die ID aus der URL

function navigateBack() {
  router.push('/kursangebote/booking'); 
}

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
const showConfirmationModal = ref(false);

const confirmBooking = async () => {
  try {
    await apiCall({
      url: 'newBooking',
      method: 'POST',
      data: {
        kurs: kurs.value.id
      }
    });
  } catch (e) {
    console.log(e)
  }
  showConfirmationModal.value = false;
  router.push('/buchungen'); // Weiterleitung zur Buchungsseite
};

</script>

<template>
  <div v-if="loading">Daten werden geladen...</div>
  <section v-else class="kurs-detail">
    <div class="kurs-container" v-if="kurs">
        <BackButton @click="navigateBack" class="back-button" >Zurück</BackButton>


      <!-- Kursinformationen -->
      <div class="kurs-card">
        <div class="course-info">
        <h3>{{ kurs.name }}</h3>
        <img :src="kurs.image" class="course-image">
        <div class="kurs-info">

          <p><strong>Trainer:</strong> {{ kurs.trainer.firstName }} {{kurs.trainer.lastName}}</p>
          <p><strong>Wochentag:</strong> {{ kurs.wochentag }}</p>
          <p><strong>Uhrzeit:</strong> {{ kurs.uhrzeit }}</p>
          <p><strong>Beschreibung:</strong> {{ kurs.description }}</p>
          <p><strong>Equipment:</strong> {{ kurs.equipment }}</p>
        </div>

        <!-- Buchungsbutton -->
        <PrimaryButton class="primarybutton" buttontext="Jetzt Buchen" @click="showConfirmationModal= true"></PrimaryButton>
      </div>
      </div>
    </div>
  </section>
  <div
      class="modal fade"
      :class="{ 'show d-block': showConfirmationModal }"
      tabindex="-1"
      role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title">Buchungsbestätigung</h5>
          <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="showConfirmationModal = false"
          ></button>
        </div>
        <!-- Modal Body -->
        <div class="modal-body">
          <p>Wollen Sie diesen Kurs wirklich buchen?</p>
        </div>
        <!-- Modal Footer -->
        <div class="modal-footer">
          <PrimaryButton class="primarybutton" buttontext="Buchen" @click="confirmBooking"></PrimaryButton>
          <SecondaryButton class="secondarybutton" buttontext="Abbrechen" @click="showConfirmationModal = false"></SecondaryButton>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Overlay (Hintergrund) -->
  <div
      v-if="showConfirmationModal"
      class="modal-backdrop fade show"
  ></div>
</template>


<style scoped>

.course-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.course-info h3 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
}

.course-image {
  width: 90%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.kurs-info {
  width: 100%;
  padding-left: 20px;
  text-align: left;
}

.kurs-info p {
  margin: 15px 0;
  font-size: 20px;
  color: #666;
}

.kurs-info strong {
  color: #7030a0;
  font-size: 22px;
}

.modal-content {
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  max-width: 500px;
}

.modal-header {
  background-color: #7030a0;
  color: #fff;
}

.modal-body p {
  margin: 0;
}

.modal-footer .btn {
  border-radius: 6px;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 15px;
}

.modal-footer .primarybutton,
.modal-footer .secondarybutton {
  flex: 1;
  padding: 10px;
  font-size: 20px;
}
@media (max-width: 480px) {
  .modal-dialog {
    margin-right: 0px;
    width: 90%;
    max-width: 90%;
  }

  .modal.fade .modal-dialog {
    width: calc(100% - 30px);
    max-width: 350px;
  }

  .modal-content{
    max-width: 350px;
    font-size: 18px;
  }
  .modal-title{
    font-size: 22px;
  }

}
.btn-close {
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1.5rem;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 1);
  backdrop-filter: blur(20
  px);
}

.modal.fade .modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
}

.modal-backdrop {
  z-index: 1040;
}

.modal-dialog {
  z-index: 1050;
}

.kurs-detail {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
}

.kurs-container {
  text-align: left;
}


.kurs-card {
  border: 1px solid #d8b5ea;
  border-radius: 10px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

</style>