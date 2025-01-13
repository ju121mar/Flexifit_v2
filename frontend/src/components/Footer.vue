<script setup>

</script>

<template>
  <footer class="footer text-center">
    <section class="mb-5">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-8">
          <div class="logo-text-container d-flex align-items-center">
            <img src="../assets/pictures/FlexiFitLogo.jpg" alt="FlexiFit Logo" height="60" />
          </div>
          <div class="text-content ms-3">
            <p>Stay Flexi!</p>
            <p>Sport, der zu deinem Leben passt!</p>
          </div>
        </div>
      </div>
    </section>

    <hr class="footer-divider" />

    <div class="row text-center d-flex justify-content-center pt-3">
      <div class="col-md-2">
        <h6><a href="/impressum">Impressum</a></h6>
      </div>
      <div class="col-md-2">
        <h6><a href="#">Studio</a></h6>
      </div>
      <div class="col-md-2">
        <h6><a href="/kursangebote">Kursangebote</a></h6>
      </div>
      <div class="col-md-2">
        <h6><a href="#">Mein Trainingsplan</a></h6>
      </div>
      <div class="col-md-2">
        <h6><a href="#">Kontakt</a></h6>
      </div>
    </div>
  </footer>
</template>

<style scoped>

.footer {
  width: 100%;
  background-color: #d8b5ea;
  color: white;
  padding: 20px 0;
}

.footer p,
.footer h6 {
  margin: 0;
  color: white;
}

.footer-divider {
  border-top: 1px solid #7030a0;
  width: 80%;
  margin: 20px auto;
}

.footer a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.footer a:hover {
  color: #7030a0;
}

@media (max-width: 768px) {
  .footer a {
    font-size: 14px;
  }
}
</style>