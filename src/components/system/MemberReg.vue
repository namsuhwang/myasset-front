<template>

    <div class="login-form">
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <div class="row g-2">  
                    <h2 class="text-center">회원 가입</h2>   
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text" style="width: 90px;">이메일</span>
                            <input type="text" id="myassetEmail" v-model="memberRegInfo.email" class="form-control" placeholder="" >
                        </div>
                    </div>  
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text" style="width: 90px;">비밀번호</span>
                            <input type="password" id="myassetPwd" v-model="memberRegInfo.pwd" class="form-control" placeholder="" >
                        </div>
                    </div>   
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text" style="width: 90px;">비밀번호</span>
                            <input type="password" id="myassetPwd" v-model="pwdConfirm" class="form-control" placeholder="비밀번호 재입력" >
                        </div>
                    </div>   
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text" style="width: 90px;">생년월일</span>
                            <input type="date" class="form-control" v-model="memberRegInfo.birth" placeholder="YYYY.MM.DD">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="rdoGender" :checked="memberRegInfo.gender=='M'" v-model="memberRegInfo.gender"  id="rdoMale" value="M">
                            <label class="form-check-label" for="rdoMale">남성</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="rdoGender" :checked="memberRegInfo.gender=='F'" v-model="memberRegInfo.gender"  id="rdoFemale" value="F">
                            <label class="form-check-label" for="rdoFemale">여성</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <button type="submit" @click="memberReg" class="btn btn-primary btn-block">가입</button>
                    </div>   
                </div>
            </div>
        </form> 
      <router-link to="/system/login" class="">취소</router-link>
    </div>  
</template>

<script>
import api from '@/assets/rest/api'
import { onMounted, ref, reactive, toRefs, watch, computed } from 'vue';

export default {
    name : 'MemberReg',
    data() {
        return {
            pwdConfirm : '',
            memberRegInfo : {
                email : '',
                pwd : '',
                memberName : '',
                birth : '',
                gender : '',
            } 
        }
    },
    methods: {
        memberReg(){
            console.log("회원가입 시작 : " + JSON.stringify(this.memberRegInfo));
            api.post('/myasset/member/reg', this.memberRegInfo)
            .then((response)=>{
                console.log("회원 등록 결과 : " + JSON.stringify(response)); 
                let resData = response.data;
                console.log("회원 등록 결과 리프레쉬 토큰 : " + resData.refreshtoken);
                console.log("회원 등록 결과 : " + JSON.stringify(resData)); 
                var tokenObj = new Object();
                tokenObj.accesstoken = resData.accesstoken;
                tokenObj.refreshtoken = resData.refreshtoken;
                // localStorage.setItem('refreshtoken', resData.refreshtoken);
                this.$store.dispatch('storeAuth/setToken', tokenObj);

                this.$router.push({name : 'StockKindTotal', });
                // var loginInfo = new Object();
                // loginInfo.email = resData.member.email;
                // loginInfo.pwd = resData.member.pwd; 
                // this.$store.dispatch('storeAuth/loginMember', loginInfo)
                // .then(() => {
                //     this.$router.push({name : 'StockKindTotal', });
                // })
                // .catch(e => {
                //     alert("회원 가입에 실패했습니다.");
                // })
            })
            .catch(err => {
                console.log(err.response.data)
            });
        } 
    },
};
</script>

<style>

</style>