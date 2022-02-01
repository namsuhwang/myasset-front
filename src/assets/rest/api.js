import axios from 'axios'
import storeAuth from '@/store/modules/storeAuth'
import router from '../../router'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.VUE_APP_REST_BASE_URL ,
  headers: {
    'accesstoken': storeAuth.state.token
  },
  timeout: 30000
})

api.interceptors.request.use(
  function (config) {
    console.log("api.interceptors.request.use 토큰:" + storeAuth.state.token);
    config.headers.accesstoken = storeAuth.state.token;
    console.log("api.interceptors.request.use config:" + JSON.stringify(config));
    // 요청직전에 호출되며, axios의 설정을 여기서 진행
    return config
  },
  function (error) {
    console.log("api.interceptors.request.use error:" + JSON.stringify(error));
    // 요청 에러직전에 호출
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response) {
    console.log("api.interceptors.response.use confresponseig:" + JSON.stringify(response));
    // 응답이 정상(200)일 경우 호출
    return response
  },
  function (error) {
    // 응답에 문제가 발생한(200을 제외한 나머지) 경우 호출
    console.log("api.interceptors.response.use error : "  + error);
    // window.location.href = "/system/login";
    
    router.push({name: 'Login', });
    return error
  }
)

export default api