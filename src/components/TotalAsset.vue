<template>
    <div class="container">
        <h5>순자산 {{ String($store.state.totalAssetSummary.netAsset ).replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} 원</h5>
        <!-- <h5>순자산 {{ String(summaryData.netAsset ).replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} 원</h5> -->
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