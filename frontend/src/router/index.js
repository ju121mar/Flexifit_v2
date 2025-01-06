// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Startseite from "@/views/Startseite.vue";
import BookingView from '@/views/BookingView.vue';
import NewKursView from '@/views/Trainer/NewKursView.vue';
import EditKurs from '@/views/Trainer/EditKurs.vue';
import LoginTrainerView from "@/views/Trainer/LoginTrainerView.vue";
import LoginTrainerSuccess from "@/views/Trainer/LoginTrainerSuccess.vue";
import TrainerKursansicht from "@/views/Trainer/TrainerKursansicht.vue";
import MitgliedKursansicht from "@/views/Mitglied/MitgliedKursansicht.vue";
import KursDetailansicht from "@/views/Mitglied/KursDetailansicht.vue";
import LoginMitgliedView from '@/views/Mitglied/LoginMitgliedView.vue';
import LoginMitgliedSuccess from "@/views/Mitglied/LoginMitgliedSuccess.vue";
import Trainingsplan from '@/components/Trainingsplan.vue';
import NewTrainingsplanView from '@/views/NewTrainingsplanView.vue';
import MeinTrainingsplan from '@/views/Mitglied/MeinTrainingsplan.vue';
import BuchungenView from "@/views/Mitglied/BuchungenView.vue";
import LoginRezeptionistView from "@/views/Rezeptionist/LoginRezeptionistView.vue";
import LoginRezeptionistSuccess from "@/views/Rezeptionist/LoginRezeptionistSuccess.vue";
import RezeptionistKursansicht from "@/views/Rezeptionist/RezeptionistKursansicht.vue";
import Kursbuchungsdetails from "@/views/Rezeptionist/Kursbuchungsdetails.vue";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Startseite,
  },
  {
    path: '/booking/:id',
    name: 'BookingPage',
    //component: () => import('@/views/BookingView.vue'), //fuer dynamische Ansicht
    component: BookingView,
  },

  {
    path: '/kursangebote',
    name: 'TrainerView',
    component: TrainerKursansicht,
  },
  {
    path: '/kursangebote/booking',
    name: 'BookingOverview',
    component: MitgliedKursansicht,
  },
  {
    path: '/kursangebote/manage',
    name: 'RezeptionistKursansicht',
    component: RezeptionistKursansicht,
  },
  {
    path: '/kursangebote/confirm',
    name: 'Kursbuchungdetails',
    component: Kursbuchungsdetails,
  },
  {
    path: '/kursangebote/kurs/:id',
    name: 'CourseDetailView',
    component: KursDetailansicht,
  },
  {
    path: '/kursangebote/new',
    name: 'NewKursView',
    component: NewKursView,
  },

  {
      path: '/kursangebote/booking/:id/edit',
      name: 'EditCourse',
      component: EditKurs,
  },


  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/', // Weiterleitung zur Startseite
  },

  {
    path: '/login',
    name: 'LoginView',
    component: LoginTrainerView,
  },
  {
    path: '/login/mitglied',
    name: 'LoginMitgliedView',
    component: LoginMitgliedView
  },
  {
    path: '/login/rezeptionist',
    name: 'LoginRezeptionistView',
    component: LoginRezeptionistView
  },

  {
    path: '/login/sucess',
    name: 'LoginSucessView',
    component: LoginTrainerSuccess,
  },
  {
    path: '/login/sucess/mitglied',
    name: 'LoginMitgliedSucess',
    component: LoginMitgliedSuccess,
  },
  {
    path: '/login/sucess/rezeptionist',
    name: 'LoginRezeptionistSucess',
    component: LoginRezeptionistSuccess,
  },

  {
    path: '/trainingsplan',
    name: 'Trainingsplan',
    component: Trainingsplan,
  },

  {
    path: '/trainingsplan/new',
    name: 'NewTrainingsplan',
    component: NewTrainingsplanView,
  },

  {
    path: '/trainingsplan/exercise/:id',
    name: 'ExerciseDetail',
    component: MeinTrainingsplan,
  },
  {
    path: '/buchungen',
    component: BuchungenView
  },
  {
    path: '/kurs/:id',
    component: KursDetailansicht
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

