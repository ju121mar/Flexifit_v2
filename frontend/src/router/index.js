// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Startseite from "@/components/Startseite.vue";
import BookingView from '@/views/BookingView.vue';
import BookingOverView from '@/views/BookingOverView.vue';
import KursEntry from '@/components/KursEntry.vue';
import NewKursView from '@/views/NewKursView.vue';
import EditView from '@/views/EditView.vue';
import LoginView from "@/views/LoginView.vue";
import LoginSucessView from "@/views/LoginSucessView.vue";


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
    name: 'BookingOverview',
    component: BookingOverView,
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
    component: LoginView,
  },

  {
    path: '/login/sucess',
    name: 'LoginSucessView',
    component: LoginSucessView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

