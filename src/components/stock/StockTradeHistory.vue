<template>
    <div class="row g-2 m-4">   
        <h5>주식 거래내역</h5>   
        <div class="col-12">
            <div class="input-group">
                <label class="input-group-text">종목</label>
                <select class="form-select" v-model="tradeSearch.stockKindCd" >
                    <option v-for="(stockKind, i) in stockKindList" :key="i" 
                    :value="stockKind.stockKindCd">{{ stockKind.stockKindName }}</option>
                </select>
            </div>
        </div>  
        <div class="col-12">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="rdoTrade" :checked="tradeSearch.tradeType=='ALL'" v-model="tradeSearch.tradeType" @change="radioChange('buy')" id="rdoTradeAll" value="ALL">
                <label class="form-check-label" for="rdoTradeAll">전체</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="rdoTrade" :checked="tradeSearch.tradeType=='BUY'" v-model="tradeSearch.tradeType" @change="radioChange('buy')" id="rdoTradeBuy" value="BUY">
                <label class="form-check-label" for="rdoTradeBuy">매수</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="rdoTrade" :checked="tradeSearch.tradeType=='SALE'" v-model="tradeSearch.tradeType" @change="radioChange('sale')" id="rdoTradeSale" value="SALE">
                <label class="form-check-label" for="rdoTradeSale">매도</label>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">기간</span>
                <input type="date" class="form-control" v-model="tradeSearch.searchStartDate" placeholder="YYYY.MM.DD">
                <input type="date" class="form-control" v-model="tradeSearch.searchEndDate" placeholder="YYYY.MM.DD">
            </div>
        </div> 
        <br/>
        <div class=""> 
            <button id='btnBuy' type="button" @click="callGetStockTradeHistory" class="btn btn-primary btn-sm">조회</button>
        </div>
        <br/>
        <br/>
        <h6 align="left">실현손익금액&nbsp;:&nbsp;{{this.$comma3(stockTradeHistory.realPnlAmt)}}&nbsp;원, &nbsp;&nbsp;실현손익율&nbsp;:&nbsp;{{this.$comma3(stockTradeHistory.realPnlRate)}}&nbsp;%</h6>
        <br/>
        <div class="col-12">
            <div >  
                <div style="overflow: auto">
                    <table class="table table-sm" style="font-size: 12px; width: 550px;">
                        <thead class="table-light">
                            <tr>
                                <th>거래일시</th>
                                <th>거래</th>
                                <th>종목</th>
                                <th>단가</th>
                                <th>수량</th>
                                <th>거래금액</th>
                                <th>손익금액</th>
                                <th>손익율(%)</th>
                                <th>비용</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(stockTrade, i) in stockTradeHistory.list" :key="i">
                                <td>{{stockTrade.tradeDateTime}}</td>
                                <td>{{stockTrade.tradeTypeName}}</td>
                                <td>{{stockTrade.stockKindName}}</td>
                                <td align="right">{{this.$comma3(stockTrade.tradeUnitPrice)}}</td>
                                <td align="right">{{this.$comma3(stockTrade.tradeQuantity)}}</td>
                                <td align="right">{{this.$comma3(stockTrade.tradeAmt)}}</td>
                                <td :class="this.$numColor(stockTrade.pnlAmt)">{{this.$comma3(stockTrade.pnlAmt)}}</td>
                                <td :class="this.$numColor(stockTrade.pnlRate)">{{this.$comma3(stockTrade.pnlRate)}}</td>
                                <td align="right">{{this.$comma3(stockTrade.feeAmt + stockTrade.taxAmt)}}</td>
                            </tr>                    
                        </tbody>
                    </table> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/assets/rest/api'
import { onMounted, ref, reactive, toRefs, watch, computed } from 'vue';

export default {
    name: 'StockTradeHistory',
    data(){
        return {
            tradeSearch : {
                stockTradeType : '',
                stockKindCd : '',
                searchStartDate : '',
                searchEndDate : ''
            },
            stockKindList : [{
                stockKindId : '',
                assetId : '',
                stockKindCd : '',
                stockKindName : '',
            }],
            stockTradeHistory : {
                realPnlAmt : 0,
                realPnlRate : 0.0,
                list : [{
                    stockTradeId : '',
                    tradeType : '',
                    tradeDateTime : '',
                    tradeTypeName : '',
                    stockKindId : '',
                    stockKindCd : '',
                    stockKindName : '',
                    tradeQuantity : '',
                    tradeUnitPrice : '',
                    tradeAmt : '',
                    befQuantity : '',
                    aftQuantity : '',
                    befBuyAvgPrice : '',
                    befBuyTotPrice : '',
                    aftBuyAvgPrice : '',
                    aftBuyTotPrice : '',
                    taxAmt : '',
                    feeAmt : '',
                    pnlRate : '',
                    pnlAmt : '',
                    regDatetime : '',
                    lastUpdateDatetime : ''
                }]
            },
        }
    },    
    methods : { 
        callGetStockKindList(){ 
            this.$getStockKindList(1, this.callbackStockKindList);
        },
        callbackStockKindList(stockKindList){
            this.stockKindList = stockKindList;
        },
        callGetStockTradeHistory(){ 
            this.$getStockTradeHistory(this.tradeSearch, this.callbackStockTradeHistory);
        },
        callbackStockTradeHistory(stockTradeHistory){
            this.stockTradeHistory = stockTradeHistory;
        },
        clickRouterPushStockKind(stockKind){ 
            this.$router.push( 
                {name: 'StockKindDetail', params:{stockKind: JSON.stringify(stockKind)}}
            )
        },
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
            this.callGetStockKindList();
            this.tradeSearch.searchStartDate = this.$getDate(10, 'M', -12, ".");
            this.tradeSearch.searchEndDate = this.$getDate(10, null, null, ".");
        })
        
    } 
}
</script>

<style>
.textLeft{
    text-align: left;
}
</style>