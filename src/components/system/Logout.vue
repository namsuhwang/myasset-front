<template>
        <!-- <form @submit.prevent="submitForm"> -->
    <div class="form-group">
        <div class="row g-2">  
            <h2 class="text-center">로그아웃</h2>  
            <!-- <div class="col-12">
                <div class="input-group">
                    <span class="input-group-text" style="width: 90px;">이메일</span>
                    <input type="text" id="myassetEmail" v-model="loginInfo.email" class="form-control" placeholder="" >
                </div>
            </div>  
            <div class="col-12">
                <div class="input-group">
                    <span class="input-group-text" style="width: 90px;">비밀번호</span>
                    <input type="password" id="myassetPwd" v-model="loginInfo.pwd" class="form-control" placeholder="" >
                </div>
            </div>   -->
            <div v-if="phase == 'DEV'" class="col-12">
                <button type="submit" @click="userInfoDelete" class="btn btn-primary btn-block">사용자 정보 삭제</button>
            </div>    
        </div>
    </div>  
</template>

<script>

export default {
    name : "Logout",
    data(){
        return {
            phase: ''
        }
    },    
    methods : { 

        /*-------------------------------------------------------------------------------------*
         *      Button Click Function Start                                                   */
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
        userInfoDelete(){
            localStorage.setItem('refrechtoken', '');
            localStorage.setItem('token', '');
            this.$store.state.storeAuth.token = '';
            this.$store.state.storeAuth.email = '';
            this.$store.state.storeAuth.memberId = '';
            this.$store.state.storeAuth.role = '';
        }
         /*     modal Function  End                                                            *
         --------------------------------------------------------------------------------------*/
    },
    watch:{
    },
    created(){
        this.phase = process.env.VUE_APP_PHASE;
    },
    computed: {
    },
    mounted(){ 
        // 전체 화면내용이 렌더링된 후에 아래의 코드가 실행됩니다.        
        this.$nextTick(function () {     
           // this.$store.dispatch('storeAuth/autoLogin', ); 
            this.$store.dispatch('storeAuth/logoutMember', );
            this.$toastMessage('로그 아웃 완료');
            // this.$router.push({name : 'Login', });
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