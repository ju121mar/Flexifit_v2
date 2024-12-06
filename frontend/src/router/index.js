// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Startseite from "@/components/Startseite.vue";
import BookingView from '@/views/BookingView.vue';
import BookingOverView from '@/views/BookingOverView.vue';
import KursEntry from '@/components/KursEntry.vue';
import NewKursView from '@/views/NewKursView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Startseite,
  },
  {
    path: '/lala',
    name: 'lala',
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
    path: '/new',
    name: 'NewKursView',
    component: NewKursView,
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/', // Weiterleitung zur Startseite
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

