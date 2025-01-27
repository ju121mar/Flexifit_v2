// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router';
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
router.beforeEach((to, from, next) => {
    const mitgliedStore = useMitgliedStore();
    const rezeptionistStore = useRezeptionistStore();
    const trainerStore = useTrainerStore();

    const publicRoutes = ['/', '/login', '/kursangebote/booking', '/kontakt', '/impressum', '/datenschutz', '/login/mitglied', '/login/rezeptionist', '/login/rezeptionist', '/register'];

    if (publicRoutes.includes(to.path)) {
        return next();
    }

    const isAuthenticated = mitgliedStore.mitglied || rezeptionistStore.rezeptionist || trainerStore.trainer;

    if (!isAuthenticated) {
        return next('/login/mitglied');
    }

    // 3. Rollenspezifische Routenprüfung
    const mitgliedRoutes = [
        '/kursangebote/kurs',
        '/buchungen',
        '/trainingsplan',
        '/login/success/mitglied'
    ];

    const rezeptionistRoutes = [
        '/kursangebote/confirm',
        '/kursangebote/manage',
        '/login/success/rezeptionist'
    ];

    const trainerRoutes = [
        '/kursangebote',
        '/kursangebote/new',
        '/kursangebote/booking',
        '/login/success'
    ];
    if (mitgliedRoutes.some(route => to.path.startsWith(route))) {
        if (mitgliedStore.mitglied) {
            return next();
        } else {
            return next('/login/mitglied');
        }
    }
    if (rezeptionistRoutes.some(route => to.path.startsWith(route))) {
        if (rezeptionistStore.rezeptionist) {
            return next();
        } else {
            return next('/login/rezeptionist');
        }
    }

    // Prüfe, ob die Route eine Trainer-Route ist
    if (trainerRoutes.some(route => to.path.startsWith(route))) {
        if (trainerStore.trainer) {
            return next();
        } else {
            return next('/login');
        }
    }

    next();
});

export default router;

