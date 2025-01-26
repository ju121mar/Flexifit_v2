<script setup>
import {ref, computed, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {apiCall} from "@/utility/ApiCall.js";
import {useMitgliedStore} from "@/stores/mitglied.js";
import BackButton from "@/components/Buttons/BackButton.vue";

const weekdays = ref(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]);
const activeDay = ref(null);
const kurseByDay = ref({});
const mitgliedStore = useMitgliedStore();

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
          dauer: course.dauer,
          aktTeilnehmer: course.aktTeilnehmer,
          teilnehmer: course.teilnehmer,
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
function navigateBack() {
  router.push('/');
}
//Popup fuer Login
const showLoginPopup = ref(false);

</script>

<template>
  <section class="booking-overview-section">
    <div class="header">
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Kurse suchen..." class="search-input"/>
      </div>
      <h1>Kursangebote:</h1>
      <div class="header-controls">
        <BackButton @click="navigateBack" class="back-button">Zurück</BackButton>
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

    <section class="course-section">
      <div class="container">
        <div class="row g-4 justify-content-center">
          <div
              v-for="kurs in filteredKurse"
              :key="kurs.id"
              class="col-12 col-md-6 col-lg-6 mb-4 px-2 px-lg-3"
          >
            <div class="course-card">
              <div class="course-info">
                <h3>{{ kurs.name }}</h3>
                <div class="attribute-pair">
                  <p><span class="course-label">Trainer:</span> {{ getFullName(kurs.trainer) }}</p>
                  <p><span class="course-label">Uhrzeit:</span> {{ kurs.uhrzeit }}</p>
                </div>
                <div class="attribute-pair">
                  <p><span class="course-label">Dauer:</span> {{ kurs.dauer }}</p>
                  <p><span class="course-label">Max. Teilnehmer:</span>{{ kurs.teilnehmer }}</p>
                </div>
              </div>

              <RouterLink  class="book-button"  :to="`/kursangebote/confirm/${kurs.id}`">Buchungen ansehen</RouterLink>
              </div>
            </div>
          </div>
        </div>
    </section>

  </section>
</template>


<style scoped>

.course-section {
  width: 100%;
  background-color: #ffffff;
  text-align: center;
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
.course-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border: 2px solid #d3bfe3;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 6px 12px rgba(112, 48, 160, 0.3);
  background-color: #ffffff;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 100%;
}
.attribute-pair {
  display: flex;
  justify-content: space-between;
  margin: 2px 0;
}

.attribute-pair p {
  flex: 1;
  font-size: 20px;
  margin: 0;
}

@media (max-width: 1070px) {
  .attribute-pair {
    flex-direction: column;
  }

  .attribute-pair p {
    margin-right: 0;
    margin-bottom: 5px;
  }
}
.course-info {
  flex: 1;
  text-align: left;
  padding-bottom: 0px;
  width: 100%;
}



.popup h2{
  color: #7030a0;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

@media (min-width: 992px) {

  .course-label{
    font-size: 20px;
  }
  .course-info p {
    font-size: 20px;
  }
  .trainer-time p {
    margin: 0;
    font-size: 20px;
    color: #666;
  }

}

.course-info p {
  color: #666;
  margin: 5px 0;
  font-size: 20px;
}

.course-label {
  font-weight: bold;
  color: #7030a0;
  font-size: 22px;
}


.book-button {
  color: #7030a0;
  background-color: transparent;
  border: 2px solid #7030a0;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 22px;
  margin-top: 2px;
  text-decoration: none;
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
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
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
  background-color: #d3bfe3;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.container {
  text-align: center;
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
  background-color: #d8b5ea;
  color: #7030a0;
}


@media (max-width: 768px) {
  .weekdays {
    flex-wrap: wrap;
    gap: 5px;
  }

  .show-all-button {
    display: block;
    margin: 10px auto 0;
    width: 90%;
  }
}

.popup h2 {
  color: #7030a0;
  font-size: 24px;
  margin-bottom: 15px;
}

</style>

