<script setup>
import {ref, computed, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {apiCall} from "@/utility/ApiCall.js";

const weekdays = ref(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]);
const activeDay = ref(null);
const kurseByDay = ref({});

const router = useRouter();

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


// Kurse nach Wochentagen filtern + Suche
const filteredKurse = computed(() => {
  if (searchQuery.value) {
    const result = allKurse.value.filter((kurs) =>
        kurs.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    if (result.length > 0) {
      const kursDay = mapWeekdayToShort(result[0].wochentag);
      if (kursDay !== activeDay.value) {
        activeDay.value = kursDay;
      }
    }
    return result;
  }
  return activeDay.value ? (kurseByDay.value[activeDay.value] || []) : allKurse.value;
});


const kurs = ref([]);

onMounted(async () => {
  console.log('Kurse werden geladen...');
  try {
    const response = await apiCall({
      method: 'GET',
      url: '/kurse',
    });
    const courses = response;
    const groupedCourses = weekdays.value.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {});
    courses.forEach((course) => {
      const weekdayKey = mapWeekdayToShort(course.wochentag);
      if (groupedCourses[weekdayKey]) {
        groupedCourses[weekdayKey].push({
          id: course.id,
          name: course.name,
          trainer: course.trainer,
          uhrzeit: course.uhrzeit,
          image: '@/assets/pictures/Laufband.png',
          description: course.description,
        });
      }
    });

    kurseByDay.value = groupedCourses;
    const todayIndex = new Date().getDay();
    const todayShort = weekdays.value[todayIndex === 0 ? 6 : todayIndex - 1];
    activeDay.value = todayShort;
  } catch (error) {
    console.error('Fehler beim Laden der Kursdaten:', error);
    kurs.value = null;
  }
});

const mapWeekdayToShort = (day) => {
  const mapping = {
    Montag: "Mo",
    Dienstag: "Di",
    Mittwoch: "Mi",
    Donnerstag: "Do",
    Freitag: "Fr",
    Samstag: "Sa",
    Sonntag: "So",
  };
  return mapping[day] || day;
};

// Computed Property, um die Kurse für den aktiven Tag anzuzeigen
const coursesForActiveDay = computed(() => {
  return kurseByDay.value[activeDay.value] || [];
});

// Methode zum Setzen des aktiven Tages
const selectDay = (day) => {
  activeDay.value = day;
};


// Aktuellen Tag ermitteln
const isCurrentDay = (index) => {
  const today = new Date().getDay(); // 0 = Sonntag, 1 = Montag, etc.
  return (index === (today === 0 ? 6 : today - 1));
};

const searchQuery = ref(''); //Suche
const allKurse = computed(() => {
  return Object.values(kurseByDay.value).flat();
});

//Alle Kurse anzeigen
const selectAllKurse = () => {
  activeDay.value = null;
};

function getFullName(trainer){
  return (trainer.firstName + " " + trainer.lastName)
}

//Popup fuer Login
const showLoginPopup = ref(false);
const openLoginPopup = () => {
  showLoginPopup.value = true;
};

const redirectToLogin = () => {
  router.push('/login/mitglied');
};
</script>

<template>
  <section class="booking-overview-section">
    <div class="header">
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Kurse suchen..." class="search-input"/>
      </div>
      <h1>Kursangebote:</h1>
      <div class="header-controls">
        <RouterLink class="back-button" to="/">Zurück</RouterLink>
          <span class="current-date">{{ currentDate.date }}</span>
          <span class="current-time">{{ currentDate.time }}</span>
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
        <button class="show-all-button" @click="selectAllKurse"> Alle Kurse </button>
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
            <!--            <img src="@/assets/pictures/Yoga.jpg" :alt="kurs.name" class="course-image"/>-->
            <div class="course-info">
              <h3>{{ kurs.name }}</h3>
              <div class="trainer-time">
                <p><span class="course-label">Trainer: </span> {{getFullName(kurs.trainer)}}</p>
                <p><span class="course-label">Uhrzeit: </span>{{ kurs.uhrzeit }}</p>
<!--                <button @click="openLoginPopup" class="book-button">Buchen</button>-->
              </div>
               <RouterLink  class="book-button" :to="`/kursangebote/kurs/${kurs.id}`">Buchen</RouterLink>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showLoginPopup" class="popup-backdrop">
      <div class="popup">
        <h2>Zum Buchen anmelden</h2>
        <p>Bitte melden Sie sich an, um eine Buchung vorzunehmen.</p>
        <button @click="redirectToLogin" class="confirm-button">Zum Login</button>
        <button @click="showLoginPopup = false" class="cancel-button">Abbrechen</button>
      </div>
    </div>

  </section>
</template>


<style scoped>


.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
}
.popup h2{
  color: #7030a0;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.confirm-button {
  background: #7030a0;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background: #ccc;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
}

.confirm-button:hover {
  background: #d8b5ea;
}

.cancel-button:hover {
  background: #bbb;
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
  margin-right: 20px;
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
  font-size: 16px;
  text-decoration: none;
  font-weight: bold;
}

.date-controls {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.current-day {
  background-color: #7030a0;
  font-weight: bold;
  border: 2px solid #7030a0;
}



.current-date, .current-time {
  color: #d8b5ea;
  font-weight: bold;
  display: block;
  font-size: 18px;
  text-align: center;
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

.search-container {
  text-align: center;
  margin-bottom: 20px;
}

.search-input {
  width: 90%;
  max-width: 400px;
  padding: 10px;
  border: 2px solid #d3bfe3;
  border-radius: 5px;
  font-size: 16px;
}

.show-all-button {
  background-color: #7030a0;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

.show-all-button:hover {
  background-color: #4e216c;
}

/* Styling for the 'Neue Kurse erstellen' button in mobile view */
.filter-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #7030a0; /* Farbe anpassen */
  color: white; /* Textfarbe */
  border: none; /* Kein Rand */
  padding: 10px 15px; /* Abstände */
  border-radius: 5px; /* Ecken entfernen */
  font-size: 16px; /* Schriftgröße */
  cursor: pointer;
  text-decoration: none; /* Unterstreichung entfernen */
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #5e258f; /* Hover-Farbe */
}

.filter-button .plus-icon {
  font-size: 10px; /* Größe des Icons */
  margin-right: 8px; /* Abstand zwischen Icon und Text */
}

.filter-button .button-text {
  font-weight: bold; /* Text fett */
}


@media (max-width: 768px) {
  .filter-button {
    width: 40px; /* Smaller size */
    height: 40px;
    padding: 0;
    border-radius: 5px; /* Circular button */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0; /* Hide text */
    background-image: url('/path/to/plus-icon.svg'); /* Add the Plus Icon */
    background-size: 60%; /* Adjust icon size */
    background-repeat: no-repeat;
    background-position: center;
    margin-left: 60px;
  }
  .filter-button .plus-icon{
    margin-right: 0px;
    font-size: 30px;
  }
}

/* Styling for the 'Alle Kurse' button in mobile view */
.show-all-button {
  background-color: #7030a0;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

@media (max-width: 768px) {
  .weekdays {
    flex-wrap: wrap; /* Allow wrapping */
    gap: 5px;
  }

  .show-all-button {
    display: block; /* Ensure visibility under weekdays */
    margin: 10px auto 0; /* Center and add spacing */
    width: 90%;
  }
}

.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.popup h2 {
  color: #7030a0;
  font-size: 24px;
  margin-bottom: 15px;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.confirm-button {
  background: #7030a0;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s ease;
}

.confirm-button:hover {
  background: #5e258f;
}

.cancel-button {
  background: #ccc;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background: #bbb;
}


</style>

