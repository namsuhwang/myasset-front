import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' 
import './assets/css/myasset.css'
// import Toast, { POSITION, toastInjectionKey } from "vue-toastification";
import router from './router'
import api from './assets/rest/api'
// import api from '@/assets/rest/api'
import commonUtil from './assets/commonUtil'
import {encrypt, decrypt} from './assets/crypto'
import restStock from './assets/rest/restStock'
import restSystem from './assets/rest/restSystem'
import store from './store/store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


let emitter = mitt();
let app = createApp(App)

// 글로벌 변수 보관함
app.config.globalProperties.emitter = emitter;
// app.prototype.$api = api;
// vue.prototype.$rsaencrypt = encrypt;
// vue.prototype.$rsasdecrypt = decrypt;

const options = {
    position : 'bottom-center',
    timeout : 1000,
};


app
.use(store)
.use(router) 
.use(Toast, options)
.use(commonUtil)
.use(restStock)
.use(restSystem)
.mount('#app')

