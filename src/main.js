import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' 
import './assets/css/myasset.css'
import router from './router'
import api from './assets/rest/api.js'
import commonUtil from './assets/commonUtil'
import restStock from './assets/rest/restStock'
import restSystem from './assets/rest/restSystem'
import store from './store/store'


let emitter = mitt();
let app = createApp(App)

// 글로벌 변수 보관함
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.axios = axios;
app.config.globalProperties.api = api;


// import './registerServiceWorker'

app
.use(store)
.use(router)
.use(commonUtil)
.use(restStock)
.use(restSystem)
.mount('#app')
