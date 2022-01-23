<template>
    <div class="m-4">   
        <h5>보유 주식</h5> 
        <h6 align="left">&nbsp;{{stockKindTotal.baseTime}}</h6>
        <div class="mb-3">
            <table class="table table-borderless table-light">
                <tbody>
                    <tr>
                        <td>총매입액</td>
                        <td align="right">{{this.$comma3(stockKindTotal.totBuyPrice)}}</td>
                        <td>손익금액</td>
                        <td id="totPnlAmt" :class="this.$numColor(stockKindTotal.totPnlAmt)">{{this.$comma3(stockKindTotal.totPnlAmt)}}</td>
                    </tr>
                    <tr>
                        <td>총평가액</td>
                        <td align="right">{{this.$comma3(stockKindTotal.totCurPrice)}}</td>
                        <td>손익율(%)</td>
                        <td id="totPnlRate" :class="this.$numColor(stockKindTotal.totPnlRate)">{{this.$comma3(stockKindTotal.totPnlRate)}}</td>
                    </tr>  
                </tbody>
            </table>
        </div>  
        <br/>
        <div class="col-12">
            <div class="input-group">
                <h5>시세  </h5>
                <!-- <table class="table table-sm"> -->
                <table class="table table-sm" cellspacing="0" width="100%">
                    <thead class="table-light">
                        <tr>
                            <th>종목명</th>
                            <th>현재가</th>
                            <th>전일대비</th>
                            <th>등락률(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stockKind, i) in stockKindTotal.list" :key="i">
                            <!-- <td ><router-link :to="{name: 'StockKindDetail', params:{memberId: 1, stockKindObj: stockKind, assetId: stockKind.assetId, stockCode: stockKind.stockKindCd}}">{{stockKind.stockKindName}}</router-link></td> -->
                            <td @click="clickRouterPushStockKind(stockKind)">{{stockKind.stockKindName}}</td>
                            <td :class="this.$numColor(stockKind.diffAmount)">{{this.$comma3(stockKind.curUnitPrice)}}</td>
                            <td :class="this.$numColor(stockKind.diffAmount)">{{this.$comma3(stockKind.diffAmount)}}</td>
                            <td :class="this.$numColor(stockKind.dayRange)">{{this.$comma3(stockKind.dayRange)}}</td>
                        </tr>                    
                    </tbody>
                </table>
            </div>
        </div> 
        <br/>
        <div class="col-12">
            <div >
                <div class="input-group">
                    <h5>종목별 손익  </h5>
                </div>    
                <div style="overflow: auto">
                    <table class="table table-sm" style="font-size: 12px; width: 550px;">
                    <!-- <table class="table table-sm" style="font-size: 12px; width: 100%; cellspacing:0;"> -->
                        <thead class="table-light">
                            <tr>
                                <th>종목명</th>
                                <th width="40px">보유수</th>
                                <th>손익액</th>
                                <th width="60px">손익율(%)</th>
                                <th>평단가</th>
                                <th>매입가</th>
                                <th>평가액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(stockKind, i) in stockKindTotal.list" :key="i">
                                <td>{{stockKind.stockKindName}}</td>
                                <td align="right">{{this.$comma3(stockKind.quantity)}}</td>
                                <td :class="this.$numColor(stockKind.pnlAmt)">{{this.$comma3(stockKind.pnlAmt)}}</td>
                                <td :class="this.$numColor(stockKind.pnlRate)">{{this.$comma3(stockKind.pnlRate)}}</td>
                                <td align="right">{{this.$comma3(stockKind.buyAvgPrice)}}</td>
                                <td align="right">{{this.$comma3(stockKind.buyTotPrice)}}</td>
                                <td align="right">{{this.$comma3(stockKind.curTotPrice)}}</td>
                            </tr>                    
                        </tbody>
                    </table> 
                </div>
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
            this.$getStockKindTotal(1, this.callbackStockKindTotal);
        },
        callbackStockKindTotal(stockKindTotal){
            this.stockKindTotal = stockKindTotal;
            //if(this.stockKindTotal.totPnlRate > 0) totPnlRate.style.color = "red"; else if(this.stockKindTotal.totPnlRate < 0) totPnlRate.style.color = "blue"; else totPnlRate.style.color = "black" ;
            //if(this.stockKindTotal.totPnlAmt > 0) totPnlAmt.style.color = "red"; else if(this.stockKindTotal.totPnlAmt < 0) totPnlAmt.style.color = "blue"; else totPnlAmt.style.color = "black" ;
            // if(this.stockKindTotal.diffAmount > 0) diffAmount.style.color = "red"; else if(this.stockKindTotal.diffAmount < 0) diffAmount.style.color = "blue"; else diffAmount.style.color = "black" ;
            // if(this.stockKindTotal.dayRange > 0) dayRange.style.color = "red"; else if(this.stockKindTotal.dayRange < 0) dayRange.style.color = "blue"; else dayRange.style.color = "black" ;
            // if(this.stockKindTotal.pnlAmt > 0) pnlAmt.style.color = "red"; else if(this.stockKindTotal.pnlAmt < 0) pnlAmt.style.color = "blue"; else pnlAmt.style.color = "black" ;
            // totPnlAmt
            // diffAmount
            // datRange.style.color = "red";
            // pnlAmt
            // pnlRate
        },
        clickRouterPushStockKind(stockKind){ 
            this.$router.push( 
                {name: 'StockKindDetail', params:{stockKind: JSON.stringify(stockKind)}}
            )
        },
        // numColor(numVal){
        //     if(numVal > 0){
        //         return "num-plus";            
        //     }else if(numVal < 0){ 
        //         return "num-minus";           
        //     }else{
        //         return "num-zero";           
        //     }
        // }
    },
    watch:{
    },
    created(){
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
.textLeft{
    text-align: left;
}
</style>