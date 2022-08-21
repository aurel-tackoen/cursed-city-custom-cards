import { createApp } from 'vue';
import { createPinia } from 'pinia';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import FontAwesomeIcon from '@/plugins/fontawesome.js';
import router from '@/plugins/router';

import App from './App.vue';

import './assets/main.css';

const app = createApp(App);
const store = createPinia();

dayjs.extend(relativeTime);

app.component('fa-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.provide('dayjs', dayjs);

app.mount('#app');
