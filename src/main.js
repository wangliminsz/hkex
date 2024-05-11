import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

// import './assets/main.css'
import './assets/tailwind.css'

// fontawesome
import '@fortawesome/fontawesome-free/css/all.css'

// bootstrap css / js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

// main css
import './styles.css'

import router from './router'
import store from './store'

import { createApp } from 'vue'
// import { createRouter, createWebHistory } from 'vue-router'
// import { createStore } from 'vuex'
import App from './App.vue'

const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(store)
app.use(router)

app.mount('#app')
