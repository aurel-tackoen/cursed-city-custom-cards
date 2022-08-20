import { createApp } from 'vue';
import { createPinia } from 'pinia';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import FontAwesomeIcon from '@/plugins/fontawesome.js';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);
const store = createPinia();

dayjs.extend(relativeTime);
app.config.globalProperties.$dayjs = dayjs;

app.component('fa-icon', FontAwesomeIcon);
app.use(router);
app.use(store);

app.mount('#app');
