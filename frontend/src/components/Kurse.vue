
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";

// Daten für die Kurse
const kurse = ref([
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
]);

const router = useRouter();

function goToBooking(id) {
  router.push(`/booking/${id}`);
};

</script>
<template>
  <section class="course-section">
    <div class="container">
      <div class="row g-4 justify-content-center">
        <div 
          v-for="kurs in kurse" 
          :key="kurs.id" 
          class="col-12 col-md-6 col-lg-6 mb-4 px-2 px-lg-3"
        >
          <div class="course-card">
            <img src="../assets/pictures/Yoga.jpg" alt="Yoga Flow" class="course-image" />
            <div class="course-info">
              <h3>{{ kurs.name }}</h3>
              <div class="trainer-time">
                <p><span class="course-label">Trainer: </span>{{ kurs.trainer }}</p>
                <p><span class="course-label">Uhrzeit: </span>{{ kurs.uhrzeit }}</p>
              </div>
              <p class="extra-text">
                <span class="course-label">Beschreibung:</span>
                {{ kurs.description }}
              </p>
              <!-- Button für Navigation -->
<!--              <PrimaryButton buttontext="buchen" @click="goToBooking"></PrimaryButton>-->
              <button class="book-button">Jetzt Buchen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>




<style scoped>
/* Styling für Kursübersicht */
.course-section {
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  text-align: center;
  margin: 20px 0;
}



.course-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #d3bfe3;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(112, 48, 160, 0.3);
}

.course-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: contain; /* Bild bleibt im ursprünglichen Maßstab */
  background-color: #f8f9fa; /* Optional: Hintergrund für leeren Bereich */
  margin-left: 15px;
  order: 2;
}


.course-info {
  flex: 1;
  text-align: left;
}

.course-info h3 {
  color: #444;
  margin: 0;
  font-size: 20px;
}

.trainer-time {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.course-info p {
  color: #666;
  margin: 5px 0;
  font-size: 14px;
}
.course-label {
  color: #7030a0;
}

.extra-text {
  display: none;
}

/* Extra-Text nur auf Desktop-Bildschirmen anzeigen */
@media (min-width: 992px) {
  .extra-text {
    display: block;
    color: #666;
    font-size: 14px;
    margin-top: 8px;
  }

  .course-info p {
    font-size: 18px;
  }
  .course-image {
    width: 100px;
    height: 100px;
  }
}

.book-button {
  color: #7030a0;
  background-color: transparent;
  border: 2px solid #7030a0;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 22px;
}

.book-button:hover {
  background-color: #7030a0;
  color: #fff;
}
</style>