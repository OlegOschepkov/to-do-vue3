import { createApp } from 'vue';
import App from '@/App.vue';
import components from '@/components/UI';
import router from '@/router/index';
import store from '@/store';

const app = createApp(App);

components.forEach(component => {
  app.component(component.__name, component)
})

import '@/assets/scss/style.scss';

app
  .use(router)
  .use(store)
  .mount('#app');
