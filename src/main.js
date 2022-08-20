import { createApp } from 'vue';
import { createPinia } from 'pinia';
import FontAwesomeIcon from '@/plugins/fontawesome.js';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);
const store = createPinia();

app.component('fa-icon', FontAwesomeIcon);
app.use(router);
app.use(store);

app.mount('#app');
