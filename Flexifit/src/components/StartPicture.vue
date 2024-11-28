<script setup>

</script>

<template>
  <!-- Startbild mit Oberlay Text -->
  <div class="container-fluid p-0 position-relative">
    <img
        src="../assets/pictures/Laufband.png"
        alt="Startbild"
        class="img-fluid background-image"
    />
    <div class="text-overlay">
      <h1>
        Dein Flexibles Fitnessstudio in Konstanz<br />
        Sport, der zu deinem Leben passt
      </h1>
      <p>
        Fördere deinen Körper und erreiche deine Ziele. Flexible Kursbuchung und dein
        individueller Trainingsplan. Stay Flexi.
      </p>
    </div>
  </div>
</template>

<style scoped>

.background-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.text-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  color: white;
  background-color: rgba(211, 191, 227, 0.8);
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

/* Mobile Ansicht Bild mit Text-Overlay */
@media (max-width: 600px) {
  .background-image {
    max-height: 200px;
  }

  .text-overlay h1 {
    font-size: 18px;
  }

  .text-overlay p {
    font-size: 14px;
  }
  .text-overlay {
    padding: 5px;
  }
}

/* Mittlere Ansicht (768px bis 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .background-image {
    max-height: 350px;
  }

  .text-overlay h1 {
    font-size: 28px;
  }

  .text-overlay p {
    font-size: 20px;
  }

  .text-overlay {
    padding: 20px;
  }
}

/* Desktop Ansicht (ab 992px) */
@media (min-width: 992px) {
  .background-image {
    max-height: 80vh;
  }

  .text-overlay h1 {
    font-size: 38px;
  }

  .text-overlay p {
    font-size: 24px;
  }

  .text-overlay {
    padding: 50px;
  }
}
</style>