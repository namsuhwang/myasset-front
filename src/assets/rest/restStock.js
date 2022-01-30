import axios from 'axios';

const methods = {
    getStockKindInfo(stockKindCode, callbackFunc) {	    
        console.log("공통함수 종목 조회 _ 시작 : " + stockKindCode);     
        axios.post(process.env.VUE_APP_REST_BASE_URL 
            + '/myasset/scrap/stockkind', {kindCode : stockKindCode} )
        .then((response)=>{
            // console.log("종목 조회 _ 결과 : " + JSON.stringify(response.data)); 
            var stockRealTimeInfo = response.data;
            console.log("공통함수 종목 조회 _ 결과 : " + JSON.stringify(stockRealTimeInfo));  
            callbackFunc(stockRealTimeInfo);
        })
        .catch((error)=>{
            console.log("stockKind error");
            console.log(error);
        });
    }, 
    getStockKindTotal(memberId, callbackFunc) {	    
        console.log("공통함수 보유 주식 종합(시세 포함) 조회 _ 시작 회원ID : " + memberId);     
        axios.post(process.env.VUE_APP_REST_BASE_URL 
            + '/myasset/stock/total', {memberId : memberId} )
        .then((response)=>{ 
            var stockKindTotal = response.data;
            console.log("공통함수 보유 주식 종합(시세 포함 _ 결과 : " + JSON.stringify(stockKindTotal)); 
            callbackFunc(stockKindTotal);
        })
        .catch((error)=>{
            console.log("getStockKindTotal error");
            console.log(error);
        });
    }, 
    getStockKindList(memberId, callbackFunc) {	    
        console.log("공통함수 보유 주식 목록 조회 _ 시작 회원ID : " + memberId);     
        axios.post(process.env.VUE_APP_REST_BASE_URL 
            + '/myasset/stock/kind/list', {memberId : memberId} )
        .then((response)=>{ 
            var stockKindList = response.data;
            console.log("공통함수 보유 주식 목록 조회 _ 결과 : " + JSON.stringify(stockKindList)); 
            callbackFunc(stockKindList);
        })
        .catch((error)=>{
            console.log("getStockKindList error");
            console.log(error);
        });
    }, 
    getStockTradeHistory(tradeSearch, callbackFunc) {	    
        console.log("공통함수 주식 거래내역 조회 _ 시작 입력 : " + JSON.stringify(tradeSearch));     
        axios.post(process.env.VUE_APP_REST_BASE_URL 
            + '/myasset/stock/trade/history', tradeSearch)
        .then((response)=>{ 
            var stockTradeHistory = response.data;
            console.log("공통함수 주식 거래내역 조회 _ 결과 : " + JSON.stringify(stockTradeHistory)); 
            callbackFunc(stockTradeHistory);
        })
        .catch((error)=>{
            console.log("getStockTradeHistory error");
            console.log(error);
        });
    }, 
}
    
export default{
    install(Vue){
        Vue.config.globalProperties.$getStockKindInfo = methods.getStockKindInfo;
        Vue.config.globalProperties.$getStockKindTotal = methods.getStockKindTotal;
        Vue.config.globalProperties.$getStockKindList = methods.getStockKindList;
        Vue.config.globalProperties.$getStockTradeHistory = methods.getStockTradeHistory;
    }
}