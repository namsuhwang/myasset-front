<template>
    <h5>보유 주식</h5> 
    <div class="m-4">   
        <div class="mb-3">
            <table class="table table-borderless table-light">
                <tbody>
                    <tr>
                        <td>총매입액</td>
                        <td>{{this.$comma3(stockKindTotal.totBuyPrice)}}</td>
                        <td>손익금액</td>
                        <td>{{this.$comma3(stockKindTotal.totPnlAmt)}}</td>
                    </tr>
                    <tr>
                        <td>총평가액</td>
                        <td>{{this.$comma3(stockKindTotal.totCurPrice)}}</td>
                        <td>손익율</td>
                        <td>{{this.$comma3(stockKindTotal.totPnlRate)}}&nbsp;%</td>
                    </tr>  
                </tbody>
            </table>
        </div>  
        <div class="col-12">
            <div class="input-group">
                <h5>시세  </h5><h9>&nbsp;&nbsp;&nbsp;{{stockKindTotal.baseTime}}</h9>
                <table class="table table-sm">
                    <thead class="table-light">
                        <tr>
                            <th>종목명</th>
                            <th>현재가</th>
                            <th>전일대비</th>
                            <th>등락률</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stockKind, i) in stockKindTotal.list" :key="i">
                            <td>{{stockKind.stockKindName}}</td>
                            <td>{{this.$comma3(stockKind.curUnitPrice)}}</td>
                            <td>{{this.$comma3(stockKind.diffAmount)}}</td>
                            <td>{{this.$comma3(stockKind.dayRange)}}</td>
                        </tr>                    
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref, reactive, toRefs, watch, computed } from 'vue';

export default {
    name: 'StockKindTotal',
    data(){
        return {
            // baseTime : '',     
            // totBuyPrice : '',
            // totCurPrice : '',
            // totPnlRate : '',
            // totPnlAmt : '', 
            // stockKind : {
            //     stockKindId : '',
            //     assetId : '',
            //     stockKindCd : '',
            //     stockKindName : '',
            //     quantity : '',
            //     buyAvgPrice : '',
            //     buyTotPrice : '',
            //     curUnitPrice : '',
            //     curTotPrice : '',
            //     pnlRate : '',
            //     pnlAmt : '',
            //     diffAmount: '',
            //     dayRange : '',
            //     highPrice : '',
            //     lowPrice : '',
            //     deleteYn : '',
            //     memberId : '',
            //     baseTime : '',
            //     regDatetime : '',
            //     lastUpdateDatetime : ''
            // },
            // stockKindList : null,
            stockKindTotal : {
                baseTime : '',     
                totBuyPrice : '',
                totCurPrice : '',
                totPnlRate : '',
                totPnlAmt : '', 
                list : [{
                    stockKindId : '',
                    assetId : '',
                    stockKindCd : '',
                    stockKindName : '',
                    quantity : '',
                    buyAvgPrice : '',
                    buyTotPrice : '',
                    curUnitPrice : '',
                    curTotPrice : '',
                    pnlRate : '',
                    pnlAmt : '',
                    diffAmount: '',
                    dayRange : '',
                    highPrice : '',
                    lowPrice : '',
                    deleteYn : '',
                    memberId : '',
                    baseTime : '',
                    regDatetime : '',
                    lastUpdateDatetime : ''
                }]
            },
        }
    },    
    methods : { 
        callGetStockKindTotal(){ 
            // var result = await this.$getStockKindTotal(1);
            // console.log("callGetStockKindTotal " + JSON.stringify(result));
            // this.stockKindTotal = result;
            var memberId = 1;    
            console.log("callGetStockKindTotal 주식 종합 조회 _ 시작 회원ID : " + memberId);     
            axios.post(process.env.VUE_APP_REST_BASE_URL 
                + '/myasset/stock/total', {memberId : memberId} )
            .then((response)=>{ 
                this.stockKindTotal = response.data;
                //this.stockKindList = this.stockKindTotal.stockKindList;
                console.log("callGetStockKindTotal 주식 종합 조회 _ 결과 : " + JSON.stringify(this.stockKindTotal));  
                return stockKindTotal;
            })
            .catch((error)=>{
                console.log("getStockKindTotal error");
                console.log(error);
            });
        },

    },
    watch:{
        'stockKindTotal.baseTime' : function(val){   
            console.log("watch stockKindTotal.baseTime : " + val);
            console.log("watch stockKindTotal : " + JSON.stringify(this.stockKindTotal));
            this.baseTime = val;
            console.log("watch stockKindTotal " + JSON.stringify(this.stockKindTotal));
        },
        // stockKindTotal: {
        //     deep : true,
        //     handler(val){
        //         console.log("watch stockKindTotal_1 : " + JSON.stringify(val));

        //     }
        // }
    },
    created(){
        // this.callGetStockKindTotal();
        // this.stockKindTotal = this.$getStockKindTotal(1);
    },
    computed: {
    },
    mounted(){ 
        // 전체 화면내용이 렌더링된 후에 아래의 코드가 실행됩니다.        
        this.$nextTick(function () {            
            this.callGetStockKindTotal();
        })
        
    } 
}
</script>

<style>

</style>