<template>
    <div class="black-bg" v-if="stockTradeModalVisible==true"  style="z-index:100;">  
        <div class="white-bg">
            <h5>주식 매매</h5>             
            <div class>
                <div class="col-12">
                    <div class="m-4"> 
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="rdoTrade" :checked="trType=='BUY'" v-model="trType" @change="radioChange('buy')" id="rdoTradeBuy" value="BUY">
                            <label class="form-check-label" for="rdoTradeBuy">매수</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="rdoTrade" :checked="trType=='SALE'" v-model="trType" @change="radioChange('sale')" id="rdoTradeSale" value="SALE">
                            <label class="form-check-label" for="rdoTradeSale">매도</label>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="input-group">
                        <span class="input-group-text">종목</span>
                        <input v-model="stockKind.stockKindCd" type="text" class="form-control" :readonly=readOnlyYn style='background-color:white;'  placeholder="종목코드">
                        <input v-model="stockKind.stockKindName" type="text" class="form-control" :readonly=readOnlyYn style='background-color:white;' placeholder="종목명">                
                    </div>
                </div>
                <div class="m-4"> 
                    <button id='btnBuy' type="button" @click="buyLink" class="btn btn-primary btn-sm">매수 등록</button>&nbsp;
                    <button id='btnSale' type="button" @click="closeClick" class="btn btn-primary btn-sm">닫기</button>&nbsp;
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
            // stockKind : {      // 현재평가금액
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