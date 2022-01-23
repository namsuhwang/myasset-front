<template>
    <div class="black-bg" v-if="stockTradeModalVisible==true"  style="z-index:100;">  
        <div class="white-bg">
            <h5>주식 매매</h5><br>  
            <div class="row g-2">  
                <div class="col-12">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="rdoTrade" :checked="trType=='BUY'" v-model="trType" @change="radioChange('buy')" id="rdoTradeBuy" value="BUY">
                        <label class="form-check-label" for="rdoTradeBuy">매수</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="rdoTrade" :checked="trType=='SALE'" v-model="trType" @change="radioChange('sale')" id="rdoTradeSale" value="SALE">
                        <label class="form-check-label" for="rdoTradeSale">매도</label>
                    </div>
                </div>
                <div class="col-12">
                    <div class="input-group">
                        <span class="input-group-text">거래종목</span>
                        <input v-model="stockKind.stockKindCd" type="text" class="form-control" :readonly=readOnlyYn style='background-color:white;'  placeholder="종목코드">
                        <input v-model="stockKind.stockKindName" type="text" class="form-control" :readonly=readOnlyYn style='background-color:white;' placeholder="종목명">                
                    </div>
                </div>
                <div class="col-12">
                    <div class="input-group">
                        <span class="input-group-text">거래일자</span>
                        <input type="date" class="form-control" v-model="trDate" placeholder="YYYY.MM.DD">
                    </div>
                </div>
                <div class="col-12">
                    <div class="input-group">
                        <span class="input-group-text">거래수량</span>
                        <input type="text" v-model="quantity" class="form-control"  :readonly=readOnlyYn style='text-align:right;background-color:white;'  placeholder="" 
                        @input="e=>quantity=this.$comma3(this.$uncomma(e.target.value))">
                        <span class="input-group-text">주</span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="input-group">
                        <span class="input-group-text">거래단가</span>
                        <input type="text" v-model="unitCost" class="form-control"  :readonly=readOnlyYn style='text-align:right;background-color:white;'  placeholder="" 
                        @input="e=>unitCost=this.$comma3(this.$uncomma(e.target.value))">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="input-group">
                        <span class="input-group-text">거래세금</span>
                        <input type="text" v-model="taxAmt" class="form-control"  :readonly=readOnlyYn style='text-align:right;background-color:white;'  placeholder="" 
                        @input="e=>taxAmt=this.$comma3(this.$uncomma(e.target.value))">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="input-group">
                        <span class="input-group-text">수수료</span>
                        <input type="text" v-model="feeAmt" class="form-control"  :readonly=readOnlyYn style='text-align:right;background-color:white;'  placeholder="" 
                        @input="e=>feeAmt=this.$comma3(this.$uncomma(e.target.value))">
                        <span class="input-group-text">원</span>
                    </div>
                </div>
                <div class=""> 
                    <button id='btnBuy' type="button" @click="stockTradeReg" class="btn btn-primary btn-sm">등록</button>&nbsp;
                    <button id='btnSale' type="button" @click="closeClick" class="btn btn-primary btn-sm">닫기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref, reactive, toRefs, watch, computed } from 'vue';

export default {
    name: 'StockTradeModal',
    data(){
        return {
            readOnlyYn : false, 
            trDate : '',
            quantity : '',
            unitCost : '',
            taxAmt : '',
            feeAmt : '',
            trData : {
                memberId : '',
                assetId : '',
                stockKindId : '',
                stockKindCd : '',
                exchange : '',
                trDate : '',
                quantity : 0,
                unitCost : 0,
                taxAmt : 0,
                feeAmt : 0,
            }
        }
    },    
    props:{
        stockTradeModalVisible: Boolean ,
        stockKind : Object,
        trType : String,
    },
    methods : {
        /*-------------------------------------------------------------------------------------*
         *      Button Click Function Start                                                   */
        // 매매 정보 등록
        stockTradeReg(){
            console.log("stockTradeReg");
            this.trData.assetId = this.stockKind.assetId;
            this.trData.memberId = this.stockKind.memberId;
            this.trData.stockKindId = this.stockKind.stockKindId;
            this.trData.quantity = this.$uncomma(this.quantity);
            this.trData.unitCost = this.$uncomma(this.unitCost);
            this.trData.feeAmt = this.$uncomma(this.feeAmt);            
            this.trData.trDate = this.$uncomma(this.trDate);
            if(this.trType == "SALE"){
                if(this.exchange == "KOSPI" || this.exchange == "kospi" || this.exchange == "코스피"){
                    this.trData.taxAmt = this.trData.quantity * this.trData.unitCost * 0.0023;
                }else{
                    this.trData.taxAmt = this.trData.quantity * this.trData.unitCost  * 0.0025;
                }
            }else{
                this.trData.taxAmt = this.$uncomma(this.taxAmt);
            }
        },
         /*      Button Click Function End                                                     *
         --------------------------------------------------------------------------------------*/
        
        /*-------------------------------------------------------------------------------------*
         *      Rest Call Function Start                                                       */  
         /*      Rest Call End                                                                 *
         --------------------------------------------------------------------------------------*/

        /*-------------------------------------------------------------------------------------*
         *      CallBack Function Start                                                        */ 
         /*      CallBack Function End                                                         *
         --------------------------------------------------------------------------------------*/


        /*-------------------------------------------------------------------------------------*
         *      v-model Calculattion Function Start                                            */ 
        radioChange(str){
            console.log('trType=' + this.trType + ', change:' + str);
        },
         /*      v-model Calculattion Function  End                                            *
         --------------------------------------------------------------------------------------*/

        /*-------------------------------------------------------------------------------------*
         *      modal Function Start                                                           */ 
        closeClick(){
            this.$emit('closeModal');
        }
         /*     modal Function  End                                                            *
         --------------------------------------------------------------------------------------*/
    }, 
    watch:{ 
    },
    computed: {
    },
    created(){
    },
    mounted(){ 
        // 전체 화면내용이 렌더링된 후에 아래의 코드가 실행됩니다.
        this.$nextTick(function () { 
            // 보유주식 목록에서 라우터 링크로 넘어온 경우 처리
            console.log("Modal this.$route.params.stockKind =" + this.$route.params.stockKind ); 

            // this.setTrType(this.trType);
        })
    } 
}
</script>

<style>

</style>