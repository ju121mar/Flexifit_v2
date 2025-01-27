// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Startseite from "@/views/Startseite.vue";
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
import NewTrainingsplanView from '@/views/Mitglied/NewTrainingsplanView.vue';
import MeinTrainingsplan from '@/views/Mitglied/MeinTrainingsplan.vue';
import BuchungenView from "@/views/Mitglied/BuchungenView.vue";
import LoginRezeptionistView from "@/views/Rezeptionist/LoginRezeptionistView.vue";
import LoginRezeptionistSuccess from "@/views/Rezeptionist/LoginRezeptionistSuccess.vue";
import RezeptionistKursansicht from "@/views/Rezeptionist/RezeptionistKursansicht.vue";
import Kursbuchungsdetails from "@/views/Rezeptionist/Kursbuchungsdetails.vue";
import Kontakt from '@/views/formalities/Kontakt.vue';
import Impressum from "@/views/formalities/Impressum.vue";
import Datenschutzerklärung from "@/views/formalities/Datenschutzerklärung.vue";
import SignUpMitglied from '@/views/Mitglied/SignUpMitglied.vue';
import {useMitgliedStore} from "@/stores/mitglied.js";
import {useRezeptionistStore} from "@/stores/rezeptionist.js";
import {useTrainerStore} from "@/stores/trainer.js";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Startseite,
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
    path: '/kursangebote/confirm/:id',
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
  {
    path: '/kontakt',
    component: Kontakt
  },
  {
    path: '/impressum',
    component: Impressum
  },
  {
    path: '/datenschutz',
    component: Datenschutzerklärung
  },
  {
    path: '/register',
    component: SignUpMitglied
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router.beforeEach((to, from, next) => {
//   const mitgliedStore = useMitgliedStore();
//   const rezeptionistStore = useRezeptionistStore();
//   const trainerStore =useTrainerStore();
//   const publicRoutes = ['/', '/login', '/kursangebote/booking', '/kontakt', '/impressum', '/datenschutz', '/login/mitglied', 'login/rezeptionist','/login/sucess/mitglied' ];
//   const mitgliedRoutes = [
//       '/kursangebote/kurs/:id',
//       '/buchungen',
//       '/register',
//       '/trainingsplan',
//       '/trainingsplan/new',
//       '/trainingsplan/exercise/:id',
//
//   ];
//   const rezeptionistRoutes = [
//       '/kursangebote/confirm/:id',
//       '/kursangebote/manage',
//     '/login/sucess/rezeptionist'
//   ]
//   const trainerRoutes =[
//       '/kursangebote',
//       '/kursangebote/new',
//       '/kursangebote/booking/:id/edit',
//       '/login/sucess'
//   ]

// 1. Zuerst öffentliche Routen prüfen
//   if (publicRoutes.includes(to.path)) {
//     return next();
//   }
//
//   // 2. Authentifizierungsstatus prüfen
//   if (!mitgliedStore && !rezeptionistStore && !trainerStore) {
//     return next({ path: '/login/mitglied' });
//   }
//
//   // 3. Admin-Routen-Berechtigung prüfen
//   if (mitgliedStore && !trainerStore && mitgliedRoutes.some(route => to.path.includes(route))) {
//     return next();
//   }
//   if (rezeptionistStore && rezeptionistRoutes.some(route => to.path.includes(route))) {
//       return next();
//   }
//   if (trainerStore && trainerRoutes.some(route => to.path.includes(route))) {
//       return next();
//   }

  // if (mitgliedRoutes.some(route => to.path.includes(route))) {
  //   if (!mitgliedStore.user) {
  //     return next({path: '/'});
  //   }
  // }
  //
  // if (rezeptionistRoutes.some(route => to.path.includes(route)) && !rezeptionistStore.user) {
  //   return next({ path: '/login/rezeptionist' });
  // }
  //
  // if (trainerRoutes.some(route => to.path.includes(route)) && !trainerStore.user) {
  //   return next({ path: '/login/trainer' });
  // }


  // 4. Wenn alle Prüfungen bestanden, Route freigeben
//   next();
// });

export default router;

