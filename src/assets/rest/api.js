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
    return response;
  },
  function (error) {
    // 응답에 문제가 발생한(200을 제외한 나머지) 경우 호출
    console.log("api.interceptors.response.use error : "  + JSON.stringify(error.response));
    console.log("api.interceptors.response.use error.status : "  + error.response.status);
  
    if(error.response.status == 401 || error.response.status == 403){
      router.push({name: 'Login', });
    }else{
      alert(error.message);
    } 
    
    /* 아래 코드는 참고용. 403 인 경우 리프레쉬 토큰이용하여 자동 재접속 해야 하는 경우임
       https://minhyeong-jang.github.io/2020/01/08/js-axios-interceptors-error */
    /*
    if (error.response && error.response.status === 403) {
      return Auth.refreshToken() // token 재발행 및 반환
        .then(token => {
          originalRequest.headers["Authorization"] = token;
          return _axios.request(error.config); // error.config(origin API 정보)를 다시 요청
        })
        .catch(error => {
          window.location.href = "/login";
        });
    }*/
    return error;
  }
)

export default api