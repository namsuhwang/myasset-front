<template>
    <transition name="modalFade">
        <StockTradeModal  :stockKind="stockKind" :stockTradeModalVisible="stockTradeModalVisible" :trType="trType" @closeModal="closeStockTradeModal"/>
    </transition>
    <div>
        <h5>주식 종목</h5> 
    </div>
    <div class="row g-2 m-4" >  
        <div class="col-12">
            <div class="input-group">
                <label class="input-group-text">증권계좌</label>
                <select class="form-select" v-model="stockKind.assetId" :readonly=readOnlyYn >
                    <option v-for="(stockAsset, i) in stockAssetList" :key="i" 
                    :value="stockAsset.assetId">{{ stockAsset.assetName }}</option>
                </select>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">종목</span>
                <input v-model="stockKind.stockKindCd" type="text" class="form-control" :readonly=readOnlyYn style='background-color:white;'  placeholder="종목코드">
                <input v-model="stockKind.stockKindName" type="text" class="form-control" :readonly=readOnlyYn style='background-color:white;' placeholder="종목명">      
                <button type="button" @click="callStockKind" class="btn btn-secondary">조회</button>           
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">보유수량</span>
                <input type="text" v-model="quantity" class="form-control"  :readonly=readOnlyYn style='text-align:right;background-color:white;'  placeholder="" 
                  @input="e=>quantity=this.$comma3(this.$uncomma(e.target.value))">
                <span class="input-group-text">주</span>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">평단가</span>
                <input type="text" v-model="buyAvgPrice" class="form-control" :readonly=readOnlyYn style='text-align:right;background-color:white;' placeholder="원단위 입력" 
                  @input="e=>buyAvgPrice=this.$comma3(this.$uncomma(e.target.value))">
                <span class="input-group-text">매입액</span>
                <input type="text" v-model="buyTotPrice" class="form-control" :readonly=true style='text-align:right;background-color:white;'  placeholder="" 
                  @click="setBuyTotPrice"
                  @input="e=>buyTotPrice=this.$comma3(this.$uncomma(e.target.value))">
            </div>
        </div> 
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">현재가</span>
                <input type="text" v-model="curUnitPrice" class="form-control" :readonly=readOnlyYn style='text-align:right;background-color:white;' placeholder="원단위 입력" 
                  @input="e=>curUnitPrice=this.$comma3(this.$uncomma(e.target.value))">
                <span class="input-group-text">평가액</span>
                <input type="text" v-model="curTotPrice" class="form-control" :readonly=true style='text-align:right;background-color:white;'  placeholder="" 
                  @click="setCurTotPrice"
                  @input="e=>curTotPrice=this.$comma3(this.$uncomma(e.target.value))">
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">손익율</span>
                <input type="text" v-model="pnlRate" :class="this.$numColor(stockKind.pnlRate)" class="form-control" style='text-align:right;background-color:white;' :readonly=true placeholder="" 
                  @input="e=>stockKind.pnlRate=this.$comma3(this.$uncomma(e.target.value))">
                <span class="input-group-text">손익액</span>
                <input type="text" v-model="pnlAmt" :class="this.$numColor(stockKind.pnlAmt)" class="form-control" style='text-align:right;background-color:white;' :readonly=true placeholder=""                   
                  @input="e=>value=this.$comma3(e.target.value)">
            </div>
        </div> 
    </div>
    <div class="m-4"> 
        <button id='btnBuy' type="button" @click="openTradeModal('BUY')" class="btn btn-primary btn-sm">매수 등록</button>&nbsp;
        <button id='btnSale' type="button" @click="openTradeModal('SALE')" class="btn btn-primary btn-sm">매도 등록</button>&nbsp;
    </div>
    <div class="m-4">
        <button id='btnReg' type="button" @click="stockKindReg" :disabled="mode != 'REG'" class="btn btn-primary btn-sm">등록</button>&nbsp;
        <button id='btnMod' type="button" @click="readOnlyYn=false" class="btn btn-primary btn-sm">수정</button>&nbsp;
        <button id='btnDel' type="button" @click="stockKindDel" class="btn btn-primary btn-sm">삭제</button>&nbsp; 
    </div> 
</template>

<script>
import axios from 'axios';
import { onMounted, ref, reactive, toRefs, watch, computed } from 'vue';
import { mapGetters, mapActions} from 'vuex';
import StockTradeModal from './StockTradeModal.vue';

export default {
    name: 'StockKindDetail',
    data(){
        return {
            readOnlyYn : false,
            stockKindCd : '',     
            quantity : null,
            buyAvgPrice : null,
            buyTotPrice : null,
            curUnitPrice : null,
            curTotPrice : null ,  
            pnlRate : '',
            pnlAmt : '',
            stockKind : {      // 현재평가금액
                stockKindId : '',
                assetId : '',
                stockKindCd : '',
                stockKindName : '',
                stockType : '',
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
            },
            stockRealTimeInfo : {
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
            stockAssetList : null,
            mode: "",
            stockTradeModalVisible : false,
            trType : ''
        }
    },    
    props:{
    },
    components:{
        StockTradeModal
    },
    methods : {
        /*-------------------------------------------------------------------------------------*
         *      Button Click Function Start                                                   */
        // 종목 정보 등록
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
        openTradeModal(trType){
            this.stockTradeModalVisible = !this.stockTradeModalVisible;
            this.trType = trType;
            console.log("openTradeModal stockTradeModalVisible=" + this.stockTradeModalVisible);
        },
         /*      Button Click Function End                                                     *
         --------------------------------------------------------------------------------------*/
        
        /*-------------------------------------------------------------------------------------*
         *      Rest Call Function Start                                                       */
        // Rest Call :: 실시간 주가 정보 조회
		callStockKind() {	
            this.$getStockKindInfo(this.stockKind.stockKindCd, this.callBackStockKindInfo);
		}, 

        // Rest Call :: 증권사 계좌 목록 조회. 1개이면 바로 세팅
		getStockAsset() {	
            axios.post(process.env.VUE_APP_REST_BASE_URL 
                + '/myasset/asset/list', {assetType : "STOCK", memberId : 1} )
            .then((response)=>{ 
                this.stockAssetList = response.data;
                if(this.stockAssetList.length == 1){
                    this.stockKind.assetId = this.stockAssetList[0].assetId;
                }
            });
		},  
         /*      Rest Call End                                                                 *
         --------------------------------------------------------------------------------------*/


        /*-------------------------------------------------------------------------------------*
         *      CallBack Function Start                                                        */
        // CallBack :: 실시간 주가 정보 조회 
        callBackStockKindInfo(stockRealTimeInfo){
            console.log("callBackStockKindInfo " + JSON.stringify(stockRealTimeInfo));
            this.stockRealTimeInfo = stockRealTimeInfo;
            this.curUnitPrice = this.$comma3(this.stockRealTimeInfo.price);  
            this.stockKind.curUnitPrice = this.$comma3(this.stockRealTimeInfo.price);    
            this.stockKind.stockKindCd = stockRealTimeInfo.kindCode;
            this.stockKind.stockKindName = stockRealTimeInfo.stockName;  
            this.stockKind.stockType = stockRealTimeInfo.stockType; 
            this.setCurTotPrice();
        },
         /*      CallBack Function End                                                         *
         --------------------------------------------------------------------------------------*/


        /*-------------------------------------------------------------------------------------*
         *      v-model Calculattion Function Start                                            */
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
        // 손익 정보 계산
        setPnl(){
            console.log("this.stockKind.curTotPrice=" + this.stockKind.curTotPrice + ", this.stockKind.buyTotPrice=" + this.stockKind.buyTotPrice);
            if(this.stockKind.curTotPrice == "" && this.stockKind.buyTotPrice == ""){
                return;
            }
            var pAmt = this.stockKind.curTotPrice - this.stockKind.buyTotPrice;
            var pRate = pAmt / this.stockKind.buyTotPrice * 100.0;
            pRate = Math.round((pRate + Number.EPSILON) * 100) / 100;
            console.log("pAmt=" + pAmt + ", pRate=" + pRate);
            this.stockKind.pnlAmt = pAmt;
            this.stockKind.pnlRate = pRate;
            this.pnlAmt = this.$comma3(pAmt);
            this.pnlRate = this.$comma3(pRate);
        },
         /*      v-model Calculattion Function  End                                            *
         --------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------*
         *      modal Function Start                                                           */
        closeStockTradeModal(){
            this.stockTradeModalVisible = false;
            console.log("closeStockTradeModal stockTradeModalVisible=" + this.stockTradeModalVisible);
        },
         /*     modal Function  End                                                            *
         --------------------------------------------------------------------------------------*/
    }, 
    watch:{
        'quantity': function(val){
            this.stockKind.quantity = this.$uncomma(val); 
            this.setBuyTotPrice();
            this.setCurTotPrice(); 
        },
        'buyAvgPrice': function(val){ 
            this.stockKind.buyAvgPrice = this.$uncomma(val);            
            this.setBuyTotPrice(); 
        },
        'buyTotPrice': function(val){ 
            this.stockKind.buyTotPrice = this.$uncomma(val);
            this.setPnl();
        },
        'curAvgPrice': function(val){ 
            this.stockKind.curUnitPrice = this.$uncomma(val);            
            this.setCurTotPrice();
        },
        'curTotPrice': function(val){ 
            this.stockKind.curTotPrice = this.$uncomma(val);
            this.setPnl();
        },
        'pnlAmt': function(val){ 
            this.stockKind.pnlAmt = this.$uncomma(val);
        },
        'pnlRate': function(val){ 
            this.stockKind.pnlRate = this.$uncomma(val); 
        },
        'curUnitPrice': function(val) {
            this.stockKind.curUnitPrice = this.$uncomma(val);
            this.setCurTotPrice();
            this.setPnl();
        }
    },
    computed: {
    },
    created(){
    },
    mounted(){ 
        // 전체 화면내용이 렌더링된 후에 아래의 코드가 실행됩니다.
        this.$nextTick(function () {
		    this.getStockAsset(); 	

            // 보유주식 목록에서 라우터 링크로 넘어온 경우 처리
            console.log("this.$route.params.stockKind =" + this.$route.params.stockKind );
            if(this.$route.params.stockKind != null){ 
                this.stockKind = JSON.parse(this.$route.params.stockKind);
                this.quantity = this.$comma3(this.stockKind.quantity);
                this.buyAvgPrice = this.$comma3(this.stockKind.buyAvgPrice);
                this.buyTotPrice = this.$comma3(this.stockKind.buyTotPrice);
                this.pnlAmt = this.$comma3(this.stockKind.pnlAmt);
                this.pnlRate = this.$comma3(this.stockKind.pnlRate);
                this.callStockKind();
                this.readOnlyYn = true;
            }
        })
    } 
}
</script>

<style>

body {
  margin: 0
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}
.start{
  opacity: 0;
  transition: all 1s;
}
.end{
  opacity: 1;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
}
.modalFade-enter-from{
  opacity: 0;
  transform: translateY(-1000px);
}
.modalFade-enter-active{
  transition: all 1s;
}
.modalFade-enter-to{
  opacity: 1;
  transform: translateY(0px);
}

.modalFade-leave-from{
  opacity: 1;
  transform: translateY(0px);
}
.modalFade-leave-active{
  transition: all 1s;
}
.modalFade-leave-to{
  opacity: 0;
  transform: translateY(-1000px);
}

</style>