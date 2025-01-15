<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import { apiCall } from "@/utility/ApiCall.js";

const router = useRouter();
const kurse = ref([]);

function goToBooking(id) {
  router.push(`/booking/${id}`);
}

onMounted(async () => {
  await getKurse();
});

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.replace(' Uhr', '').split(':').map(Number);
  return new Date(0, 0, 0, hours, minutes);
}

function isFutureCourseToday(kurs) {
  const now = new Date();
  const wochentageOrder = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

  const currentWeekday = wochentageOrder[now.getDay() === 0 ? 6 : now.getDay() - 1];
  if (kurs.wochentag !== currentWeekday) return false;
  return kurs
}

async function getKurse() {
  const response = await apiCall({
    url: '/kurse',
    method: 'GET',
  });
  console.log(response)
  const futureKurseToday = response.filter(isFutureCourseToday);
  const sortedKurse = futureKurseToday.sort((a, b) => parseTime(a.uhrzeit) - parseTime(b.uhrzeit));
  kurse.value = sortedKurse.slice(0, 4); // Anzahl anpassen nach Bedarf

  console.log("Gefilterte Kurse für heute:", sortedKurse);
}
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
                <p><span class="course-label">Trainer: </span>{{ kurs.trainer.firstName  }} {{ kurs.trainer.lastName  }}</p>
<!--                <p><span class="course-label">Wochentag: </span>{{ kurs.wochentag }}</p>-->
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
  height: 200px;
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