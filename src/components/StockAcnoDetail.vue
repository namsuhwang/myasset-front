<template>
    <h5>주식 계좌</h5> 
    <div class="row g-2 m-4">
        <div class="col-12">
            <div class="input-group">
                <label class="input-group-text">증권사</label>
                <select class="form-select" v-model="stockAsset.orgCd">
                    <option v-for="(stockCode, i) in $store.state.StoreCommon.stockCodeList" :key="i" 
                    :value="stockCode.code">{{ stockCode.codeName }}</option>
                </select>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">계좌번호</span>
                <input v-model="stockAsset.stockAcno" type="text" class="form-control" placeholder="계좌번호">
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">출금가능</span>
                <input type="text" v-model="ableAmt" class="form-control" placeholder="원단위 입력" 
                  @input="e=>ableAmt=this.$comma3(this.$uncomma(e.target.value))">
                <span class="input-group-text">원</span>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">대출잔액</span>
                <!-- <input type="text" v-model="loanBalAmt" class="form-control" placeholder="원단위 입력" 
                  @input="e=>loanBalAmt=this.$comma3(this.$uncomma(e.target.value))"> -->
                <input type="text" v-model="loanBalAmt" class="form-control" placeholder="원단위 입력" 
                  @input="e=>loanBalAmt=this.$comma3(this.$uncomma(e.target.value))">
                <span class="input-group-text">원</span>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">대출금리</span>
                <input type="text" v-model="loanRate" class="form-control" placeholder="0.00" 
                  @input="e=>loanRate=this.$comma3(e.target.value)">
                <span class="input-group-text">%</span>
            </div>
        </div>
        <!-- <p>{{ JSON.stringify(bankAsset) }}</p> -->
        <!-- <div id="example">
            <input type="text" id="ableAmt" v-model="value" @input="e=>value=changeNum(e.target.value)">
            <span id="reWon" >{{ value }}</span>
        </div>  -->
    </div>
    <div class="m-4">
        <button type="button" @click="stockAssetReg" class="btn btn-primary btn-lg">등록</button> 
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref, reactive, toRefs, watch, computed } from 'vue';

export default {
    name: 'StockAcnoDetail',
    data(){
        return { 
            ableAmt : '',
            loanBalAmt : '',     
            loanRate : '',       
            stockAsset : {
                memberId : 1,    
                assetName : '',
                orgCd : '',
                orgName : '',
                stockAcno : '',                
                ableAmt : 0,
                loanBalAmt : 0,
                loanRate : 0.0
            }
        }
    },    
    methods : {
        stockAssetReg(){
            if(!this.$isNumeric(this.ableAmt)) return;
            this.stockAsset.ableAmt = this.$uncomma(this.ableAmt);

            if(!this.$isNumeric(this.loanBalAmt)) return;
            this.stockAsset.loanBalAmt = this.$uncomma(this.loanBalAmt);
 
            if(!this.$isNumeric(this.loanRate)) return;
            this.stockAsset.loanRate = this.loanRate;
            
            this.stockAsset.orgName = this.$getCodeNameFromCodeList(this.$store.state.StoreCommon.stockCodeList, this.stockAsset.orgCd); 
            console.log("bankAsset.orgName = " + this.stockAsset.orgName);
            this.stockAsset.assetName = "증권-" + this.stockAsset.orgName + "_" + this.stockAsset.stockAcno;
            console.log("stockAsset = " + JSON.stringify(this.stockAsset));
            axios.post('/myasset/stock/acno/reg', this.stockAsset)
            .then((response)=>{
                console.log("증권 계좌 등록 결과 : " + JSON.stringify(response.data)); 
                alert("증권 계좌 등록이 완료되었습니다.");
            });
        }, 
    },
    computed: {
        // getBankCodeList(){
        //     return this.$store.state.StoreCommon.bankCodeList;
        // },
        // getBankAcnoTypeList(){
        //     return this.$store.state.StoreCommon.bankAcnoTypeList;
        // }
    },
    mounted(){ 
    } 
}
</script>

<style>

</style>