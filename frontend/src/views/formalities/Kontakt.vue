<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'
import {apiCall} from "@/utility/ApiCall.js";
import router from "@/router/index.js";
import BackButton from "@/components/Buttons/BackButton.vue";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
const newMessage = ref({
  name: "",
  mail:"",
  message:"",
});



// State to show success message
const messageSend = ref(false);

// Function to handle form submission
const submitForm = async () => {
  console.log("Formular abgesendet:", newMessage.value);
  console.log(newMessage.value)
  await apiCall({
  method: 'POST',
  url: '/message/send',
  data: newMessage.value,
})
.then(() => {
  newMessage.value = { name: "", mail: "", message: "" };
  messageSend.value = true;
})
.catch((error) => {
  console.error("Fehler beim API-Aufruf:", error);
  alert("Es gab ein Problem beim Senden der Nachricht.");
});


  // Show success message
  messageSend.value = true;
};
function goBack() {
  router.push("/");
}




</script>
<template>
  <div class="kontakt-container">
  <div class="kurs-form">
    <BackButton class="backbutton" @click="goBack"></BackButton>
    <h2>Sende uns eine Nachricht</h2>
    <form @submit.prevent="submitForm">
      <div class="kurs-group">
        <label for="name">Vor- und Nachname:</label>
        <input type="text" id="name" v-model="newMessage.name" placeholder="Name eingeben"  minlength="4" maxlength="100" required />
      </div>
      <div class="kurs-group">
        <label for="mail">E-Mail Adresse:</label>
        <input type="text" id="mail" v-model="newMessage.mail" placeholder="E-Mail eingeben" minlength="4" maxlength="100" required />
      </div>
      <div class="kurs-group">
        <label for="message">Deine Nachricht an uns:</label>
        <textarea type="text" id="message" v-model="newMessage.message" placeholder="Deine Nachricht"
        minlength="5" maxlength="500" required></textarea>
      </div>
      <PrimaryButton type="submit" buttontext="Nachricht abschicken"></PrimaryButton>
    </form>
    <div v-if="messageSend" class="success-message">
      <p>Nachricht wurde versandt!!</p>
    </div>
    </div>
  

  <div class="kurs-form">
    <h2>Erreiche uns</h2>
   
<label>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg> 
  Rheingutstraße 41, 78462 Konstanz</label>
  <label>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
  <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
  <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
</svg>
info@flexifit.de
  </label>
  <img src="../../assets/pictures/kontakt.png" alt="Location" class="location" />
  </div>
</div>
</template>

<style scoped>
.location {

  height: 200px;
  width: 250px;

}

/* Container für beide Boxen */
.kontakt-container {
  display: flex;
  flex-direction: column; /* Mobile Ansicht: Boxen untereinander */
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

/* Desktopansicht: Boxen nebeneinander */
@media (min-width: 768px) {
  .kontakt-container {
    flex-direction: row; /* Nebeneinander in der Desktopansicht */
  }
    .location {
      height: 300px;
      width: 350px;

    }
  }


.kurs-form {
  flex: 1;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #c8b1d9;
  border-radius: 10px;
  background-color: #f6ebf9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

.kurs-group {
  margin-bottom: 15px;
}
.kurs-group .form-select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #a084ca;
  font-size: 14px;
  margin-bottom: 15px;

}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #6a2c91;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #a084ca;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #6a2c91;
  box-shadow: 0 0 5px rgba(106, 44, 145, 0.5);
}

.success-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
  font-size: 14px;
}


</style>
