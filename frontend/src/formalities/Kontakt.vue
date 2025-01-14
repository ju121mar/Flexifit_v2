<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'
import {apiCall} from "@/utility/ApiCall.js";
import router from "@/router/index.js";
import BackButton from "@/components/Buttons/BackButton.vue";
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




</script>
<template>
  <div class="kurs-form">
    <BackButton class="backbutton" @click="goBack"></BackButton>
    <h2>Sende uns eine Nachricht</h2>
    <form @submit.prevent="submitForm">
      <div class="kurs-group">
        <label for="name">Vor- und Nachname:</label>
        <input type="text" id="name" v-model="newMessage.name" placeholder="Nachricht eingeben" required />
      </div>
      <div class="kurs-group">
        <label for="mail">E-Mail Adresse:</label>
        <input type="text" id="mail" v-model="newMessage.mail" placeholder="E-Mail eingeben" required />
      </div>
      <div class="kurs-group">
        <label for="message">Deine Nachricht an uns:</label>
        <input type="text" id="message" v-model="newMessage.message" placeholder="Deine Nachricht" />
      </div>
      <button type="submit">Nachricht abschicken</button>
    </form>
    <div v-if="messageSend" class="success-message">
      <p>Nachricht wurde versandt!!</p>
    </div>
  </div>
</template>

<style scoped>

.kurs-form {
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

button,
.zurueck-button {
  padding: 10px 15px;
  background-color: #6a2c91;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  display: inline-block; 
  text-align: center; 
  text-decoration: none; 
  margin-right: 70px;
}

button:hover,
.zurueck-button:hover {
  background-color: #4e216c;
}
.modal-backdrop {
  z-index: 1040; /* Bootstrap Modal-Z-Index */
}

.modal.show {
  display: block;
}
.img-thumbnail {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.img-thumbnail:hover {
  transform: scale(1.05);
}

.modal-header {
  background-color: #6a2c91;
  color: white;
}

.btn-primary {
  background-color: #6a2c91;
  border: none;
}

.btn-primary:hover {
  background-color: #4e216c;
}


</style>
