<template>
    <div class="login-form">
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <div class="row g-2">  
                    <h2 class="text-center">로그인</h2>   
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text" style="width: 90px;">이메일</span>
                            <input type="text" id="myassetEmail" v-model="loginInfo.email" class="form-control" placeholder="" >
                        </div>
                    </div>  
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text" style="width: 90px;">비밀번호</span>
                            <input type="text" id="myassetPwd" v-model="loginInfo.pwd" class="form-control" placeholder="" >
                        </div>
                    </div>   
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">로그인</button>
                    </div>   
                </div>
            </div>
        </form>
        <!-- <p class="text-center"><a href="#">신규가입</a></p> -->
      <router-link to="/system/memberReg" class="">신규가입</router-link>
    </div>  
</template>

<script>
export default {
    name : "Login",
    data(){
        return {
            loginInfo : {
                email : '',
                pwd : '',
            } 
        }
    },    
    methods : { 

        /*-------------------------------------------------------------------------------------*
         *      Button Click Function Start                                                   */
        // 로그인
        memberLogin(){

            // console.log("stockKind = " + JSON.stringify(this.stockKind));
            // axios.post('/myasset/stock/kind/reg', this.stockKind)
            // .then((response)=>{
            //     console.log("보유 주식 등록 결과 : " + JSON.stringify(response.data)); 
            //     alert("보유 주식 등록이 완료되었습니다.");
            // });
        },
        linkMemberReg(){ 
            this.$router.push( 
                {name: 'MemberReg', }
            )
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
         /*      v-model Calculattion Function  End                                            *
         --------------------------------------------------------------------------------------*/
        /*-------------------------------------------------------------------------------------*
         *      modal Function Start                                                           */
         /*     modal Function  End                                                            *
         --------------------------------------------------------------------------------------*/
    },
    watch:{
    },
    created(){
    },
    computed: {
    },
    mounted(){ 
        // 전체 화면내용이 렌더링된 후에 아래의 코드가 실행됩니다.        
        this.$nextTick(function () {            
            this.callGetStockKindList();
            this.tradeSearch.searchStartDate = this.$getDate(10, 'M', -12, ".");
            this.tradeSearch.searchEndDate = this.$getDate(10, null, null, ".");
        })
        
    } 

}
</script>

<style>

.login-form {
    width: 340px;
    margin: 50px auto;
  	font-size: 15px;
}
.login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
}
.login-form h2 {
    margin: 0 0 15px;
}
.form-control, .btn {
    min-height: 38px;
    border-radius: 2px;
}
.btn {        
    font-size: 15px;
    font-weight: bold;
}
</style>