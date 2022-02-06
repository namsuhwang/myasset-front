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
    console.log("api.interceptors.response.use 정상 조회 결과 :" + JSON.stringify(response));
    // 응답이 정상(200)일 경우 호출
    return response;
  },
  function (error) {
    // 응답에 문제가 발생한(200을 제외한 나머지) 경우 호출
    console.log("api.interceptors.response.use error : "  + JSON.stringify(error.response));
  
    if(error.response.status == 401){
        console.log("api.interceptors.response.use error.status : "  + error.response.status); 
        //router.push({name: 'Login', params: {httpStatus: '401'}}); 
        //axios.post(process.env.VUE_APP_REST_BASE_URL + "/myasset/auth/getToken", )

        let refreshToken = localStorage.getItem('refreshtoken');
        console.log("토큰 만료로 재발급 위한 리프레쉬 토큰 입력 : " + refreshToken);
        axios.post(process.env.VUE_APP_REST_BASE_URL + '/myasset/auth/getToken', null, {
            headers: { 'content-type': 'application/json', 'refreshtoken' : refreshToken }
        })
        .then(res => {
            console.log("토큰 재발급 완료 : " + JSON.stringify(res));       
            storeAuth.state.token = res.data.accesstoken;
            localStorage.setItem('token', res.data.accesstoken);
            localStorage.setItem('refreshtoken', res.data.refreshtoken);
            const orginalReq = error.config;
            console.log("토큰 재발급 완료 이전 request orginalReq : " + JSON.stringify(orginalReq));     
            // errorApi.retry = true;
            // errorApi.headers.accesstoken = res.data.accesstoken;

            axios.defaults.headers.common['accesstoken'] = res.data.accesstoken;
            orginalReq.headers['accesstoken'] = res.data.accesstoken;
            console.log("토큰 재발급 완료 토큰 재세팅 orginalReq : " + JSON.stringify(orginalReq));   
            return axios(orginalReq);
        })
        .catch(e => {
            console.log(e)
            alert("토큰 재발급 요청에 문제가 발생했습니다.")
        });
    }else if(error.response.status == 403){
        router.push({name: 'Login', params: {httpStatus: '403'}});
    }else if(error.response.status == 400){
        console.log("에러 400 : " + error.response.data.message); 
    }else{
        alert(error.message);
    }  
    return Promise.reject(error)
  }
)

export default api