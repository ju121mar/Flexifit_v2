// import './assets/main.css'
import PrimeVue from 'primevue/config';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Aura from '@primevue/themes/aura';
import router from './router/index.js'
import '@/components/style.css'

const app = createApp(App);
// app.use(PrimeVue, {
//     theme: {
//         preset: Aura
//     }
// });
app.use(router)
app.use(createPinia)
app.mount('#app')

