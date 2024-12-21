// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Startseite from "@/components/Startseite.vue";
import BookingView from '@/views/BookingView.vue';
import BookingOverView from '@/views/BookingOverView.vue';
import KursEntry from '@/components/KursEntry.vue';
import NewKursView from '@/views/NewKursView.vue';
import EditView from '@/views/EditView.vue';
import LoginTrainerView from "@/views/LoginTrainerView.vue";
import LoginSucessView from "@/views/LoginSucessView.vue";
import TrainerView from "@/views/TrainerView.vue";
import BookingOverview from "@/views/BookingOverview.vue";
import CourseDetailView from "@/views/CourseDetailView.vue";
import LoginMitgliedView from '@/views/LoginMitgliedView.vue';
import LoginMitgliedSuccess from "@/views/LoginMitgliedSuccess.vue";
import Trainingsplan from '@/components/Trainingsplan.vue';
import NewTrainingsplanView from '@/views/NewTrainingsplanView.vue';


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
    component: TrainerView,
  },
  {
    path: '/kursangebote/booking',
    name: 'BookingOverview',
    component: BookingOverview,
  },
  {
    path: '/kursangebote/kurs/:id',
    name: 'CourseDetailView',
    component: CourseDetailView,
  },
  {
    path: '/kursangebote/new',
    name: 'NewKursView',
    component: NewKursView,
  },

  {
      path: '/kursangebote/booking/:id/edit',
      name: 'EditCourse',
      component: EditView,
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
    path: '/login/sucess',
    name: 'LoginSucessView',
    component: LoginSucessView,
  },
  {
    path: '/login/sucess/mitglied',
    name: 'LoginSucessView',
    component: LoginMitgliedSuccess,
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

