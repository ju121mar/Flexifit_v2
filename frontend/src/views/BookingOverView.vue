<script setup>
import {ref, computed, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {apiCall} from "@/utility/ApiCall.js";

const weekdays = ref(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]);
const activeDay = ref(null); // Zum Verfolgen des ausgewählten Tages
const kurseByDay = ref({});

const router = useRouter();

const currentDate = ref(new Date().toLocaleDateString());

//navigiert zur Bearbeitungsseite eines Kurses
function goToEditing(id) {
  router.push(`/kursangebote/booking/${id}/edit`);
}

// Kurse nach Wochentagen filtern
const filteredKurse = computed(() => {
  return kurseByDay.value[activeDay.value] || [];
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
    const todayIndex = new Date().getDay(); // 0 = Sonntag, 1 = Montag, ...
    const todayShort = weekdays.value[todayIndex === 0 ? 6 : todayIndex - 1]; // Sonntag = letzter Tag
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

const deleteKurs = async (id) => {
  try {
    await apiCall({
      method: 'DELETE',
      url: `/delete/kurs/${id}`,
    });
    console.log('Kurs wurde gelöscht:', id);
    await onMounted();
  } catch (error) {
    console.error('Fehler beim Löschen des Kurses:', error);
  }
};

// Aktuellen Tag ermitteln
const isCurrentDay = (index) => {
  const today = new Date().getDay(); // 0 = Sonntag, 1 = Montag, etc.
  return (index === (today === 0 ? 6 : today - 1));
};
</script>
<template>
  <section class="booking-overview-section">
    <div class="header">
      <h1>Kursangebote:</h1>
      <div class="header-controls">
        <RouterLink class="back-button" to="/">Zurück</RouterLink>
        <div class="date-controls">
          <span>{{ currentDate }}</span>
        </div>
        <RouterLink class="filter-button" to="/kursangebote/new">Neuen Kurs erstellen</RouterLink>
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
            <img :src="kurs.image" :alt="kurs.name" class="course-image"/>
            <div class="course-info">
              <h3>{{ kurs.name }}</h3>
              <div class="trainer-time">
                <p><span class="course-label">Trainer: </span>{{ kurs.trainer }}</p>
                <p><span class="course-label">Uhrzeit: </span>{{ kurs.uhrzeit }}</p>
              </div>
              <button class="book-button" @click="goToEditing(kurs.id)">Bearbeiten</button>
              <button class="book-button" @click="deleteKurs(kurs.id)">Löschen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


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

