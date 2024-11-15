import { createApp } from 'vue'; 
import App from './App.vue';  // Import the root component
import router from './router';  // Import the router
import './index.css';
// Pinia store management
import { createPinia } from "pinia";
// Vue Toastification for notifications
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';  // Import Toast styles
// FontAwesome for icons
import '@fortawesome/fontawesome-free/css/all.css';  // Import FontAwesome
// Vue Sweetalert2 for elegant alerts
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';  // Import Sweetalert2 styles

// Create the Vue app
const app = createApp(App);

// Use Pinia for state management
app.use(createPinia());

// Use the Vue router for navigation
app.use(router);

// Use Sweetalert2 for alert modals
app.use(VueSweetalert2);

// Configure and use Vue Toastification with specific options
app.use(Toast, {
    position: POSITION.TOP_RIGHT,  // Notifications appear at the top-right
    theme: 'bubble'  // Use the 'bubble' theme for notifications
});

// Mount the app on the #app element
app.mount("#app");
