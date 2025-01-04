// import './assets/main.css'
import PrimeVue from 'primevue/config';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Aura from '@primevue/themes/aura';
import router from './router/index.js'
import '@/components/style.css'
import axios from 'axios'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

if (!import.meta.env.PROD) {
    console.log("--> Development Mode")
    axios.defaults.baseURL = "http://localhost:1337";
    } else {
    console.log("--> Production Mode")
    axios.defaults.baseURL = "/";
    }
    axios.defaults.withCredentials = true;

const app = createApp(App);
// app.use(PrimeVue, {
//     theme: {
//         preset: Aura
//     }
// });
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)
app.mount('#app')

