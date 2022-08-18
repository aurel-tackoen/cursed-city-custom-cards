import { createApp } from 'vue';
import { createPinia } from 'pinia';
import FontAwesomeIcon from '@/services/fontawesome.js';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.component('fa-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(router);

app.mount('#app');