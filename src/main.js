import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router';

let emitter = mitt();
let app = createApp(App)

// 글로벌 변수 보관함
app.config.globalProperties.emitter = emitter;

import store from './store/store.js'
// import './registerServiceWorker'

app.use(store).use(router).mount('#app')
