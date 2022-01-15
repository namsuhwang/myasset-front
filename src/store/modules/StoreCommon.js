import axios from 'axios';

const StoreCommon = {
	namespaced: true,
	state: {
      bankCodeList: Object,
      bankAcnoTypeList: Object,
      stockCodeList: Object,
      assetTypeList: Object,
      reTypeList: Object, 
	},
	getters: {
        getBankCodeList(state) {
            return state.bankCodeList;
        },
        getBankAcnoTypeList(state) {
            return state.bankAcnoTypeList;
        },
        getStockCodeList(state) {
            return state.stockCodeList;
        },
        getAssetTypeList(state) {
            return state.assetTypeList;
        },
        getReTypeList(state) {
            return state.reTypeList;
        },  
	},
	mutations: {		
        setBankCodeList(state, commonCodeList){
            state.bankCodeList = commonCodeList;
        },	
        setBankAcnoTypeList(state, commonCodeList){
            state.bankAcnoTypeList = commonCodeList;
        },	
        setStockCodeList(state, commonCodeList){
            state.stockCodeList = commonCodeList;
        },	
        setAssetTypeList(state, commonCodeList){
            state.assetTypeList = commonCodeList;
        },	
        setReTypeList(state, commonCodeList){
            state.reTypeList = commonCodeList;
        }, 
	},
	actions: { 
		getCommonCodeInit({commit, state}) {	
            axios.post(process.env.VUE_APP_REST_BASE_URL 
                + '/myasset/common/codelist', {divCode : 'FC_CODE', codeDesc : 'BANK'} )
            .then((response)=>{
                console.log(response.data); 
                commit('setBankCodeList', response.data);
            });
                     
            axios.post(process.env.VUE_APP_REST_BASE_URL 
                + '/myasset/common/codelist', {divCode : 'BANK_ACNO_TYPE', codeDesc : ''} )
            .then((response)=>{
                console.log(response.data); 
                commit('setBankAcnoTypeList', response.data);
            });
                     
            axios.post(process.env.VUE_APP_REST_BASE_URL 
                + '/myasset/common/codelist', {divCode : 'FC_CODE', codeDesc : 'STOCK'} )
            .then((response)=>{
                console.log(response.data); 
                commit('setStockCodeList', response.data);
            });
                     
            axios.post(process.env.VUE_APP_REST_BASE_URL 
                + '/myasset/common/codelist', {divCode : 'ASSET_TYPE', codeDesc : ''} )
            .then((response)=>{
                console.log(response.data); 
                commit('setAssetTypeList', response.data);
            });
                     
            axios.post(process.env.VUE_APP_REST_BASE_URL 
                + '/myasset/common/codelist', {divCode : 'RE_TYPE', codeDesc : ''} )
            .then((response)=>{
                console.log(response.data); 
                commit('setReTypeList', response.data);
            });
		}, 
	}
};

export default StoreCommon;