// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HeaderComponent from "@/components/Header.vue";

import Startseite from "@/components/Startseite.vue";

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
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/', // Weiterleitung zur Home-Seite
  },
];

const router = createRouter({
  history: createWebHistory(), // Für ein HTML5-Geschichte-basiertes Routing
  routes,
});

export default router;
