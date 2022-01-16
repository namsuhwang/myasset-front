<template>
    <h5>보유 주식</h5> 
    <div class="row g-2 m-4"> 
        <div class="col-12">
            <div class="input-group">
                <label class="input-group-text">종합</label>
                <select class="form-select" v-model="stockKind.assetId">
                    <option v-for="(stockAsset, i) in stockAssetList" :key="i" 
                    :value="stockAsset.assetId">{{ stockAsset.assetName }}</option>
                </select>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <label class="input-group-text">시세</label>
                <select class="form-select" v-model="stockKind.assetId">
                    <option v-for="(stockAsset, i) in stockAssetList" :key="i" 
                    :value="stockAsset.assetId">{{ stockAsset.assetName }}</option>
                </select>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">종목별 상세</span>
                <input v-model="stockKind.stockKindCd" type="text" class="form-control" placeholder="종목코드">
                <button type="button" @click="getStockKind" class="btn btn-secondary">종목조회</button> 
                <input v-model="stockKind.stockKindName" type="text" class="form-control" placeholder="종목명">                
            </div>
        </div>
    </div>
    <div class="m-4">
        <button type="button" @click="stockKindReg" class="btn btn-primary btn-lg">등록</button> 
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref, reactive, toRefs, watch, computed } from 'vue';

export default {
    name: 'StockKindList',
    data(){
        return {
            stockKindCd : '',     
            quantity : null,
            buyAvgPrice : null,
            buyTotPrice : null,
            curUnitPrice : null,
            curTotPrice : null ,  
            stockKind : {
                memberId : 1,          // 회원ID
                assetId : '',          // 자산ID
                stockKindCd : '',      // 주식종목코드
                stockKindName : '',    // 주식종목명
                quantity : null,       // 보유수량
                buyAvgPrice : null,    // 매입평균단가
                buyTotPrice : null,    // 매임총금액
                curUnitPrice : null,   // 현재가
                curTotPrice : null     // 현재평가금액
            },
            stockInfo : {
                baseTime : '',            // 기준일시
                kindCode : '',             // 종목코드
                stockName : '',            // 종목명
                stockType : '',            // 코스피/코스닥
                price : '',                // 현재가
                ydPrice : '',              // 전일가
                diffAmount : '',           // 전일비(전일대비 차이)
                dayRange : '',             // 등락률(전일대비 등락율)
                highPrice : '',            // 당일 고가
                lowPrice : ''        
            },
            // stockInfoChangeCnt : 0,
            // stockAssetList : [{assetId : "", assetName : ""}],
            stockAssetList : null,
        }
    },    
    methods : {
        stockKindReg(){
            if(!this.$isNumeric(this.quantity)) return;
            this.stockKind.quantity = this.$uncomma(this.quantity);

            if(!this.$isNumeric(this.buyAvgPrice)) return;
            this.stockKind.buyAvgPrice = this.$uncomma(this.buyAvgPrice);
 
            if(!this.$isNumeric(this.buyTotPrice)) return;
            this.stockKind.buyTotPrice = this.$uncomma(this.buyTotPrice);
            
            if(!this.$isNumeric(this.curUnitPrice)) return;
            this.stockKind.curUnitPrice = this.$uncomma(this.curUnitPrice);
            
            if(!this.$isNumeric(this.curTotPrice)) return;
            this.stockKind.curTotPrice = this.$uncomma(this.curTotPrice);

            console.log("stockKind = " + JSON.stringify(this.stockKind));
            axios.post('/myasset/stock/kind/reg', this.stockKind)
            .then((response)=>{
                console.log("보유 주식 등록 결과 : " + JSON.stringify(response.data)); 
                alert("보유 주식 등록이 완료되었습니다.");
            });
        }, 
		getStockKind() {	
            this.stockInfo = this.$getStockKindInfo(this.stockKind.stockKindCd);
            this.stockInfoChangeCnt++;
		}, 
        callGetStockInfo(stockKindCd){
                return this.$getStockKindInfo(stockKindCd, this.stockInfo);
        },
        setStockNameAndCurUnitPrice(){
            console.log("setStockNameAndCurUnitPrice " + JSON.stringify(this.stockInfo));
            //this.stockInfo = stockInfo;
            ////this.stockKind.stockKindName = this.stockInfo.stockName;
            //this.curUnitPrice = this.stockInfo.price;                
        },
        setBuyTotPrice(){
            if(this.buyAvgPrice != null && this.$isNumeric(this.buyAvgPrice) && this.quantity != null  && this.$isNumeric(this.quantity) ){
                this.buyTotPrice = this.$comma3(this.$uncomma(this.buyAvgPrice) * this.$uncomma(this.quantity));
            }
        },
        setCurTotPrice(){
            if(this.curUnitPrice != null && this.$isNumeric(this.curUnitPrice) && this.quantity != null  && this.$isNumeric(this.quantity) ){
                this.curTotPrice = this.$comma3(this.$uncomma(this.curUnitPrice) * this.$uncomma(this.quantity));
            }
        },
		getStockAsset() {	
            axios.post(process.env.VUE_APP_REST_BASE_URL 
                + '/myasset/asset/list', {assetType : "STOCK"} )
            .then((response)=>{
                // console.log("종목 조회 _ 결과 : " + JSON.stringify(response.data)); 
                this.stockAssetList = response.data;
                console.log("주식 자산 조회 _ 결과 : " + JSON.stringify(this.stockAssetList)); 
            });
		}, 
    },
    watch:{
        // 'stockInfoChangeCnt' : function(val){   
        //     console.log("watch stockInfoChangeCnt 1 : " + val);
        //     console.log("watch stockInfoChangeCnt 1 : " + this.stockInfoChangeCnt);
        //     console.log("watch stockInfo :" + JSON.stringify(this.stockInfo));
        // },
        'stockInfo.stockName' : function(val){   
            this.stockKind.stockKindName = val;
        },
        'stockInfo.price' : function(val){   
            this.curUnitPrice = val;
        }
    },
    created(){
    },
    computed: {
    },
    mounted(){ 
        // 전체 화면내용이 렌더링된 후에 아래의 코드가 실행됩니다.
        this.$nextTick(function () {
            axios.post('/myasset/asset/list', {"assetType":"STOCK"})
            .then((response)=>{
                this.stockAssetList = response.data;
                console.log("stockAssetList : " + JSON.stringify(this.stockAssetList));
            });
        })
    } 
}
</script>

<style>

</style>