<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import { apiCall } from "@/utility/ApiCall.js";
import SecondaryButton from "@/components/Buttons/SecondaryButton.vue";

const router = useRouter();
const kurse = ref([]);

function goToBooking(id) {
  router.push(`/kursangebote/booking`);
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
                <p><span class="course-label">Uhrzeit: </span>{{ kurs.uhrzeit }}</p>
              </div>
              <p class="extra-text">
                <span class="course-label">Beschreibung:</span>
                {{ kurs.description }}
              </p>
              <SecondaryButton buttontext="Buchen" class="book-button" @click="goToBooking"></SecondaryButton>
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
  display: flex;
  justify-content: center;
}

.course-card {
  display: flex;
  flex-direction: column; /* Standardmäßig für mobile Ansicht */
  align-items: center;
  border: 2px solid #d3bfe3;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 6px 12px rgba(112, 48, 160, 0.15);
  background-color: #ffffff;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 100%;
}

.course-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}


.course-info {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
}

.course-info h3 {
  color: #444;
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: bold;
}

.trainer-time {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.course-info p {
  color: #666;
  margin: 5px 0;
  font-size: 14px;
}
.course-label {
  font-weight: bold;
  color: #7030a0;
  font-size: 16px;
}

.extra-text {
  display: none;
}

/* Extra-Text nur auf Desktop-Bildschirmen anzeigen */
@media (min-width: 992px) {
  .course-section {
    justify-content: center;
  }

  .course-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .course-card img {
    width: 35%;
    height: auto;
    margin-bottom: 0;
  }

  .course-info {
    width: 60%;
    text-align: left;
    gap: 10px;

  }
  .course-info h3 {
    font-size: 20px;
  }

  .course-label{
    font-size: 18px;
  }

  .trainer-time {
    flex-direction: row;
    justify-content: space-between;
  }
  .trainer-time p {
    margin: 0;
    font-size: 16px;
    color: #666;
  }
  .extra-text {
    color: #666;
    font-size: 16px;
    margin-top: 10px;
  }

  .book-button {
    color: #7030a0;
    background-color: #fff;
    border: 2px solid #7030a0;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 22px;
    margin-right: 20px;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
  .book-button:hover {
    background-color: #7030a0;
    color: #fff;
    text-decoration: none;
  }


  .back-button {
    order: -1; /* Immer an erster Stelle */
    border: none;
  }
  .back-button:hover{
    background-color: #4e216c;
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