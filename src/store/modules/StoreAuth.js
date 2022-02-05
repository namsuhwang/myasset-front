import api from '@/assets/rest/api'
import createPersistedState from "vuex-persistedstate"
import {encrypt, decrypt} from '@/assets/crypto'
import { mapMutations, mapState, mapActions } from 'vuex';
import router from '@/router';


const persistedState = createPersistedState({
    paths: ['token', 'memberId', 'email', 'role']
})

const storeAuth = {
	namespaced: true,
	state: {
        token: null,
        memberId: null,
        role: null,
        email: null
	},
	getters: {
        'token': state => state.token,
        'memberId': state => state.memberId,
        'email': state => state.email, 
        'role': state => state.role
	},
	mutations: {	
        loginMember (state, item) {
            state.token = item.headers['accesstoken']
            state.memberId = item.data['memberId']
            state.role = item.data['role']
            state.email = item.data['email'] 
        },
        logoutMember (state) {
            state.token = null
            state.memberId = null
            state.role = null
            state.email = null
        }
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
                alert("로그인 완료");
                console.log("로그인 완료 : " + JSON.stringify(res));
                commit('loginMember', res);
                // 첫화면으로 주식 보유 현황 설정
                router.push({name : "StockKindTotal"}, );
            })
            .catch(e => {
                console.log(e)
                alert("로그인 요청에 문제가 발생했습니다.")
            })
      
        },
        logoutMember ({commit}) {
            commit('logoutMember')
        }
	}
};

export default storeAuth;