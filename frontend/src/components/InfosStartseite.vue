<script setup>

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



  <!--Unsere Werte-->
  <section class="course-section">
    <h2>Unsere Werte</h2>
    <div class="container">
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-md-6 col-lg-6 mb-4 px-2 px-lg-3">
          <div class="course-card">
            <img src="../assets/pictures/Fitness.png" alt="Fitness" class="course-image" />
            <div class="course-info">
              <h3>Fitness</h3>
              <p>
                FlexiFit bietet alle Mittel und Ressourcen, um deine körperlichen
                Ziele zu erreichen – von individuellen Trainingsplänen über
                motivierende Trainer bis hin zu einer unterstützenden Gemeinschaft.
              </p>
              <button class="book-button">Mein Trainingsplan</button>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-6 mb-4 px-2 px-lg-3">
          <div class="course-card">
            <img src="../assets/pictures/Lifestyle.png" alt="Lifestyle" class="course-image" />
            <div class="course-info">
              <h3>Lifestyle</h3>
              <p>
                FlexiFit ist dein Schlüssel zu einem aktiveren Lebensstil – mit abwechslungsreichen Sportarten und liebevoll gestalteten Kursen, die du ganz flexibel in deinen Alltag integrieren kannst.
              </p>
              <router-link to="/kursangebote">
                <button class="book-button">Kursangebote</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!--Trainer-->
  <div class="trainer-section">
    <h2>Wir unterstützen dich!</h2>
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
      <img src="../src/assets/pictures/trainer.jpg" alt="Trainer" class="trainer-image" />
      <button class="book-button">Mein Trainingsplan ➔</button>
    </div>
  </div>
</template>

<style scoped>

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
  font-size: 28px;
  margin-bottom: 10px;
  text-align: center;
}

.hours-section p {
  color: #444;
  font-size: 16px;
  line-height: 1.6;
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
.course-section {
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  text-align: center;
  margin: 20px 0;
}

.course-section h2 {
  color: #7030a0;
  margin-bottom: 20px;
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
  font-size: 18px;
}

.trainer-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.trainer-image {
  width: 170px;
  max-width: 170px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 20px;
  display: block;
}

/* Bild auf kleinen Bildschirmen ausblenden */
@media (max-width: 768px) {
  .trainer-image {
    display: none; /* Bild ausblenden, wenn Bildschirmbreite kleiner als 768px ist */
  }
}


.trainer-card .book-button {
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #7030a0;
  color: white;
  cursor: pointer;
  text-align: center;
  order: 2;
  align-self: center;
  border: 1px solid white;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.trainer-card .book-button:hover {
  background-color: white;
  color: #7030a0;
}

.trainer-card h3 {
  color: #7030a0;
  font-size: 22px;
  margin-bottom: 30px;
  width: 100%;
}

.trainer-section h2 {
  color: #7030a0;
  text-align: center;
  margin-top: 20px;
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
</style>