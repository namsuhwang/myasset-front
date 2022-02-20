<template>
    <div class="m-4">   
        <h5>관심 종목</h5> 
        <h6 align="left">&nbsp;{{stockInterestData.baseTime}}</h6> 
        <br/>
        <transition name="modalFade">
            <StockKindSearch  :stockKindSearchModalVisible="stockKindSearchModalVisible" :stockKind="stockKind"  @closeKindSearchModal="closeStockKindSearch"/>
        </transition>
        <div class="col-12">
            <button type="button" class="btn btn-secondary btn-sm" @click="openKindSearchModal">추가</button>&nbsp;
            <button type="button" class="btn btn-secondary btn-sm">삭제</button>&nbsp;&nbsp;
            <button type="button" class="btn btn-secondary btn-sm">상</button>&nbsp;
            <button type="button" class="btn btn-secondary btn-sm">하</button>&nbsp;
            <button type="button" class="btn btn-secondary btn-sm">적용</button>
        </div>
        <br/>
        <div class="col-12">
            <div class="input-group">
                <table class="table table-sm" cellspacing="0" width="100%">
                    <thead class="table-light">
                        <tr>
                            <th><button type="button" @click="checkVisible=true" class="btn btn-primary btn-sm">선택</button></th>
                            <th>종목명</th>
                            <th>현재가</th>
                            <th>전일대비</th>
                            <th>등락률(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stockInterest, i) in stockInterestData.list" :key="i">                            
                            <td ><input v-if="checkVisible" @click="stockKindClick(stockInterest)" class="form-check-input" type="radio" name="stockInterest.orderId" :id="stockInterest.orderId"></td>
                            <td @click="clickRouterPushStockKind(stockInterest)">{{stockInterest.stockKindName}}</td>
                            <td :class="this.$numColor(this.$uncomma(stockInterest.diffAmount))">{{this.$comma3(stockInterest.curUnitPrice)}}</td>
                            <td :class="this.$numColor(this.$uncomma(stockInterest.diffAmount))">{{this.$comma3(stockInterest.diffAmount)}}</td>
                            <td :class="this.$numColor(stockInterest.dayRange)">{{this.$comma3(stockInterest.dayRange)}}</td>
                        </tr>                    
                    </tbody>
                </table>
            </div>
        </div> 
    </div>
</template>

<script>
import api from '@/assets/rest/api'
import { onMounted, ref, reactive, toRefs, watch, computed } from 'vue';
import { mapMutations } from "vuex"
import StockKindSearch from './StockKindSearch.vue';

export default {
    name: 'StockInterest',
    data(){
        return {
            stockInterestData : {
                baseTime : '',     
                list : [{    
                    stockInterestId : '',     
                    stockKindCd : '',
                    stockKindName : '',
                    orderId : '',
                    stockKindId : '',
                    assetId : '',
                    curUnitPrice : '',
                    diffAmount : '',
                    dayRange : '',
                    highPrice : '',
                    lowPrice : ''
                }]
            },
            timerStatus : false,
            timerExec : null,
            checkVisible : false,
            stockKindSearchModalVisible : false,
            stockKind : {       
                stockKindId : '',
                assetId : '',
                stockKindCd : '',
                stockKindName : '',
            }
        }
    },    
    components:{ 
        StockKindSearch
    },
    methods : { 
        // 주식종합 API 콜
        getStockInterestList(){ 
            console.log("getStockInterestList" );
            api.post('/myasset/stock/interest/list', )
            .then((response)=>{
                console.log("관심 종목 검색 결과 : " + JSON.stringify(response.data)); 
                this.stockInterestData = response.data;
            });
        }, 
        saveStockInterest(){ 
            console.log("saveStockInterest" );
            api.post('/myasset/stock/interest/save', this.stockKind)
            .then((response)=>{
                console.log("관심 종목 저장 결과 : " + JSON.stringify(response.data)); 
                this.stockInterestData = response.data;
            });
        },
        // 주식종합 콜백함수
        callbackStockInterestList(stockInterestData){
            console.log("StockInterest 관심종목현황 콜백함수 : " + JSON.stringify(stockInterestData));
            this.stockInterestData = stockInterestData;
        },
        clickRouterPushStockKind(stockInterest){  
            this.stockKind.stockKindCd = stockInterest.stockKindCd;
            this.stockKind.stockKindName = stockInterest.stockKindName;
            this.stockKind.stockKindId = stockInterest.stockKindId;
            this.stockKind.assetId = stockInterest.assetId;
            this.$router.push( 
                {name: 'StockKindDetail', params:{stockKind: JSON.stringify(this.stockKind)}}
            )
        },
        stockKindClick(stockInterest){
            this.stockKind.stockKindCd = stockInterest.stockKindCd;
            this.stockKind.stockKindName = stockInterest.stockKindName;
            this.stockKind.stockKindId = stockInterest.stockKindId;
            this.stockKind.assetId = stockInterest.assetId;
        },
        openKindSearchModal(stockInterest){
            this.stockKind.stockKindCd = stockInterest.stockKindCd;
            this.stockKind.stockKindName = stockInterest.stockKindName;
            this.stockKind.stockKindId = stockInterest.stockKindId;
            this.stockKind.assetId = stockInterest.assetId;
            console.log("StockInterest stockKindSearchModalVisible=" + this.stockKindSearchModalVisible);
            this.stockKindSearchModalVisible = !this.stockKindSearchModalVisible;
        },
        closeStockKindSearch(){
            this.stockKindSearchModalVisible = false;
            console.log("받은 stockKind:" + JSON.stringify(this.stockKind));
            var existItemYn = false;
            var list = this.stockInterestData.list;
            for(var i = 0;  list.length; i++){
                if(list[i].stockKindCd == this.stockKind.stockKindCd){
                    existItemYn = true;
                }
            }
            // this.stockInterestData.list.forEach(function(si, i, arr){
            //     if(si.stockKindCd == this.stockKind.stockKindCd){
            //         existItemYn = true;
            //     }
            // });
            if(!existItemYn){
                this.saveStockInterest();
            }
            console.log("StockInterest stockKindSearchModalVisible=" + this.stockKindSearchModalVisible);
        },
        timerStart(){
            this.timerStatus = true;
            this.timerExec = setInterval(() => {
                this.callGetStockKindTotal();
            }, 5000)
        },
        timerStop(){
            this.timerStatus = false;
            clearInterval(this.timerExec);
        }
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
            this.getStockInterestList();
        })        
    },
    beforeUnmount(){
        this.timerStop();
    } 
}
</script>

<style>
.textLeft{
    text-align: left;
}
</style>