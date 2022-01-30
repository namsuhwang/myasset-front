import axios from 'axios';

const methods = { 
    memberLogin(loginInfo, callbackFunc) {	    
        console.log("공통함수 회원 로그인 _ 시작 입력 : " + JSON.stringify(loginInfo));     
        axios.post(process.env.VUE_APP_REST_BASE_URL 
            + '/myasset/system/login', loginInfo)
        .then((response)=>{ 
            var loginResult = response.data;
            console.log("공통함수 회원 로그인 _ 결과 : " + JSON.stringify(loginResult)); 
            callbackFunc(loginResult);
        })
        .catch((error)=>{
            console.log("memberLogin error");
            console.log(error);
        });
    }, 
}
    
export default{
    install(Vue){ 
        Vue.config.globalProperties.$memberLogin = methods.memberLogin;
    }
}