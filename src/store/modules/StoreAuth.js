import api from '@/assets/rest/api'
import createPersistedState from "vuex-persistedstate"
import {encrypt, decrypt} from '@/assets/crypto'
import { mapMutations, mapState, mapActions } from 'vuex';
import router from '@/router';  
import { useToast } from "vue-toastification"; 


const persistedState = createPersistedState({
    paths: ['token', 'memberId', 'email', 'role']
})

const storeAuth = {
	namespaced: true,
	state: {
        token: null,
        memberId: null,
        role: null,
        email: null,
        refreshToken: null
	},
	getters: {
        'token': state => state.token,
        'memberId': state => state.memberId,
        'email': state => state.email, 
        'role': state => state.role,
	},
	mutations: {	
        loginMember (state, item) {
            state.token = item.data['accesstoken']
            state.memberId = item.data['memberId']
            state.role = item.data['role']
            state.email = item.data['email'] 
            localStorage.setItem('token', state.token);
            localStorage.setItem('refreshtoken', item.data['refreshtoken']);
            localStorage.setItem('email', state.email);
            localStorage.setItem('memberId', state.memberId);
            localStorage.setItem('role', state.role);
        },
        getToken (state, item) {
            state.token = item.data['accesstoken']
            localStorage.setItem('token', state.token);
            localStorage.setItem('refreshtoken', item.data['refreshtoken']);
        },
        logoutMember (state) {
            state.token = null;
            state.memberId = null;
            state.role = null;
            state.email = null;
            state.refreshToken = null;
            localStorage.setItem('token', null);
            // localStorage.setItem('email', null);
            // localStorage.setItem('memberId', null);
            // localStorage.setItem('role', null);
        },
        setState(state){
          console.log("storeAuth.js 토큰 : " + localStorage.getItem('token'));
          console.log("storeAuth.js 이메일 : " + localStorage.getItem('email'));
          state.token = localStorage.getItem('token')
          state.memberId = localStorage.getItem('memberId')
        //   state.role = localStorage.getItem('role')
        //   state.email = localStorage.getItem('email')
          console.log("storeAuth.js 토큰1 : " + state.token);
        },
        setToken(state, tokenObj){
          console.log("setToken refreshtoken토큰1 : " + JSON.stringify(tokenObj));
          state.token = tokenObj['accesstoken'];
          state.refreshtoken = tokenObj['refreshtoken'] ;
          localStorage.setItem('token', tokenObj.accesstoken);
          localStorage.setItem('refreshtoken', tokenObj.refreshtoken);
          console.log("setToken accesstoken 토큰 : " + localStorage.getItem('accesstoken'));  
          console.log("setToken refreshtoken 토큰 : " + localStorage.getItem('refreshtoken'));  
        },
	},
	actions: { 
        loginMember ({commit}, {email, pwd}) {
            const params = {
                "email": email,
                "pwd": pwd
            }   
            console.log("로그인 : " + JSON.stringify(params))

            api.post('/myasset/auth/loginMember', params, {
                headers: { 'content-type': 'application/json' }
            })
            .then(res => {
                console.log("로그인 완료 : " + JSON.stringify(res)); 
                console.log("로그인 완료 토큰 : " + res.data['accesstoken']);
                console.log("로그인 완료 리프레쉬 토큰 : " + res.data['refreshtoken']);
                
                const toast = useToast();   
                toast("로그인 완료");
                commit('loginMember', res);
                router.push({name : "StockKindTotal"}, );
            })
            .catch(e => {
                console.log("로그인 에러 : " + JSON.stringify(e.response)); 
                alert("로그인 실패 : " + e.response.data.message);
            })
      
        },
        getToken ({commit}) {
            let refreshToken = localStorage.getItem('refreshtoken');
            console.log("토큰 만료로 재발급 위한 리프레쉬 토큰 입력 : " + refreshToken);
            api.post('/myasset/auth/getToken', null, {
                headers: { 'content-type': 'application/json', 'refreshtoken' : refreshToken }
            })
            .then(res => {
                console.log("토큰 재발급 완료 : " + JSON.stringify(res));                
                commit('getToken', res);
                // const toast = useToast();   
                // toast("로그인 완료");
                // commit('loginMember', res);
                // router.push({name : "StockKindTotal"}, );
            })
            .catch(e => {
                console.log(e)
                alert("토큰 재발급 요청에 문제가 발생했습니다.")
            })
      
        },
        logoutMember ({commit}) {
            commit('logoutMember')
        },
        setState({commit}) {
            commit('setState')
        },
        setToken({commit}, {accesstoken, refreshtoken}) {
            console.log('setToken accesstoken=' + accesstoken);
            console.log('setToken refreshtoken=' + refreshtoken);
            var tokenObj = new Object();
            tokenObj.accesstoken = accesstoken;
            tokenObj.refreshtoken = refreshtoken;
            commit('setToken', tokenObj)
        },
	}
};

export default storeAuth;