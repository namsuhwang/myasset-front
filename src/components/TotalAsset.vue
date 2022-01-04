<template>
    <div class="container">
        <h5>순자산(직접 조회) {{ this.$won($store.state.StoreTotalAsset.totalAssetSummary.netAsset) }}</h5>
        <h5>순자산(computed) {{ this.$won(getTotalSummary.netAsset) }}</h5>
        <h5>순자산(지역변수) {{ this.$won(netAsset) }}</h5>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
    name: 'TotalAsset',
    data(){
        return { 
            netAsset: 0, 
        }
    },    
    computed: {
        getTotalSummary(){
            this.netAsset = this.$store.state.StoreTotalAsset.totalAssetSummary.netAsset;
            return this.$store.state.StoreTotalAsset.totalAssetSummary;
        }
    },
    created(){
        this.$store.dispatch('StoreTotalAsset/getTotalAssetSummary', 1);
    } 
}
</script>

<style>

</style>