import axios from 'axios';

const StoreTotalAsset = {
	namespaced: true,
	state: {
      // 종합현황 요약
      totalAsset: Object,
	},
	getters: {
        getTotalAsset(state) {
            return state.totalAsset;
        } 
	},
	mutations: {
		
        setTotalAsset(state, totalAsset){
            state.totalAsset = totalAsset;
        },
	},
	actions: {
        // 종합현황 
		getTotalAsset({commit, state}, memberId) {	          
            axios.post(process.env.VUE_APP_REST_BASE_URL 
                +'/myasset/asset/total', { memberId: memberId })
            .then((response)=>{
                console.log(response.data); 
                commit('setTotalAsset', response.data);
            });
		}, 
	}
};

export default StoreTotalAsset;