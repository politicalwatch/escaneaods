import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import VueGtag from 'vue-gtag';
import '@politicalwatch/tipi-uikit/src/styles/main.scss';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(
  VueGtag,
  {
    config: { id: import.meta.env.VITE_GA_ID },
    boootstrap: false,
  },
  router
);

app.mount('#app');
