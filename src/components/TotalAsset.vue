<template>
    <div class="container">
        <h5>순자산 {{ this.$won($store.state.totalAssetSummary.netAsset) }}</h5>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
    name: 'TotalAsset',
    data(){
        return {
            // netAsset: 0,    
        }
    },   
    // beforeMount(){
    //     this.$store.dispatch('getTotalAssetSummary', 1);
    //     console.log("aaa:" + $store.state.totalAssetSummary.netAsset);
    //     this.netAsset = $store.state.totalAssetSummary;
    // },
    created(){
        this.$store.dispatch('getTotalAssetSummary', 1);
        // console.log("aaa:" + $store.state.totalAssetSummary.netAsset);
        // this.netAsset = $store.state.totalAssetSummary;
        // this.summaryData = $store.state.totalAssetSummary;
    },
    filters: { 
        comma (val) { 
            return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
        } 
    },
}
</script>

<style>

</style>