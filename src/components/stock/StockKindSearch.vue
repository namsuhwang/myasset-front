<template>
    <div class="black-bg" v-if="stockKindSearchModalVisible==true"  style="z-index:100;">  
        <div class="white-bg">
            <div>
                <h5>주식 종목 검색</h5> 
            </div>
            <div class="row g-2 m-4" >  
                <div class="col-12">
                    <div class="input-group">
                        <span class="input-group-text">검색어</span>
                        <input v-model="stockKindSearch.searchWord" type="text" class="form-control" :readonly=false style='background-color:white;width:20px;'  placeholder="종목코드 또는 종목명">
                        <button type="button" @click="getStockKindCodeList" class="btn btn-primary">조회</button>           
                    </div>
                </div>
                <div class="col-12">
                    <div class="input-group">
                        <select class="form-select" v-model="stockKindCode" :readonly=true >
                            <option v-for="(stockKindCode, i) in stockKindCodeList" :key="i" 
                            :value="stockKindCode">{{ stockKindCode.code + ' ' + stockKindCode.kindName }}</option>
                        </select>
                        <button type="button" @click="chooseStockKindCode" class="btn btn-primary">선택</button>           
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/assets/rest/api'
import { onMounted, ref, reactive, toRefs, watch, computed } from 'vue';
import { mapGetters, mapActions} from 'vuex';

export default {
    name: 'StockKindSearch',
    data(){
        return {
            stockKindSearch : {
                searchWord : ''
                },
            stockKindCode : {
                code : "",
                kindName : "",
                exchange : ""
                },
            stockKindCodeList : []
        }
    },    
    props:{
        stockKindSearchModalVisible: Boolean , 
        stockKind : Object,
    },
    components:{        
    },
    methods : {
        /*-------------------------------------------------------------------------------------*
         *      Button Click Function Start                                                   */
        // 종목 정보 저장
        getStockKindCodeList(){
            console.log("stockKindSearch = " + JSON.stringify(this.stockKindSearch));
            api.post('/myasset/stock/kind/code/search', this.stockKindSearch)
            .then((response)=>{
                console.log("주식 종목 검색 결과 : " + JSON.stringify(response.data)); 
                this.stockKindCodeList = response.data;
                if(this.stockKindCodeList.length == 1){
                    this.stockKindCode = this.stockKindCodeList[0];
                    // this.stockKindCode.kindName = this.stockKindCodeList[0].kindName;
                }
            });
        },                                                       
        chooseStockKindCode(){
            this.stockKind.stockKindCd = this.stockKindCode.code;
            this.stockKind.stockKindName = this.stockKindCode.kindName;
            this.$emit('chooseStockKind', this.stockKind);
        }
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
         /*      v-model Calculattion Function  End                                            *
         --------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------*
         *      modal Function Start                                                           */
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
        })
    } 
}
</script>

<style>

</style>