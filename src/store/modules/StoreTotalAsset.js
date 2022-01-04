import axios from 'axios';

const StoreTotalAsset = {
	namespaced: true,
	state: {
      // 종합현황 요약
      totalAssetSummary: {
        netAsset: 0,           // 순자산
        totalAsset: 0,         // 총자산
        totalLoanBalAmt: 0,    // 총 대출잔액
        stockEvalAmt: 0,       // 주식 평가액
        ableAmt: 0,            // 출금가능금액(주식계좌 출금 + 은행 출금)
        reEvalAmt: 0           // 부동산 평가액
      }
	},
	getters: {
        getTotalAssetSummary(state) {
            return state.totalAssetSummary;
        } 
	},
	mutations: {
		
        setTotalAssetSummary(state, totalAssetSummary){
            state.totalAssetSummary = totalAssetSummary;
        },
	},
	actions: {
        // 종합현황 요약
		getTotalAssetSummary({commit, state}, memberId) {	          
            axios.post('/myasset/asset/total/summary', { memberId: memberId })
            .then((response)=>{
                console.log(response.data);
                commit('setTotalAssetSummary', response.data);
            });
		}, 
	}
};

export default StoreTotalAsset;