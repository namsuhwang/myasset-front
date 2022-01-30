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
                            <input type="text" id="myassetPwd" v-model="memberRegInfo.pwd" class="form-control" placeholder="" >
                        </div>
                    </div>   
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text" style="width: 90px;">비밀번호</span>
                            <input type="text" id="myassetPwd" v-model="pwdConfirm" class="form-control" placeholder="비밀번호 재입력" >
                        </div>
                    </div>   
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text" style="width: 90px;">생년월일</span>
                            <input type="date" class="form-control" v-model="birth" placeholder="YYYY.MM.DD">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="rdoGender" :checked="memberRegInfo.sex=='M'" v-model="trType" @change="radioChange('M')" id="rdoMale" value="M">
                            <label class="form-check-label" for="rdoMale">남성</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="rdoGender" :checked="memberRegInfo.sex=='F'" v-model="trType" @change="radioChange('F')" id="rdoFemale" value="F">
                            <label class="form-check-label" for="rdoFemale">여성</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">가입</button>
                    </div>   
                </div>
            </div>
        </form> 
      <router-link to="/system/login" class="">취소</router-link>
    </div>  
</template>

<script>
export default {
    name : 'MemberReg',
    data() {
        return {
            pwdConfirm : '',
            memberRegInfo : {
                email : '',
                pwd : '',
                name : '',
                birth : '',
                gender : '',
            } 
        }
    },
    methods: {
        async submitForm() { // 비동기 객체가 오기때문에 비동기 처리
            console.log('submit');
            const userData = {
                username: this.username,
                password: this.password,
                nickname: this.nickname,
            };
            const { data } = await registerUser(userData); // Destructuring
            this.logMessage = `${data.username}님이 가입되었습니다.`;
            //template literal(백틱문법) 자바스크립변수를 문자열과 합침
            this.initForm();
        },
        initForm() {
            this.username = '';
            this.password = '';
            this.nickname = '';
        },
    },
};
</script>

<style>

</style>