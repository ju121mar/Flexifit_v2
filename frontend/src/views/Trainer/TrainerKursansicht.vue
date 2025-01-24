<script setup>
import {ref, computed, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {apiCall} from "@/utility/ApiCall.js";
import BackButton from "@/components/Buttons/BackButton.vue";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/Buttons/SecondaryButton.vue";

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


//navigiert zur Bearbeitungsseite eines Kurses
function goToEditing(id) {
  router.push(`/kursangebote/booking/${id}/edit`);
}

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
          image: course.image,
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

const showDeletePopup = ref(false);
const kursToDelete = ref(null);

const openDeletePopup = (id) => {
  kursToDelete.value = id;
  showDeletePopup.value = true;
};

//Kurs löschen bestätigen
const confirmDelete = async () => {
  if (!kursToDelete.value) return;
  try {
    await apiCall({
      method: 'DELETE',
      url: `/delete/kurs/${kursToDelete.value}`,
    });
    console.log('Kurs wurde gelöscht:', kursToDelete.value);

    const day = activeDay.value; // Aktiver Tag (z. B. "Mo")
    if (kurseByDay.value[day]) {
      kurseByDay.value[day] = kurseByDay.value[day].filter(
          (kurs) => kurs.id !== kursToDelete.value
      );
    }

    kursToDelete.value = null; // Zurücksetzen
    showDeletePopup.value = false; // Popup schließen
    await onMounted(); // Kurse neu laden
    
  } catch (error) {
    console.error('Fehler beim Löschen des Kurses:', error);
  }
};

//Kurs löschen abbrechen
const cancelDelete = () => {
  kursToDelete.value = null; // Zurücksetzen
  showDeletePopup.value = false; // Popup schließen
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
        <div class="date-controls">
        <span class="current-date">{{ currentDate.date }}</span>
        <span class="current-time">{{ currentDate.time }}</span>
      </div>


        <RouterLink class="filter-button" to="/kursangebote/new">
          <span class="plus-icon" aria-hidden="true">+</span>
          <span class="button-text">Neuen Kurs erstellen</span>
        </RouterLink>
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
            v-if="showDeletePopup"
            class="popup-backdrop"
        >
          <div class="popup">
            <h2>Bestätigung</h2>
            <p>Möchten Sie diesen Kurs wirklich löschen?</p>
            <div class="popup-buttons">
              <PrimaryButton buttontext="Ja, löschen"  @click="confirmDelete">Ja, löschen</PrimaryButton>
              <SecondaryButton buttontext="Abbrechen" @click="cancelDelete">Abbrechen</SecondaryButton>
            </div>
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
            <img :src="kurs.image" class="course-image">
            <div class="course-info">
              <h3>{{ kurs.name }}</h3>
              <div class="trainer-time">
                <div class="trainer-section">
                  <h4 class="course-label">Trainer:</h4>
                  <p>{{getFullName(kurs.trainer)}}</p>
                </div>
                <div class="time-section">
                  <h4 class="course-label">Uhrzeit:</h4>
                  <p>{{ kurs.uhrzeit }}</p>
                </div>
              </div>
              <div class="course-actions">
                <button class="book-button edit-button" @click="goToEditing(kurs.id)">Bearbeiten</button>
                <button class="book-button delete-button" @click="openDeletePopup(kurs.id)">Löschen</button>
              </div>
            </div>
          </div>
        </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  </section>
</template>


<style scoped>
.trainer-time {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.trainer-section, .time-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 50px;
}


.course-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.book-button {
  width: 130px;
}

.course-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.book-button {
  width: 130px;
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


.course-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #d3bfe3;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 6px 12px rgba(112, 48, 160, 0.3);
  background-color: #ffffff;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 100%;
}

.course-section {
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  text-align: center;
  margin: 20px 0;
  display: flex;
  justify-content: center;
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
  height: 100%;
}

.course-info h3 {
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
}
.trainer-time {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.trainer-time p {
  margin: 0;
  font-size: 16px;
  color: #666;
}
.course-label {
  font-weight: bold;
  color: #7030a0;
}



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

  .trainer-time {
    flex-direction: row;
    justify-content: space-between;
  }
  .trainer-time p {
    margin: 0;
    font-size: 22px;
    color: #666;
  }
  .course-label{
    font-size: 20px;
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
  width: 150px;
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

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}


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

/*wird benutzt, erkennt Klasse nicht*/
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
.back-button{
  margin-left: 10px;
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
  background-color: #d8b5ea;
  color: #7030a0;
}

.filter-button .plus-icon {
  font-size: 10px;
  margin-right: 8px;
}

.filter-button .button-text {
  font-weight: bold;
}


@media (max-width: 768px) {
  .filter-button {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    background-image: url('/path/to/plus-icon.svg');
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;
    margin-left: 60px;
  }
  .filter-button .plus-icon{
    margin-right: 0px;
    font-size: 30px;
  }
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


</style>