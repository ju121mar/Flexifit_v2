<script setup>
import { useTrainerStore } from "@/stores/trainer.js";
const trainerStore = useTrainerStore();
import { useMitgliedStore } from "@/stores/mitglied.js";
import {computed, onMounted} from "vue";
import {apiCall} from "@/utility/ApiCall.js";
import {useRouter} from "vue-router";
import {useRezeptionistStore} from "@/stores/rezeptionist.js";
const mitgliedStore = useMitgliedStore();
const rezeptionistStore = useRezeptionistStore();
const router = useRouter()

//Navbar ändert sich, je nach eingeloggtem Nutzer
const userType = computed(() => {
  if (mitgliedStore.mitglied) {
    return 'mitglied';
  } else if (trainerStore.trainer) {
    return 'trainer';
  } else if (rezeptionistStore.rezeptionist){
    return 'rezeptionist';
  } else {
    return null;
  }
});

onMounted(async () => {
  console.log(userType.value)
});

async function logout() {
  console.log("logout")
  if (userType.value === 'mitglied') {
    console.log("logout mitglied")
    await mitgliedStore.logout();
  } else if (userType.value === 'trainer') {
    console.log("logout trainer")
    await trainerStore.logout();
  }  else if (userType.value === 'rezeptionist') {
    await rezeptionistStore.logout();
  }
  await router.push('/');

}

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg custom-bg w-100">
      <div class="container">

        <RouterLink to="/" class="navbar-brand mx-auto">
          <img src="../assets/pictures/logo.png" alt="logo" class="logo"/>
          <img src="../assets/pictures/logoschrift.png" alt="logoschrift" class="logo"/>
        </RouterLink>
        <div class="d-flex align-items-center user-menu-container">
          <RouterLink v-if="!userType" to="/login/mitglied" class="navbar-brand d-lg-block user-icon me-2">
            <img src="../assets/pictures/UserIcon.png" alt="User Icon" class="user-icon-img" />
          </RouterLink>
          <button v-if="userType" @click="logout" class="navbar-brand d-lg-block user-icon me-2" style="background: none">
            <img src="../assets/pictures/LogoutIcon.svg" alt="Logout Icon" class="user-icon-img" />
          </button>

          <!-- Hamburgermenü -->
          <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <RouterLink    class="nav-link"
                             :class="{ 'active': $route.path === '/' }"
                             to="/">Studio</RouterLink>
            </li>
            <li class="nav-item">
<!--              <RouterLink  class="nav-link"-->
<!--                           v-if="userType === 'mitglied'"-->
<!--                           :class="{ 'active': $route.path.startsWith('/kursangebote') }"-->
<!--                           to="/kursangebote/booking">Kursangebote</RouterLink>-->
              <RouterLink  class="nav-link"
                           v-if="userType === 'trainer'"
                           :class="{ 'active': $route.path.startsWith('/kursangebote') }"
                           to="/kursangebote">Kursangebote Trainer</RouterLink>
              <RouterLink  class="nav-link"
                           v-else-if="userType === 'rezeptionist'"
                           :class="{ 'active': $route.path.startsWith('/kursangebote') }"
                           to="/kursangebote/manage">Kursanfragen</RouterLink>
              <RouterLink  class="nav-link"
                           v-else
                           :class="{ 'active': $route.path.startsWith('/kursangebote') }"
                           to="/kursangebote/booking">Kursangebote</RouterLink>

            </li>
            <li class="nav-item">
            <RouterLink  class="nav-link"
                         v-if="userType === 'mitglied'"
                           :class="{ 'active': $route.path.startsWith('/trainingsplan') }"
                           to="/trainingsplan">Mein Trainingsplan</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink  class="nav-link"
                           v-if="userType === 'mitglied'"
                           :class="{ 'active': $route.path.startsWith('/buchungen') }"
                           to="/buchungen">Meine Buchungen</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: #d8b5ea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
}

.container-fluid {
  padding: 0;
  margin-top: 20px;
}

.navbar-nav .nav-link {
  color: #444;
  font-weight: 500;
  font-size: 24px;
  margin-right: 50px;
}

.navbar-nav .nav-link.active {
  color: #7030a0 !important;
  font-weight: bold;
  position: relative;
}

.navbar-nav .nav-link.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 100%;
  height: 3px;
  background-color: #7030a0;
  border-radius: 2px;
}

.user-icon-img {
  width: 24px;
  height: 24px;
}

.user-icon {
  display: flex;
  align-items: center;
}

.logo {
  width: 100px;
  height: 80px
}

/* Mobile Anpassungen für das User-Icon */
@media (min-width: 768px) {
  .navbar-brand.ms-auto {
    margin-right: 0;
  }

  .user-icon {
    position: absolute;
    right: 70px;
    top: 50%;
    transform: translateY(-50%);
    border: 50px;
  }

  .user-icon-img {
    width: 32px;
    height: 32px;
  }

  .logo {
    width: 135px;
    height: 110px;
  }
}
</style>
