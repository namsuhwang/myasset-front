<template>
    <h5>은행 자산 상세</h5> 
    <div class="row g-1">
        <div class="col-12">
            <div class="input-group">
                <label class="input-group-text">은행</label>
                <select class="form-select">
                    <option v-for="(bankCode, i) in $store.state.StoreCommon.bankCodeList" :key="i" :value="bankCode.code">{{ bankCode.codeName }}</option>
                </select>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <label class="input-group-text">계좌종류</label>
                <select class="form-select">
                    <option v-for="(bankAcnoType, i) in $store.state.StoreCommon.bankAcnoTypeList" :key="i" :value="bankAcnoType.code">{{ bankAcnoType.codeName }}</option>
                </select>
            </div>
        </div>
        <div class="col-12">
            <div class="input-group">
                <span class="input-group-text">계좌번호</span>
                <input type="text" class="form-control" placeholder="계좌번호">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BankDetail',
    data(){
        return { 
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