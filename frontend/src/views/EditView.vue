<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const courseId = route.params.id;

// Hier DB einpflegen
const kurseByDay = ref({
  Mo: [{ id: "001", name: "Yoga Flow", trainer: "Emma Schill", uhrzeit: "8:00 Uhr", image: "../Yoga.jpg" }],
});

const course = ref(null);

onMounted(() => {
  for (const day in kurseByDay.value) {
    const found = kurseByDay.value[day].find((kurs) => kurs.id === courseId);
    if (found) {
      course.value = { ...found };
      break;
    }
  }
});

function updateCourse() {
  if (course.value) {
    // API-Anfrage oder Datenbankaktualisierung 
    alert(`Kurs ${course.value.name} wurde aktualisiert!`);
    router.push('/'); 
  }
}
</script>

<template>
  <div v-if="course" class="edit-course">
    <h1>Kurs bearbeiten: {{ course.name }}</h1>
    <form @submit.prevent="updateCourse">
      <div>
        <label for="name">Kursname:</label>
        <input id="name" v-model="course.name" type="text" required />
      </div>
      <div>
        <label for="trainer">Trainer:</label>
        <input id="trainer" v-model="course.trainer" type="text" required />
      </div>
      <div>
        <label for="uhrzeit">Uhrzeit:</label>
        <input id="uhrzeit" v-model="course.uhrzeit" type="time" required />
      </div>
      <div>
        <label for="image">Bild:</label>
        <input id="image" v-model="course.image" type="text" required />
      </div>
      <button type="submit">Kurs aktualisieren</button>
    </form>
  </div>
  <div v-else>
    <p>Kurs nicht gefunden.</p>
  </div>
</template>

<style scoped>
.edit-course {
  padding: 20px;
}

form {
    max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #c8b1d9; 
  border-radius: 10px;
  background-color: #f6ebf9; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

input {
    width: 100%;
  padding: 10px;
  border: 1px solid #a084ca;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

button {
  padding: 10px 15px;
  background-color: #6a2c91; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}
button:hover {
  background-color: #4e216c; 
}

</style>
