<template>
    <h5>은행 자산 상세</h5> 
    <div class="row g-1">
        <div class="col-12">
            <div class="input-group">
                <label class="input-group-text">은행</label>
                <select class="form-select" v-model="bankAsset.orgCd">
                    <option v-for="(bankCode, i) in $store.state.StoreCommon.bankCodeList" :key="i" 
                    :value="bankCode.code">{{ bankCode.codeName }}</option>
                </select>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <label class="input-group-text">계좌종류</label>
                <select class="form-select" v-model="bankAsset.acnoType">
                    <option v-for="(bankAcnoType, i) in $store.state.StoreCommon.bankAcnoTypeList" :key="i" 
                    :value="bankAcnoType.code">{{ bankAcnoType.codeName }}</option>
                </select>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">계좌번호</span>
                <input v-model="bankAsset.acno" type="text" class="form-control" placeholder="계좌번호">
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">출금가능</span>
                <!-- <input type="text" class="form-control" placeholder="원단위 입력" @input="e=>ableAmt=this.$won(e.target.ableAmt)"> -->
                <input type="text" v-model="ableAmt" class="form-control" placeholder="원단위 입력" 
                  @input="e=>ableAmt=this.$comma3(this.$uncomma(e.target.value))">
                <span class="input-group-text">원</span>
            </div>
        </div>
        <p>{{ JSON.stringify(bankAsset) }}</p>
        <!-- <div id="example">
            <input type="text" id="ableAmt" v-model="value" @input="e=>value=changeNum(e.target.value)">
            <span id="reWon" >{{ value }}</span>
        </div>  -->
    </div>
    <div class="m-4">
        <button type="button" @click="bankAssetReg" class="btn btn-primary btn-lg">등록</button> 
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref, reactive, toRefs, watch, computed } from 'vue';

export default {
    name: 'BankDetail',
    data(){
        return { 
            ableAmt : 0,
            bankAsset : {
                memberId : 1,    
                assetName : '',
                acnoType : '',
                orgCd : '',
                orgName : '',
                acno : '',                
                ableAmt : 0,
                loanBalAmt : 0,
                intRate : 0.0,
                loanRate : 0.0
            }
        }
    },    
    methods : {
        bankAssetReg(){
            this.bankAsset.ableAmt = this.$uncomma(this.ableAmt);
            this.bankAsset.orgName = this.$getCodeNameFromCodeList(this.$store.state.StoreCommon.bankCodeList, this.bankAsset.orgCd); 
            console.log("bankAsset.orgName = " + this.bankAsset.orgName);
            this.bankAsset.assetName = "은행-" + this.bankAsset.orgName;
            console.log("bankAsset = " + JSON.stringify(this.bankAsset));
            axios.post('/myasset/bank/reg', this.bankAsset)
            .then((response)=>{
                console.log("은행 계좌 등록 결과 : " + JSON.stringify(response.data)); 
                alert("은행 계좌 등록이 완료되었습니다.");
            });
        }
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