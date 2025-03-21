import { createApp } from 'vue';  // For Vue 3
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);  // Register the router with the app
app.mount('#app');
