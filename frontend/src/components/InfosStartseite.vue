

<script setup>
import { ref, onMounted } from "vue";
import PrimaryButton from "@/components/Buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/Buttons/SecondaryButton.vue";

const showCookiePopup = ref(false);

// Beim Laden der Seite prüfen, ob der Benutzer das Cookie-Hinweis bereits akzeptiert/abgelehnt hat
onMounted(() => {
  const cookieConsent = localStorage.getItem("cookieConsent");
  if (!cookieConsent) {
    showCookiePopup.value = true; 
  }
});

function handleAccept() {
  console.log("Cookies akzeptiert");
  localStorage.setItem("cookieConsent", "accepted");
  showCookiePopup.value = false; 
}

function handleReject() {
  console.log("Cookies abgelehnt");
  localStorage.setItem("cookieConsent", "rejected"); 
  showCookiePopup.value = false; 
}
</script>
<template>
  <!-- Öffnungszeiten -->
  <div class="hours-section">
    <div class="hours-row">
      <div class="hours-column">
        <h2>Öffnungszeiten</h2>
        <p>Montag - Freitag&nbsp;&nbsp;06:00 - 24:00 Uhr</p>
        <p>Sa-, Sonn- & Feiertags&nbsp;&nbsp;06:00 - 24:00 Uhr</p>
      </div>
      <div class="hours-column">
        <h2>Trainerzeiten</h2>
        <p>Montag - Freitag&nbsp;&nbsp;08:00 - 20:00 Uhr</p>
        <p>Sa-, Sonn- & Feiertags&nbsp;&nbsp;08:00 - 18:00 Uhr</p>
      </div>
    </div>
  </div>



  <!-- Unsere Werte -->
<section class="values-section">
  <h1>Unsere Werte</h1>
  <div class="values-container">
    <div class="value-card">
      <img src="../assets/pictures/Fitness.png" alt="Fitness" class="value-image" />
      <div class="value-info">
        <h3>Fitness</h3>
        <p>
          FlexiFit bietet alle Mittel und Ressourcen, um deine körperlichen
          Ziele zu erreichen – von individuellen Trainingsplänen über
          motivierende Trainer bis hin zu einer unterstützenden Gemeinschaft.
        </p>
        <router-link to="/login/mitglied">
          <SecondaryButton class="secondarybutton" buttontext="Mein Trainingsplan"></SecondaryButton>
        </router-link>
      </div>
    </div>

    <div class="value-card">
      <img src="../assets/pictures/Lifestyle.png" alt="Lifestyle" class="value-image" />
      <div class="value-info">
        <h3>Lifestyle</h3>
        <p>
          FlexiFit ist dein Schlüssel zu einem aktiveren Lebensstil – mit abwechslungsreichen Sportarten 
          und liebevoll gestalteten Kursen, die du ganz flexibel in deinen Alltag integrieren kannst.
        </p>
        <router-link to="/kursangebote">
          <SecondaryButton class="secondarybutton" buttontext="Kursangebote"></SecondaryButton>
        </router-link>
      </div>
    </div>
  </div>
</section>



  <!--Trainer-->
  <div class="values-section">
    <h1>Wir unterstützen dich!</h1>
    <div class="trainer-card">
      <h3>Dein individueller Trainingsplan</h3>
      <div class="trainer-info">
        <p>
          Halbmarathon laufen, 10 Kilo abnehmen, 100 Liegestütze schaffen:
          Verfolgst du auch ein bestimmtes Trainingsziel? Dann brauchst du
          einen Plan! Wir stellen für dich einen individuellen Trainingsplan
          zusammen mit Übungen zum Muskeln aufbauen, Abnehmen und für mehr
          Ausdauer!
        </p>
      </div>
      <img src="../assets/pictures/trainer.jpg" alt="Trainer" class="trainer-image" />
      <div class="button-container">
      <router-link to="/login/mitglied">
        <PrimaryButton class="primarybutton" buttontext="Jetzt anmelden und Trainingsplan erstellen!"></PrimaryButton>
      </router-link>
    </div>
    </div>
  </div>

  <!-- Sportplatz-Manager -->
  <section class="values-section">
    <h1>Sportplatz-Manager</h1>
    <div class="values-container">
      <div class="value-card">
        <img src="../assets/pictures/stadium.jpg" alt="Sportplatz" class="platz-image" />
        <div class="value-info">
          <h3>Der perfekte Sportplatz für dich!</h3>
          <p>
            Suchst du eine hochwertige Sportanlage für dein Training oder ein spannendes Match mit Freunden? 
            Mit unserem Partner <strong>Sportplatz-Manager</strong> findest du den idealen Platz ganz in deiner Nähe.
          </p>
          <a href="https://sportplatz-manager.onrender.com/" target="_blank">
            <SecondaryButton class="secondarybutton" buttontext="Jetzt Sportplatz finden"></SecondaryButton>

          </a>
        </div>
      </div>
    </div>
  </section>

  <div v-if="showCookiePopup" id="cookie-popup" class="cookie-popup">
    <div class="cookie-popup-content">
      <h2>Cookie-Einstellungen</h2>
      <p>
        Wir setzen Cookies ein, um unsere Webseiten optimal für Sie zu gestalten. Weitere Infos finden Sie in unserer
        <RouterLink to="/datenschutz" class="popup-link">Datenschutzerklärung</RouterLink>. Technisch notwendige Cookies werden auch bei der Auswahl von "Ablehnen" gesetzt.
      </p>
      <p>
        Mit einem Klick auf <strong>„Akzeptieren“</strong> stimmen Sie der Verarbeitung Ihrer Daten zu.
      </p>
      <RouterLink to="/impressum" class="popup-link">Impressum</RouterLink>
      <div class="cookie-buttons">
        <SecondaryButton
          class="secondarybutton"
          buttontext="Ablehnen"
          @click="handleReject"
        ></SecondaryButton>
        <PrimaryButton
          class="primarybutton"
          buttontext="Akzeptieren"
          @click="handleAccept"
        ></PrimaryButton>
      </div>
    </div>
  </div>

  
</template>

<style scoped>

.cookie-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
}

.cookie-popup-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.cookie-popup h2 {
  font-size: 22px;
  color: #7030a0;
  margin-bottom: 10px;
}

.cookie-popup p {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 10px;
}

.popup-link {
  color: #7030a0;
  text-decoration: none;
}

.popup-link:hover {
  text-decoration: underline;
}


/* Buttons */
.cookie-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}


/* Responsive Anpassungen */
@media (max-width: 768px) {
  .cookie-popup-content {
    padding: 10px;
  }
  .cookie-popup h2 {
    font-size: 18px;
  }
  .cookie-popup p {
    font-size: 12px;
  }
  .cookie-button {
    font-size: 14px;
    padding: 8px 15px;
  }
}


/* Öffnungs- und Trainerzeiten */
.hours-section {
  width: 90%;
  max-width: 800px;
  background-color: #d3bfe3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(112, 48, 160, 0.8);
  margin: 20px auto;
}

.hours-row {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hours-column {
  flex: 1;
}

.hours-section h2 {
  color: #7030a0;
  margin-bottom: 10px;
  text-align: center;
}

.hours-section p {
  color: #444;
  font-size: 22px;
  line-height: 1.5;
  margin: 5px 0;
  text-align: center;
}

@media (min-width: 768px) {
  .hours-row {
    flex-direction: row;
  }
  .hours-section p {
    font-size: 20px;
  }
}

/*Styling für Werte-Section*/
.value-section h2 {
  color: #7030a0;
  margin-bottom: 20px;
}

/*Styling für Trainer-Section*/
.trainer-card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 90%;
  max-width: 800px;
  background-color: #d3bfe3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(112, 48, 160, 1);
  margin: 20px auto;
  position: relative;
  flex-wrap: wrap;
  font-size: 22px;
  line-height: 1.5;
}

.trainer-info {
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.trainer-image {
  width: 300px;
  height: 320px;
  max-width: 300px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 20px;
  margin-bottom: 20px;
}

/* Bild auf kleinen Bildschirmen ausblenden */
@media (max-width: 768px) {
  .trainer-image {
    display: none; /* Bild ausblenden, wenn Bildschirmbreite kleiner als 768px ist */
  }
}


.button-container {
  margin-top: auto;
  width: 100%;
  text-align: center;
}


.trainer-card h3 {
  color: #7030a0;
  text-align: center;
  margin-bottom: 30px;
  width: 100%;
}

.trainer-section h2 {
  color: #7030a0;
  text-align: center;
  margin-top: 20px;
  font-size: 36px;
}

.trainer-section {
  margin-bottom: 100px;
}

@media (max-width: 600px) {
  .hours-section h2 {
    font-size: 18px;
  }

  .hours-section p {
    font-size: 14px;
  }
}


.values-section h2 {
  color: #7030a0;
  margin: 40px auto;
  text-align: center;
}
.values-section h1 {
  color: #7030a0;
  margin: 40px auto;
  text-align: center;
}

.values-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 150px;
  margin-bottom: 70px;
}


.value-card {
  width: 100%;
  max-width: 700px;
  background: #ffffff;
  border: 2px solid #d3bfe3;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(112, 48, 160, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(112, 48, 160, 0.4);
}

.value-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.value-info {
  padding: 20px;
}

.value-info h3 {
  color: #7030a0;
  margin-bottom: 15px;
}

.value-info p {
  font-size: 22px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.value-button {
  display: inline-block;
  color: #7030a0;
  background-color: transparent;
  border: 2px solid #7030a0;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.value-button:hover {
  background-color: #7030a0;
  color: #ffffff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .values-container {
    flex-direction: column;
    align-items: center;
  }

  .value-card {
    max-width: 90%;
  }

  .value-info h3 {
    font-size: 1.5rem;
  }

  .value-info p {
    font-size: 1rem;
  }

  .value-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}

@media (max-width: 480px) {
  .values-section h2 {
    font-size: 2rem;
  }

  .value-info h3 {
    font-size: 1.2rem;
  }

  .value-info p {
    font-size: 1rem;
  }

  .trainer-info p {
    font-size: 1rem;
  }
}

.value-image {
  width: 80%; 
  max-width: 200px; 
  height: auto; 
  object-fit: cover;
  margin: 0 auto 20px auto; 
  display: block; 
}

@media (max-width: 768px) {
  .value-image {
    max-width: 150px;
  }
}

@media (max-width: 480px) {
  .value-image {
    max-width: 120px;
  }
}

</style>