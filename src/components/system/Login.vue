<template>
    <div class="login-form">
        <!-- <form @submit.prevent="submitForm"> -->
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
                            <input type="password" id="myassetPwd" v-model="loginInfo.pwd" class="form-control" placeholder="" >
                            <button type="submit" @click="memberLogin" class="btn btn-primary ">로그인</button>
                        </div>
                    </div>   
                    <br>
                    <br>
                    <div class="col-12">
                        <!-- <button type="submit" @click="memberLogin" class="btn btn-primary btn-block">로그인</button>&nbsp;&nbsp; -->
                        <button type="submit" @click="linkMemberReg" class="btn btn-outline-success btn-sm">신규가입</button>
                    </div>   
                </div>
            </div>
        <!-- </form> -->
        <!-- <p class="text-center"><a href="#">신규가입</a></p> -->
      <!-- <router-link to="/system/memberReg" class="">신규가입</router-link> -->
    </div>  
</template>

<script>

export default {
    name : "Login",
    props: {
        httpStatus: {
            type: String, default : ''
        }
    },
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
            this.$store.dispatch('storeAuth/loginMember', this.loginInfo);
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
        this.$sessionInfoLog("Login.vue");      
            // 토큰이 정상이면 자동로그인 후 보유주식 화면으로 이동
            console.log("로그인 화면 token=" + localStorage.getItem('token') );
            console.log("로그인 화면 refreshtoken=" + localStorage.getItem('refreshtoken') );
            if(localStorage.getItem('token') != null && localStorage.getItem('token') != 'null'  && localStorage.getItem('token') != 'undefined' && localStorage.getItem('token') != ''
               && localStorage.getItem('refreshtoken') != null && localStorage.getItem('refreshtoken') != 'null'){
                this.$store.dispatch('storeAuth/setState', );
                console.log("로그인=" + this.$store.state.storeAuth.token);
                this.$router.push({name : 'StockKindTotal', });
                this.$toastMessage('자동 로그인 완료');
            } 

            /*
            console.log("httpStatus:" + this.$route.params.httpStatus);
            let httpStatus = this.$route.params.httpStatus;
            if(httpStatus == '401'){
                console.log("Login.vue 401 토큰 재발급 시작 ");
                this.$store.dispatch('storeAuth/getToken', );
                console.log("Login.vue 401 토큰 재발급 완료 ");
            }else{
                console.log("Login.vue 토큰 : " + localStorage.getItem('token'));
                console.log("Login.vue 이메일 : " + localStorage.getItem('email'));
            // this.$store.dispatch('storeAuth/autoLogin', ); 
                console.log("state.token=" + this.$store.state.storeAuth.token);
            }
            */
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