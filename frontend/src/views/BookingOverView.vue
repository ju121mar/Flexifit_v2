<template>
  <section class="booking-overview-section">
    <div class="header">
      <h1>Kursangebote:</h1>
      <div class="header-controls">
        <button class="back-button">Zurück</button>
        <div class="date-controls">
          <span>{{ currentDate }}</span>
        </div>
        <button class="filter-button">Filter</button>
      </div>
    </div>

    <div class="date-picker">
  <div class="weekdays">
    <span 
      v-for="(day, index) in weekdays" 
      :key="index" 
      :class="['day', { 'current-day': activeDay === day }]"
      @click="selectDay(day)"
    >
      {{ day }} <span v-if="isCurrentDay(index)">(heute)</span>
    </span>
  </div>
</div>

<div class="container">
  <div class="row g-4 justify-content-center">
    <div 
      v-for="kurs in filteredKurse" 
      :key="kurs.id" 
      class="col-12 col-md-6 col-lg-6 mb-4 px-2 px-lg-3"
    >
      <div class="course-card">
        <img :src="kurs.image" :alt="kurs.name" class="course-image" />
        <div class="course-info">
          <h3>{{ kurs.name }}</h3>
          <div class="trainer-time">
            <p><span class="course-label">Trainer: </span>{{ kurs.trainer }}</p>
            <p><span class="course-label">Uhrzeit: </span>{{ kurs.uhrzeit }}</p>
          </div>
          <button class="book-button" @click="goToBooking(kurs.id)">Jetzt Buchen</button>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const weekdays = ref(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]);
const kurseByDay = ref({
  Mo: [
    { id: "001", name: "Yoga Flow", trainer: "Emma Schill", uhrzeit: "8:00 Uhr", image: "../Yoga.jpg" },
  ],
  Di: [
    { id: "002", name: "Balance Pilates", trainer: "Caro Klirr", uhrzeit: "17:00 Uhr", image: "../Pilates.jpg" },
  ],
  Mi: [
    { id: "003", name: "Spin Class", trainer: "Lara Stein", uhrzeit: "17:00 Uhr", image: "../Spin.jpg",},
  ],
  
});

const todayIndex = ref(new Date().getDay() - 1); 
const activeDay = ref(weekdays.value[todayIndex.value]); // Standard: Heute
const router = useRouter();

function isCurrentDay(index) {
  return index === todayIndex.value;
}

function selectDay(day) {
  activeDay.value = day;
}

function goToBooking(id) {
  router.push(`/booking/${id}`);
}

// Kurse nach Wochentagen filtern
const filteredKurse = computed(() => {
  return kurseByDay.value[activeDay.value] || [];
});
</script>


<style scoped>

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
  object-fit: cover;
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

.booking-overview-section {
  padding: 20px;
  background-color: #ffffff;
}

.header h1 {
  color: #7030a0;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

/* Header-Kontrollbuttons */
.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-button,
.filter-button {
  color: #fff;
  background-color: #7030a0;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.date-controls {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.date,
.time {
  font-size: 14px;
  color: #444;
}

/* Wochentagsanzeige */
.date-picker {
  margin-bottom: 20px;
  text-align: center;
}

.weekdays {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.day {
  background-color: #e0d7f5;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.container {
  text-align: center;
}

.date-picker {
  margin-bottom: 20px;
  text-align: center;
}

.weekdays {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.day {
  background-color: #e0d7f5;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

/* Styling für den aktuellen Tag */
.current-day {
  background-color: #7030a0;
  color: #fff;
  font-weight: bold;
  border: 2px solid #7030a0;
}

</style>

  