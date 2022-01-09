<template>
    <div class="container">
        <h5>순자산(직접 조회) {{ this.$won($store.state.StoreTotalAsset.totalAsset.totalNetAssetAmt) }}</h5>
        <h5>순자산(computed) {{ this.$won(getTotalAsset.totalNetAssetAmt) }}</h5>
        <h5>순자산(지역변수) {{ this.$won(totalAsset.totalNetAssetAmt) }}</h5>
        <h5>{{ totalAsset.bankList }}</h5>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
    name: 'TotalAsset',
    data(){
        return { 
            totalAsset : Object, 
        }
    },    
    computed: {
        getTotalAsset(){
            console.log("서버 호출 결과 totalAsset : " + this.$store.state.StoreTotalAsset.totalAsset.totalNetAssetAmt);
            this.totalAsset = this.$store.state.StoreTotalAsset.totalAsset;
            return this.$store.state.StoreTotalAsset;
        }
    },
    created(){ 
        this.$store.dispatch('StoreTotalAsset/getTotalAsset', 1);
    } 
}
</script>

<style>

</style>