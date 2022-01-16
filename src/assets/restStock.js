import axios from 'axios';

const methods = {
    getStockKindInfo(stockKindCode) {	    
        console.log("공통함수 종목 조회 _ 시작 : " + stockKindCode);     
        axios.post(process.env.VUE_APP_REST_BASE_URL 
            + '/myasset/scrap/stockkind', {kindCode : stockKindCode} )
        .then((response)=>{
            // console.log("종목 조회 _ 결과 : " + JSON.stringify(response.data)); 
            var stockInfo = response.data;
            console.log("공통함수 종목 조회 _ 결과 : " + JSON.stringify(stockInfo)); 
            return stockInfo;
        })
        .catch((error)=>{
            console.log("getStockKindInfo error");
            console.log(error);
        });
    }, 
    getStockKindTotal(memberId) {	    
        console.log("공통함수 주식 종합 조회 _ 시작 회원ID : " + memberId);     
        axios.post(process.env.VUE_APP_REST_BASE_URL 
            + '/myasset/stock/total', {memberId : memberId} )
        .then((response)=>{ 
            var stockKindTotal = response.data;
            console.log("공통함수 주식 종합 조회 _ 결과 : " + JSON.stringify(stockKindTotal));  
            return stockKindTotal;
        })
        .catch((error)=>{
            console.log("getStockKindTotal error");
            console.log(error);
        });
    }, 
}
    
export default{
    install(Vue){
        Vue.config.globalProperties.$getStockKindInfo = methods.getStockKindInfo;
        Vue.config.globalProperties.$getStockKindTotal = methods.getStockKindTotal;
    }
}