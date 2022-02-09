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
            var accesstoken = res.data.accesstoken;
            var refreshtoken = res.data.refreshtoken;
            console.log("재발급된 엑세스 토큰 : " + accesstoken);  
            console.log("재발급된 리프레쉬 토큰 : " + refreshtoken);  
            
            storeAuth.state.token = accesstoken;
            localStorage.setItem('token', accesstoken);
            localStorage.setItem('refreshtoken', refreshtoken);
            const orginalReq = error.config;
            console.log("토큰 재발급 완료 이전 request orginalReq : " + JSON.stringify(orginalReq));     
            // errorApi.retry = true;
            // errorApi.headers.accesstoken = res.data.accesstoken;

            
            axios.defaults.headers.common['accesstoken'] = accesstoken;
            orginalReq.headers['accesstoken'] = accesstoken;
            console.log("토큰 재발급 완료 토큰 재세팅 orginalReq : " + JSON.stringify(orginalReq));   
            return axios(orginalReq);
        })
        .catch(e => {
            console.log("getToken 에러 : " + JSON.stringify(e.response));
            var errorData = e.response.data;
            if(errorData.status == 400){
                if(errorData.code == "0001" || errorData.code == "0002"){
                    console.log("자동 로그인에 실패했습니다. 다시 로그인하십시오.");
                    localStorage.setItem('refreshtoken', null);
                    localStorage.setItem('token', null);
                    storeAuth.state.token = null;
                    router.push({name: 'Login', });
                }
            }else{
                alert("토큰 재발급 요청에 문제가 발생했습니다.")
            }
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